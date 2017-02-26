/**
 * @file 审批详情
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('../../config');
    var socialSecurityCityInfo = {};

    app.controller('applyTransFullMemberCtrl', applyTransFullMemberCtrl);

    applyTransFullMemberCtrl.$inject = ['$scope', '$state', 'applyRequest', 'applyUtil', '$filter', 'hrRequest'];

    function applyTransFullMemberCtrl($scope, $state, applyRequest, applyUtil, $filter, hrRequest) {

        init();

        /**
         * 初始化
         */
        function init() {
        }

    }
});