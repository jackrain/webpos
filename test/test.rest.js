/**
 * 测试对rest接口使用
 * @type {exports}
 */
var net=require('network');

function network(){
    this.net=net;
}
//下载数据
network.prototype.downloaddata=function(){
   this.net.download.downloaddata("http://172.18.34.34:90/posdata/posbase.7z",'downloads',function(a){
       console.log(a);
   },function(a){
       console.log(a);
   });
};
//测试rest
network.prototype.ExecuteSQL=function(){
    this.net.rest.init('http://172.18.34.34:90/servlets/binserv/Rest','nea@burgeon.com.cn','newbos2011');
    var c=["011409231mub0286001","011409231mub0286001",1667];
    this.net.rest.ExecuteSQL("Query_retail_retqty",c,function(a){
        console.log(a);
    });
};
module.exports.Run = function () {
    var method = 'downloaddata';
    root.Application.RunModule(network, method);
}

