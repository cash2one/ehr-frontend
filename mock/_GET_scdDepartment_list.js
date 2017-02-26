/**
 * @file 获取二级部门
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
            "name": "二级部门二级部门二级部门二级部门门二级部门二级部门二级部门" + i
        };
        data.data.push(res);
    }
    return data;
}
