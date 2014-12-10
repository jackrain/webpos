var framework = require('framework');
var sqlite3 = require('sqlite3');

var DataAPIUnitTest = function () { }


DataAPIUnitTest.prototype.create = function () {
    var relation = {
        tablename: 'Department', idAttribute: 'id', autoIncrement: true,
        child: [
            { tablename: 'Employee', idAttribute: 'id', fAttribute: 'department', autoIncrement: true }
        ]
    }
    var data = {
        name: '财务部',
        addList: [
            { name: 'Ruby' },
            { name: 'Rose' },
            { name: 'B.O' }
        ]
    };
    framework.DataAPI.rest('create', data, relation, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("新增成功");
        }
    });
}

DataAPIUnitTest.prototype.update = function () {
    var relation = {
        tablename: 'Department', idAttribute: 'id', autoIncrement: true,
        child: [
            { tablename: 'Employee', idAttribute: 'id', fAttribute: 'department', autoIncrement: true }
        ]
    }
    var data = {
        name: '财务部',
        id: 7,
        addList: [
            { name: 'B.O.Add' }
        ],
        modifyList: [
            { name: 'Ruby2', id: 16 },
            { name: 'Rose2', id: 17 },
        ],
        deleteList: [
            { name: 'B.O', id: 18 }
        ]
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
    framework.DataAPI.rest('delete', { id: 21 }, { tablename: 'Employee', idAttribute: 'id' }, function (err, context) {
        if (err) {
            console.log(err);
        } else {
            console.log("删除成功");
        }
    });
}

DataAPIUnitTest.prototype.query = function () {
    framework.DataAPI.rest('read', { where: ['id', '>', 5], limit: 5, offset: 8 }, { tablename: 'Employee', idAttribute: 'id' }, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}

module.exports.Run = function () {
    var method = '';//
    //默认运行最后一个用例
    root.Application.RunModule(DataAPIUnitTest, method);
}
