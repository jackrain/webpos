var pathlib = require('path');
var fse = require('fs-extra');

var FileStreamExtraUnitTest = function () {
}

//判断指定目录是否存在
FileStreamExtraUnitTest.prototype.exists = function () {
    var dir = pathlib.join(__dirname, 'resource');
    var r = fse.existsSync(dir);
    if (r) {
        console.log("exists dir %s", dir);
    } else {
        console.log("not exists dir %s", dir);
    }
}

//创建目录测试: 
//fse.mkdir:异步创建一个目录 如果(存在或者父级目录不存在)则会抛出异常 或者创建出现异常
//fse.mkdirSync:同步创建一个目录 
//fse.mkdirs:异步创建指定路径目录 ，如果目录中存在父级目录不存在则自动创建
//fse.mkdirsSync:同步创建指定路径目录 ，如果目录中存在父级目录不存在则自动创建
FileStreamExtraUnitTest.prototype.mkdir = function () {
    var dir = pathlib.join(__dirname, 'resource3');
    if (!fse.existsSync(dir)) {
        fse.mkdir(dir, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("dir (%s) is created", dir);
                //删除目录
                fse.remove(dir, function (err) {
                    if (!err) {
                        console.log('now to remove dir (%s) success', dir);
                    } else {
                        console.log(err);
                    }
                });
            }
        });
    }
}

//创建文件 测试：
//fse.createFile 异步创建创建文件 文件存在不会覆盖
//fse.createFileSync:同步创建文件 文件存在不会覆盖
FileStreamExtraUnitTest.prototype.createFile = function () {
    var file = pathlib.join(__dirname, 'resource', 'a.txt');
    fse.createFile(file, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("the file (%s) is created", file);
            //删除目录
            fse.remove(file, function (err) {
                if (!err) {
                    console.log('now to remove file (%s) success', file);
                } else {
                    console.log(err);
                }
            });
        }
    });
}

//创建一个目录 如果目录不存在 则创建一个目录
FileStreamExtraUnitTest.prototype.ensureDir = function () {
    var dir = pathlib.join(__dirname, 'resource3');
    fse.ensureDir(dir, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('dir:(%s) always created', dir);
            //删除目录
            fse.remove(dir, function (err) {
                if (!err) {
                    console.log('now to remove dir (%s) success', dir);
                } else {
                    console.log(err);
                }
            });
        }
    });
}

//输出内容或者覆盖内容到指定文件 如果文件或者文件目录 则自动创建
FileStreamExtraUnitTest.prototype.outputFile = function () {
    var file = pathlib.join(__dirname, 'resource', 'a.txt');
    fse.outputFile(file, 'always is this', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('output success');
        }
    });
}

//输出指定json对象或者覆盖指定json对象到指定文件 如果文件或者文件目录 不存在 则自动创建
FileStreamExtraUnitTest.prototype.outputJSON = function () {
    var file = pathlib.join(__dirname, 'resource', 'a.json');
    fse.outputJSON(file, { name: 'jack', age: 1000 }, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('write json success');
        }
    });
}


module.exports.Run = function () {
    var method = '';//
    //默认运行最后一个用例
    root.Application.RunModule(FileStreamExtraUnitTest, method);
}
