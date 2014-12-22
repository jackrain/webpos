var context = require('./application.js');

function Run() {
    root.baseDIR = __dirname;
    root.Application = new context.RunApplication();
    root.Application.Run("test", 'test.rest');
<<<<<<< HEAD
    root.Application.Run("test", 'test.module.validate');
=======

>>>>>>> 4fdfa85582bc39d5de8420e9e61e4131433006b2
}
module.exports.Run = Run;

Run();

setTimeout(function () { debugger; }, 60000);
