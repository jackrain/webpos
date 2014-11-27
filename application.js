//启动引用程序
function RunApplication() { 

};
//运行default目录下指定类型文件
RunApplication.prototype.Run = function (dir, demo, method) {
    var path = "./" + dir + "/" + demo + ".js";
    var context = require(path);
    if (this.IsFunction(context.Run)) {
        context.Run();
    } else if (this.IsFunction(context.Test)) {
        this.RunModule(context.Test, method);
    }
}
//检测指定传入对象是否为函数
RunApplication.prototype.IsFunction = function (obj) {
    return Object.prototype.toString.apply(obj) == '[object Function]';
}
//运行传入指定用例
RunApplication.prototype.RunModule = function (handler, method) {
    if (this.IsFunction(handler)) {
        var instance = new handler();
        var callHandle = instance[method];
        if (!this.IsFunction(callHandle)) {
            var v = null;
            var p = handler.prototype;
            for (var i in p) {
                v = p[i];
                if (this.IsFunction(v)) {
                    callHandle = v;
                }
            }
        }
        if (this.IsFunction(callHandle)) {
            callHandle.apply(instance);
        }
    }
}
module.exports.RunApplication = RunApplication;