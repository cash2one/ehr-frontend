/**
 * @file  列表
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var applyConfig = require('../../config');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    app.controller('applyListTableCtrl', ['$scope', 'applyRequest', '$state', 'applyListTableColsConfig', 'localStorage', 'applyOptUtil',
        function ($scope, applyRequest, $state, applyListTableColsConfig, localStorage, applyOptUtil) {
            /**
             * 入口
             * @type {string}
             */
            $scope.entryName = $state.current.name;
            var splits = $scope.entryName.split('.');
            $scope.nav = splits[2];
            $scope.subNav = splits[3];
            $scope.showPassBtn = true;
            $scope.showRejectBtn = true;
            $scope.showCancelBtn = false;
            $scope.onPassClick = onPassClick;
            $scope.onRejectClick = onRejectClick;
            $scope.onSinglePassClick = onSinglePassClick;
            $scope.onSingleRejectClick = onSingleRejectClick;
            $scope.onTitleClick = onTitleClick;
            $scope.onSingleCancelClick = onSingleCancelClick;

            /**
             * 表格配置
             */
            $scope.tableOptions = {
                data: [],
                canSelect: true,
                totalCount: 0,
                cols: applyListTableColsConfig.getConfig($scope),
                onPageChange: function (pageNum) {
                    $scope.currentPage = pageNum;
                    getList();
                },
                selectedItems: []
            };

            init();

            /**
             * 初始化
             */
            function init() {
                getList();
                initOptVisiblity();
            }

            /**
             * 初始操作的可见性
             */
            function initOptVisiblity() {
                switch ($scope.nav) {
                    case 'toHandle':
                        $scope.showPassBtn = true;
                        $scope.showRejectBtn = true;
                        $scope.showCancelBtn = false;
                        break;
                    case 'hasHandled':
                        $scope.showPassBtn = false;
                        $scope.showRejectBtn = false;
                        $scope.showCancelBtn = false;
                        break;
                    case 'promoteMyself':
                        $scope.showPassBtn = false;
                        $scope.showRejectBtn = false;
                        $scope.showCancelBtn = true;
                        break;
                }
            }

            /**
             * 获取申请类型
             * @returns {*}
             */
            function getType() {
                var applyCode = codeConfig.APPLY_CODE;
                if ($scope.subNav == 'staffEnter') {
                    return applyCode.STAFF_ENTER;
                }
                if ($scope.subNav == 'rejoin') {
                    return applyCode.REJOIN;
                }
                if ($scope.subNav == 'leave') {
                    return applyCode.LEAVE;
                }
                if ($scope.subNav == 'workInfo') {
                    return applyCode.SALARY_INFO;
                }
                if ($scope.subNav == 'structure') {
                    return applyCode.STRUCTURE;
                }
                if ($scope.subNav == 'transFullMember') {
                    return applyCode.TRANS_FULL_MEMBER;
                }
                if ($scope.subNav == 'multiple') {
                    return applyCode.MULTIPLE;
                }
                if ($scope.subNav == 'workTarget') {
                    return applyCode.WORK_TARGET;
                }
                if ($scope.subNav == 'formalApply') {
                    return applyCode.FORMAL_APPLY;
                }
                if ($scope.subNav == 'agentEnter') {
                    return applyCode.AGENT_ENTER;
                }
                if ($scope.subNav == 'agentRejoin') {
                    return applyCode.AGENT_REJOIN;
                }
                if ($scope.subNav == 'agentStructure') {
                    return applyCode.AGENT_STRUCTURE;
                }
                if ($scope.subNav == 'agentLeave') {
                    return applyCode.AGENT_LEAVE;
                }
                return undefined;
            }

            /**
             * 获取导航code
             * @param nav
             */
            function getNav(nav) {
                var navCode = applyConfig.TAB_CODE;
                if (nav == 'toHandle') {
                    return navCode.TO_HANDLE;

                } else if (nav == 'hasHandled') {
                    return navCode.HAS_HANDLED;

                } else if (nav == 'promoteMyself') {
                    return navCode.PROMOTE_MYSELF;
                }
            }

            /**
             * 点通过
             */
            function onPassClick() {
                var selectedItems = $scope.tableOptions.selectedItems;
                confirm('确认通过选中的' + selectedItems.length + '个审批吗？', function () {
                    doHandle('agree', selectedItems);
                });
            }

            /**
             * 单个通过
             * @param item
             */
            function onSinglePassClick(item) {
                confirm('确认通过该审批吗？', function () {
                    doHandle('agree', [item]);
                });
            }

            /**
             * 点拒绝
             */
            function onRejectClick() {
                var selectedItems = $scope.tableOptions.selectedItems;
                confirm('确认拒绝选中的' + selectedItems.length + '个审批吗？', function () {
                    doHandle('reject', selectedItems);
                })
            }

            /**
             * 单个拒绝
             * @param item
             */
            function onSingleRejectClick(item) {
                confirm('确认拒绝该审批吗？', function () {
                    doHandle('reject', [item]);
                });
            }

            /**
             * 处理
             */
            function doHandle(result, selectedItems) {
                var selectedItems = selectedItems;
                var approveList = [];
                var resultCode = applyConfig.HANDLE_RESULT.AGREE;
                if (result == 'reject') {
                    resultCode = applyConfig.HANDLE_RESULT.REJECT;
                }
                for (var i = 0, item; item = selectedItems[i++];) {
                    approveList.push({
                        id: item.id,
                        result: resultCode
                    });
                }
                applyRequest.handleApply({
                    approveList: approveList
                }).then(function () {
                    info('操作成功');
                    getList();
                    $scope.tableOptions.selectedItems = [];
                    $scope.getCountInfo();
                    // 这个是rootScope里面定义的方法
                    $scope.refreshApplyNum();
                });
            }

            /**
             * 标题点击
             */
            function onTitleClick(item) {
                localStorage.set('number', item.editedNumber || 0);
                var typeCode = codeConfig.APPLY_CODE;
                var tab = $scope.nav;
                var prefix = 'modal';
                if (tab == 'promoteMyself') {
                    prefix = 'modalMy-';
                }
                if (tab == 'hasHandled') {
                    prefix = 'modalFinished-';
                }
                var url = '';

                switch (item.type) {
                    case typeCode.STAFF_ENTER:
                        url = $state.href('apply.detail.' + prefix + 'staffEnter', {
                            applyId: item.id
                        });
                        break;
                    case typeCode.REJOIN:
                        url = $state.href('apply.detail.' + prefix + 'staffEnter', {
                            applyId: item.id
                        });
                        break;
                    case typeCode.LEAVE:
                        url = $state.href('apply.detail.' + prefix + 'leave', {
                            applyId: item.id
                        });
                        break;
                    case typeCode.MULTIPLE:
                        url = $state.href('apply.detail.' + prefix + 'multiple', {
                            applyId: item.id
                        });
                        break;
                    case typeCode.SALARY_INFO:
                        url = $state.href('apply.detail.' + prefix + 'salary', {
                            applyId: item.id
                        });
                        break;
                    case typeCode.STRUCTURE:
                        url = $state.href('apply.detail.' + prefix + 'structure', {
                            applyId: item.id
                        });
                        break;
                    case typeCode.TRANS_FULL_MEMBER:
                        url = $state.href('apply.detail.' + prefix + 'transFullMember', {
                            applyId: item.id
                        });
                        break;
                    case typeCode.OFFER_CHANGE:
                        url = $state.href('apply.detail.' + prefix + 'offerChange.offerInfo', {
                            applyId: item.id
                        });
                        break;
                    case typeCode.WORK_TARGET:
                        url = $state.href('apply.detail.' + prefix + 'workTarget', {
                            applyId: item.id
                        });
                        break;
                    case typeCode.FORMAL_APPLY:
                        url = $state.href('apply.detail.' + prefix + 'formalApply', {
                            applyId: item.id
                        });
                        break;
                    case typeCode.AGENT_ENTER:
                        url = $state.href('apply.detail.' + prefix + 'agentEnter', {
                            applyId: item.id
                        });
                        break;
                    case typeCode.AGENT_REJOIN:
                        url = $state.href('apply.detail.' + prefix + 'agentRejoin', {
                            applyId: item.id
                        });
                        break;
                    case typeCode.AGENT_STRUCTURE:
                        url = $state.href('apply.detail.' + prefix + 'agentStructure', {
                            applyId: item.id
                        });
                        break;
                    case typeCode.AGENT_LEAVE:
                        url = $state.href('apply.detail.' + prefix + 'agentLeave', {
                            applyId: item.id
                        });
                        break;
                }

                applyOptUtil.viewDetail(url, function () {
                    $scope.getCountInfo();
                    // 这个是rootScope里面定义的方法
                    $scope.refreshApplyNum();
                    getList();
                });
            }

            /**
             * 撤回
             * @param item
             */
            function onSingleCancelClick(item) {
                confirm('确认撤回该审批吗？', function () {
                    applyRequest.cancelApply({
                        id: item.id
                    }).then(function () {
                        info('操作成功');
                        $scope.getCountInfo();
                        getList();
                    });
                });
            }

            /**
             * 列表
             */
            function getList() {
                applyRequest.getApplyList({
                    status: getNav($scope.nav),
                    type: getType(),
                    pageDto: {
                        pageNum: $scope.currentPage || 1,
                        pageSize: config.PAGE_SIZE
                    }
                }).then(function (res) {
                    var data = res.data;
                    var statusCode = applyConfig.STATUS_CODE;
                    for (var i = 0, item; item = data[i++];) {
                        if (item.status == statusCode.IN_PROCESS
                            || item.status == statusCode.TO_EXCUTE
                            ) {
                            item.canBeCanceled = true;
                        }
                    }
                    $scope.tableOptions.data = data;
                    $scope.tableOptions.totalCount = res.pageDto.count;
                })
            };
        }
    ]);
});