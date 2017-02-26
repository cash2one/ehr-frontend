/**
 * @file 新员工入职
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var nameConfig = require('module/nameConfig');
    app.controller('hrSalaryInfoCtrl', ['$scope', 'hrRequest', '$stateParams', 'localStorage', '$state', 'authUtil', 'hrUtil', 'adminRequest', 'util',
        function ($scope, hrRequest, $stateParams, localStorage, $state, authUtil, hrUtil, adminRequest, util) {
            $scope.number = localStorage.get('number');
            var socialSecurityCityInfo = {};
            var getOptions = require('./options');
            $scope.canEditSalaryInfo = false;
            $scope.isReadOnly = true;

            /**
             * 入口
             * @type {string}
             */
            $scope.entryName = $state.current.name;
            $scope.options = getOptions('salaryInfoForm', $scope);
            /**
             * 薪酬信息
             */
            $scope.getSalaryInfo = function () {
                $scope.isProbationary = $scope.commonInfo.isProbationary;
                hrRequest.getStaffSalaryInfo({
                    number: $scope.number
                }).then(function (res) {
                    $.extend(true, $scope, res.data);
                    $scope.welfareOri = $scope.welfareSalary;
                    if ($scope.mealSubsidyToMealCard) {
                        if (!$scope.mealSalaryMethod) {
                            $scope.mealSalaryMethod = codeConfig.MEAL_SALARY_METHOD.MEALCARD;
                        }
                    }
                    if ($scope.isProbationary) {
                        $scope.maxWelfareSalary = getMaxWelfareSalary($scope.probationarySalary.value);
                    } else {
                        $scope.maxWelfareSalary = getMaxWelfareSalary($scope.baseSalary.value);
                    }
                })
            };
            /**
             * 岗位信息
             */
            $scope.getWorkInfo = function () {
                hrRequest.getStaffWorkInfo({
                    number: $scope.number
                }).then(function (res) {
                    $.extend(true, $scope, res.data);
                    getSocialSecurityCityInfo($scope.socialSecurityCity);
                    getKeyNodeInfo();
                })
            };

            /**
             * 编辑
             */
            $scope.onEdit = function () {
                if ($scope.isFromSalaryHR) {
                    $scope.options['welfareSalary'].disable = false;
                } else if ($scope.isFromSelf) {
                    $scope.options['mealSalaryMethod'].disable = false;
                }
                $scope.isReadOnly = false;
            }

            /**
             * 禁止信息的修改
             */
            $scope.disbaleSalaryInput = function () {
                hrUtil.disableOptions($scope.options);
            };

            /**
             * 保存信息
             * @param form
             */
            $scope.saveSalaryInfo = function (form) {
                if (!form.$valid) {
                    return;
                }
                var data = {
                    number: $scope.number,
                    welfareSalary: +$scope.welfareSalary
                };

                if (+$scope.welfareSalary > $scope.maxWelfareSalary) {
                    alert('职位福利费必须小于上限' + $scope.maxWelfareSalary);
                    return;
                }
                var request = hrRequest.saveSalaryInfo;
                if ($scope.isFromSelf) {
                    request = hrRequest.changeMealSalaryMethod;
                    data = {
                        method: $scope.mealSalaryMethod
                    }
                }
                request(data).then(function () {
                    info('保存成功');
                    $scope.isReadOnly = true;
                    $scope.disbaleSalaryInput();
                    $scope.getSalaryInfo();
                });
            };

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
                });
            }

            function init() {
                $scope.getSalaryInfo();
                $scope.getWorkInfo();
                hrUtil.initEntryHRType($scope);
                if ($scope.isFromSalaryHR) {
                    $scope.canEditSalaryInfo = true;
                }
            }

            /**
             * 计算福利工资上线
             */
            function getMaxWelfareSalary(value) {
                if (value < 15000) {
                    return 0;
                }
                return value;
                /*
                 if (value < 20000) {
                 return 5000;
                 }
                 if (value < 25000) {
                 return 10000;
                 }
                 return 15000;*/

            }

            /**
             * 获取结算结点信息
             */
            function getKeyNodeInfo() {
                adminRequest.getKeyNodeInfo({
                    structure: $scope.structure
                }).then(function (res) {
                    var punchCard = res.data.punchCard;
                    if (punchCard == codeConfig.PUNCH_CARD.NEED_SUBSIDY_NOT_BY_SALARY) {
                        $scope.mealSubsidyToMealCard = true;
                        if (!$scope.mealSalaryMethod) {
                            $scope.mealSalaryMethod = codeConfig.MEAL_SALARY_METHOD.MEALCARD;
                        }
                    } else {
                        $scope.mealSubsidyToMealCard = false;
                    }
                })
            }

            init();
        }
    ]);
});