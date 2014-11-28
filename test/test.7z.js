var Zip = require('node-7z');
var Path = require('path');
var IO = require('fs-extra');

var ZipUtil = new Zip();

var Zip7UnitTest = function () { }

//注意：
//     由于node-7z没有兼容7za文件启用目录，
//     使用前 请先确认在程序运行根目录下是否存在 7za.exe 如果没有请将node_modules中的node - 7z下的7za复制到根目录


//压缩
Zip7UnitTest.prototype.archive = function () {
    //将当前运行目录下 所有后缀名为md的文件件添加到a.7z压缩包中(a.7z不存在则创建一个新的压缩包)
    //ZipUtil.add('a.7z', '*.md', {m0:'=xx',m1:'=xx'})
    
    //将指定文件添加到压缩包 xml.7z
    var basePath = Path.join(__dirname, 'resource');
    var path = Path.join(basePath, 'xml.7z');
    var from = Path.join(basePath, '*.js');
    IO.deleteSync(path);
    ZipUtil.add(path, from, {}).progress(function (a) {
        console.log(a);
        console.log(arguments.length);
    });
}

//解压 ZipUtil.extractFull
Zip7UnitTest.prototype.extractFull = function () {
    var path = Path.join(__dirname, 'resource', 'xml.7z');
    var destination = Path.join(__dirname, 'resource');
    var zipProcess = ZipUtil.extractFull(path, destination, null);
    zipProcess.progress(function (files) {
        console.log("some files are extracted %s", files);
    });
    zipProcess.then(function () {
        console.log("extract full done");
    });
    zipProcess.catch(function (err) {
        console.log('extract has error %s', err);
    });
}

//解压db.7z
Zip7UnitTest.prototype.extractdbupdate = function () {
    var path = './dbupdate/posbase_v927_plug.7z';
    var destination = './dbupdate';
    ZipUtil.extractFull(path, destination).then(function () {
        console.log('extract dbplug success');
    });
}

module.exports.Run = function () {
    var method = '';//
    //默认运行最后一个用例
    root.Application.RunModule(Zip7UnitTest, method);
}
