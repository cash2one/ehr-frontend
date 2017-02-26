/**
 * @file 获取部门
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    var data = {
        status: 200,
        data: [],
        "error": null,
        "pageDto": null
    };
    var num = 10;
    for (var i = 0; i < num; i++) {
        var res = {
            "id": i,
            "name": "部门" + i
        };
        data.data.push(res);
    }
    return data;
}
