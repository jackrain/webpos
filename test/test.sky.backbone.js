var backbone = require('backbone');

var Man =backbone.Model.extend({
    initialize:function(){
        console.log("aaaa");
        this.bind("change:name",function(){
            var name=this.get("name");
            console.log("bbbb"+name);
        });
        this.bind("invalid",function(model,error){
            console.log("dddd");
        });
    },
    defults:{
        name:'sky',
        age:'30'
    },
    validate:function(attributes){
        if(attributes==''){
            console.log('name 不能为空');
        }
    }

});
var Person=backbone.Collection.extend({model:Man});
var man1=new Man({"name":"aaa"});
var man2=new Man({"name":"13233"});
var persons=new Person;

persons.add(man1);
persons.add(man2);

persons.each(function(man){console.log(man.get('name'));})