/**
 * @file 员工离职
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var getInputOptions = require('./inputOptions');
    var config = require('module/config');
    var applyConfig = require('../../config');
    var codeConfig = require('module/codeConfig');
    var moment = require('moment');
    var closeParam = {};

    app.controller('applyOptLeaveCtrl', applyOptLeaveCtrl);

    applyOptLeaveCtrl.$inject = [
        '$scope', 'applyRequest', 'localStorage',
        '$modalInstance', 'util', 'hrRequest', 'hrUtil'
    ];

    function applyOptLeaveCtrl(
        $scope, applyRequest, localStorage, $modalInstance, util, hrRequest, hrUtil) {
        $scope.number = localStorage.get('number');
        $scope.save = onSave;
        $scope.closeHandler = closeHandler;
        $scope.inputOptions = getInputOptions('leaveForm', $scope);
        var closeParam = {};

        init();

        /**
         * 初始化
         */
        function init() {

        }

        /**
         * 保存
         */
        function onSave(form) {
            if (!form.$valid) {
                return;
            }
            if (util.diffDaysFromNow($scope.leaveDate, 'days')
                < applyConfig.EXECUTE_TIP_DAYS) {
                confirm(applyConfig.LEAVE_EXECUTE_TIP, function () {
                    doApply();
                })
            } else {
                doApply();
            }
        }

        function doApply() {
            var reasonSplit = $scope.reason.split('-');
            var todayDateStr = moment().format('YYYY-MM-DD');
            var todayTime = new Date(
                    todayDateStr + " 00:00:00"
            ).getTime();
            var leaveTime = $scope.leaveDate.getTime();
            // 如果选是当天，传23：59：59
            if (todayTime == leaveTime) {
                leaveTime = moment(todayDateStr)
                    .add(1, 'days').valueOf() - 1000;
            }

            var data = {
                number: $scope.number,
                reason: +reasonSplit[0],
                detailReason: +reasonSplit[1],
                detail: $scope.detail,
                leaveDate: leaveTime
            };
            /*            if (!util.validateLast7Day('离职时间', data.leaveDate)) {
             return;
             }*/
            var applyType = codeConfig.APPLY_CODE.LEAVE;
            if ($scope.isAgent) {
                applyType = codeConfig.APPLY_CODE.AGENT_LEAVE;
            }
            applyRequest.addApply({
                editedNumber: $scope.userCommonInfo.number,
                type: applyType,
                content: data,
                executeDate: data.leaveDate
            }).then(function () {
                alert(applyConfig.SUCCESS_TIP);
                closeParam.hadSuccess = true;
                $modalInstance.dismiss(closeParam);
            });
        }

        /**
         * 关闭函数
         */
        function closeHandler() {
            $modalInstance.dismiss(closeParam);
        }
    }
});