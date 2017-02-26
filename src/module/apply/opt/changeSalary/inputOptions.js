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
        var applyConfig = require('../../config');
        var monthBegin = moment(moment().format('YYYY-MM'))
            .add(-1, 'days').format('YYYY-MM-DD');
        var obj = {
            level: {
                required: false,
                displayName: '调整为',
                mode: 'select',
                formName: formName,
                name: 'level',
                items: []
            },
            position: {
                required: false,
                displayName: '调整为',
                mode: 'select',
                formName: formName,
                name: 'position',
                items: []
            },
            baseSalary: {
                required: false,
                displayName: '调整为',
                maxLength: 10,
                name: 'baseSalary',
                formName: formName,
                placeholder: '',
                items: config.SALARY_TYPE,
                type: 'number',
                errorDisplayName: '基本工资',
                pattern: '\\d*',
                mode: 'combine'
            },
            probationarySalary: {
                required: false,
                displayName: '调整为',
                maxLength: 10,
                name: 'probationarySalary',
                formName: formName,
                placeholder: '',
                type: 'number',
                pattern: '\\d*',
                items: config.SALARY_TYPE,
                mode: 'combine'
            },
            salaryType: {
                required: false,
                displayName: '调整为',
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
            socialSecurityBase: {
                required: false,
                displayName: '调整为',
                name: 'socialSecurityBase',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                postfix: '元'
            },
            houseFundBase: {
                required: false,
                displayName: '调整为',
                name: 'houseFundBase',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                postfix: '元'
            },
            trafficSubsidy: {
                required: false,
                displayName: '调整为',
                maxLength: 10,
                name: 'trafficSubsidy',
                formName: formName,
                placeholder: '',
                type: 'number',
                pattern: '\\d*',
                items: config.SALARY_TYPE,
                mode: 'combine'
            },
            mobileSubsidy: {
                required: false,
                displayName: '调整为',
                maxLength: 10,
                name: 'mobileSubsidy',
                formName: formName,
                placeholder: '',
                type: 'number',
                pattern: '\\d*',
                items: config.SALARY_TYPE,
                mode: 'combine'
            },
            executeDate: {
                required: true,
                displayName: '生效日期',
                min: new Date(moment().format('YYYY-MM-DD') + " 00:00:00"),
                name: 'executeDate',
                formName: formName,
                placeholder: 'yy-MM-dd',
                type: 'date',
                tip: applyConfig.EXECUTE_DATE_TIP
            }
        }
        return obj;
    }
});