/**
 * @file 获取公司
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    var data = {
        status: 200,
        data: [],
        "error": null,
        "pageDto": null
    };
    var num = 5;
    for (var i = 0; i < num; i++) {
        var res = {
            "id": i,
            "name": "分公司公司公司公司公司公司公司公司公司公司公司公司公司公司" + i
        };
        data.data.push(res);
    }
    return data;
}
