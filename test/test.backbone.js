var framework = require('framework');
var backbone = require('backbone');

var BackBoneLearnUnitTest = function () { }

BackBoneLearnUnitTest.prototype.model = function () {
    var myClass = backbone.Model.extend({ name: 'jack', hello: function () { console.log('hello world'); } }, { create: function () { console.log('static create'); } });
    var instance = new myClass();
    instance.hello();
    myClass.create();
    instance.on('change', function (ins, opts) {
        console.log('change context.name:' + this.name);
        console.log('bind event1： changed');
    }, { name: 'aa' });
    instance.on('change', function (ins, opts) {
        console.log('change context.sex:' + this.sex);
        console.log('bind event2： changed');
    }, { sex: 1 });
    instance.set('name2', 'aa');
    console.log(instance);
}

BackBoneLearnUnitTest.prototype.collection = function () {
    var myCollectionClass = backbone.Collection.extend({ hello: function () { } });
    var myCollection = new myCollectionClass();
    myCollection.on('sort', function () { console.log('sort'); });
    myCollection.on('remove', function () { console.log('remove'); });
    myCollection.on('add', function () { console.log('add'); });
    //myCollection.comparator //排序器 如果实现了 则默认在插入值或者删除模型时会自动调用排序方法
    var ins = { name: 'jack' };
    var ins2 = new backbone.Model;
    var ins3 = new backbone.Model;
    ins2.set('name', 'hello');
    //这里传入的是一个非backbone model对象 在添加之后默认会将其转换成backbone的Model实例
    myCollection.add(ins);
    console.log(myCollection.length);
    var c = myCollection.get('c3');
    console.log('c.name:' + c.get('name'));
    //myCollection.remove('c3');
    c = myCollection.at(0);//根据下标获取指定模型 注意：这里的下标指的是插入数组时的下标 不论是否排过顺序 始终返回插入时下标的模型
    console.log('c.name:' + c.get('name'));
    
    var collection2 = new backbone.Collection([{ name: 'a' }, { name: 'b' }, { name: 'c' }]);
    var names = collection2.pluck('name');
    console.log('pluck:' + names);
    collection2.reset();
}

BackBoneLearnUnitTest.prototype.collection2 = function () {
    backbone.sync = function (a, b, c) {
        var s = 1;
    }
    var memberClass = backbone.Model.extend({ name: '', hello: function () { } }, { table: '' });
    var memberCollectionClass = backbone.Collection.extend({ model: memberClass, url: '/members' });
    var collection = new memberCollectionClass;
    var ins = { a: '111' };
    collection.fetch({data: {page:1}});
    collection.add(ins);
    collection.create([{ age: 18 }], { a: '1' });
    console.log(collection);
}

BackBoneLearnUnitTest.prototype.route = function () {
    var appRoutes = backbone.Router.extend({
        routes: [
            'member/add',
            'member/query',
            'member/help'
        ],
        'member': function () {
            console.log('navigate member');
        },
        'add': function () {
            console.log('navigate add');
        }
    });
    backbone.history.start();
    backbone.history.navigate('member/add');
}

module.exports.Run = function () {
    var method = 'collection2';//
    //默认运行最后一个用例
    root.Application.RunModule(BackBoneLearnUnitTest, method);
}
