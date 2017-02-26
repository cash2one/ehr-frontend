/**
 * @file 输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope) {
        var config = require('module/config');
        var codeConfig = require('module/codeConfig');
        var nameConfig = require('module/nameConfig');
        var obj = {
            internsEndDate: {
                required: true,
                displayName: '实习/劳务截止日期',
                name: 'internsEndDate',
                formName: formName,
                placeholder: 'yy-MM-dd',
                type: 'date'
            },
            positiveDate: {
                required: true,
                displayName: '实习生转正日期',
                name: 'positiveDate',
                formName: formName,
                placeholder: 'yy-MM-dd',
                type: 'date'
            },
            formalDate: {
                required: true,
                displayName:'转正日期',
                mode: 'select',
                formName: formName,
                name: 'formalDate',
                items: []
            },
            structure: {
                required: true,
                displayName: '组织架构',
                name: 'structure',
                formName: formName,
                manageNodes: [],
                mode: 'structure'
            },
            leader: {
                required: true,
                displayName: '直属领导',
                mode: 'nameSuggestion',
                formName: formName,
                name: 'leader'
            },
            level: {
                required: true,
                displayName: '等级',
                mode: 'select',
                formName: formName,
                name: 'level',
                items: []
            },
            position: {
                required: true,
                displayName: '职位名称',
                mode: 'select',
                formName: formName,
                name: 'position',
                items: []
            },
            baseSalary: {
                required: true,
                displayName: '基本工资',
                name: 'baseSalary',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                items: config.SALARY_TYPE,
                type: 'number',
                mode: 'combine'
            },
            probationarySalary: {
                required: true,
                displayName: '试用期基本工资',
                maxLength: 10,
                name: 'probationarySalary',
                formName: formName,
                placeholder: '',
                type: 'number',
                pattern: config.BASE_REG_STR,
                items: config.SALARY_TYPE,
                mode: 'combine',
                changeHandler: $scope.probationarySalaryChange
            },
            salaryType: {
                required: true,
                displayName: '工资类型',
                name: 'salaryType',
                formName: formName,
                mode: 'select',
                items: config.SALARY_MODE,
                filter: 'salaryType'
            },
            reason: {
                required: false,
                displayName: '变动原因',
                maxLength: 200,
                name: 'reason',
                formName: formName,
                placeholder: '少于200个字',
                mode: 'textarea'
            },
            socialSecurityCity: {
                required: true,
                displayName: '社保缴纳城市',
                mode: 'select',
                name: 'socialSecurityCity',
                formName: formName,
                items: []
            },
            socialSecurityBase: {
                required: true,
                displayName: '社保缴纳基数',
                name: 'socialSecurityBase',
                pattern: config.BASE_REG_STR,
                formName: formName,
                placeholder: '',
                postfix:'元'
            },
            houseFundBase: {
                required: true,
                displayName: '公积金缴纳基数',
                name: 'houseFundBase',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                postfix:'元'
            },
            trafficSubsidy: {
                required: true,
                displayName: '交通补贴',
                name: '交通补贴',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                items: config.SALARY_TYPE,
                mode: 'combine'
            },
            mobileSubsidy: {
                required: true,
                displayName: '通讯补贴',
                maxLength: 10,
                name: 'mobileSubsidy',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                items: config.SALARY_TYPE,
                mode: 'combine'
            }
        }
        return obj;
    }
});