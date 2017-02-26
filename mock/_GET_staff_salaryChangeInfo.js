/**
 * @file 变更历史
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    return {"data":[{"content":"[基本工资]123.0 元/月 ---> 456.0 元/月[试用期工资]123.0 元/月 ---> 456.0 元/月[交通补贴]null 未知 ---> 0.0 元/月[电话补贴]null 未知 ---> 0.0 元/月[社保基数]null ---> 3500.0[公积金基数]null ---> 3500.0[工资类型]固定工资 ---> 绩效工资","date":1445240473000,"type":"薪酬"}],"status":200};
    var data = {
        status: 200,
        data: [],
        "error": null
    };
    data.data = [
        {
            date: 2323344555666,
            type: '',
            content: '100->200</br>100->300'
        },
        {
            date: 2323344555666,
            type: '',
            content: '绩效工资->固定工资'
        }
    ];
    return data;
}
