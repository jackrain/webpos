var framework = require('framework');

var UpgradeUnitTest = function () { }

UpgradeUnitTest.prototype.sync = function () {
    var syncUtil = new framework.SyncDataIncrement();
    syncUtil.sync('posbase_v927_plug.7z');
}

module.exports.Run = function () {
    var method = 'sync';//
    //默认运行最后一个用例//497089 462
    root.Application.RunModule(UpgradeUnitTest, method);
}