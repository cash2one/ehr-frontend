/**
 * @file 获取日历模板
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    var data = {
        status: 200,
        data: []
    }
    var num = 5;
    for (var i = 0; i < num; i++) {
        var res = {
            "id": i,
            "name": "日历模板" + i
        };
        data.data.push(res);
    }
    return data;
}
