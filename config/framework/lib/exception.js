/*****************************************************
 * 各种异常定义区域
 * 
 * 
 * **************************************************/

var unknow = { message: '未知异常', code: -1 };

//异常创建对象
ErrorBuilder = function () { }

//创建异常构建对象实例
var builder = module.exports = new ErrorBuilder();

//错误类型定义列表
ErrorBuilder.prototype.Errors = {};

//创建一个异常对象
ErrorBuilder.prototype.Error = function (code) {
    var errors = this.Errors;
    var message = errors[code] || unknow.message;
    return new Error(message);
}

ErrorBuilder.prototype.Errors = {
    '1000': '表 或者列不存在',
    '3000': '事务没有结束,无法重新开启',
    '3001': '事务计数器不匹配',
    '4000': '没有数据库连接,请检查是否配置连接路径',
    '5000': '解压增量包后，找不到增量数据库文件',
    '5001': '必须提供增量包名称'
}