/**
 * @file 餐补发放方式
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/nameConfig');
    app.filter('mealSalaryMethod', function () {
        return function (value) {
            return (value === null || value === '' || typeof value == 'undefined')
                ? config.EMPTY_VALUE
                : config.MEAL_SALARY_METHOD[value];
        };
    })
});