/**
 * @file 社保缴纳城市
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    app.controller('adminSocialSecurityCityControllor', controller);
    controller.$inject = ['$scope', '$stateParams', 'adminRequest', 'hrRequest', '$modal'];
    function controller($scope, $stateParams, adminRequest, hrRequest, $modal) {
        /**
         * 表格配置
         */
        $scope.cityTableOptions = {
            data: [],
            canSelect: false,
            cols: [
                {
                    field: 'name',
                    displayName: '城市',
                    cellTpl: 'src/module/admin/socialSecurityCity/tableTpl/name.html'
                },
                {
                    field: 'opt',
                    displayName: '操作',
                    cellTpl: 'src/module/admin/socialSecurityCity/tableTpl/opt.html'
                }
            ]
        };
        $scope.modifyClick = modifyClick;

        init();

        /**
         * 初始化
         */
        function init() {
            getCityList();
        }

        /**
         * 取公司列表
         */
        function getCityList() {
            hrRequest.getSocialSecurity().then(function (res) {
                $scope.cityTableOptions.data = res.data;
            });
        };


        /**
         * 修改点击
         */
        function modifyClick(item) {
            var modalInstance = $modal.open({
                templateUrl: 'src/module/admin/socialSecurityCity/mod/tpl.html',
                controller: 'adminSocialSecurityCityModControllor',
                windowClass: 'xx-dialog',
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
                    getCityList();
                }
            });
        }

        /**
         * 添加公司
         */
        $scope.addCity = function () {
            add({});
        }

        /**
         * 添加操作
         * @param type
         * @param item
         */
        function add(item) {
            var modalInstance = $modal.open({
                templateUrl: 'src/module/admin/socialSecurityCity/mod/tpl.html',
                controller: 'adminSocialSecurityCityModControllor',
                windowClass: 'xx-dialog',
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
                    getCityList();
                }
            });
        }
    }
})
