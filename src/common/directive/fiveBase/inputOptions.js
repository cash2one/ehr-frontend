/**
 * @file 输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope, util) {
        var config = require('module/config');
        var codeConfig = require('module/codeConfig');
        var nameConfig = require('module/nameConfig');
        var obj = {
            endowBase: {
                required: $scope.fiveBaseInitOptions.required,
                displayName: '',
                name: 'endowBase',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                prefixClass: 'blue',
                errorDisplayName: '养老保险基数',
                postfix: '元'
            },
            unemployBase: {
                required: $scope.fiveBaseInitOptions.required,
                displayName: '',
                name: 'unemployBase',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                prefixClass: 'blue',
                errorDisplayName: '失业保险基数',
                postfix: '元'
            },
            medicalBase: {
                required: $scope.fiveBaseInitOptions.required,
                displayName: '',
                name: 'medicalBase',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                prefixClass: 'blue',
                errorDisplayName: '医保基数',
                postfix: '元'
            },
            injuryBase: {
                required: $scope.fiveBaseInitOptions.required,
                displayName: '',
                name: 'injuryBase',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                prefixClass: 'blue',
                errorDisplayName: '工伤保险基数',
                postfix: '元'
            },
            maternityBase: {
                required: $scope.fiveBaseInitOptions.required,
                displayName: '',
                name: 'maternityBase',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                prefixClass: 'blue',
                errorDisplayName: '生育保险基数',
                postfix: '元'
            }
        };
        return obj;
    }
});