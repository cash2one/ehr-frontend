/**
 * @file 试用期工作目标
 * @author Minsi Zhan zhanminsi@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var getInputOption = require('./inputOptions');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var applyConfig = require('../../config');
    var moment = require('moment');
    var closeParam = {};

    app.controller('applyOptWorkTargetCtrl', applyOptWorkTargetCtrl);

    applyOptWorkTargetCtrl.$inject = [
        '$scope', 'applyRequest', 'localStorage',
        '$modalInstance', 'util', 'hrRequest', 'hrUtil'
    ];

    function applyOptWorkTargetCtrl($scope, applyRequest, localStorage, $modalInstance, util, hrRequest, hrUtil) {
        $scope.number = localStorage.get('number');
        $scope.save = onSave;
        $scope.closeHandler = closeHandler;
        $scope.inputOptions = getInputOption('workTargetForm', $scope);
        var closeParam = {};

        function onSave(form) {
            if (!form.$valid || !$scope.isReadStaffManual) {
                return;
            }
            else {
                confirm(applyConfig.WORK_TARGET_EXECUTE_TIP, function() {
                    doApply();
                })
            }

        }

        function doApply() {
            var todayDateStr = moment().format('YYYY-MM-DD');
            //执行时间传当天的23:59:59
            var todayTime = new Date(todayDateStr + ' 23:59:59').getTime();
            var data = {
                workTarget: $scope.detail.replace(/\n/g, "<br>").replace(/[ ]/g, "&nbsp;")
            }
            var executeDate = moment().format('dddd');
            applyRequest.addApply({
                editedNumber: $scope.userCommonInfo.number,
                type: codeConfig.APPLY_CODE.WORK_TARGET,
                content: data,
                executeDate: todayTime
            }).then(function () {
                alert(applyConfig.SUCCESS_TIP);
                closeParam.hadSuccess = true;
                $modalInstance.dismiss(closeParam);
            });
        }

        function closeHandler() {
            $modalInstance.dismiss(closeParam);
        }
    }
})