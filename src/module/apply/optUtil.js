/**
 * @file 工具方法
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('./app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    app.factory('applyOptUtil', ['$modal', 'authUtil', '$q', 'hrRequest', function ($modal, authUtil, $q, hrRequest) {
        return {
            /**
             * 详情
             * @param url
             */
            viewDetail: function (url, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/apply/opt/detail/tpl.html',
                    controller: 'applyOptDetailController',
                    windowClass: 'xxx-dialog',
                    resolve: {
                        url: function () {
                            return url;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function () {
                }, function (data) {
                    closedCallback(data);
                });
            }
        };
    }]);
});
