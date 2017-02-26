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
            detail: {
                required: false,
                displayName: '删除原因',
                maxLength: 100,
                name: 'detail',
                formName: formName,
                placeholder: '少于100个字',
                mode: 'textarea'
            }
        };
        return obj;
    }
});