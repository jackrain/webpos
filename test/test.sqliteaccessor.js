var accessorlib = require('Accessor');

var accessor = new accessorlib.SQLiteAccessor('todo');

//SQLiteAccessor 单元测试
function SQLiteAccessorUnitTest() { }

//创建数据库连接方式:
// accessor = new accessorlib.SQLiteAccessor('表名',是否手动事务);
// accessor = new accessorlib.SQLiteAccessor('表名',自定义数据库连接地址);

//测试 新增 accessor.insert(data,callback);
SQLiteAccessorUnitTest.prototype.insert = function () {
    accessor.addListener('INSERT', function () {
        console.log('事件：新增一条数据');
    });
    accessor.addListener('INIT', function () {
        console.log('事件：执行了初始化事件');
    });
    for (var i = 0, k = 10; i < k; i++) {
        accessor.insert({ title: '你好！' + i }, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('新增成功');
            }
        });
    }
}
//测试 修改  accessor.insert(data,callback,options); 
//注意：     options: { where: ["id=1", ["id", ">", 1]] }
SQLiteAccessorUnitTest.prototype.update = function () {
    accessor.addListener('UPDATE', function () {
        console.log("事件：数据修改了");
    });
    accessor.update({ title: '各位好' }, { where: ["title='你好！'"] }, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log("修改成功");
        }
    });
}
//测试删除
SQLiteAccessorUnitTest.prototype.delete = function () {
    accessor.addListener('DELETE', function () {
        console.log("事件：删除了一些数据");
    });
    accessor.delete({ where: [] }, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log("删除命令执行成功");
        }
    });
}
//查询测试
SQLiteAccessorUnitTest.prototype.select = function () {
    accessor.addListener('SELECT', function () {
        console.log("事件：执行了查询");
    });
    accessor.select({ where: [] }, function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            console.log("查询结果：");
            console.log(rows);
        }
    });
}
//查询测试 options:{where:[],limit:返回条数,offset:起始行,fields:查询字段}
SQLiteAccessorUnitTest.prototype.selectEach = function () {
    accessor.selectEach(
        { where: [], limit: 2, offset: 5, fields: ["title"] }, 
        function (err, row) {
            if (err) {
                console.log(err);
            } else {
                console.log("查询到一条数据:" + JSON.stringify(row));
            }
        },
        function (err, count) {
            if (err) {
                console.log(err);
            } else {
                console.log("本次查询最终结果行数总计：" + count);
            }
        }
    );
}

SQLiteAccessorUnitTest.prototype.transaction = function () {
    var transAccessor = new accessorlib.SQLiteAccessor('todo', true);
    //开启事务
    transAccessor.transBegin(function () { console.log("事务已经开启") });
    transAccessor.insert({ title: '我' }, function () { console.log('我'); });
    transAccessor.insert({ title: '是' }, function () { console.log('是'); });
    transAccessor.insert({ title: '中' }, function () { console.log('中'); });
    transAccessor.rollback(function () { console.log("事务已经回滚") });
    transAccessor.transEnd(function (err) {
        console.log("事务始终回滚");
        return false;
    });
    //这里主要测试 rollback后面的数据库操作是否会归纳到事务里边（）
    transAccessor.insert({ title: '其' }, function () { console.log('其'); });
}
module.exports.Run = function () {
    var method = '';//
    //默认运行最后一个用例
    root.Application.RunModule(SQLiteAccessorUnitTest, method);
}