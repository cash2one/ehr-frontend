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
    };
    data.data = res;
    return data;
};
