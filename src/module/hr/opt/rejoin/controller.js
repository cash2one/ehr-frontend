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
    app.controller('hrOptRejoinController', hrOptRejoinController);
    hrOptRejoinController.$inject = ['$scope', '$state', 'hrRequest',
        'applyUtil', '$filter', '$modalInstance'];

    function hrOptRejoinController($scope, $state, hrRequest, applyUtil, $filter, $modalInstance) {
        $scope.save = save;
        $scope.closeHandler = closeHandler;

        init();

        /**
         * 初始化
         */
        function init() {
            $scope.inputOptions = getInputOptions('hrRejoinForm');
        };

        function save(form) {
            if (!form.$valid) {
                return;
            }

            hrRequest.getRejoinInfo({
                idCardNumber: $scope.idCardNumber
            }).then(function (res) {
                closeParam.staffInfo = res.data;
                closeParam.idCardNumber = $scope.idCardNumber;
                $modalInstance.dismiss(closeParam);
            });
        };
        function closeHandler() {
            $modalInstance.dismiss(closeParam);
            $state.go('home');
        };
    }

});