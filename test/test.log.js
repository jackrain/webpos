var framework = require('framework');

var FrameworkLogUnitTest = function () { }

FrameworkLogUnitTest.prototype.info = function () {
    framework.Logger.Info("aaaaaaaaaaa");
    framework.Logger.Error("has errror ....");
    framework.Logger.Debug("aaaaaaaassssssssssssssss");
}

module.exports.Run = function () {
    var method = '';//
    //默认运行最后一个用例
    root.Application.RunModule(FrameworkLogUnitTest, method);
}
