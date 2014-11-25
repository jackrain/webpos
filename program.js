var context = require('./application.js');

//初始化运行
root.Application = new context.RunApplication();
root.Application.Run("test",'test.sqliteaccessor');

setTimeout(function () { debugger;},60000);