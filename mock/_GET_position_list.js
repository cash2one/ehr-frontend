/**
 * @file 获取职位列表
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
            "name": "职位" + i
        };
        data.data.push(res);
    }
    return data;
}
