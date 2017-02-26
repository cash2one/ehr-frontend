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
            idCardNumber: {
                required: true,
                displayName: '身份证号',
                maxLength: 18,
                name: 'idCardNumber',
                formName: formName,
                placeholder: '少于18个字'
            }
        }
        return obj;
    }
});