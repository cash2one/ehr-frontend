/**
 * @file 修改临时卡
 * @author  wangmeng@baijiahulian.com
 */
define(function(require) {
    var app = require('../../app');
    // var getInputOptions = require('./inputOptions');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var closeParam = {};

    app.controller('hrOptAddAssetIdCtrl', ['$scope', 'hrRequest', '$stateParams', 'localStorage',
        '$state', 'util', '$modalInstance', 'item',
        function(
            $scope, hrRequest, $stateParams, localStorage, $state, util, $modalInstance, item) {


            main();

            /**
             * 确认
             */
            $scope.save = function(form) {
                if (!form.$valid) {
                    return;
                }
                if (!$scope.isValid) {
                    return;
                }
                hrRequest.addAssetCode({
                    number: item.number,
                    assetCode: $scope.assetCode
                }).then(function() {
                    closeParam.hadSuccess = true;
                    info('添加成功');
                    $modalInstance.dismiss(closeParam);
                });
            };

            /**
             * 关闭modal
             */
            $scope.closeHandler = function() {
                $modalInstance.dismiss(closeParam);
            }

            function main() {
                $scope.assetCode = item.assetCode;
                $scope.isValid = true;
                $scope.validityConfirm = validityConfirm;
                // $scope.cardName = item.cardName;
                // $scope.inputOptions = getInputOptions('tempCardBorrowForm', $scope, util);
            }

            function validityConfirm() {
                if ($scope.assetCode){
                    var pattern = /^[0-9]{4}\.[0-9]{4}$/g;
                    $scope.isValid = pattern.test($scope.assetCode);
                }
            }

        }
    ]);
});