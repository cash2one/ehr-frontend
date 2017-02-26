/**
 * @file 残疾人
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    app.controller('adminDisabilityCtrl', ['$scope', '$stateParams', 'adminRequest', 'hrRequest', '$modal',
        function ($scope, $stateParams, adminRequest, hrRequest, $modal) {
            /**
             * 表格配置
             */
            $scope.disabilityTableOptions = {
                data: [],
                canSelect: false,
                cols: [
                    {
                        field: 'name',
                        displayName: '员工姓名',
                        cellTpl: 'src/module/admin/disability/tableTpl/name.html'
                    },
                    {
                        field: 'opt',
                        displayName: '操作',
                        cellTpl: 'src/module/admin/disability/tableTpl/opt.html'
                    }
                ]
            };

            /**
             * 取公司列表
             */
            $scope.getDisabilityList = function () {
                adminRequest.getDisability().then(function (res) {
                    $scope.disabilityTableOptions.data = res.data;
                });
            };


            /**
             * 修改点击
             */
            $scope.delClick = function (item) {
                confirm('确认删除该条记录吗?', function () {
                    adminRequest.delDisability({
                        number: item.number
                    }).then(function () {
                        info('操作成功');
                        $scope.getDisabilityList();
                    })
                });
            }

            /**
             * 添加公司
             */
            $scope.addDisability = function () {
                $scope.add();
            }

            /**
             * 添加操作
             * @param type
             * @param item
             */
            $scope.add = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'src/module/admin/disability/mod/tpl.html',
                    controller: 'disabilityModCtrl'
                });
                // 窗口关闭
                modalInstance.result.then(function () {
                }, function (res) {
                    if (res.hasSuccess == true) {
                        $scope.getDisabilityList();
                    }
                });
            }
            $scope.getDisabilityList();
        }]);
})
