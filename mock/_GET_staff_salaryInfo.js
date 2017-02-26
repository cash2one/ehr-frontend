/**
 * @file 获取等级
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    var data = {
        status: 200,
        data: {},
        "error": null,
        "pageDto": {
            count: 100
        }
    };
    data.data = {
        baseSalary: {    // 基本工资

            value: 25000,

            salaryType: 1

        },

        probationarySalary: { // 试用期基本工资

            value: 16000,

            salaryType: 1

        },
        socialSecurityBase: 100,
        houseFundBase: 10,
        salaryType: 1,
        endowBase: 12,
        unemployBase: 1,
        medicalBase: 2,
        injuryBase: 3,
        maternityBase: 4,
        // mealSalaryMethod: 1,
        welfareSalary: 2000
    };
    return data;
}
