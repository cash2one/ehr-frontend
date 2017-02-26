/**
 * @file 小数运算
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    app.factory('bigDecimal', [function () {
        return  {
            /**
             * 加
             *
             * @param {number} a
             * @param {number} b
             * @returns {*}
             */
            add: function (a, b) {
                return  require('jsLibrary/src/function/plus')(a, b);
            },

            /**
             * 减
             *
             * @param {number} a
             * @param {number} b
             * @returns {*}
             */
            minus: function (a, b) {
                return  require('jsLibrary/src/function/minus')(a, b);

            },

            /**
             * 乘
             *
             * @param {number} a
             * @param {number} b
             * @returns {*}
             */
            multiply: function (a, b) {
                return  require('jsLibrary/src/function/multiply')(a, b);
            },


            /**
             * 除
             *
             * @param {number} a
             * @param {number}  b
             * return a/b
             */
            div: function (a, b) {
                return  require('jsLibrary/src/function/divide')(a, b);
            }

        }
    }]);
});
