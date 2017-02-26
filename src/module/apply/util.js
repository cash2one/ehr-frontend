/**
 * @file 工具方法
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('./app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    app.factory('applyUtil', ['$modal', 'authUtil', '$q', 'hrRequest', 'util', function ($modal, authUtil, $q, hrRequest, util) {
        return  {

            /**
             * 取对象中不相等的部分，只比较了第一层，没有深度比较
             * @param obj1
             * @param obj2
             * @returns {{}}
             */
            getChangedValue: function (obj1, obj2) {
                var res = {};
                for (var key in obj1) {
                    if (!isEqual(obj1[key], obj2[key])) {
                        res[key] = [obj1[key], obj2[key]];
                    }
                }
                for (var key in obj2) {
                    if (typeof obj1[key] == 'undefined') {
                        res[key] = [obj1[key], obj2[key]];
                    }
                }
                return res;

                /**
                 * 判断相等
                 * @param a
                 * @param b
                 * @returns {boolean}
                 */
                function isEqual(a, b) {
                    if (typeof a == 'object') {
                        if (JSON.stringify(a) != JSON.stringify(b)) {
                            return false;
                        }
                    } else {
                        if (a != b) {
                            return false;
                        }
                    }
                    return true;
                }

            }
        }
    }]);
});
