/**
 * @file 新员工入职
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var closeParam = {};
    app.controller('applyOptDetailController', applyOptDetailController);
    applyOptDetailController.$inject = ['$scope', 'url', '$modalInstance'];

    function applyOptDetailController($scope,url, $modalInstance) {
        $scope.closeHandler = closeHandler;
        $scope.url = url;

        init();

        /**
         * 初始化
         */
        function init() {
        };

        /**
         * 关闭
         */
        function closeHandler() {
            $modalInstance.dismiss(closeParam);
        };
    }

});