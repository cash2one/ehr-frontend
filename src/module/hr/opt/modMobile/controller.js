/**
 * @file 修改手机号
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var getInputOptions = require('./inputOptions');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var closeParam = {};

    app.controller('hrOptModMobileCtrl', ['$scope', 'hrRequest', '$stateParams', 'localStorage',
        '$state', 'util', '$modalInstance', 'number', 'password',
        function (
            $scope, hrRequest, $stateParams, localStorage, $state, util, $modalInstance, number, password) {
            $scope.beginTimer = false;
            $scope.sendCode = sendCode;
            /**
             * 确认
             */
            $scope.save = function (form) {
                if (!form.$valid) {
                    return;
                }
                hrRequest.modMobile({
                    password: password,
                    code: $scope.code
                }).then(function () {
                    closeParam.hadSuccess = true;
                    closeParam.mobile = $scope.mobile;
                    info('修改成功');
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
                $scope.inputOptions = getInputOptions('modMobileForm', $scope, util);
            }

            main();


            /**
             * 发送验证码
             */
            function sendCode(form) {
                if (form.mobile.invalid) {
                    return;
                }
                hrRequest.modMobileValidateCode({
                    number: number,
                    mobile:$scope.mobile
                }).then(function () {
                    // 开始发送倒计时
                    $scope.beginTimer = true;
                });
            }
        }
    ]);
});