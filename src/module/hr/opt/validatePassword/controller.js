/**
 * @file  验证密码
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var getInputOptions = require('./inputOptions');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');

    app.controller('hrOptValidatePasswordCtrl', ['$scope', 'hrRequest', '$stateParams', 'localStorage', '$state', 'util', '$modalInstance', 'number',
        function ($scope, hrRequest, $stateParams, localStorage, $state, util, $modalInstance, number) {
            var closeParam = {};
            /**
             * 确认
             */
            $scope.save = function (form) {
                if (!form.$valid) {
                    return;
                }
                hrRequest.validatePassword({
                    password: $scope.password
                }).then(function () {
                    closeParam.hadSuccess = true;
                    closeParam.password = $scope.password;
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
                $scope.inputOptions = getInputOptions('validatePasswordForm', $scope, util);
            }

            main();
        }
    ]);
});