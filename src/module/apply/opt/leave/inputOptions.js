/**
 * @file 输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function(require) {
    return function(formName, $scope) {
        var config = require('module/config');
        var codeConfig = require('module/codeConfig');
        var nameConfig = require('module/nameConfig');
        var moment = require('moment');
        var obj = {
            reason: {
                required: true,
                displayName: '离职原因',
                mode: 'select',
                formName: formName,
                name: 'reason',
                items: config.LEAVE_REASON
            },

            leaveDate: {
                required: true,
                displayName: '最后工作日期',
                name: 'leaveDate',
                formName: formName,
                placeholder: 'yy-MM-dd',
                type: 'date',
                min: new Date(moment().format('YYYY/MM/DD') + " 00:00:00")
            },

            detail: {
                required: false,
                displayName: '离职详细信息',
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