/**
 * @file  试用期工作目标详情
 * @authon Minsi Zhan zhanminsi@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('../../config');
    app.controller('applyDetailWorkTargetCtrl', applyDetailWorkTargetCtrl);

    applyDetailWorkTargetCtrl.$inject = ['$scope', '$state', 'applyRequest', 'applyUtil', '$filter'];

    function applyDetailWorkTargetCtrl($scope, $state, $applyRequest, applyUtil, $filter) {
        init();

        /**
         * 初始化
         */
        function init() {

        }
    }
})