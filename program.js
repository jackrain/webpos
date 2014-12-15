var context = require('./application.js');

function Run() {
    root.baseDIR = __dirname;
    root.Application = new context.RunApplication();
<<<<<<< HEAD
    root.Application.Run("test", 'test.rest');
=======
    root.Application.Run("test", 'test.module.validate');
>>>>>>> 2d810b04dea17fcff396837a4a55823815f25d39
}
module.exports.Run = Run;

Run();

//setTimeout(function () { debugger;},60000);
