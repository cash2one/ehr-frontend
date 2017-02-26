/**
 * @file input的配置
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var getInputOptions = require('./options');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var statusCode = codeConfig.STAFF_STATUS_CODE;

    app.controller('hrDimissionCtrl', ['$scope', 'hrRequest', '$stateParams', 'localStorage', 'hrUtil',
        function ($scope, hrRequest, $stateParams, localStorage, hrUtil) {
            $scope.number = localStorage.get('number');
            var formName = 'leaveJobForm';
            $scope.inputOptions = getInputOptions(formName);

            /**
             * 点击确定
             * @param {Object} form
             * @param {string}  optType 操作类型
             */
            $scope.ok = function (form) {
                if (!form.$valid) {
                    return;
                }
                var reasonSplit = $scope.reason.split('-');
                var data = {
                    number: $scope.number,
                    // 自然信息
                    leaveSignBill: $scope.leaveSignBill,
                    leaveDate: $scope.leaveDate.getTime()
                }
                if ($scope.reasonFromHr) {
                    var split = $scope.reasonFromHr.split('-');
                    data.reasonFromHr = split[0];
                    data.detailReasonFromHr = split[1];
                }

                hrRequest.leaveJob(data).then(function (res) {
                    info('操作成功');
                    $scope.commonInfo.status = statusCode.LEAVED;
                });
            };

            /**
             *  disable输入框
             */
            $scope.disbaleLeaveInput = function () {
                hrUtil.disableOptions($scope.inputOptions);
            };

            /**
             * 查询离职信息
             */
            $scope.getLeaveInfo = function () {
                hrRequest.getLeaveInfo({
                    number: $scope.number
                }).then(function (res) {
                    // 没有离职的话res.data为Null
                    if (res.data) {
                        var data = res.data;
                        $.extend(true, $scope, data);
                        $scope.leaveDate = data.leaveDate && new Date(data.leaveDate);
                        $scope.leaveDetail = data.detail;
                        if (data.reason) {
                            $scope.reason = hrUtil.getLeaveReasonName(
                                data.reason, data.detailReason);
                        }
                        if (data.reasonFromHr) {
                            $scope.reasonFromHr = data.reasonFromHr + '-'
                                + data.detailReasonFromHr;
                            $scope.inputOptions.reasonFromHr.displayValue =
                                hrUtil.getLeaveReasonName(
                                    data.reasonFromHr, data.detailReasonFromHr);
                        }
                        $scope.inputOptions.leaveSignBill.fileUrl = data.leaveSignBillFile;
                    }
                });
            }

            init();

            function init() {
                $scope.canEditLeaveInfo = false;
                hrUtil.initEntryHRType($scope);
                if ($scope.isFromRelationshipHR) {
                    $scope.canEditLeaveInfo = true;
                }
                if (!$scope.canEditLeaveInfo) {
                    $scope.disbaleLeaveInput();
                }
                $scope.getLeaveInfo();
            }

        }
    ]);
});