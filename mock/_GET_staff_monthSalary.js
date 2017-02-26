/**
 * @file 获取等级
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function(param) {
    var data = {
        status: 200,
        data: {
            name: '李牧',
            number: 123,
            structureName: '组织架构',
            fullDay: 25, // 全勤天数
            maxDay: 20, // 最大出勤天数
            realDay: 0, // 实际出勤天数
            executeSalary: 100,
            executeSalaryTypeValue: '元/月',
            executeSalaryType: 1,
            trafficSubsidy: 100,
            mobileSubsidy: 200,
            staffTypeValue: '正式员工',

            trafficSubsidyOri: 100,
            mobileSubsidyOri: 200,
            mealSubsidyOri: 200,
            executeSalaryOri: 0,
            staffType: 1,
            mealSubsidy: 200,
            performSalary: -2000, // 绩效工资
            otherSalary: -3000, // 其它各项
            sumSalary: -30000.24, //工资小计
            endowPer: 100, // 养老保险个人
            unemployPer: 100,
            medicalPer: 100,
            injuryPer: 100,
            maternityPer: 100,
            personTax: 100,
            houseFundPer: 100, //公积金个人扣减
            sumMinusPer: 500, //个人扣减小计
            endowCom: 100, // 养老保险公司
            unemployCom: 100,
            medicalCom: 100,
            injuryCom: 100,
            maternityCom: 100,
            sumSocialSecurityCom: 500,
            sumSocialSecurityPer: 500,
            houseFundCom: 100, //公积金公司扣减
            sumCom: 800, //公司小计
            mealPlus: 100, // 补充餐补
            recommend: 50, // 推荐费用
            houseSubsidy: 30, // 房补
            specialReward: 200, // 经理特别奖
            otherSubsidy: 250, // 其它
            detail: '备注',
            averageSalary: 10000,
            realSum: 120000,
            status: 2,
            taxFreeSubsidy: 100,
            yearAward: 1000,
            yearAwardTax: 35,
            performDetail: '[{"accountInfo":{"mid":6780,"role":1,"businessUnit":3},"statData":{"lastLevel":40,"divideRate":0,"newAchievement":4137000,"cloudRefundMoney":0,"renewAchievement":0,"cloudRefundAchievement":0,"refundAchievement":0,"cloudAchievement":0,"softwareCustomisedMoney":0},"commissionData":{"levelCommission":620550,"cloudCommission":0,"refundCommission":0,"receiverCommission":220,"actualCommission":620550,"supervisorCommission":0,"supervisorReceiverCommission":0,"actualSupervisorCommission":3243}},{"accountInfo":{"mid":6780,"role":7,"businessUnit":2},"statData":{"lastLevel":40,"divideRate":0,"cloudRefundMoney":0,"newAchievement":4087000,"renewAchievement":0,"refundAchievement":0,"cloudAchievement":0,"softwareCustomisedMoney":0},"commissionData":{"levelCommission":613050,"cloudCommission":0,"refundCommission":0,"actualCommission":613050,"receiverCommission":220,"supervisorCommision":1235,"supervisorReceiverCommision":2343,"actualSupervisorCommision":3243}}]'
        },
        "error": null,
        "pageDto": {
            count: 19
        }
    };
    return data;
}