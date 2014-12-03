/*********************************************
 * 增量数据库 本地升级工具
********************************************/
var path = require('path');
var ziplib = require('node-7z');
var accessorlib = require('Accessor');
var framework = require('framework');
var io = require('fs-extra');

//解压工具
var ZipUtil = new ziplib();
var StrUtil = framework.String;

var IncrementalSynchroniztion = function () { }

module.exports = IncrementalSynchroniztion;

/*
 * 同步增量数据
 * @increpath: 增量数据包名称 
 */
IncrementalSynchroniztion.prototype.sync = function (increpath) {
    if (!framework.CheckQuestion.isString(increpath) || framework.CheckQuestion.isEmpty(increpath)) {
        throw framework.ErrorBuilder.Error(5001);
    }
    extractIncrementZip(increpath, sync);
}

//1.解压增量包
function extractIncrementZip(zipname, callback) {
    var baseDIR = path.join(framework.GetAppDomainBaseDIR(), 'dbupdate');
    var plugzip = path.join(baseDIR, zipname);
    var basedb = framework.Configuration.connectionString;
    var incredb = path.join(baseDIR, zipname);
    var zip = ZipUtil.extractFull(plugzip, baseDIR);
    var allFiles = [];
    zip.progress(function (files) {
        allFiles.push.apply(allFiles, files);
    });
    zip.then(function () {
        framework.Log(framework.InfoMessageStrings.extractIncrementSuccessString);
        framework.Log(framework.InfoMessageStrings.startSyncIncrementString);
        framework.Call(callback, basedb, getIncrementZipDB(allFiles));
    })
    zip.catch(function () {
        framework.Log(framework.InfoMessageStrings.extractIncrementErrorString);
    });
}

//2.生成增量数据同步SQL语句
function genIncrementSyncSQL(attachdb) {
    var mappings = framework.Configuration.mappings;
    var segments = [];
    var info, vf = null;
    //1.附加数据库语句
    segments.push(StrUtil.Format('ATTACH DATABASE \'{0}\' AS PLUGDB', attachdb));
    for (var i = 0, k = mappings.length; i < k; i++) {
        info = mappings[i];
        vf = info.fields == "*"?"":"(" + info.fields + ")";
        //2.删除在增量数据包中已存在的数据
        segments.push(StrUtil.Format('DELETE FROM {0} WHERE EXISTS(SELECT 1 FROM PLUGDB.{1} AS T WHERE T.{2} = {0}.{3})', info.name, info.from, info.pk, info.mk));
        //3.插入增量数据包的同步数据
        segments.push(StrUtil.Format('INSERT INTO {0}{1} SELECT {2} FROM {3}', info.name, vf, info.fields, info.from));
    }
    //4.解除附加数据库
    segments.push('DETACH DATABASE PLUGDB');
    //5.返回整体同步增量数据的SQL语句
    return segments.join(';\r\n');
}

//3.开始执行增量同步
function sync(basedb, updatedb) {
    var sql = genIncrementSyncSQL(updatedb);
    //1.备份本地数据
    io.copySync(basedb, basedb + '.bak');
    //2.创建数据库执行对象
    var accessor = new accessorlib.SQLiteAccessor('none', basedb);
    //3.指定数据库升级语句
    accessor.run(sql, function (err) {
        //4.移除备份数据库
        io.removeSync(basedb + '.bak');
        if (err) {
            framework.Log(err);
        } else {
            //将增量数据库 修改为.bak结尾文件
            io.rename(updatedb, updatedb + '.bak');
            framework.Log(framework.InfoMessageStrings.syncDataIncrementSuccessString);
        }
    });
}

//获取增量包数据库文件 并且校验增量包文件
function getIncrementZipDB(files) {
    var dbfile = null;
    var file = null;
    var pathUtil = path;
    for (var i = 0, k = files.length; i < k; i++) {
        file = files[i].replace("\r", "");
        if (pathUtil.extname(file) == ".db") {
            dbfile = file;
            break;
        }
    }
    if (dbfile == null) {
        throw framework.ErrorBuilder.Error(5000);
    }
    return pathUtil.join(framework.GetAppDomainBaseDIR(), "dbupdate", dbfile);
}