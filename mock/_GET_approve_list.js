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
            count: 25
        }
    };
    var num = 15;
    var types = [1, 2, 11, 21, 31, 41, 51, 71, 111, 121, 201, 202, 231, 241];
    var typeName = {
        1: '新员工入职',
        2: '员工再入职',
        11: 'offer变更',
        21: '岗位薪酬变更',
        31: '组织架构',
        41: '员工离职',
        51: '实习生劳务转正',
        71: '综合审批',
        111: '试用期工作目标',
        121: '试用期转正申请',
        201: '合作伙伴新员工入职',
        202: '合作伙伴员工再入职',
        231: '合作伙伴人事调动',
        241: '合作伙伴离职'
    }
    for (var i = 0; i < num; i++) {
        //var type = Math.round(Math.random() * 10) % (types.length);
        if (i == 0) {
            type = 1;
        }
        if (i == 1) {
            type = 11;
        }
        if (i == 2) {
            type = 21;
        }
        if (i == 3) {
            type = 31;
        }
        if (i == 4) {
            type = 41;
        }
        if (i == 5) {
            type = 51;
        }
        if (i == 6) {
            type = 2;
        }
        if (i == 7) {
            type = 71;
        }
        /*if (i == 8) {
            type = 101;
        }*/
        if (i == 9) {
            type = 111;
        }
        if (i == 10) {
            type = 121;
        }
        if (i == 11) {
            type = 201;
        }
        if (i == 12) {
            type = 202;
        }
        if (i == 13) {
            type = 231;
        }
        if (i == 14) {
            type = 241;
        }
        var res = {
            id: '123', //变更申请单单号

            promoteUser: 'shanyu', //变更发起人

            promoteUserName: '山余', //变更发起人


            promoteDate: 1212123123,//审批发起时间

            lastModifyUser: 'yan',

            type: type, // 1员工入职 11 offer变更 21 岗位薪酬变更 31组织架构 41 员工离职 51 实习生劳务转正
            title: typeName[type], //标题

            lastModifyUserName: '闫玲玲',

            status: 2 // |2|3  1，审批中；2，审批通过；3，审批拒绝;4 ,审批被撤回
        }
        data.data.push(res);
    }
    return data;
}