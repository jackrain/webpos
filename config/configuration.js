//本地数据库连接地址
exports.connectionString = "dbbase/POSBase.db";

//新增数据同步映射配置
exports.mappings = [
    /*name:本地表名称 from:对应的增量数据表名称 fields:字段 pk:本地表主键 mk:增量表对应本地表主键*/
    { name: 'c_pricearea', from: 'c_pricearea_plug', fields: '*', pk: 'Id', mk: 'Id' },
    { name: 'c_viptype_dis', from: 'c_viptype_dis_plug', fields: '*', pk: 'Id', mk: 'Id' },
    { name: 'm_pdtalias_webpos', from: 'm_pdtalias_plug', fields: '*', pk: 'Id', mk: 'Id' },
    { name: 'm_product_webpos', from: 'm_product_plug', fields: '*', pk: 'Id', mk: 'Id' }
];
