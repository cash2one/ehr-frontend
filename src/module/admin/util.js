/**
 * @file 工具方法
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('./app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    app.factory('adminUtil', ['$modal', 'authUtil', '$q', 'hrRequest', function ($modal, authUtil, $q, hrRequest) {
        return {

            /**
             * 添加组织架构
             * @param parendid
             * @param closedcallback
             */
            addStructure: function (parentId, closedcallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/admin/opt/editStructure/tpl.html',
                    controller: 'adminEditStructureCtrl',
                    windowClass: 'xx-dialog',
                    resolve: {
                        parentId: function () {
                            return parentId;
                        },
                        nodeId: function () {
                            return undefined;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function () {
                }, function (data) {
                    closedcallback(data);
                });
            },

            /**
             * 修改关键信息
             * @param parentId
             * @param closedcallback
             */
            modKeyInfo: function (item, closedcallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/admin/opt/editKeyInfo/tpl.html',
                    controller: 'adminOptEditKeyInfoCtrl',
                    resolve: {
                        item: function () {
                            return item;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function () {
                }, function (data) {
                    closedcallback(data);
                });
            },

            /**
             * 编辑组织架构
             * @param parendid
             * @param closedcallback
             */
            editStructure: function (nodeId, closedcallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/admin/opt/editStructure/tpl.html',
                    controller: 'adminEditStructureCtrl',
                    windowClass: 'xx-dialog',
                    resolve: {
                        parentId: function () {
                            return undefined;
                        },
                        nodeId: function () {
                            return nodeId;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function () {
                }, function (data) {
                    closedcallback(data);
                });
            }
        }
    }]);
});
