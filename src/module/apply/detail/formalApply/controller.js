/**
 * @file  试用期转正申请详情
 * @author  Minsi Zhan zhanminsi@baijiahulain.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('../../config');
    app.controller('applyDetailFormalApplyCtrl', applyDetailFormalApplyCtrl);

    applyDetailFormalApplyCtrl.$inject = ['$scope', '$state', 'applyRequest', 'applyUtil', '$filter'];

    function applyDetailFormalApplyCtrl($scope, $state, $applyRequest, applyUtil, $filter) {
        init();

        /**
         * 初始化
         */
        function init() {

        }
    }
})