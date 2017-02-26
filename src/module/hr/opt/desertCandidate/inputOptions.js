/**
 * @file 输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope, util) {
        var config = require('module/config');
        var codeConfig = require('module/codeConfig');
        var nameConfig = require('module/nameConfig');
        var reasons = util.buildSelectOpitons(nameConfig.ABANDON_REASON);
        reasons.unshift(config.EMPTY);

        var obj = {
            reason: {
                required: true,
                displayName: '放弃原因',
                name: 'reason',
                formName: formName,
                mode: 'select',
                items: reasons
            },
            detail: {
                required: false,
                displayName: '备注',
                maxLength: 200,
                name: 'detail',
                formName: formName,
                placeholder: '少于200个字',
                mode: 'textarea'
            }
        }
        return obj;
    }
});