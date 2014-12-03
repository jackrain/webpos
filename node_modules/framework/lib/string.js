var StringUtil = function () { }

module.exports = new StringUtil();

//1.简单字符串格式化工具
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

//2.字符串检测： 是否以xx开头
StringUtil.prototype.StartWidth = function (s, s2) {
    if (s == null || s2 == null || s2 == '') {
        return false;
    } else if (s.substring(0, s2.length) == s2) {
        return true;
    } else {
        return false;
    }
}
//3.字符串检测：是否以XX结尾
StringUtil.prototype.EndWidth = function (s, s2) {
    if (s == null || s2 == null || s2 == '') {
        return false;
    } else if (s.substring(s.length - s2.length) == s2) {
        return true;
    } else {
        return false;
    }
}

//4. 去掉字符串开始的指定字符串
StringUtil.prototype.TrimStart = function (s, trim) {
    if (this.StartWidth(s, trim)) {
        return s.substring(trim.length);
    } else {
        return s;
    }
}

//5.去掉字符串末尾指定字符串
StringUtil.prototype.TrimEnd = function (s, trim) {
    if (this.EndWidth(s, trim)) {
        return s.substring(0, s.length - trim.length);
    } else {
        return s;
    }
}