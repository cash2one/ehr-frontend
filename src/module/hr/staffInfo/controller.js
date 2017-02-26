/**
 * @file 新员工入职
 * @author zhanwentao@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    app.controller('staffInfoCtrl', ['$scope', 'hrRequest', '$stateParams', 'localStorage', '$state', 'authUtil', 'hrUtil', 'commonInfo', 'hrOptUtil',
        function ($scope, hrRequest, $stateParams, localStorage, $state, authUtil, hrUtil, commonInfo, hrOptUtil) {
            $scope.commonInfo = commonInfo.data;
            var config = require('module/config');
            var hrConfig = require('module/hr/config');
            var codeConfig = require('module/codeConfig');
            $scope.number = localStorage.get('number');
            $scope.pageTitle = '员工信息';
            $scope.canSeeInitInfo = false;
            $scope.onTransFull = onTransFull;
            $scope.onChangeStructure = onChangeStructure;
            $scope.onChangeSalary = onChangeSalary;
            $scope.onLeave = onLeave;
            $scope.onMultiple = onMultiple;
            $scope.onForbid = onForbid;
            $scope.onWriteWorkTarget = onWriteWorkTarget; // 填写工作目标handle
            $scope.onFormalApply = onFormalApply; // 转正申请handle
            $scope.onChangeProbation = onChangeProbation;//试用期变更handle
            $scope.showOptArea = true;
            $scope.showForbidBtn = false;
            $scope.curForbidBtnName = '冻结账号';
            $scope.getJobNumber = getJobNumber; // zhanwentao 生成工号
            $scope.hasGetJobNumber = false || $scope.commonInfo.displayNumber;

            var statusCode = codeConfig.STAFF_STATUS_CODE;

            /**
             * 入职点击
             */
            $scope.joinWorkClick = function () {
                hrUtil.joinWork($scope.number).then(function (res) {
                    $scope.showJoinBtn = false;
                    $scope.commonInfo.status = statusCode.HAS_JOINED;
                    $scope.showOptArea = true;
                    $scope.$broadcast('hasEntered', '');
                });
            }


            /**
             * 查看初始信息
             */
            $scope.initInfoClick = function () {
                hrUtil.showInitInfo($scope.number);
            };


            init();

            /**
             * 初始化
             */
            function init() {
                initEntry();
                initOptBtn();
                $scope.$on('$stateChangeStart', function (e, to) {
                    if (to.name == 'subordinate.self.monthSalary') {
                        $scope.showLeaveBtn = false;
                        $scope.showOptArea = false;
                    } else {
                        if ($scope.commonInfo.status != statusCode.LEAVED && $scope.commonInfo.status != statusCode.TO_LEAVE) {
                            $scope.showLeaveBtn = true;
                        }
                        $scope.showOptArea = true;
                        if (!$scope.$root.userInfo.isAgent && $scope.isAgent) {
                            $scope.showOptArea = false;
                        }
                    }
                });
            }

            /**
             * init入口
             */
            function initEntry() {
                if ($state.includes('subordinate.self')) {
                    $scope.entryName = 'subordinate.self';
                    $scope.isSelfView = true;
                } else if ($state.includes('subordinate.info')) {
                    $scope.entryName = 'subordinate.info';
                    $scope.isLeaderView = true;
                    $scope.pageTitle = '下属信息';
                    $scope.$emit('viewOtherStaffDetail', '');
                } else if ($state.includes('admin.staffInfo')) {
                    $scope.entryName = 'admin.staffInfo';
                    $scope.pageTitle = '员工信息';
                    $scope.showOptArea = false;
                } else {
                    var splits = $state.current.name.split('.');
                    hrUtil.initEntryHRType($scope);
                    if ($scope.isFromRelationshipHR) {
                        $scope.canSeeInitInfo = true;
                    }
                    $scope.isHRView = true;
                    $scope.$emit('viewOtherStaffDetail', '');
                }
                $scope.canReadBaseInfo = true;
                $scope.canReadWorkInfo = true;
                $scope.canReadSalaryInfo = true;
                $scope.canReadMonthSalary = false;
                $scope.canReadSecretInfo = true;
                $scope.canReadChangeInfo = true;
                $scope.canReadLeaveInfo = false;
                $scope.canReadWorkTargetInfo = false;
                $scope.canReadFormalApplyInfo = false;
                if ($scope.entryName == 'subordinate.self') {
                    $scope.canReadLeaveInfo = false;
                    $scope.canReadMonthSalary = true;
                } else if ($scope.entryName == 'subordinate.info') {
                    $scope.canReadSecretInfo = false;
                } else if ($scope.entryName == 'admin.staffInfo') {
                    $scope.canReadLeaveInfo = true;
                } else {
                    $scope.canReadBaseInfo = true;
                    $scope.canReadWorkInfo = true;
                    $scope.canReadSalaryInfo = $scope.isFromHRBP || $scope.isFromSalaryHR;
                    $scope.canReadMonthSalary = $scope.canReadSalaryInfo;
                    $scope.canReadSecretInfo = $scope.isFromHRBP || $scope.isFromRelationshipHR;
                    $scope.canReadChangeInfo = true;
                }
                var status = $scope.commonInfo.status;

                if (($scope.isFromRelationshipHR || $scope.isFromHRBP) && ($scope.commonInfo.dimissionStatus != hrConfig.DIMISSION_STATUS.NOT_APPLY)) {
                    $scope.canReadLeaveInfo = true;
                }
                var data = $scope.commonInfo;
                var status = data.status;
                $scope.detail = data.detail;
                if (status == statusCode.TO_JOIN && $scope.isFromRelationshipHR && $scope.isHRView) {
                    $scope.showJoinBtn = true;
                } else {
                    $scope.showJoinBtn = false;
                }
                if ($scope.commonInfo.forbidStatus) {
                    $scope.curForbidBtnName = '解冻账号';
                }
                // 当时合作伙伴时 zhanminsi
                if ($scope.commonInfo.type == codeConfig.AGENT_TYPE_CODE.REGULAR) {
                    $scope.isAgent = 1;
                }

            }

            /**
             * 初始化各种操作按钮的显示
             */
            function initOptBtn() {
                initVisibility();
                initDisable();
            }

            /**
             * 可用设置
             */
            function initDisable() {
                var applyList = $scope.commonInfo.applyList;
                var applyCode = codeConfig.APPLY_CODE;
                // 有没有执行的审批，就不能再发起
                if (applyList.length != 0) {
                    $scope.disableTransFullBtn = true;
                    $scope.disableStructureChangeBtn = true;
                    $scope.disableSalaryChangeBtn = true;
                    $scope.disbaleLeaveBtn = true;
                    $scope.disbaleMultipleBtn = true;
                    $scope.disableProbationChangeBtn = true;
                    $scope.disableFormalApplyBtn = true;
                    $scope.disableWorkTarget = true;
                }
            }

            /**
             * 可见性设置
             */
            function initVisibility() {
                var type = $scope.commonInfo.type;
                var typeCode = codeConfig.TYPE_CODE;
                var isHRBP = $state.includes('hr.businessPartnerHR-staffInfo');
                var isRelationshipHR = $state.includes('hr.relationshipHR-staffInfo');
                var isSalaryHR = $state.includes('hr.salaryHR-staffInfo');
                if ((type == typeCode.INTERNS || type == typeCode.LABOR) && (isHRBP || $scope.entryName == 'subordinate.info')) {
                    $scope.showTransFullBtn = true;
                }
                if ($scope.entryName == 'subordinate.info' || isHRBP || isRelationshipHR) {
                    $scope.showStructureChangeBtn = true;
                }
                if ($scope.entryName == 'subordinate.info' || isHRBP) {
                    $scope.showMultipleBtn = true;
                }
                if ($scope.entryName == 'subordinate.info' || isHRBP || isSalaryHR) {
                    $scope.showSalaryChangeBtn = true;
                }
                if (isHRBP) {
                    $scope.showForbidBtn = true;
                }
                //添加“试用期变更”按钮可见性  by wangmeng
                if ($scope.entryName == 'subordinate.info' && $scope.commonInfo.probationaryStatus === 1 && $scope.commonInfo.type === 1) {
                    $scope.showProbationChangeBtn = true;
                }

                // 添加“试用期转正申请”和“试用期工作目标”按钮可见性 by zhanminsi
                if ($scope.commonInfo.type === 1) {
                    if ($scope.commonInfo.formalApplyStatus === 1 && $scope.entryName == 'subordinate.self') {
                        $scope.showFormalApplyBtn = true;
                    }
                    if ($scope.commonInfo.workTargetStatus === 1 && $scope.entryName == 'subordinate.self'){
                        $scope.showWorkTargetBtn = true;
                    }
                    if (isHRBP || isRelationshipHR || $scope.entryName == 'subordinate.info' || $scope.entryName == 'subordinate.self'
                        || $scope.entryName == 'admin.staffInfo') {
                        $scope.canReadFormalApplyInfo = true;
                        $scope.canReadWorkTargetInfo = true;
                    }
                }


                if (isHRBP || isRelationshipHR || $scope.entryName == 'subordinate.info' || $scope.entryName == 'subordinate.self') {
                    // 工资单页面不显示离职按钮了。。否则容易激发离职的欲望。。
                    if ($state.includes('subordinate.self.monthSalary')) {
                        $scope.showLeaveBtn = false;
                        $scope.showOptArea = false;
                    } else {
                        $scope.showLeaveBtn = true;
                        $scope.showOptArea = true;
                    }
                }
                if ($scope.commonInfo.status == statusCode.ABANDED || $scope.commonInfo.status == statusCode.LEAVED || $scope.commonInfo.status == statusCode.TO_JOIN) {
                    $scope.showOptArea = false;
                }
                if ($scope.commonInfo.status == statusCode.LEAVED || $scope.commonInfo.status == statusCode.TO_LEAVE) {
                    $scope.showLeaveBtn = false;
                    $scope.showStructureChangeBtn = false;
                }
                if (!$scope.$root.userInfo.isAgent && $scope.isAgent) {
                    $scope.showOptArea = false;
                }
            }

            /**
             * 试用期变更
             */
            function onChangeProbation() {
                hrOptUtil.changeProbation($scope.number, function (res) {
                    if (res.hadSuccess) {
                        disableAllApplyBtn();
                    }
                });
             }

            /**
             * 试用期工作目标
             */
            function onWriteWorkTarget() {
                hrOptUtil.writeWorkTarget($scope.number, function (res) {
                    if (res.hadSuccess) {
                        disableAllApplyBtn();
                    }
                })
            }

            /**
             *  试用期转正申请
             */
            function onFormalApply() {
                hrOptUtil.formalApply($scope.number, function (res) {
                    if (res.hadSuccess) {
                        disableAllApplyBtn();
                    }
                })
            }

            /**
             * 实习劳务转正
             */
            function onTransFull() {
                hrOptUtil.transFullTime($scope.number, function (res) {
                    if (res.hadSuccess) {
                        disableAllApplyBtn();
                    }
                });
            }

            /**
             * 组织架构变更
             */
            function onChangeStructure() {
                hrOptUtil.changeStructure($scope.number, $scope.isFromHRBP, function (res) {
                    if (res.hadSuccess) {
                        disableAllApplyBtn();
                    }
                });
            }

            /**
             * 工资变更
             */
            function onChangeSalary() {
                hrOptUtil.changeSalary($scope.number, function (res) {
                    if (res.hadSuccess) {
                        disableAllApplyBtn();
                    }
                });
            }

            /**
             * 离职
             */
            function onLeave() {
                hrOptUtil.leave($scope.number, function (res) {
                    if (res.hadSuccess) {
                        disableAllApplyBtn();
                    }
                });
            }

            /**
             * 发起综合审批单
             */
            function onMultiple() {
                hrOptUtil.multipleChange($scope.number, $scope.isFromHRBP, function (res) {
                    if (res.hadSuccess) {
                        disableAllApplyBtn();
                    }
                });
            }

            /**
             * 禁用账号
             */
            function onForbid() {
                var forbid = 1;
                if ($scope.curForbidBtnName == '解冻账号') {
                    forbid = 0;
                }
                confirm('您确认要' + (forbid ? '冻结' : '解冻') + '此账号吗',
                    function () {
                        hrRequest.forbidAccount({
                            forbid: forbid,
                            number: $scope.number
                        }).then(function () {
                            info('操作成功');
                            if (forbid) {
                                $scope.curForbidBtnName = '解冻账号';
                            } else {
                                $scope.curForbidBtnName = '冻结账号';
                            }
                        })
                    }
                );
            }


            /**
             * 申请按钮禁用
             */
            function disableAllApplyBtn() {
                $scope.disableProbationChangeBtn = true;//使用期变更按钮禁用
                $scope.disableTransFullBtn = true;
                $scope.disableStructureChangeBtn = true;
                $scope.disableSalaryChangeBtn = true;
                $scope.disbaleLeaveBtn = true;
                $scope.disbaleMultipleBtn = true;
                $scope.disableWorkTargetBtn = true;
                $scope.disableFormalApplyBtn = true;
            }

            /**
             * 生成工号
             */
            function getJobNumber() {
                $scope.hasGetJobNumber = true;
                hrRequest
                    .getJobNumber(
                        {
                            number: $scope.number
                        }
                    ).then(
                        function (res) {
                            $scope.commonInfo.displayNumber = res.displayNumber;
                        },
                        function () {
                        $scope.hasGetJobNumber = false;
                    });
            }


        }
    ]);
});