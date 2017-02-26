/**
 * @file 新员工入职
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var getInputOptions = require('./inputOptions');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var closeParam = {};

    app.controller('hrDesertCondidateCtrl', ['$scope', 'hrRequest', '$stateParams', 'localStorage', '$state', 'util', '$modalInstance', 'number',
        function ($scope, hrRequest, $stateParams, localStorage, $state, util, $modalInstance, number) {

            /**
             * 确认
             */
            $scope.save = function (form) {
                if (!form.$valid) {
                    return;
                }
                confirm('确认放弃该候选人吗？', function () {
                    var data = {
                        number: $scope.number,
                        status: codeConfig.STAFF_STATUS_CODE.ABANDED,
                        reason: $scope.reason,
                        detail: $scope.detail
                    };
                    hrRequest.modStaffStatus(data).then(function () {
                        info('放弃成功');
                        closeParam.hadSuccess = true;
                        $modalInstance.dismiss(closeParam);
                    });
                })
            }

            /**
             * 关闭modal
             */
            $scope.closeHandler = function () {
                $modalInstance.dismiss(closeParam);
            }

            function main() {
                $scope.number = number;
                $scope.inputOptions = getInputOptions('desertCandidateForm', $scope, util);
            }

            main();
        }
    ]);
});