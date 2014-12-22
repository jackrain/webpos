var context = require('./application.js');

function Run() {
    root.baseDIR = __dirname;
    root.Application = new context.RunApplication();
    root.Application.Run("test", 'test.rest');
    root.Application.Run("test", 'test.module.validate');
}
module.exports.Run = Run;

Run();

//setTimeout(function () { debugger;},60000);
