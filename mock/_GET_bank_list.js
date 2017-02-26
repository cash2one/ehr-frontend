/**
 * @file 查询发卡行
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    var data = {
        status: 200,
        data: [],
        "error": null,
        "pageDto": null
    };
    var num = 7;
    for (var i = 0; i < num; i++) {
        var res = {
            id:  i,
            "name": "bank" + i
        };
        data.data.push(res);
    }
    return data;
}
