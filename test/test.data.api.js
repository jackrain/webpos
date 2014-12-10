var framework = require('framework');
var sqlite3 = require('sqlite3');

var DataAPIUnitTest = function () { }

var relation = {
    tablename: 'Department', idAttribute: 'id', autoIncrement: true,
    child: [
        { tablename: 'Employee', idAttribute: 'id', fAttribute: 'department', autoIncrement: true }
    ]
}

DataAPIUnitTest.prototype.create = function () {
    var data = {
        name: '财务部',
        Employee: {
            addList: [
                { name: 'Ruby' },
                { name: 'Rose' },
                { name: 'B.O' }
            ]
        }
    };
    framework.DataAPI.rest('create', data, relation, function (err) {
        var d = data;
        if (err) {
            console.log(err);
        } else {
            console.log("新增成功");
        }
    });
}

DataAPIUnitTest.prototype.update = function () {
    var data = {
        name: '财务部',
        id: 26,
        Employee: {
            addList: [
                { name: 'B.O.Add' }
            ],
            modifyList: [
                { name: 'Ruby2', id: 58 },
                { name: 'Rose2', id: 59 },
            ],
            deleteList: [
                { name: 'B.O', id: 60 }
            ]
        }
    };
    framework.DataAPI.rest('update', data, relation, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("修改成功");
        }
    });
}

DataAPIUnitTest.prototype.delete = function () {
    framework.DataAPI.rest('delete', { id: 26 }, relation, function (err, context) {
        if (err) {
            console.log(err);
        } else {
            console.log("删除成功");
        }
    });
}

DataAPIUnitTest.prototype.query = function () {
    framework.DataAPI.rest('read', { where: [['id', '>', "5"]], limit: 2, offset: 0 }, { tablename: 'Employee', idAttribute: 'id' }, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}

module.exports.Run = function () {
    var method = 'query';//
    //默认运行最后一个用例
    root.Application.RunModule(DataAPIUnitTest, method);
}
