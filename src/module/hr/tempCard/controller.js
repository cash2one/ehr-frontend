/**
 * @file 审批列表
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var tempCardConfig = require('./config');
    var codeConfig = require('module/codeConfig');

    app.controller('hrTempCardCtrl', ['$scope', '$state', 'hrRequest',
        function ($scope, $state, hrRequest) {
            var tabType = 0;
            var tabCode = tempCardConfig.TAB_CODE;
            $scope.isAllPage = $state.includes('hr.tempCard.all');
            $scope.isCanBorrowPage = $state.includes('hr.tempCard.canBorrow');
            $scope.isHadBorrowPage = $state.includes('hr.tempCard.hadBorrow');
            if ($scope.isAllPage) {
                tabType = tabCode.ALL;
            } else if ($scope.isCanBorrowPage) {
                tabType = tabCode.CAN_BORROW;

            } else if ($scope.isHadBorrowPage) {
                tabType = tabCode.HAD_BORROW;
            }


            init();

            function init() {
                getCountInfo();
                $scope.$on('amountChange',function() {
                    getCountInfo();
                });
            }

            /**
             * 各种个数的信息
             * todo
             */
            function getCountInfo() {
                if (tabType == tabCode.ALL) {
                    tabType = undefined;
                }
                hrRequest.getTempCardCount({
                    status: tabType
                }).then(function (res) {
                    var data = res.data;
                    var canBorrow = data[1].amount;
                    var hadBorrow = data[0].amount;
                    $scope.count = {
                        all: canBorrow + hadBorrow,
                        canBorrow: canBorrow,
                        hadBorrow: hadBorrow
                    };
                });
            }
        }
    ]);
});