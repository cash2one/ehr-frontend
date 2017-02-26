/**
 * @file 输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope, util) {
        var config = require('module/config');
        var codeConfig = require('module/codeConfig');
        var nameConfig = require('module/nameConfig');
        var fieldSet = ['endowPer', 'unemployPer', 'medicalPer', 'injuryPer',
            'maternityPer'];
        var fieldNameMap = {
            endowPer: '养老保险',
            unemployPer: '失业保险',
            medicalPer: '医疗保险',
            injuryPer: '工伤保险',
            maternityPer: '生育保险'
        }
        var obj = {};
        for (var i = 0, val; val = fieldSet[i++];) {
            obj[val] = {
                required: true,
                name: val,
                displayName: '',
                formName: formName,
                errorDisplayName: fieldNameMap[val],
                pattern: config.NEGATIVE_BASE_REG_STR,
                changeHandler: $scope.getInputChangeHandler(val)
            }
        }
        return obj;
    }
});