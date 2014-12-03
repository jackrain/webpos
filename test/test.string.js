
var framework = require('framework');

//字符串辅助工具 单元测试
function StringUtilUnitTest() { }

StringUtilUnitTest.prototype.format = function () {
    console.log(framework.String.Format('hello {0}{1} i am {1}', 'every one', 'jack'));
}

StringUtilUnitTest.prototype.startWidth = function () {
    var str = "hello every one";
    console.log(framework.String.StartWidth(str, 'hell'));
}

StringUtilUnitTest.prototype.endWidth = function () {
    var str = "hello every one";
    console.log(framework.String.EndWidth(str, 'one'));
}

StringUtilUnitTest.prototype.trimStart = function () { 
    var str = "hello every one";
    console.log(framework.String.TrimStart(str, 'hell'));
}

StringUtilUnitTest.prototype.endWidth = function () {
    var str = "hello every one";
    console.log(framework.String.TrimEnd(str, 'one'));
}

module.exports.Run = function () {
    var method = 'format';//
    //默认运行最后一个用例
    root.Application.RunModule(StringUtilUnitTest, method);
}
