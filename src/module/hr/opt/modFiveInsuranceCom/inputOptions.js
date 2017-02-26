/**
 * @file 输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope, util) {
        var config = require('module/config');
        var codeConfig = require('module/codeConfig');
        var nameConfig = require('module/nameConfig');
        var fieldSet = ['endowCom', 'unemployCom', 'medicalCom', 'injuryCom', 'maternityCom'];
        var fieldNameMap = {
            endowCom: '养老保险',
            unemployCom: '失业保险',
            medicalCom :'医疗保险',
            injuryCom : '工伤保险',
            maternityCom : '生育保险'
        }
        var obj = {};
        for (var i = 0, val; val = fieldSet[i++];) {
            obj[val] = {
                required: true,
                name: val,
                displayName: '',
                formName: formName,
                pattern: config.NEGATIVE_BASE_REG_STR,
                errorDisplayName: fieldNameMap[val],
                changeHandler: $scope.getInputChangeHandler(val)
            }
        }
        return obj;
    }
});