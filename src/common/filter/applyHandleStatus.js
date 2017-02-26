/**
 * @file 审批个人处理状态
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/nameConfig');
    app.filter('applyHandleStatus', function () {
        return function (value) {
            return (value === null || value === '' || typeof value == 'undefined')
                ? config.EMPTY_VALUE : config.APPLY_HANDLE_STATUS_NAME[value];
        };
    })
});