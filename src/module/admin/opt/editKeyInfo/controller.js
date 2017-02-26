/**
 * @file 修改关键信息
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var getInputOptions = require('./inputOptions');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var closeParam = {};

    app.controller('adminOptEditKeyInfoCtrl', ['$scope', 'adminRequest', '$stateParams', 'localStorage', '$state', 'util', '$modalInstance', 'item',
        function ($scope, adminRequest, $stateParams, localStorage, $state, util, $modalInstance, item) {
            var number = item.number;

            $.extend(true, $scope, item);

            /**
             * 确认
             */
            $scope.save = function (form) {
                if (!form.$valid) {
                    return;
                }
                var data = {
                    lawName: $scope.lawName,
                    sex: $scope.sex,
                    number: number
                };
                adminRequest.modKeyInfo(data).then(function (res) {
                    info('修改成功');
                    $modalInstance.dismiss({
                        hadSuccess: true
                    });
                });
            }

            /**
             * 关闭modal
             */
            $scope.closeHandler = function () {
                $modalInstance.dismiss({});
            }

            /**
             * 获取结点信息
             */

            function main() {
                $scope.title = '修改关键信息';
                $scope.inputOptions = getInputOptions('editKeyInfoForm', $scope);
            }

            main();
        }
    ]);
});