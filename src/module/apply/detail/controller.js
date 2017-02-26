/**
 * @file 审批详情
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var applyConfig = require('../config');
    var fieldConfig = require('../fieldNameConfig');
    var filterConfig = require('../fieldFilterConfig');
    app.controller('applyDetailCtrl', applyDetailCtrl);
    applyDetailCtrl.$inject = [
        '$scope', '$state', 'applyRequest',
        'hrRequest', 'applyUtil', '$filter', 'hrUtil', 'adminRequest'
    ];

    function applyDetailCtrl(
        $scope, $state, applyRequest, hrRequest, applyUtil, $filter, hrUtil, adminRequest) {
        var applyId = $state.params.applyId;
        $scope.applyInfo = {};
        $scope.onSubmit = onSubmit;
        $scope.approveResult = applyConfig.STATUS_CODE.TO_EXCUTE;
        $scope.statusCode = applyConfig.STATUS_CODE;
        $scope.title = '';
        $scope.changeList = [];
        $scope.showOptArea = true;
        var socialSecurityCityInfo = {};
        var entry = $state.current.name;

        init();

        /**
         * 初始化
         */
        function init() {
            initSpecialApply();
            getDetail();
        }

        /**
         * 提交
         */
        function onSubmit() {
            var tip = '';
            if ($scope.approveResult == applyConfig.STATUS_CODE.TO_EXCUTE) {
                tip = '确认通过该申请？';
            } else {
                tip = '确认拒绝该申请？';
            }
            confirm(tip, saveProcessResult);
        }

        /**
         * 保存处理结果
         */
        function saveProcessResult() {
            applyRequest.handleApply({
                approveList: [
                    {
                        id: applyId,
                        result: $scope.approveResult,
                        detail: $scope.detail
                    }
                ]
            }).then(function () {
                info('提交成功');
                // 这个是rootScope里面定义的方法
                $scope.refreshApplyNum();
                $scope.showOptArea = false;
                getDetail();
                $('#apply-opt-detail-close', window.parent.document).click();
            });
        }

        /**
         * 初始化不同申请的特殊逻辑
         */
        function initSpecialApply() {
            console.log(entry);
            if (/apply\.detail\.\w*-?staffEnter/g.test(entry)) {
                $scope.title = '新员工入职';
            } else if (/apply\.detail\.\w*-?salary/g.test(entry)) {
                $scope.title = '薪酬岗位调整';
            } else if (/apply\.detail\.\w*-?structure/g.test(entry)) {
                $scope.title = '人事调动';
            } else if (/apply\.detail\.\w*-?multiple/g.test(entry)) {
                $scope.title = '综合审批';
            } else if (/apply\.detail\.\w*-?\w*\.?offerInfo/g.test(entry)) {
                $scope.title = 'offer变更';
            } else if (/apply\.detail\.\w*-?leave/g.test(entry)) {
                $scope.title = '员工离职';
            } else if (/apply\.detail\.\w*-?transFullMember/g.test(entry)) {
                $scope.title = '实习/劳务转正式';
            } else if (/apply\.detail\.\w*-?workTarget/g.test(entry)) {
                $scope.title = '试用期工作目标';
            } else if (/apply\.detail\.\w*-?formalApply/g.test(entry)) {
                $scope.title = '试用期员工转正申请';
            } else if (/apply\.detail\.\w*-?agentEnter/g.test(entry)) {
                $scope.title = '新员工入职';
            } else if (/apply\.detail\.\w*-?agentRejoin/g.test(entry)) {
                $scope.title = '员工再入职';
            } else if (/apply\.detail\.\w*-?agentStructure/g.test(entry)) {
                $scope.title = '人事调动';
            } else if (/apply\.detail\.\w*-?agentLeave/g.test(entry)) {
                $scope.title = '员工离职';
            }
        }

        /**
         * 获取详情
         */
        function getDetail() {
            var applyId = $state.params.applyId;
            applyRequest.getApplyDetail({
                id: applyId
            }).then(function (res) {
                $scope.applyInfo = res.data;
                if (isFromHasHandled()
                    || isFromMyPromoted()
                    || hasHandled()) {
                    $scope.showOptArea = false;
                }
                $scope.number = $scope.applyInfo.number;
                $scope.applyInfo.contentAfter = JSON.parse($scope.applyInfo.contentAfter || '{}');
                $scope.applyInfo.contentBefore = JSON.parse($scope.applyInfo.contentBefore || '{}');
                $scope.contentAfter = $scope.applyInfo.contentAfter;
                if ($scope.contentAfter.reason) {
                    $scope.contentAfter.reasonName = hrUtil.getLeaveReasonName(
                        $scope.contentAfter.reason,
                        $scope.contentAfter.detailReason)
                }


                /*if (entry.indexOf('offerChange.offerInfo') != -1) {
                    $scope.offerInfos = $scope.applyInfo.contentBefore;
                }*/
                if (entry.indexOf('staffEnter') != -1
                    || entry.indexOf('offerChange.offerInfo') != -1
                    || entry.indexOf('agentEnter') != -1
                    || entry.indexOf('agentRejoin') != -1) {
                    $scope.offerInfos = $scope.applyInfo.contentAfter;
                    getStructureStaffInfo();
                }

                if ($scope.offerInfos && $scope.offerInfos.socialSecurityCity) {
                    getSocialSecurityCityInfo($scope.offerInfos.socialSecurityCity);
                }

                initChangeInfo();
            });
        }

        /**
         * 获取人员编制信息
         */
        function getStructureStaffInfo() {
            adminRequest.getStuctureStaffCount({
                structure: $scope.offerInfos.structure
            }).then(function (res) {
                $scope.headCount = res.data;
                if ($scope.userInfo.isAgent) {

                    var strArr = $scope.offerInfos.structureName.split('-');
                    $scope.structureName = strArr[strArr.length - 1];
                    
                    if ($scope.headCount.length < 2) {
                        $scope.agentCount = 0;
                    } else {
                        $scope.agentCount = $scope.headCount[1].regularCount;
                    }
                }
            });

        }

        /**
         * 获取社保缴纳城市信息
         * @param cityId
         */
        function getSocialSecurityCityInfo(cityId) {
            hrRequest.getSocialSecurityCity({
                socialSecurityCity: cityId
            }).then(function (res) {
                socialSecurityCityInfo = res.data[0];
                $scope.needFiveBase = socialSecurityCityInfo.needFiveBase;
            })
        }

        /**
         * 初始变化了的信息
         */
        function initChangeInfo() {
            $scope.changeList = [];
            var applyInfo = $scope.applyInfo;
            var changeList = applyUtil.getChangedValue(
                applyInfo.contentBefore,
                applyInfo.contentAfter
            );
            var nameMap = fieldConfig;
            var filterMap = filterConfig;
            for (var key in changeList) {
                if (changeList.hasOwnProperty(key)) {
                    if (nameMap[key]) {
                        var newVal = changeList[key][1];
                        var oldVal = changeList[key][0];
                        if (filterMap[key]) {
                            var sp = filterMap[key].split(':');
                            var spcopy = $.extend(true, [], sp);
                            var filter = $filter(sp[0]);
                            spcopy[0] = newVal;
                            newVal = filter.apply(undefined, spcopy);
                            spcopy[0] = oldVal;
                            oldVal = filter.apply(undefined, spcopy);
                        }
                        $scope.changeList.push({
                            field: key,
                            newVal: newVal,
                            oldVal: oldVal,
                            fieldName: nameMap[key]
                        });
                    }
                }
            }
        }

        /**
         * 是否是从我的申请进入的
         */
        function isFromHasHandled() {
            var entryType = entry.split('.')[2];
            if (entryType.indexOf('finished-') != -1
                || entryType.indexOf('modalFinished-') != -1
                ) {
                return true;
            }
            return false;
        }

        /**
         * 是已经审批进入的
         */
        function isFromMyPromoted() {
            var entryType = entry.split('.')[2];
            if (entryType.indexOf('my-') != -1
                || entryType.indexOf('modalMy-') != -1
                ) {
                return true;
            }
            return false;
        }

        /**
         * 判断是否已经审批过
         * @returns {boolean}
         */
        function hasHandled() {
            var handleList = $scope.applyInfo.handleList;
            var userName = $scope.userInfo.userName;
            for (var i = 0, item; item = handleList[i++];) {
                if ((userName == item.userName)
                    && (item.status == $scope.statusCode.PASS
                        || item.status == $scope.statusCode.REJECT)) {
                    return true;
                }
            }
            return false;
        }
    }
});