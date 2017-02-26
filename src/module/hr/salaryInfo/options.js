/**
 * @file 输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope) {
        var config = require('module/config');
        var codeConfig = require('module/codeConfig');
        var nameConfig = require('module/nameConfig');
        var moment = require('moment');
        var mealMethodCode = codeConfig.MEAL_SALARY_METHOD;
        var mealMethodName = nameConfig.MEAL_SALARY_METHOD;
        var obj = {
            welfareSalary: {
                required: true,
                displayName: '职位福利费',
                name: 'welfareSalary',
                formName: formName,
                placeholder: '职位福利费',
                pattern: '\\d*',
                disable: true,
                postfix: '元/月'
            },
            mealSalaryMethod: {
                required: true,
                displayName: '餐补发放方式',
                name: 'mealSalaryMethod',
                formName: formName,
                filter: 'mealSalaryMethod',
                disable: true,
                mode: 'select',
                items: [
                    {
                        id: mealMethodCode.SALARY,
                        name: mealMethodName[mealMethodCode.SALARY]
                    },
                    {
                        id: mealMethodCode.MEALCARD,
                        name: mealMethodName[mealMethodCode.MEALCARD]
                    }
                ]
            }
        }
        return obj;
    }
});
