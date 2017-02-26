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

            lawName: '闫玲玲',

            type: 1,
            typeValue: '正式员工',

            idCardNumber: '1212',

            region: '0101',

            jobCode: '3010000',

            structureName: '组织架构名称',

            isForeignValue: '是',
            abtainType: '所得项目',//所得项目

            income: 12,//收入额

            dutyFreeIncome: 233,//免税收金额

            taxIncome: 123,// 允许扣税税费

            standard: 123,// 扣除标注

            donate: 123,// 与扣除的捐赠

            taxIncome: 3242, //应纳所得税

            taxRate: '20%',//税率

            taxMoney: 2342,  //工资单中每个人的所得税计算结果

            socialSecurityCityName: '北京',// 城市名字
            displayNumber: '0' + Math.floor(Math.random() * 1000)
        }
        data.data.push(res);
    }
    return data;
}
