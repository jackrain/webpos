var api = require('api');

var ApiUnitTest = function () { }

ApiUnitTest.prototype.driver = function () {
    api.VIPAPI.create({ name: 'jack' }, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}

ApiUnitTest.prototype.select = function () {
    api.VIPAPI.select(function (err, info) {
        err && console.log(err);
        info && console.log(info);
    });
}

module.exports.Run = function () {
    var method = "";
    Application.RunModule(ApiUnitTest, method);
}