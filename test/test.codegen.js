var framework = require('framework');

var CodeGenUnitTest = function () { }

CodeGenUnitTest.prototype.codegen = function () {
    framework.CodeGener.CodeGen('c_vip');
}

module.exports.Run = function () {
    var method = '';//
    //默认运行最后一个用例
    root.Application.RunModule(CodeGenUnitTest, method);
}
