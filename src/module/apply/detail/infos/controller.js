/**
 * @file 审批详情
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('../../config');
    app.controller('applyDetailInfosCtrl', applyDetailInfosCtrl);

    applyDetailInfosCtrl.$inject = ['$scope', '$state', 'applyRequest', 'applyUtil', '$filter'];

    function applyDetailInfosCtrl($scope, $state, applyRequest, applyUtil, $filter) {

        var entryName = $state.current.name
        $scope.subTitle = '';

        init();

        /**
         * 初始化
         */
        function init() {
            initTitle();
        }

        /**
         * 初始化subTitle
         */
        function initTitle() {
            if (/apply\.detail\.\w*-?salary/g.test(entryName)) {
                $scope.subTitle = '薪酬岗位调整';
            } else if (/apply\.detail\.\w*-?structure/g.test(entryName)) {
                $scope.subTitle = '人事调动';
            } else if (/apply\.detail\.\w*-?multiple/g.test(entryName)) {
                $scope.subTitle = '综合审批';
            } else if (/apply\.detail\.\w*-?agentStructure/g.test(entryName)) {
                $scope.subTitle = '人事调动';
            }
        }
    }
});