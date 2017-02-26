/**
 * @file 试用期员工试用期修改
 * @author wangmeng wangmeng01@baijiahulian.com
 */
define(function(require) {
    var app = require('../../app');
    var getInputOptions = require('./inputOptions');
    var config = require('module/config');
    var applyConfig = require('../../config');
    var codeConfig = require('module/codeConfig');
    var moment = require('moment');
    var closeParam = {};

    app.controller('applyChangeProbation', applyChangeProbation);

    applyChangeProbation.$inject = [
        '$scope', 'applyRequest', 'localStorage',
        '$modalInstance', 'util', 'hrRequest', 'hrUtil'
    ];

    function applyChangeProbation(
        $scope, applyRequest, localStorage, $modalInstance, util, hrRequest, hrUtil) {
        $scope.number = localStorage.get('number');
        $scope.save = onSave;
        $scope.closeHandler = closeHandler;
        $scope.inputOptions = getInputOptions('changeProbationForm', $scope);
        $scope.isChangeProbation = true;

        /**
         * 初始化
         */
        function init() {
            hrRequest.getStaffBaseInfo({
                number: $scope.number
            }).then(function(res) {
                $scope.formalDate = new Date(res.data.formalDate);
                $scope.enterTime = new Date(res.data.enterTime);
                $scope.hasChangedProbation = false;
                //$scope.inputOptions = getInputOptions('changeProbationForm', $scope);
                var startDate = +moment().add(1, 'day').format('YYYYMMDD');
                var maxDate = Math.min(+moment($scope.enterTime).add(6, 'month').format('YYYYMMDD'),
                        +moment().add(15, 'day').format('YYYYMMDD'));
                var minDate = Math.max(startDate,
                        +moment($scope.enterTime).add(3, 'month').format('YYYYMMDD'));

                // 根据转正日期和入职日期的时间间隔，三种范围限定 zhanminsi
                if (+moment($scope.formalDate).format('YYYYMMDD') == +moment($scope.enterTime).add(3, 'month').format('YYYYMMDD')) {
                    $scope.inputOptions.probationEndDate.min = moment($scope.formalDate).add(1, 'day').toDate();
                    $scope.inputOptions.probationEndDate.max = moment($scope.formalDate).add(3, 'month').toDate();
                } else if (+moment($scope.formalDate).format('YYYYMMDD') == +moment($scope.enterTime).add(6, 'month').format('YYYYMMDD')) {
                    $scope.inputOptions.probationEndDate.min = moment(startDate, 'YYYYMMDD').toDate();
                    $scope.inputOptions.probationEndDate.max = moment(maxDate, 'YYYYMMDD').toDate();
                } else {
                    $scope.hasChangedProbation = true;
                    $scope.inputOptions.probationEndDate.min = moment(minDate, 'YYYYMMDD').toDate();
                    $scope.inputOptions.probationEndDate.max = moment($scope.enterTime).add(6, 'month').toDate();
                }
            });
        }

        init();
        /**
         * 保存
         */
        function onSave(form) {
            if (!form.$valid) {
                return;
            }
            var data = {
                probationEndDate: $scope.probationEndDate.getTime()
            };

            var enterDate = +moment($scope.userCommonInfo.enterTime).format('YYYYMMDD'); // 入职日期
            var endDate = +moment($scope.probationEndDate).format('YYYYMMDD');
            if ($scope.hasChangedProbation) {
                var minDate = moment().add(16, 'day');
                var maxDate = moment($scope.userCommonInfo.formalTime);
                // 转正日期不允许在当前日期十六天之后到原转正日期之间 zhanminsi
                if (endDate >= +minDate.format('YYYYMMDD') && endDate <= +maxDate.format('YYYYMMDD')) {
                    alert('试用期的截止日期不能处于' + minDate.format('YYYY/MM/DD') + '到' + maxDate.format('YYYY/MM/DD') + '之间');
                    return;
                }
            }

            doApply(data);
        }

        function doApply(data) {
            var todayDateStr = moment().format('YYYY-MM-DD');
            //执行时间传当天的23:59:59
            var todayTime = new Date(todayDateStr + ' 23:59:59').getTime();
            applyRequest.addApply({
                editedNumber: $scope.userCommonInfo.number,
                type: codeConfig.APPLY_CODE.PROBATION_CHANGE,
                content: data,
                reason: $scope.comments,
                executeDate: todayTime
            }).then(function() {
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