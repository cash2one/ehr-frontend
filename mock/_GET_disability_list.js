/**
 * @file 获取等级
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    var data = {
        status: 200,
        data: [],
        "error": null,
        "pageDto": {
            count: 19
        }
    };
    var num = 10;
    for (var i = 0; i < num; i++) {
        var res = {
            number: i,
            name: '残疾人' + i
        };
        data.data.push(res);
    }
    return data;
}