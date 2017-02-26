/**
 * @file 工资信息输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName,$scope) {
        var config = require('module/config');
        return {
            baseSalary: {
                required: false,
                displayName: '基本工资',
                maxLength: 10,
                name: 'baseSalary',
                formName: formName,
                placeholder: '',
                items: config.SALARY_TYPE,
                type: 'number',
                mode: 'combine',
                pattern: '\\d*',
                prefixClass: 'blue'
            },
            probationarySalary: {
                required: false,
                displayName: '试用期基本工资',
                maxLength: 10,
                name: 'probationarySalary',
                formName: formName,
                placeholder: '',
                type: 'number',
                pattern: '\\d*',
                items: config.SALARY_TYPE,
                mode: 'combine',
                prefixClass: 'blue',
                changeHandler: $scope.probationarySalaryChange
            },
            salaryType: {
                required: false,
                displayName: '工资类型',
                name: 'salaryType',
                formName: formName,
                mode: 'select',
                items: config.SALARY_MODE,
                prefixClass: 'blue',
                filter: 'salaryType'
            },
            socialSecurityBase: {
                required: false,
                displayName: '社保缴纳基数',
                name: 'socialSecurityBase',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                prefixClass: 'blue',
                postfix:'元'
            },
            houseFundBase: {
                required: false,
                displayName: '公积金缴纳基数',
                name: 'houseFundBase',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                prefixClass: 'blue',
                postfix:'元'
            },
            trafficSubsidy: {
                required: false,
                displayName: '交通补贴',
                maxLength: 10,
                name: 'trafficSubsidy',
                formName: formName,
                placeholder: '',
                type: 'number',
                pattern: '\\d*',
                items: config.SALARY_TYPE,
                mode: 'combine',
                prefixClass: 'blue'
            },
            mobileSubsidy: {
                required: false,
                displayName: '通讯补贴',
                maxLength: 10,
                name: 'mobileSubsidy',
                formName: formName,
                placeholder: '',
                type: 'number',
                pattern: '\\d*',
                items: config.SALARY_TYPE,
                mode: 'combine',
                prefixClass: 'blue'
            },
            reportAddress: {
                required: false,
                displayName: '报道地址',
                mode: 'select',
                name: 'reportAddress',
                formName: formName,
                items: [],
                prefixClass: 'blue'
            }
        }

        /**
         * 转化工资的值
         * @param result
         * @returns {*}
         */
        function getSalaryValue(result) {
            if (result && result.input) {
                return result.input + result.select
            }
            return '-';
        }
    }
});