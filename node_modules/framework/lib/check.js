/**************************************************
 * 用于检测相关类型以及相关值的检测工具
 * 
 **************************************************/

var CheckQuestion = function () { }

module.exports = new CheckQuestion();

//检测指定变量是否为指定类型
CheckQuestion.prototype.isType = function (obj, type) {
    return Object.prototype.toString.apply(obj) == "[object " + type + "]";
}
//检测当前对象是否为数组
CheckQuestion.prototype.isArray = function (obj) {
    return this.isType(obj, "Array");
}
//检测当前对象是否为Object
CheckQuestion.prototype.isObject = function (obj) {
    return this.isType(obj, "Object");
}
//检测当前对象是否为Date
CheckQuestion.prototype.isDate = function (obj) {
    return this.isType(obj, "Date");
}
//检测当前对象是否为String
CheckQuestion.prototype.isString = function (obj) {
    return this.isType(obj, "String");
}
//检测当前对象是否为Number
CheckQuestion.prototype.isNumber = function (obj) {
    return this.isType(obj, "Number");
}
//检测当前对象是否为Boolean
CheckQuestion.prototype.isBoolean = function (obj) {
    return this.isType(obj, "Boolean");
}
//检测当前对象是否为Function
CheckQuestion.prototype.isFunction = function (obj) {
    return this.isType(obj, "Function");
}
//检测当前对象指定属性是否存在 如果不存在则进行使用默认值进行初始化
CheckQuestion.prototype.noInObj = function (obj, p, dv) {
    var v = obj?obj[p]: dv;
    if (v == null) {
        obj[p] = v = this.isFunction(dv)? dv():dv;
    }
    return v;
}
//检测传入值是否为null或者undefined或者为''空字符串
CheckQuestion.prototype.isEmpty = function (v) {
    if (v == null || v == '' || v == undefined) {
        return true;
    } else {
        return false;
    }
}