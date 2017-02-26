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

    app.controller('hrOptModSalaryDetailCtrl', ['$scope', 'hrRequest',
        '$stateParams', 'localStorage',
        '$state', 'util', '$modalInstance', 'item',
        function (
            $scope, hrRequest, $stateParams, localStorage, $state, util, $modalInstance, item) {
            $scope.detail= item.detail;
            var closeParam = {};

            init();

            function init() {
                $scope.save = save;
                $scope.closeHandler = closeHandler;
                $scope.inputOptions = getInputOptions('modSalaryDetailForm',
                    $scope, util);
            }

            /**
             * 确认
             */
            function save(form) {
                if (!form.$valid) {
                    return;
                }
                closeParam.hasSuccess = true;
                closeParam.item = {
                    detail: $scope.detail
                };
                $modalInstance.dismiss(closeParam);
            };


            /**
             * 关闭modal
             */
            function closeHandler() {
                $modalInstance.dismiss(closeParam);
            }
        }
    ]);
});