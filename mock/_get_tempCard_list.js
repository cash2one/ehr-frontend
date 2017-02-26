/**
 * @file 临时卡列表
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function(param) {
    var data = {
        status: 200,
        data: [],
        "error": null,
        "pageDto": {
            count: 10
        }
    };
    var num = 7;
    for (var i = 0; i < num; i++) {
        var res = {
            cardNumber: '12313' + i, // 卡号

            cardName: '临时卡1',

            status: 2, // 2可借出 3 已借出


            borrowNumber: 5678, // 借卡人工号

            borrowMobile: '16875678',

            borrowSit: '工位',
            memo: '12345698765665677678785677678781234569876566567767878567767878'
        };
        data.data.push(res);
    }
    return data;
}