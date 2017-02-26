/**
 * @file 修改临时卡
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var closeParam = {};

    app.controller('hrOptTempCardReturnCtrl', ['$scope', 'hrRequest', '$stateParams',
        '$state', 'util', '$modalInstance', 'item',
        function (
            $scope, hrRequest, $stateParams, $state, util, $modalInstance, item) {
            $scope.cardName = item.cardName;
            $scope.borrowName = item.borrowName;
            /**
             * 确认
             */
            $scope.save = function (form) {
                if (!form.$valid) {
                    return;
                }
                hrRequest.returnTempCard({
                    cardNumber: item.cardNumber
                }).then(function () {
                    closeParam.hadSuccess = true;
                    info('归还成功');
                    $modalInstance.dismiss(closeParam);
                });
            };

            /**
             * 关闭modal
             */
            $scope.closeHandler = function () {
                $modalInstance.dismiss(closeParam);
            }

            function main() {
            }

            main();
        }]);
});