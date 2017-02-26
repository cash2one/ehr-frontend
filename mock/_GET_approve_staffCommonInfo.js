/**
 * @file 审批详情
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    var data = {
        status: 200,
        data: {
            probation: '6个月  至2016/12/16',
            name: '闫玲玲',
            userName: 'userName',
            email: '147yanling@163.com', //邮箱
            number: 12313,
            sex: 1,
            type: 21,
            leader: 'taoyaping', //直属领导

            leaderName: '陶亚平', //直属领导

            structure: '4', //组织架构名
            structureName: '组织架构名字-组织架构名字-组织架构名字-组织架构名字', //组织架构名

            level: 't1',//等级

            positionName: '职位名称',//职位名称

            salaryType: 1,

            baseSalary: {
                value: 100,
                salaryType: 1
            },
            isProbationary: 0,
            enterTime: 234234324234,
            formalTime: 234234324234,
            displayNumber: '0' + Math.floor(Math.random() * 1000)
        }
    }
    return data;
}
