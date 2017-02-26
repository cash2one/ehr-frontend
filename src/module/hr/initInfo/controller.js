/**
 * @file 公司修改
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    app.controller('hrInitInfoCtrl', ['$scope', '$stateParams',
        'adminRequest', 'hrRequest', 'number', '$modalInstance',
        function (
            $scope, $stateParams, adminRequest, hrRequest, number, $modalInstance) {

            /**
             * 关闭modal
             */
            $scope.closeHandler = function () {
                $modalInstance.dismiss();
            }

            /**
             * 获取初始信息
             */
            $scope.getInitInfo = function () {
                hrRequest.getInitInfo({
                    number: number
                }).then(function (res) {
                    $scope.info = res.data;
                })
            }
            $scope.getInitInfo();
        }]);
})
