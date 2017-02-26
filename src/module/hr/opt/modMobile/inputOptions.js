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
            mobile: {
                required: true,
                displayName: '手机号',
                name: 'mobile',
                formName: formName,
                maxLength: 11,
                minLength: 11,
                pattern: '\\d*',
                placeHolder: '请输入新的手机号'
            },
            code: {
                required: true,
                displayName: '验证码',
                name: 'code',
                formName: formName,
                placeHolder: '请输入手机验证码'
            }
        }
        return obj;
    }
});