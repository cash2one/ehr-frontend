/**
 * @file 查询组织架构
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function(param) {
    var data = {
        status: 200,
        data: {},
        "error": null,
        "pageDto": {
            count: 100
        }
    };
    data.data = {
        id: 12,

        name: '部门名字很长了怎么办部门名字很长了',
        shortName: '部门名字很长了',

        parentStructure: 2,

        parentStructureName: '组织架构名字很长了怎么办部门名字',


        recruitHR: ['yanling'],

        recruitHRName: ['闫玲', '闫玲'],

        salaryHR: ['yanling'],

        salaryHRName: ['闫玲'],

        relationshipHR: ['yanling'],

        relationshipHRName: ['闫玲'],

        trainingHR: ['yanling'],

        trainingHRName: ['闫玲'],

        businessPartnerHR: ['yanling', 'fanyixin'],

        businessPartnerHRName: ['闫玲', '饭饭'],

        assetManager: ['yanlig'],

        assetManagerName: ['闫玲', '饭饭'],

        itOwner: ['yanling', 'fanyixin'],

        itOwnerName: ['闫玲', '饭饭'],
        owner: ['yanlingling'],
        ownerName: ['闫玲玲'],
        socialSecurityCity: 1,
        socialSecurityCityName: '社保缴纳城市',
        taxLocal: 1,
        isKeyNode: 1,
        isPunchCard: 1,
        punchDevice: '打卡机前缀',
        calendarName: '日历名字',
        numberPrefix: 'AA',
        lowestSalary: 100.0
    };
    return data;
}