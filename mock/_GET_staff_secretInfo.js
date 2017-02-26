/**
 * @file 获取等级
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    var data = {
        status: 200,
        data: {},
        "error": null,
        "pageDto": {
            count: 100
        }
    };
    data.data = {
        cardNum: '6214830100687366',// 卡号
        personalEmail: '147yanling@163.com',   // 联系邮箱
        emergContact: '紧急联系人',
        emergContactMobile: '656789',  // 联系人电话
        address: '邮箱及住址',
        filePlace: '档案挂靠出',
        bank:1,
        bankName: '发卡行'
    };
    return data;
}
