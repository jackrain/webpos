(function () {
    var fn = window.JsonXmlSerializer = function () { }
    var Pe = fn.prototype;

    //序列化指定json格式数据
    Pe.Serialize = function (json, overrides) {
        var docXmls = ['<?xml version="1.0" encoding="utf-8" ?>'];
        this.AutoToXml(json, this.GetRootName(null, overrides), docXmls, overrides);
        return docXmls.join('\n');
    }
    Pe.AutoToXml = function (json, p, docXmls, overrides) {
        if (this.IsObject(json)) {
            this.ObjectToXml(json, p, docXmls, overrides);
        } else if (this.IsArray(json)) {
            this.ArrayToXml(json, p, docXmls, overrides);
        } else {
            this.ValueToXml(json, p, docXmls, overrides);
        }
        return docXmls;
    }
    Pe.ObjectToXml = function (obj, p, docXmls, overrides) {
        if (p != null) { docXmls.push(this.Start(p)); }
        for (var i in obj) {
            this.AutoToXml(obj[i], i, docXmls, overrides);
        }
        if (p != null) { docXmls.push(this.End(p)); }
    }
    Pe.ArrayToXml = function (array, p, docXmls, overrides) {
        if (p != null) { docXmls.push(this.Start(p)); }
        var name = Object.prototype.toString.apply(array[i]).replace('[object ', '').replace(']', '');
        for (var i = 0, k = array.length; i < k; i++) {
            this.AutoToXml(array[i], this.GetChildOverrideName(name, p, overrides), docXmls);
        }
        if (p != null) { docXmls.push(this.End(p)); }
    }
    Pe.ValueToXml = function (v, p, docXmls) {
        if (v == null || v == '') { return; }
        docXmls.push(this.Label(p, v));
    }
    Pe.Start = function (n) {
        return '<' + n + '>';
    }
    Pe.End = function (n) {
        return '</' + n + '>';
    }
    //获取根节点名称
    Pe.GetRootName = function (p, overrides) {
        if (this.IsObject(overrides)) {
            var oname = overrides.root;
            delete overrides.root;
            if (this.IsString(oname) && oname != null) {
                return oname;
            } else {
                return name;
            }
        } else {
            return p;
        }
    }
    //获取重写的子及数组泪列表项名称
    Pe.GetChildOverrideName = function (name, parent, overrides) {
        if (this.IsObject(overrides)) {
            var oname = overrides[parent];
            if (this.IsString(oname) && oname != null) {
                return oname;
            } else {
                return name;
            }
        } else {
            return name;
        }
    }
    Pe.Label = function (name, v) {
        return '<' + name + '>' + v + '</' + name + '>';
    }
    //检测指定变量是否为指定类型
    Pe.IsType = function (obj, type) {
        return Object.prototype.toString.apply(obj) == "[object " + type + "]";
    }
    //检测当前对象是否为数组
    Pe.IsArray = function (obj) {
        return this.IsType(obj, "Array");
    }
    //检测当前对象是否为Object
    Pe.IsObject = function (obj) {
        return this.IsType(obj, "Object");
    }
    //检测当前对象是否为Date
    Pe.IsDate = function (obj) {
        return this.IsType(obj, "Date");
    }
    //检测当前对象是否为String
    Pe.IsString = function (obj) {
        return this.IsType(obj, "String");
    }
    //检测当前对象是否为Number
    Pe.IsNumber = function (obj) {
        return this.IsType(obj, "Number");
    }
    //检测当前对象是否为Boolean
    Pe.IsBoolean = function (obj) {
        return this.IsType(obj, "Boolean");
    }
    //检测当前对象是否为Function
    Pe.IsFunction = function (obj) {
        return this.IsType(obj, "Function");
    }
}());
var obj = { name: 'zjay', age: 19, relations: [{ name: 'beven', age: 200 }, { name: 'his', age: 180 }], parttern: { name: 'zm', age: 25 }, items: [1, 2, 3, 4, 5] };
var ser = new JsonXmlSerializer();
var xml = ser.Serialize(obj, { relations: 'relation', items: 'child' });
document.body.innerText = xml;