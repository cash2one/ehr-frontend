/**
 * @file 社保缴纳名单
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
    var num = 50;
    for (var i = 0; i < num; i++) {
        var res = {
            number: 12,

            name: '闫玲玲',
            lawName: '闫玲玲',
            enterDate:123213,

            enterDateValue:'2014-12-12',

            leaveDate:123213,

            leaveDateValue:'2015-12-12',

            structureName:'组织架构',

            socialSecurityCity:12,
            socialSecurityCityName:'北京',

            socialSecurityBase:12,

            houseFundBase:12,

            detail: '增员' , //1减员  -1增员
            displayNumber: '0' + Math.floor(Math.random() * 1000)
        }
        data.data.push(res);
    }
    return data;
}
