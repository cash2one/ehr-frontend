/**
 * @file 时间戳转为日期
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/nameConfig');
    var moment = require('moment');
    app.filter('timeFormat', function () {
        return function (value) {
            return (value === null || value === '' || typeof value == 'undefined')
                ?  config.EMPTY_VALUE : moment(value).format('YYYY-MM-DD HH:mm:ss');
        };
    })
});
