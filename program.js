var context = require('./application.js');

//初始化运行
root.baseDIR = __dirname;
root.Application = new context.RunApplication();
root.Application.Run("test", 'test.upgrade');

setTimeout(function () { debugger; }, 60000);