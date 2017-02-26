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
            count: 100
        }
    };
    var num = 10;
    for (var i = 0; i < num; i++) {
        var res = {
            number: 121,

            name: '姓名' + i,

            namePinyin: 'pinyin',

            sex: 1,

            degree: 1,

            mobile: '345678',
            lawName: '法律名',

            personalEmail: '567@163.com',

            type: 1, //员工类型


            handleUser: 'yanlingling',

            structure: 5,

            structureName: '组织架构名字-组织架构名字-组织架构名字-组织架构名字-组织架构名字-组织架构名字',

            level: 'a1',    // 等级   M2

            position: 2,//职位ID   传id

            positionName: '职位名字',//传id

            leader: 'taoyaping',//直属领导邮箱前缀

            leaderName: '陶亚平',//直属领导 名字

            probationary: 1,//试用期   枚举类型


            baseSalary: {    // 基本工资

                value: 100,

                salaryType: 1

            },

            probationarySalary: { // 试用期基本工资

                value: 100,

                salaryType: 1

            },

            resumeStorageId: 121,//简历

            resumeUrl: 'https://erw.com', //修改时后端返回

            pcType: 2,

            detail: '备注',

            optType: 2, // 1保存 2 提交

            recommendType: 2, // 推荐方式

            recommendDetail: '推荐信息',

            status: 6, // 5待入职，6草稿，2 放弃


            abandonReason: 1,

            pcType: 1,

            salaryType: 1,
            reportAddress: 1,
            reportAddressName: '北京',
            contractCompany: 1,
            contractCompanyName: '签约公司',
            socialSecurityCity:1,

            //formalDate: 1479351384000, // 转正日期 Long值
            formalDate: 1437926400000,
            formalDateValue: "2015-07-27",

            promiseEnterDate: 1479351384000,
            promiseEnterDateValue: '2015-10-17',
            abandonDetail: '不不想来了，没有为神马吗，就不想来了不想来了，没有为神马吗，就不想来了不想来了，没有为神马吗，就不想来了不想来了，没有为神马吗，就不想来了想来了，没有为神马吗，就不想来了'
        };
        data.data.push(res);
    }
    return data;
};
