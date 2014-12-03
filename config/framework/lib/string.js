var StringUtil = function () { }

module.exports = new StringUtil();

//1.���ַ�����ʽ������
StringUtil.prototype.Format = function (str, arg1, arg2, argN) {
    if (str) {
        var args = Array.prototype.slice.call(arguments, 1);
        str = str.replace(/\{\d+\}/g, function (a) {
            var s = args[a.slice(1, a.length - 1)];
            return s == null?a:s;
        });
    }
    return str;
}

//2.�ַ�����⣺ �Ƿ���xx��ͷ
StringUtil.prototype.StartWidth = function (s, s2) {
    if (s == null || s2 == null || s2 == '') {
        return false;
    } else if (s.substring(0, s2.length) == s2) {
        return true;
    } else {
        return false;
    }
}
//3.�ַ�����⣺�Ƿ���XX��β
StringUtil.prototype.EndWidth = function (s, s2) {
    if (s == null || s2 == null || s2 == '') {
        return false;
    } else if (s.substring(s.length - s2.length) == s2) {
        return true;
    } else {
        return false;
    }
}

//4. ȥ���ַ�����ʼ��ָ���ַ���
StringUtil.prototype.TrimStart = function (s, trim) {
    if (this.StartWidth(s, trim)) {
        return s.substring(trim.length);
    } else {
        return s;
    }
}

//5.ȥ���ַ���ĩβָ���ַ���
StringUtil.prototype.TrimEnd = function (s, trim) {
    if (this.EndWidth(s, trim)) {
        return s.substring(0, s.length - trim.length);
    } else {
        return s;
    }
}