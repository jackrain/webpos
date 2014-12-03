
var framework = require('framework');

//字符串辅助工具 单元测试
function StringUtilUnitTest() { }

//格式化字符串测试 用例: framework.String.Format("{0},{1},{2}",1,2,3);
StringUtilUnitTest.prototype.format = function () {
    console.log(framework.String.Format('hello {0}{1} i am {1}', 'every one', 'jack'));
}

//判断指定字符串是否以某个字符串开头 当ignoreCase为true时 忽略大小写
StringUtilUnitTest.prototype.startsWidth = function () {
    var str = "hello every one";
    console.log(framework.String.StartsWidth(str, 'Hell', true));
}

StringUtilUnitTest.prototype.endsWidth = function () {
    var str = "hello every one";
    console.log(framework.String.EndsWidth(str, 'One', true));
}

StringUtilUnitTest.prototype.trimStart = function () {
    var str = "hello every one";
    console.log(framework.String.TrimStart(str, 'Hell', true));
}

StringUtilUnitTest.prototype.trimEnd = function () {
    var str = "hello every one";
    console.log(framework.String.TrimEnd(str, 'one'));
}

StringUtilUnitTest.prototype.isNullOrEmpty = function () {
    var str = null;
    console.log('when null:' + framework.String.IsNullOrEmpty(str));
    str = '';
    console.log('when empty:' + framework.String.IsNullOrEmpty(str));
    str = "  ";
    console.log('when whitespace:' + framework.String.IsNullOrEmpty(str));
    str = "122";
    console.log('when "122":' + framework.String.IsNullOrEmpty(str));
}

StringUtilUnitTest.prototype.isNullOrWhiteSpace = function () {
    var str = null;
    console.log('when null:' + framework.String.IsNullOrWhiteSpace(str));
    str = '';
    console.log('when empty:' + framework.String.IsNullOrWhiteSpace(str));
    str = "  ";
    console.log('when whitespace:' + framework.String.IsNullOrWhiteSpace(str));
    str = "122";
    console.log('when "122":' + framework.String.IsNullOrWhiteSpace(str));
}

//去掉字符串中所有空格字符串
StringUtilUnitTest.prototype.trimAll = function () {
    var str = " hello every one ";
    console.log(framework.String.TrimAll(str));
}

//去掉字符串左边空格
StringUtilUnitTest.prototype.trimLeft = function () {
    var str = "  hello every one ss";
    console.log(framework.String.TrimLeft(str));
}

//去掉字符串右边空格
StringUtilUnitTest.prototype.trimRight = function () {
    var str = "  hello every one     ";
    console.log(framework.String.TrimRight(str));
}

//去掉字符串左右两边空格
StringUtilUnitTest.prototype.trim = function () {
    var str = "    hello every one     ";
    console.log(framework.String.Trim(str));
}

module.exports.Run = function () {
    var method = '';//
    //默认运行最后一个用例
    root.Application.RunModule(StringUtilUnitTest, method);
}
