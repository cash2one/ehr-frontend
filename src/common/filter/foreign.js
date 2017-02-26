/**
 * @file 电脑类型
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/nameConfig');
    app.filter('foreign', function () {
        return function (value) {
            return (value === null || value === '' || typeof value == 'undefined')
                ? config.EMPTY_VALUE  : config.FOREIGN_STATUS[value];
        };
    })
});