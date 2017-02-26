/**
 * @file 工具方法
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('./app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var nameConfig = require('module/nameConfig');
    require('./yearAward/controller');
    require('./salaryChange/controller');
    require('./baseChange/controller');
    app.factory('homeUtil', ['$modal', 'authUtil', '$q', 'util', '$state',
        function ($modal, authUtil, $q, util, $state) {
            return  {
                /**
                 * 年终奖导入
                 * @param {Object} params
                 */
                showYearAward: function () {
                    $modal.open({
                        templateUrl: 'src/module/home/yearAward/tpl.html',
                        controller: 'homeYearAwardController'
                    });
                },

                /**
                 * 薪酬变更导入
                 */
                showSalaryChange: function () {
                    $modal.open({
                        templateUrl: 'src/module/home/salaryChange/tpl.html',
                        controller: 'homeSalaryChangeController'
                    });
                },

                /**
                 * 五险一金基数变更导入
                 */
                showBaseChange: function () {
                    $modal.open({
                        templateUrl: 'src/module/home/baseChange/tpl.html',
                        controller: 'homeBaseChangeController'
                    });
                }
            }
        }]);
});
