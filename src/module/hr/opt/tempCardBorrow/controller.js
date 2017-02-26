/**
 * @file 修改临时卡
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function(require) {
    var app = require('../../app');
    var getInputOptions = require('./inputOptions');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var closeParam = {};

    app.controller('hrOptTempCardBorrowCtrl', ['$scope', 'hrRequest', '$stateParams', 'localStorage',
        '$state', 'util', '$modalInstance', 'item',
        function(
            $scope, hrRequest, $stateParams, localStorage, $state, util, $modalInstance, item) {
            /**
             * 确认
             */
            $scope.save = function(form) {
                if (util.inputEmpty($scope.borrowUserName)) {
                    form['borrowUserName'].$setValidity('required', false);
                    return;
                }

                if (!form.$valid) {
                    return;
                }
                hrRequest.borrowTempCard({
                    cardNumber: item.cardNumber,
                    borrowUserName: util.getUsernameFromSuggestion($scope.borrowUserName),
                    idCardNumber: $scope.idCardNumber,
                    memo: $scope.memo
                }).then(function() {
                    closeParam.hadSuccess = true;
                    info('借出成功');
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
                $scope.cardName = item.cardName;
                $scope.inputOptions = getInputOptions('tempCardBorrowForm', $scope, util);
            }

            main();
        }
    ]);
});