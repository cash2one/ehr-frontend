/**
 * @file 本地存储
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    app.factory('localStorage', ['ajaxService', function (ajaxService) {
        return  {
            /**
             * 添加值
             * @param {Object} params
             */
            set: function (key, value) {
                localStorage.setItem(key, JSON.stringify(value));
            },

            /**
             * get值
             * @param key
             */
            get: function (key) {
                return JSON.parse(localStorage.getItem(key))
            }
        }
    }]);
});
