/**
 * @file 等级模板列表
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
            name: '模板名字巴拉阿拉啦巴拉拉' + i
        }
        data.data.push(res);
    }
    return data;
}
