/**
 * @file 查询出勤记录
 * helinfeng@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    var data = {
        status: 200,
        data: [],
        "error": null,
        "pageDto": {
            count: 139
        }
    };
    var num = 20;
    for (var i = 0; i < num; i++) {
        var res = {
        	"name": "王三" + i,
       		"number": "123444" + i,
       		"day": "2016-11-11",
       		"calendar": "周一",
       		"weekend": 1,
       		"firstPunch": "2016-11-11 7:10:10",
       		"lastPunch": "2016-11-11 9:10:10",
       		"totalTime": "9.5小时",
       		"reason": "晚于标准上班打卡时间"
        };
        data.data.push(res);
    }
    return data;
}