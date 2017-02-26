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
            password: {
                required: true,
                displayName: '登陆密码',
                name: 'password',
                type: 'password',
                formName: formName,
                placeHolder: '请输入登陆密码'
            }
        }
        return obj;
    }
});