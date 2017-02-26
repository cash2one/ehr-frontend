/**
 * @file ajax请求的时候锁屏
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    app.factory('loadingUtil', ['$modal',
        // '$modalInstance',
        function ($modal) {
            return  {
                /**
                 * 显示初始化信息
                 * @param {Object} params
                 */
                showLoading: function (number) {
                    $('#loading-contrainer').removeClass('hide');
                    $('#loading-contrainer-back').removeClass('hide');
                },

                /**
                 * 隐藏
                 */
                hideLoading: function () {
                    $('#loading-contrainer').addClass('hide');
                    $('#loading-contrainer-back').addClass('hide');
                }
            }
        }]);
});
