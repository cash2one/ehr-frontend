/**
 * @file 工资
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/nameConfig');
    app.filter('salary', function () {
        return function (value) {
            return (value === null
                || typeof value == 'undefined'
                || typeof value.value == 'undefined')
                ? config.EMPTY_VALUE  : (value.value + config.SALARY_TYPE[value.salaryType]);
        };
    })
});