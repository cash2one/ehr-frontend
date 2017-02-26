/**
 * @file 审批详情
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {

    /**
     * 离职信息时候的返回
     * @param type
     */
    function getLeaveContent() {
        return {
            leaveDate: 12123213,
            reason: 1,
            detailReason: 2,
            detail: '原因'
        }
    }

    /**
     * 实习转正
     * @returns {{leaveDate: number, reason: number, detailReason: string}}
     */
    function transFullTime() {
        return {
            internsEndDate: 1212321377,
            positiveDate: 1212321377,
            probationary: 1,
            structureName: '组织架构名字-组织架构名字-组织架构名字-转正后的组织架构',
            leader: 'yanlingling',
            leaderName: '闫玲玲',
            level: 't5',
            positionName: '职位名称',
            salaryType: 1,
            baseSalary: {
                value: 100,
                salaryType: 1
            }
        }
    }


    /**
     * 调岗调薪
     * @param type
     * @returns {{level: string, position: number, positionName: string, baseSalary: {value: number, salaryType: number}, salaryType: number}}
     */
    function getStructureAndSalarayContent(type) {
        var level = 't2';
        var positionName = '研发工程师';
        var socialSecurityBase = 10;
        var baseSalary = {
            value: 100,
            salaryType: 1
        }
        if (type == 'old') {
            level = 't1';
            positionName = '实习研发工程师';
            baseSalary = {
                value: 1000
            }
            socialSecurityBase = 100;
        }
        return {
            level: level,
            position: 1,
            positionName: positionName,
            baseSalary: baseSalary,
            salaryType: 1,
            socialSecurityBase: socialSecurityBase
        }
    }


    /**
     * 构造新员工入职的信息
     * @param type
     * @returns {{number: number, name: string, namePinyin: string, sex: number, degree: number, mobile: string, personalEmail: string, type: number, handleUser: string, structure: number, structureName: string, level: string, position: number, postionName: string, leader: string, leaderName: string, probationary: number, promiseEnterDate: number, baseSalary: {value: number, salaryType: number}, probationarySalary: {value: number, salaryType: number}, positionSalary: {value: number, salaryType: number}, performanceSalary: {value: number, salaryType: number}, resumeStorageId: number, resumeUrl: string, pcType: number, detail: string, optType: number, recommendType: number, recommendDetail: string, structureName: string, status: number, abandonReason: number, pcType: number, abandonDetail: string}}
     */
    function getContentOfStaffEnter(type) {
        var mobile = 122333;
        var baseSalary = {
            value: 100,
            salaryType: 1
        }
        var resumeUrl = 'a.com';
        var staffType = 1;
        var probationarySalary = { // 试用期基本工资
            value: 100,
            salaryType: 1
        };

        if (type == 'old') {
            mobile = 3333;
            baseSalary = {
                value: 1000,
                salaryType: 1
            }
            probationarySalary = { // 试用期基本工资
                value: 1000,
                salaryType: 1
            };
            resumeUrl = 'new.com';
            staffType = 2;
        }
        return {
            number: 121,

            name: '姓名' + i,

            namePinyin: 'pinyin',

            sex: 1,

            degree: 1,

            mobile: mobile,

            personalEmail: '567@163.com',

            type: staffType, //员工类型


            handleUser: 'yanlingling',

            structure: 5,

            structureName: '组织架构名字-组织架构名字-组织架构名字-组织架构名字',


            level: 'a1',    // 等级   M2

            position: 2,//职位ID   传id

            positionName: '职位名字',//传id
            contractCompany: 1,//传id
            socialSecurityCityName: '社保缴纳城市',
            contractCompanyName: '签约公司名字',//传id

            leader: 'taoyaping',//直属领导邮箱前缀

            leaderName: '陶亚平',//直属领导 名字

            probationary: 1,//试用期   枚举类型

            promiseEnterDate: 1435802106296, //预计入职时间 Long值

            baseSalary: baseSalary,

            probationarySalary: probationarySalary,

            positionSalary: { // 岗位工资

                value: 100,

                salaryType: 1

            },
            salaryType: 1,

            performanceSalary: { // 绩效工资

                value: 100,

                salaryType: 1

            },

            resumeStorageId: 121,//简历

            resumeUrl: resumeUrl, //修改时后端返回

            pcType: 2,

            detail: '备注',

            optType: 2, // 1保存 2 提交

            recommendType: 2, // 推荐方式

            recommendDetail: '推荐信息',

            structureName: '组织架构名字-组织架构名字-组织架构名字-组织架构',

            status: 6, // 5待入职，6草稿，2 放弃


            abandonReason: 1,

            pcType: 1,

            abandonDetail: '不不想来了，没有为神马吗，就不想来了不想来了，没有为神马吗，就不想来了不想来了，没有为神马吗，就不想来了不想来了，没有为神马吗，就不想来了想来了，没有为神马吗，就不想来了'
        }

    }

    var data = {
        status: 200,
        data: {
            id: 123,//变更申请单单

            number: 1234,//​被审批人员工号

            type: 1,  //变更类型，枚举
            contentBefore: {},
            contentAfter: transFullTime(),


            reason: '变更发起原因',//变更发起原因

            status: 1, //变更申请审批状态（ 1，审批中；2，审批通过；3，审批拒绝）

            createTime: 121212,//变更发起时间

            lastModifyTime: 121212, //最近一次审批时间
            promoteUser: 'yanlingling',
            handleList: [ //审批人列表

                {

                    userName: 'yanling',//审批人

                    name: '审批人',//中文名

                    status: 0,//审批状态（0，等待审批；1审批中；2，审批通过；3，审批拒绝）

                    detail: '奏' //备注，说明

                },

                {

                    userName: 'shenpiren1',//审批人
                    handleTime: 1232897877773,

                    name: '审批人1',//中文名

                    status: 2,//审批状态（0，等待审批；1审批中；2，审批通过；3，审批拒绝）

                    detail: '备注' //备注，说明

                },
                {

                    userName: 'shenpiren1',//审批人
                    handleTime: 1232897877773,

                    name: '审批人1',//中文名

                    status: 2,//审批状态（0，等待审批；1审批中；2，审批通过；3，审批拒绝）

                    detail: '备注' //备注，说明

                }
            ]
        }
    }
    var type = 111; // 1员工入职 11 offer变更 21 岗位薪酬变更 31组织架构 41 员工离职 51 实习生劳务转正 111 试用期工作目标 121 试用期转正申请
    switch (type) {
        case 11:
            data.data.contentBefore = getContentOfStaffEnter('old');
            data.data.contentAfter = getContentOfStaffEnter('new');
            break;
        case 1:
        case 2:
            data.data.contentAfter = getContentOfStaffEnter('new');
            break;
        case 41:
            data.data.contentBefore = {};
            data.data.contentAfter = getLeaveContent();
            break;
        case 21:
            data.data.contentBefore = getStructureAndSalarayContent('old');
            data.data.contentAfter = getStructureAndSalarayContent('new');
            break;
        case 61:
            data.data.contentBefore = getStructureAndSalarayContent('old');
            data.data.contentAfter = getStructureAndSalarayContent('new');
            break;
        case 51:
            data.data.contentBefore = {};
            data.data.contentAfter = transFullTime();
            break;
        case 111:
            data.data.contentBefor = {},
            data.data.contentAfter = {workTarget: 'dadadad&nbsp;&nbsp;&nbsp;&nbsp;dasdsadasd<br>dsadsadasdas'};
            break;
        case 121:
            data.data.contentBefor = {},
            data.data.contentAfter = {formalApply: 'dadadad&nbsp;&nbsp;&nbsp;&nbsp;dasdsadasd<br>dsadsadasdas'};
            break;
        case 201:
        case 202:
            data.data.contentAfter = getContentOfStaffEnter('new');
            break;
        case 231:
            data.data.contentBefore = getStructureAndSalarayContent('old');
            data.data.contentAfter = getStructureAndSalarayContent('new');
            break;
        case 241:
            data.data.contentBefore = {};
            data.data.contentAfter = getLeaveContent();
            break;
    }
    data.data.contentAfter = JSON.stringify(data.data.contentAfter);
    data.data.contentBefore = JSON.stringify(data.data.contentBefore);
    data.data.excuteDate = new Date().getTime();
    return data;
}
