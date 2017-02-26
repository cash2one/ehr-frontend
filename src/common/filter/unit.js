/**
 * @file 单位
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/nameConfig');
    app.filter('unit', function () {
        return function (value, unit) {
            return (value === null
                || typeof value == 'undefined')
                ? config.EMPTY_VALUE : (value) + unit;
        };
    })
});