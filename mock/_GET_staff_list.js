/**
 * @file 获取等级
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function(param) {
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
            id: 12321,
            hasSubordinate: true,
            office: 23,
            officeName: '办公室',
            sit: 'ce234',
            socialSecurityCity: 12,
            socialSecurityCityName: 12,
            excuteSalary: {
                value: 100,
                salaryType: 2
            },

            name: 'namei' + i,
            "bankCard": "12",
            "baseSalary": {
                "salaryType": 2,
                "value": 5
            },
            "baseSalaryType": 2,
            "baseSalaryTypeValue": "元/月",
            "baseSalaryValue": 5,
            "beginWorkTime": 1438012800000,
            "beginWorkTimeValue": "2015-07-28",
            "birthday": 1438279200000,
            "birthplace": "北京",
            "contractCompany": 2,
            "contractCompanyValue": "测试嘻哈猴公司2@11",
            "degree": 2,
            "degreeValue": "硕士",
            "email": "zhangsandan@ceshi.com",
            "contractEndDate": 1437926400000,
            "contractEndDateValue": "2015-08-27",
            "formalDate": 1437926400000,
            "formalDateValue": "2015-07-27",
            "enterTime": 1437926400000,
            "enterTimeValue": "2015-07-27",
            "ethnic": "汉",
            "idCardNumber": "123456789012345670",
            "lawName": "张三蛋",
            "leader": "ahong",
            "leaderName": "阿宏",
            "level": "M3",
            "maritalStatus": 3,
            "maritalStatusValue": "离异",
            "mobile": "13770571033",
            "name": "张三蛋",
            "number": Math.floor(Math.random() * 100),
            "politicalStatus": "团员",
            "positionName": "助理副总裁、总裁助理",
            //"probation": 2,
            //"probationValue": "无",
            "probationarySalary": {
                "salaryType": 2,
                "value": 5
            },
            "probationarySalaryType": 2,
            "probationarySalaryTypeValue": "元/月",
            "probationarySalaryValue": 5,
            "religion": "宗教信仰",
            "salaryType": 2,
            "salaryTypeValue": "绩效工资",
            "sex": 2,
            "sexValue": "男",
            "status": 1,
            "statusName": "已入职",
            "structureName": "百家互联-北京总部；北京总部；北京总部；北京总部；-产品研发部-运营系统",
            "type": 2,
            "typeValue": "实习员工",
            "userName": "zhangsandan",
            "address": "住址和邮编",
            "cardNum": "12",
            "emergContact": "yanl",
            "emergContactMobile": "18663800",
            "filePlace": "档案挂靠处",
            "personalEmail": "12@163.com",
            isInProbationary: true,
            salaryLastLog: 123,
            salaryLastDay: 3,
            salaryLastSalary: 12,
            welfareSalary: 10,
            displayNumber: '0' + Math.floor(Math.random() * 1000),
            assetCode: "1234.5678",
            entryLeaveLog: '入离职信息haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            workEmail: 'yanlingling.baijiahulian.com'
        };
        data.data.push(res);
    }
    return data;
}