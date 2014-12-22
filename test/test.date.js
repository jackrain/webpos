var framework = require('framework');

var DateUtilUnitTest = function () { }

DateUtilUnitTest.prototype.DateConvert = function () {
    var dateUtil = framework.Date;
    console.log(dateUtil.DateConvert('2012-09-09 00:00:01.89'));
    console.log(dateUtil.DateConvert('2012/09/11 00:00:01.89'));
    console.log(dateUtil.DateConvert('2012 09 12 00:00:01.89'));
    console.log(dateUtil.DateConvert(new Date()));
    console.log(dateUtil.DateConvert(new Date().toString()));
}
DateUtilUnitTest.prototype.DateDiff = function () {
    var dateUtil = framework.Date;
    console.log('s:' + dateUtil.DateDiff('2012-09-09 00:00:00', '2012-09-09 00:00:01', 's'));
    console.log('mi:' + dateUtil.DateDiff('2012-09-09 00:00:00', '2012-09-09 00:01:00', 'mi'));
    console.log('h:' + dateUtil.DateDiff('2012-09-09 00:00:00', '2012-09-09 12:00:00', 'h'));
    console.log('d:' + dateUtil.DateDiff('2012-09-09 00:00:00', '2012-09-12 00:00:00', 'd'));
    console.log('m:' + dateUtil.DateDiff('2012-09-09 00:00:00', '2013-12-09 00:00:00', 'm'));
    console.log('y:' + dateUtil.DateDiff('2012-09-09 00:00:00', '2015-09-09 00:00:00', 'y'));
}
DateUtilUnitTest.prototype.DateAdd = function () {
    var dateUtil = framework.Date;
    console.log(dateUtil.AddSeconds('2012-09-09 00:00:00', 70));
    console.log(dateUtil.AddMinutes('2012-09-09 00:00:00', 70));
    console.log(dateUtil.AddDays('2012-09-09 00:00:00', 35));
    console.log(dateUtil.AddHours('2012-09-09 00:00:00', 25));
    console.log(dateUtil.AddMonths('2012-09-09 00:00:00', 13));
    console.log(dateUtil.AddYears('2012-09-09 00:00:00', 10));
}
DateUtilUnitTest.prototype.MaxDayOfMonth = function () {
    var dateUtil = framework.Date;
    console.log(dateUtil.MaxDayOfMonth('2011-2-01'));
}
DateUtilUnitTest.prototype.DaysInYear = function () {
    var dateUtil = framework.Date;
    console.log(dateUtil.DaysInYear(new Date()));
}
DateUtilUnitTest.prototype.WeeksInYears = function () {
    var dateUtil = framework.Date;
    console.log(dateUtil.WeeksInYears('2012-04-05'));
}
module.exports.Run = function () {
    var method = '';//
    //默认运行最后一个用例
    root.Application.RunModule(DateUtilUnitTest, method);
}
