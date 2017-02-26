/**
 * @file 合同年限
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/nameConfig');
    app.filter('contractTime', function () {
        return function (value) {
            return (value === null || value === '' || typeof value == 'undefined')
                ?  config.EMPTY_VALUE : config.CONTACT_TIME[value];
        };
    })
});