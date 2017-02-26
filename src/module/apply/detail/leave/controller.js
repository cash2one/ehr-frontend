/**
 * @file 审批详情
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('../../config');
    var fieldConfig = require('../../fieldNameConfig');
    var filterConfig = require('../../fieldFilterConfig');
    app.controller('applyDetailLeaveCtrl', applyDetailLeaveCtrl);
    applyDetailLeaveCtrl.$inject = ['$scope', '$state', 'applyRequest', 'applyUtil', '$filter'];

    function applyDetailLeaveCtrl($scope, $state, applyRequest, applyUtil, $filter) {

        init();

        /**
         * 初始化
         */
        function init() {
        };
    }
});