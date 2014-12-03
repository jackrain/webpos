/**************************************************
 * ���ڼ����������Լ����ֵ�ļ�⹤��
 * 
 **************************************************/

var CheckQuestion = function () { }

module.exports = new CheckQuestion();

//���ָ�������Ƿ�Ϊָ������
CheckQuestion.prototype.isType = function (obj, type) {
    return Object.prototype.toString.apply(obj) == "[object " + type + "]";
}
//��⵱ǰ�����Ƿ�Ϊ����
CheckQuestion.prototype.isArray = function (obj) {
    return this.isType(obj, "Array");
}
//��⵱ǰ�����Ƿ�ΪObject
CheckQuestion.prototype.isObject = function (obj) {
    return this.isType(obj, "Object");
}
//��⵱ǰ�����Ƿ�ΪDate
CheckQuestion.prototype.isDate = function (obj) {
    return this.isType(obj, "Date");
}
//��⵱ǰ�����Ƿ�ΪString
CheckQuestion.prototype.isString = function (obj) {
    return this.isType(obj, "String");
}
//��⵱ǰ�����Ƿ�ΪNumber
CheckQuestion.prototype.isNumber = function (obj) {
    return this.isType(obj, "Number");
}
//��⵱ǰ�����Ƿ�ΪBoolean
CheckQuestion.prototype.isBoolean = function (obj) {
    return this.isType(obj, "Boolean");
}
//��⵱ǰ�����Ƿ�ΪFunction
CheckQuestion.prototype.isFunction = function (obj) {
    return this.isType(obj, "Function");
}
//��⵱ǰ����ָ�������Ƿ���� ��������������ʹ��Ĭ��ֵ���г�ʼ��
CheckQuestion.prototype.noInObj = function (obj, p, dv) {
    var v = obj?obj[p]: dv;
    if (v == null) {
        obj[p] = v = this.isFunction(dv)? dv():dv;
    }
    return v;
}
//��⴫��ֵ�Ƿ�Ϊnull����undefined����Ϊ''���ַ���
CheckQuestion.prototype.isEmpty = function (v) {
    if (v == null || v == '' || v == undefined) {
        return true;
    } else {
        return false;
    }
}