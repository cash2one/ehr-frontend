/**
 * @file 工作地点
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    app.controller('adminOfficeControllor', controller);
    controller.$inject = ['$scope', '$stateParams', 'adminRequest', 'hrRequest', '$modal'];
    function controller($scope, $stateParams, adminRequest, hrRequest, $modal) {
        /**
         * 表格配置
         */
        $scope.officeTableOptions = {
            data: [],
            canSelect: false,
            cols: [
                {
                    field: 'name',
                    displayName: '工作地点',
                    cellTpl: 'src/module/admin/office/tableTpl/name.html'
                },
                {
                    field: 'opt',
                    displayName: '操作',
                    cellTpl: 'src/module/admin/office/tableTpl/opt.html'
                }
            ]
        };
        $scope.modifyClick = modifyClick;

        init();

        /**
         * 初始化
         */
        function init() {
            getOfficeList();
        }

        /**
         * 取公司列表
         */
        function getOfficeList() {
            hrRequest.getOffice().then(function (res) {
                $scope.officeTableOptions.data = res.data;
            });
        };


        /**
         * 修改点击
         */
        function modifyClick(item) {
            var modalInstance = $modal.open({
                templateUrl: 'src/module/admin/office/mod/tpl.html',
                controller: 'adminOfficeModControllor',
                resolve: {
                    item: function () {
                        return item;
                    },
                    optType: function () {
                        return 'mod';
                    }
                }
            });
            // 窗口关闭
            modalInstance.result.then(function () {
            }, function (res) {
                if (res.hasSuccess == true) {
                    getOfficeList();
                }
            });
        }

        /**
         * 添加公司
         */
        $scope.addOffice = function () {
            add({});
        }

        /**
         * 添加操作
         * @param type
         * @param item
         */
        function add(item) {
            var modalInstance = $modal.open({
                templateUrl: 'src/module/admin/office/mod/tpl.html',
                controller: 'adminOfficeModControllor',
                resolve: {
                    item: function () {
                        return item;
                    },
                    optType: function () {
                        return 'add';
                    }
                }
            });
            // 窗口关闭
            modalInstance.result.then(function () {
            }, function (res) {
                if (res.hasSuccess == true) {
                    getOfficeList();
                }
            });
        }
    }
})
