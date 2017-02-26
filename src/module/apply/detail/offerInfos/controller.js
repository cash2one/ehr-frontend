/**
 * @file 审批详情
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('../../config');
    app.controller('applyDetailOfferInfosCtrl', applyDetailOfferInfosCtrl);

    applyDetailOfferInfosCtrl.$inject = ['$scope', '$state', 'hrRequest', 'applyUtil', '$filter'];

    function applyDetailOfferInfosCtrl($scope, $state, hrRequest, applyUtil, $filter) {
        init();

        /**
         * 初始化
         */
        function init() {

        }

    }
});