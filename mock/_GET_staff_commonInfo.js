/**
 * @file 员工的基本通用信息
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    //return {"data":{"applyList":[],"dimissionStatus":0,"displayNumber":"490","email":"yinlongyan@ceshi.com","forbidStatus":0,"formalApplyInfo":"","formalApplyStatus":1,"headImgUrl":"","isProbationary":0,"lawName":"殷龙雁","name":"殷龙雁","namePinyin":"yinlongyan","number":519,"probationaryStatus":0,"sex":1,"status":5,"type":1,"workTargetInfo":"","workTargetStatus":1},"status":200};
    //return {"data":{"applyList":[],"dimissionStatus":0,"displayNumber":"2","email":"yanlingling@ceshi.com","forbidStatus":0,"formalApplyInfo":"dsadsa","formalApplyStatus":0,"headImgUrl":"http://test-ehr.baijiahulian.com/GET/file/file.json?file=4896b40c-7ace-46fe-92b0-169bedc3704e.jpg","isProbationary":0,"lawName":"闫玲玲","name":"闫玲玲","namePinyin":"yanlingling","number":2,"probationaryStatus":0,"sex":1,"status":1,"type":1,"workTargetInfo":"dadsa","workTargetStatus":1},"status":200};
    var data = {
        status: 200,
        data: {},
        "error": null,
        "pageDto": {
            count: 100
        }
    };
    data.data = {
        number: 123,

        name: 'namei',

        sex: 1,

        birthday: '5678989999',

        sex: 1,

        namePinyin: 'yanlingling',

        number: 12222,

        email: 'yanlingling@baijiahulian.com',

        type: 21,

        workTargetStatus: 1, // 0 代表隐藏试用期工作目标按钮，1代表显示工作目标按钮

        formalApplyStatus: 1, // 1代表显示试用期转正申请按钮，0代表隐藏试用期转正申请按钮

        probationaryStatus: 1, // 1代表显示试用期变更按钮，0代表隐藏试用期变更按钮

        status: 1, // 5 待入职 1. 已经入职 2. 放弃 3. 入职中  4. 离职
        dimissionStatus: 1, // 0，未提出离职（或者离职申请正在审批）; 1,离职审批已通过；2，已经离职

        applyList: [],
        lawName: '法律名',
        isProbationary: 1,
        detail: '123详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情',
        displayNumber: '0' + Math.floor(Math.random() * 1000),
        workTargetInfo: '详情详情详情详情&nbsp;&nbsp;<br>详情详情详情详&nbsp;情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情',
        formalApplyInfo: '详情详情详情详&nbsp;&nbsp;<br>情详情详情详情详&nbsp;情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情'
    };
    return data;
}
