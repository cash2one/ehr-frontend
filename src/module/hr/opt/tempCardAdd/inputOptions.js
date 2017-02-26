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
            cardName: {
                required: true,
                displayName: '卡名',
                name: 'cardName',
                formName: formName,
                maxLength: 20,
                placeHolder: '请输入卡名'
            },
            cardNumber: {
                required: true,
                displayName: '卡号',
                name: 'cardNumber',
                formName: formName,
                minLength: 4,
                maxLength: 12,
                pattern: '\\d*',
                placeHolder: '请输入卡号'
            }
        }
        return obj;
    }
});