/**
 * @file  待审批
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var applyConfig = require('../../config');
    var codeConfig = require('module/codeConfig');

    app.controller('applyListSubTabCtrl', ['$scope', '$state', 'applyRequest',
        function ($scope, $state, applyRequest) {
            var tabType = 0;
            var tabCode = applyConfig.TAB_CODE;
            $scope.isHasHandledPage = $state.includes('apply.list.hasHandled');
            $scope.isToHandlePage = $state.includes('apply.list.toHandle');
            $scope.isPromoteMyselfPage = $state.includes('apply.list.promoteMyself');
            $scope.getCountInfo = getCountInfo;

            if ($scope.isHasHandledPage) {
                tabType = tabCode.HAS_HANDLED;
            } else if ($scope.isToHandlePage) {
                tabType = tabCode.TO_HANDLE;

            } else if ($scope.isPromoteMyselfPage) {
                tabType = tabCode.PROMOTE_MYSELF;
            }


            init();

            function init() {
                $scope.getCountInfo();
            }

            /**
             * 各种个数的信息
             */
            function getCountInfo() {
                applyRequest.getCount({
                    status: tabType
                }).then(function (res) {
                    var detail = res.data.detail;
                    var typeCode = codeConfig.APPLY_CODE;
                    $scope.count = {
                        all: res.data.total,
                        rejoin: getCount(typeCode.REJOIN, detail),
                        staffEnter: getCount(typeCode.STAFF_ENTER, detail),
                        leave: getCount(typeCode.LEAVE, detail),
                        workInfo: getCount(typeCode.SALARY_INFO, detail),
                        structure: getCount(typeCode.STRUCTURE, detail),
                        transFullMember: getCount(typeCode.TRANS_FULL_MEMBER, detail),
                        multiple: getCount(typeCode.MULTIPLE, detail),
                        workTarget: getCount(typeCode.WORK_TARGET, detail),
                        formalApply: getCount(typeCode.FORMAL_APPLY, detail),
                        agentEnter: getCount(typeCode.AGENT_ENTER, detail),
                        agentRejoin: getCount(typeCode.AGENT_REJOIN, detail),
                        agentStructure: getCount(typeCode.AGENT_STRUCTURE, detail),
                        agentLeave: getCount(typeCode.AGENT_LEAVE, detail)
                    }
                });
            }

            /**
             * 获取数量
             * @param typeCode
             */
            function getCount(typeCode, arr) {
                for (var i = 0, item; item = arr[i++];) {
                    if (item.type == typeCode) {
                        return item.number;
                    }
                }
            }
        }
    ]);
});