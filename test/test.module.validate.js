var framework = require('framework');
var business = require('business');

var ModuleValidateUnitTest = function () { }

ModuleValidateUnitTest.prototype.vip = function () {
    var vip = new business.Models.VIP();
    vip.bind('invalid', function () {
        console.log(this.validationError.message);
    });
    vip.setCARDNO('aa');
}

module.exports.Run = function () {
    var method = '';//
    //默认运行最后一个用例
    root.Application.RunModule(ModuleValidateUnitTest, method);
}
