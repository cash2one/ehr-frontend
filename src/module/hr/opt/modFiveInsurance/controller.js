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

    app.controller('hrOptModFiveInsuranceCtrl', ['$scope', 'hrRequest',
        '$stateParams', 'localStorage',
        '$state', 'util', '$modalInstance', 'item',
        function (
            $scope, hrRequest, $stateParams, localStorage, $state, util, $modalInstance, item) {
            $scope.endowPer = item.endowPer;
            $scope.unemployPer = item.unemployPer;
            $scope.medicalPer = item.medicalPer;
            $scope.injuryPer = item.injuryPer;
            $scope.maternityPer = item.maternityPer;
            $scope.maternityPerSalary = item.maternityPerSalary;
            $scope.sumSocialSecurityPer = item.sumSocialSecurityPer;
            var closeParam = {};

            init();

            function init() {
                $scope.save = save;
                $scope.closeHandler = closeHandler;
                $scope.getInputChangeHandler = getInputChangeHandler;
                $scope.inputOptions = getInputOptions('modFiveInsuranceForm',
                    $scope, util);
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
                    endowPer: $scope.endowPer,
                    unemployPer: $scope.unemployPer,
                    medicalPer: $scope.medicalPer,
                    injuryPer: $scope.injuryPer,
                    maternityPer: $scope.maternityPer,
                    sumSocialSecurityPer: $scope.sumSocialSecurityPer
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
                    var fieldSet = ['endowPer', 'unemployPer',
                        'medicalPer', 'injuryPer', 'maternityPer'];
                    var sum = 0;
                    for (var i = 0, field; field = fieldSet[i++];) {
                        if (field == name) {
                            sum += util.getInputInt(val);
                        } else {
                            sum += util.getInputInt($scope[field]);
                        }
                    }
                    $scope.sumSocialSecurityPer = util.fix(sum);
                }
            }
        }
    ]);
});