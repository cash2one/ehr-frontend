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

    app.controller('hrOptModFiveInsuranceComCtrl', ['$scope', 'hrRequest',
        '$stateParams', 'localStorage',
        '$state', 'util', '$modalInstance', 'item',
        function (
            $scope, hrRequest, $stateParams, localStorage, $state, util, $modalInstance, item) {
            $scope.endowCom = item.endowCom;
            $scope.unemployCom = item.unemployCom;
            $scope.medicalCom = item.medicalCom;
            $scope.injuryCom = item.injuryCom;
            $scope.maternityCom = item.maternityCom;
            $scope.maternityComSalary = item.maternityComSalary;
            $scope.sumSocialSecurityCom = item.sumSocialSecurityCom;
            var closeParam = {};

            init();

            function init() {
                $scope.save = save;
                $scope.closeHandler = closeHandler;
                $scope.getInputChangeHandler = getInputChangeHandler;
                $scope.inputOptions = getInputOptions('modFiveInsuranceComForm',
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
                    endowCom: $scope.endowCom,
                    unemployCom: $scope.unemployCom,
                    medicalCom: $scope.medicalCom,
                    injuryCom: $scope.injuryCom,
                    maternityCom: $scope.maternityCom,
                    sumSocialSecurityCom: $scope.sumSocialSecurityCom
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
                    var fieldSet = ['endowCom', 'unemployCom',
                        'medicalCom', 'injuryCom', 'maternityCom'];
                    var sum = 0;
                    for (var i = 0, field; field = fieldSet[i++];) {
                        if (field == name) {
                            sum += util.getInputInt(val);
                        } else {
                            sum += util.getInputInt($scope[field]);
                        }
                    }
                    $scope.sumSocialSecurityCom = util.fix(sum);
                }
            }
        }
    ]);
});