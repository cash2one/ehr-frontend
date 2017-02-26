/**
 * @file 获取等级
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    var data = {
        status: 200,
        data: {},
        "error": {
            code:123,
            message: '不存在'
        },
        "pageDto": {
            count: 100
        }
    };
    var res = {
        "number":123,

        "lawName": "法律名",

        "name": "常用名",

        "namePinyin": "xingmingpy",//姓名拼音

        "sex": 2,//性别

        "degree": 1,//学历

        "degreeValue":"本科",

        "accountLocation": "户口所在地",

        "birthday": 636400800000,//出生日期

        "birthdayValue":"2016-11-11",

        "beginWorkTime": 1459440000000,//全职参加工作时间

        "beginWorkTimeValue":"2016-11-11",

        "isForeign": 1,//证件类型，0-护照 1- 身份证 2-港澳居民来往内地通行证 3-台湾居民来往内地通行证

        "IsForeignValue":"身份证",

        "idCardNumber": "111111111111",//证件号

        "mobile": "11111111111",//手机号

        "personalEmail": "6666666@qq.com",//邮箱，在pre

        "enterTime": 1481472000000,//入职时间

        "enterTimeValue":"2016-11-11",

        "leader": "yanlingling",//领导

         "leaderName":"闫玲玲",

        "structure": 114,//架构

        "structureName":"架构",

        "level": "A2",//等级

        "position": 62,//职位

        "positionName":"职位",

        "resumeStorageId": 1298,//电子简历存储位置，在pre

        "resumeUrl":"http://test-ehr.baijiahulian.com/GET/file/file.json?file=c5254fdb-e6e0-419d-9fb2-30610d68141a.png",

        "idCardAndContract": 1299,//实习协议

        "idCardAndContractUrl":"http://test-ehr.baijiahulian.com/GET/file/file.json?file=c5254fdb-e6e0-419d-9fb2-30610d68141a.png",

        "idCardUpload": 1300,//身份证复印件

        "idCardUploadUrl":"http://test-ehr.baijiahulian.com/GET/file/file.json?file=c5254fdb-e6e0-419d-9fb2-30610d68141a.png",

        "limitAgreement": 1301,//竞业协议

        "limitAgreementUrl":"http://test-ehr.baijiahulian.com/GET/file/file.json?file=c5254fdb-e6e0-419d-9fb2-30610d68141a.png",

        "recommendType": 1,//入职推荐途径，在pre

        "recommendTypeValue":"入职推荐途径",

        "detail": "备注",//备注，在pre

        "recommendDetail": "推荐详情"//推荐详情，在pre
    }
    /*var res = {
        number: 121,

        name: '姓名',

        namePinyin: 'pinyin',

        sex: 1,

        degree: 1,

        mobile: '345678',

        personalEmail: '567@163.com',

        type: 2, //员工类型


        handleUser: 'yanlingling',

        structure: 5,

        structureName: '组织架构名字-组织架构名字-组织架构名字-组织架构名字-组织架构名字',


        level: 'a1',    // 等级   M2

        position: 2,//职位ID   传id

        positionName: '职位名字',//传id

        leader: 'taoyaping',//直属领导邮箱前缀

        leaderName: '陶亚平',//直属领导 名字

        probationary: 1,//试用期   枚举类型

        promiseEnterDate: 1435802106296, //预计入职时间 Long值

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

        structureName: '组织架构',

        status: 6, // 5待入职，6草稿，2 放弃


        abandonReason: 1,

        pcType: 1,

        salaryType: 1,

        contractCompany: 1,
        contractCompanyName: '签约公司',


        abandonDetail: '不不想来了，没有为神马吗，就不想来了不想来了，没有为神马吗，就不想来了不想来了，没有为神马吗，就不想来了不想来了，没有为神马吗，就不想来了想来了，没有为神马吗，就不想来了'
    };*/
    data.data = res;
    return data;
};
