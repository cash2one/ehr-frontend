/**
 * @file  试用期转正申请
 * @author  Minsi Zhan zhanminsi@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var getInputOption = require('./inputOptions');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var applyConfig = require('../../config');
    var moment = require('moment');
    var closeParam = {};

    app.controller('applyOptFormalApplyCtrl', applyOptFormalApplyCtrl);
    applyOptFormalApplyCtrl.$inject = [
        '$scope', 'applyRequest', 'localStorage',
        '$modalInstance', 'util', 'hrRequest', 'hrUtil'
    ];

    function applyOptFormalApplyCtrl($scope, applyRequest, localStorage, $modalInstance, util, hrRequest, hrUtil) {
        $scope.number = localStorage.get('number');
        $scope.save = onSave;
        $scope.closeHandler = closeHandler;
        $scope.inputOptions = getInputOption('formalApplyForm', $scope);
        var closeParam = {};
        function init() {
            hrRequest.getWorkTarget({
                number: $scope.number
            }).then(
                function (res) {
                    $scope.workTarget = res.data.workTarget;
                }
            )
        }

        init();

        function onSave(form) {
            if(!form.$valid) {
                return;
            } else {
                 confirm(applyConfig.FORMAL_APPLY_EXECUTE_TIP, function() {
                    doApply();
                })
            }
        }

        function doApply() {
            var todayDateStr = moment().format('YYYY-MM-DD');
            //执行时间传当天的23:59:59
            var todayTime = new Date(todayDateStr + ' 23:59:59').getTime();
            var data = {
                formalApply: $scope.detail.replace(/\n/g, "<br>").replace(/[ ]/g, "&nbsp;")
            }
            var executeDate = moment().format('dddd');
            applyRequest.addApply({
                editedNumber: $scope.userCommonInfo.number,
                type: codeConfig.APPLY_CODE.FORMAL_APPLY,
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