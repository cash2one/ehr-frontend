/**
 * @file 组织结构变更
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    app.controller('adminContractCompanyCtrl', ['$scope', '$stateParams', 'adminRequest', 'hrRequest', '$modal',
        function ($scope, $stateParams, adminRequest, hrRequest, $modal) {
            /**
             * 表格配置
             */
            $scope.companyTableOptions = {
                data: [],
                canSelect: false,
                cols: [
                    {
                        field: 'name',
                        displayName: '签约公司名称',
                        cellTpl: 'src/module/admin/contractCompany/tableTpl/name.html'
                    },
                    {
                        field: 'opt',
                        displayName: '操作',
                        cellTpl: 'src/module/admin/contractCompany/tableTpl/companyOpt.html'
                    }
                ]
            };

            /**
             * 取公司列表
             */
            $scope.getCompanyList = function () {
                hrRequest.getContractCompany().then(function (res) {
                    $scope.companyTableOptions.data = res.data;
                });
            };


            /**
             * 修改点击
             */
            $scope.modifyClick = function (item) {
                var modalInstance = $modal.open({
                    templateUrl: 'src/module/admin/contractCompany/mod/tpl.html',
                    controller: 'contractCompanyModCtrl',
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
                        $scope.getCompanyList();
                    }
                });
            }

            /**
             * 添加公司
             */
            $scope.addCompany = function () {
                $scope.add({});
            }

            /**
             * 添加操作
             * @param type
             * @param item
             */
            $scope.add = function (item) {
                var modalInstance = $modal.open({
                    templateUrl: 'src/module/admin/contractCompany/mod/tpl.html',
                    controller: 'contractCompanyModCtrl',
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
                        $scope.getCompanyList();
                    }
                });
            }
            $scope.getCompanyList();
        }]);
})
