/**
 * @file 添加临时卡
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var getInputOptions = require('./inputOptions');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var closeParam = {};

    app.controller('hrOptTempCardAddCtrl', ['$scope', 'hrRequest', '$stateParams',
        '$state', 'util', '$modalInstance',
        function (
            $scope, hrRequest, $stateParams, $state, util, $modalInstance) {
            /**
             * 确认
             */
            $scope.save = function (form) {
                if (!form.$valid) {
                    return;
                }
                hrRequest.addTempCard({
                    cardNumber: $scope.cardNumber,
                    cardName: $scope.cardName
                }).then(function () {
                    closeParam.hadSuccess = true;
                    info('添加成功');
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
                $scope.inputOptions = getInputOptions(
                    'tempCardAddForm',
                    $scope, util
                );
            }

            main();
        }]);
});