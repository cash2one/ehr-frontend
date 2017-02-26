/**
 * @file 工资类型
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var nameConfig = require('module/nameConfig');
    app.filter('salaryType', function () {
        return function (value) {
            return (value === null || value === '' || typeof value == 'undefined')
                ? nameConfig.EMPTY_VALUE : (nameConfig.SALARY_MODE[value]);
        };
    })
});