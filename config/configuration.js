//�������ݿ����ӵ�ַ
exports.connectionString = "dbbase/POSBase.db";

//��������ͬ��ӳ������
exports.mappings = [
    /*name:���ر����� from:��Ӧ���������ݱ����� fields:�ֶ� pk:���ر����� mk:�������Ӧ���ر�����*/
    { name: 'c_pricearea', from: 'c_pricearea_plug', fields: '*', pk: 'Id', mk: 'Id' },
    { name: 'c_viptype_dis', from: 'c_viptype_dis_plug', fields: '*', pk: 'Id', mk: 'Id' },
    { name: 'm_pdtalias_webpos', from: 'm_pdtalias_plug', fields: '*', pk: 'Id', mk: 'Id' },
    { name: 'm_product_webpos', from: 'm_product_plug', fields: '*', pk: 'Id', mk: 'Id' }
];
