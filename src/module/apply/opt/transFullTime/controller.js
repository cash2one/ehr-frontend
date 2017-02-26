/**
 * @file 新员工入职
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var getInputOptions = require('./inputOptions');
    var config = require('module/config');
    var applyConfig = require('../../config');
    var codeConfig = require('module/codeConfig');
    var closeParam = {};
    var moment = require('moment');

    app.controller('applyOptTransFullTime', applyOptTransFullTime);

    applyOptTransFullTime.$inject = [
        '$scope', 'applyRequest', 'localStorage',
        '$modalInstance', 'util', 'hrRequest', 'hrUtil'
    ];

    function applyOptTransFullTime(
        $scope, applyRequest, localStorage, $modalInstance, util, hrRequest, hrUtil) {
        $scope.number = localStorage.get('number');
        $scope.save = onSave;
        $scope.closeHandler = closeHandler;
        $scope.probationarySalaryChange = onProbationaryChange;
        $scope.inputOptions = getInputOptions('transFullTimeForm', $scope);
        $scope.fiveBaseInitOptions = {
            formName: 'transFullTimeForm',
            required: true
        }
        var defautSalaryType = config.SALARY_TYPE[1].id;
        $scope.baseSalary = {
            selectVal: defautSalaryType
        }
        $scope.probationarySalary = {
            selectVal: defautSalaryType
        }
        var closeParam = {};
        var socialSecurityCityInfo = {};


        init();

        /**
         * 初始化
         */
        function init() {
            $scope.$watch('structure', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    getLevel(newVal.id);
                    getPosition(newVal);
                    if (oldVal && typeof oldVal.id != 'undefined') {
                        $scope.level = undefined;
                        $scope.position = undefined;
                    }
                }
            }, true);

            $scope.$watch('level', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    getPosition(newVal);
                    if (typeof oldVal != 'undefined') {
                        $scope.position = undefined;
                    }
                }
            }, true)
            $scope.$watch('userCommonInfo', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    $scope.structure = {
                        id: newVal.structure,
                        name: newVal.structureName
                    }
                }
            }, true)

            $scope.$watch('positiveDate', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    $scope.inputOptions.formalDate.items = [{id:1,name:moment(newVal).add(3, 'month').format('YYYY/MM/DD')},
                                                            {id:2,name:moment(newVal).add(6, 'month').format('YYYY/MM/DD')}];
                    $scope.formalDate = 2;
                }
            })
            getSocialSecurityCity();
            $scope.trafficSubsidy = {
                selectVal: defautSalaryType
            }
            $scope.mobileSubsidy = {
                selectVal: defautSalaryType
            }
            $scope.$watch('socialSecurityCity', function (newVal, oldVal) {
                if (newVal) {
                    getSocialSecurityCityInfo(newVal);
                } else {
                    socialSecurityCityInfo = {};
                }
            }, true);
        }

        /**
         * 保存
         */
        function onSave(form) {
            if (!$scope.leader) {
                form['leader'].$error.sugguestionRequired = true;
            } else {
                form['leader'].$error.sugguestionRequired = false;
            }
            if (!form.$valid) {
                return;
            }
            var data = {
                internsEndDate: $scope.internsEndDate.getTime(),
                positiveDate: $scope.positiveDate.getTime(),
                //probationary: $scope.probationary,
                formalDate: $scope.formalDate && (new Date($scope.inputOptions.formalDate.items[$scope.formalDate - 1].name)).getTime(),
                structure: $scope.structure.id,
                leader: util.getUsernameFromSuggestion($scope.leader),
                level: $scope.level,
                position: $scope.position,
                salaryType: $scope.salaryType,
                baseSalary: hrUtil.getSalary($scope.baseSalary),
                probationarySalary: hrUtil.getSalary($scope.probationarySalary),
                socialSecurityBase: +$scope.socialSecurityBase,
                houseFundBase: +$scope.houseFundBase,
                trafficSubsidy: hrUtil.getSalary($scope.trafficSubsidy),
                mobileSubsidy: hrUtil.getSalary($scope.mobileSubsidy),
                socialSecurityCity: $scope.socialSecurityCity
            };
            if (socialSecurityCityInfo.needFiveBase) {
                data.endowBase = +$scope.endowBase;
                data.unemployBase = +$scope.unemployBase;
                data.medicalBase = +$scope.medicalBase;
                data.injuryBase = +$scope.injuryBase;
                data.maternityBase = +$scope.maternityBase;
            }
            if (!util.validateLast7Day('实习/劳务截止日期', data.internsEndDate)) {
                return;
            }
            if (data.internsEndDate >= data.positiveDate) {
                alert('实习/劳务截止日期要早于转正日期');
                return;
            }
            if (!util.validateLast7Day('转正日期', data.positiveDate)) {
                return;
            }
            if (!util.validateSocialAndHouseFundBase(data, socialSecurityCityInfo)) {
                return;
            }
            if (util.diffDaysFromNow($scope.positiveDate, 'days')
                < applyConfig.EXECUTE_TIP_DAYS) {
                confirm(applyConfig.TRANSFULL_EXECUTE_TIP, function () {
                    doApply(data);
                })
            } else {
                doApply(data);
            }
        }

        function doApply(data) {
            applyRequest.addApply({
                editedNumber: $scope.userCommonInfo.number,
                type: codeConfig.APPLY_CODE.TRANS_FULL_MEMBER,
                content: data,
                reason: $scope.reason,
                executeDate: data.positiveDate
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

        /**
         * 查询等级
         */
        function getLevel(value) {
            if (value) {
                hrRequest.getLevel({
                    structure: value
                }).then(function (res) {
                    for (var i = 0, item; item = res.data[i++];) {
                        item.id = item.name;
                    }
                    res.data.unshift(config.EMPTY);
                    $scope.inputOptions.level.items = res.data;
                })
            } else {
                $scope.inputOptions.level.items = [];
                $scope.inputOptions.position.items = [];
            }
        };

        /**
         * 查询职位
         */
        function getPosition(value) {
            if (value) {
                hrRequest.getPosition({
                    structure: $scope.structure.id,
                    level: $scope.level
                }).then(function (res) {
                    res.data.unshift(config.EMPTY);
                    $scope.inputOptions.position.items = res.data;
                })
            } else {
                $scope.inputOptions.position.items = [];
            }
        };

        /**
         * 查社保缴纳城市
         */
        function getSocialSecurityCity() {
            hrRequest.getSocialSecurityCity().then(function (res) {
                res.data.unshift(config.EMPTY);
                $scope.inputOptions.socialSecurityCity.items = res.data;
            })
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
                util.setDefaultSocialBase({}, socialSecurityCityInfo, $scope);
                util.setDefaultHouseBase({}, socialSecurityCityInfo, $scope);
            })
        }

        /**
         * 工资输入变化
         */
        function onProbationaryChange(val) {
            util.setDefaultSocialBase({
                salary: val
            }, socialSecurityCityInfo, $scope);
            util.setDefaultHouseBase({
                salary: val
            }, socialSecurityCityInfo, $scope);
        }
    }
});