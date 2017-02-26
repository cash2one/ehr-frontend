/**
 * @file 等级列表
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
            id: i,
            level: 't3',
            levelName: '研发工程师'
        }
        data.data.push(res);
    }
    return data;
}
