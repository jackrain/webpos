var log4js = require('log4js-node');
var framework = require('framework');

var Log4JsLearnUnitTest = function () { }

Log4JsLearnUnitTest.prototype.configure = function () {
    log4js.configure(framework.Configuration.log4jsCfg);
    var logger = log4js.getLogger('');
    
    logger.trace('Entering cheese testing');
    logger.debug('Got cheese.');
    logger.info('Cheese is Gouda.');
    logger.warn('Cheese is quite smelly.');
    logger.error('Cheese is too ripe!');
    logger.fatal('Cheese was breeding ground for listeria.');
}

module.exports.Run = function () {
    var method = '';//
    //默认运行最后一个用例
    root.Application.RunModule(Log4JsLearnUnitTest, method);
}
