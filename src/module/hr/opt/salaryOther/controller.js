/**
 * @file 修改手机号
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var getInputOptions = require('./inputOptions');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var closeParam = {};

    app.controller('hrOptSalaryOtherCtrl', ['$scope', 'hrRequest', '$stateParams', 'localStorage',
        '$state', 'util', '$modalInstance', 'item',
        function (
            $scope, hrRequest, $stateParams, localStorage, $state, util, $modalInstance, item) {
            $scope.mealPlus = item.mealPlus;
            $scope.recommend = item.recommend;
            $scope.houseSubsidy = item.houseSubsidy;
            $scope.specialReward = item.specialReward;
            $scope.performExtSalary = item.performExtSalary;
            $scope.otherSubsidy = item.otherSubsidy;
            $scope.otherSalary = item.otherSalary;
            $scope.isSpecialRewardShow = false;
            var closeParam = {};

            init();

            function init() {
                $scope.save = save;
                $scope.closeHandler = closeHandler;
                $scope.getInputChangeHandler = getInputChangeHandler;
                $scope.inputOptions = getInputOptions('modSalaryOtherForm', $scope, util);
            }

            /**
             * 确认
             */
            function save(form) {
                if (!form.$valid) {
                    return;
                }
                closeParam.hasSuccess = true;
                closeParam.item = {
                    mealPlus: $scope.mealPlus,
                    recommend: $scope.recommend,
                    houseSubsidy: $scope.houseSubsidy,
                    specialReward: $scope.specialReward,
                    performExtSalary: $scope.performExtSalary,
                    otherSubsidy: $scope.otherSubsidy,
                    otherSalary: $scope.otherSalary
                };
                $modalInstance.dismiss(closeParam);
            };


            /**
             * 关闭modal
             */
            function closeHandler() {
                $modalInstance.dismiss(closeParam);
            }

            /**
             * 输入变化
             */
            function getInputChangeHandler(name) {
                return function onInputChange(val) {
                    var fieldSet = ['mealPlus', 'recommend', 'houseSubsidy', 'performExtSalary', 'otherSubsidy'];
                    var sum = 0;
                    for (var i = 0, field; field = fieldSet[i++];) {
                        if (field == name) {
                            sum += util.getInputInt(val);
                        } else {
                            sum += util.getInputInt($scope[field]);
                        }
                    }
                    $scope.otherSalary = util.fix(sum);
                }
            }
        }
    ]);
});