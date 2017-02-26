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
    var typeCode = codeConfig.TYPE_CODE;
    var closeParam = {};
    var moment = require('moment');

    app.controller('applyOptChangeSalaryCtrl', applyOptChangeStructure);

    applyOptChangeStructure.$inject = ['$scope', 'applyRequest', 'localStorage', '$modalInstance', 'util', 'hrRequest', 'hrUtil'];

    function applyOptChangeStructure($scope, applyRequest, localStorage, $modalInstance, util, hrRequest, hrUtil) {
        $scope.number = localStorage.get('number');
        $scope.save = onSave;
        $scope.closeHandler = closeHandler;
        $scope.inputOptions = getInputOptions('changeSalaryForm', $scope);
        $scope.onGetUserCommonInfo = onGetUserCommonInfo;
        var socialSecurityCityInfo = {};
        var defautSalaryType = config.SALARY_TYPE[1].id;
        $scope.baseSalary = {
            selectVal: defautSalaryType
        };
        $scope.probationarySalary = {
            selectVal: defautSalaryType
        };
        $scope.mobileSubsidy = {
            selectVal: defautSalaryType
        };
        $scope.trafficSubsidy = {
            selectVal: defautSalaryType
        };
        $scope.canModProbationarySalary = true;

        var closeParam = {};


        init();

        /**
         * 初始化
         */
        function init() {
            getWorkInfo();
            getSalaryInfo();
            $scope.formName = 'changeSalaryForm';
            $scope.fiveBaseInitOptions = {
                formName: 'changeSalaryForm',
                required: false,
                fieldName: '调整为'
            }
            $scope.$watch('level', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    getPosition(newVal);
                    if (typeof oldVal != 'undefined') {
                        $scope.position = undefined;
                    }
                }
            }, true)
        }

        /**
         * user信息获取完了的回调
         */
        function onGetUserCommonInfo() {
            var type = $scope.userCommonInfo.type;
            if (type == typeCode.INTERNS
                || type == typeCode.LABOR) {
                util.forbidFieldOfLabor($scope.inputOptions, true, $scope);
                util.forbidFieldOfLabor($scope.fiveBaseOptions, true, $scope);
            }
            var isProbationary = $scope.userCommonInfo.isProbationary;
            if (!isProbationary) {
                $scope.canModProbationarySalary = false;
            }
        }

        /**
         * 保存
         */
        function onSave(form) {
            if (!form.$valid) {
                return;
            }
            function normalFieldNotChange() {
                return (!$scope.level)
                    && (!$scope.position)
                    && (typeof $scope.baseSalary.inputVal == 'undefined')
                    && (typeof $scope.probationarySalary.inputVal == 'undefined')
                    && (typeof $scope.mobileSubsidy.inputVal == 'undefined')
                    && (typeof $scope.trafficSubsidy.inputVal == 'undefined')
                    && (!$scope.salaryType)
                    && (!$scope.socialSecurityBase)
                    && (!$scope.houseFundBase);
            }

            function fiveBaseNotChange() {
                if (socialSecurityCityInfo && socialSecurityCityInfo.needFiveBase) {
                    return !$scope.endowBase
                        && (!$scope.unemployBase)
                        && (!$scope.medicalBase)
                        && (!$scope.injuryBase)
                        && (!$scope.maternityBase)
                }
                return true;
            }

            if (normalFieldNotChange() && fiveBaseNotChange()) {
                alert('请输入至少一项变更');
                return;
            }
            if (!validateRelateChange()) {
                return;
            }
            var nowMonth = new Date().getMonth();
            var executeMonth = $scope.executeDate.getMonth();
            var workInfo = $scope.workInfo;
            var data = {
                level: $scope.level || workInfo.level,
                position: $scope.position || workInfo.position,
                salaryType: $scope.salaryType || $scope.salaryInfo.salaryType,
                socialSecurityBase: util.inputEmpty($scope.socialSecurityBase)
                    ? $scope.salaryInfo.socialSecurityBase : +$scope.socialSecurityBase,
                houseFundBase: util.inputEmpty($scope.houseFundBase)
                    ? $scope.salaryInfo.houseFundBase : +$scope.houseFundBase
            };

            if (socialSecurityCityInfo.needFiveBase) {
                addVal(data, 'endowBase');
                addVal(data, 'unemployBase');
                addVal(data, 'medicalBase');
                addVal(data, 'injuryBase');
                addVal(data, 'maternityBase');
            }
            if (!util.validateSocialAndHouseFundBase(data, socialSecurityCityInfo)) {
                return;
            }
            addSalaryToRequestData(data, 'baseSalary');
            addSalaryToRequestData(data, 'probationarySalary');
            addSalaryToRequestData(data, 'mobileSubsidy');
            addSalaryToRequestData(data, 'trafficSubsidy');
            // 不是当前月需要1号生效
            /*            if (nowMonth != executeMonth && $scope.executeDate.getDate() != 1) {
             alert('请指定生效日期为某月1号生效');
             return;
             }*/
            if (util.diffDaysFromNow($scope.executeDate, 'days')
                < applyConfig.EXECUTE_TIP_DAYS) {
                confirm(applyConfig.EXECUTE_TIP, function () {
                    doApply(data);
                })
            } else {
                doApply(data);
            }
        }

        function doApply(data) {
            var todayDateStr = moment().format('YYYY-MM-DD');
            var todayTime = new Date(
                    todayDateStr + " 00:00:00"
            ).getTime();
            var executeTime = $scope.executeDate.getTime();

            // 如果选是当天，传23：59：59
            if (todayTime == executeTime) {
                executeTime = moment(todayDateStr)
                    .add(1, 'days').valueOf() - 1000;
            }
            applyRequest.addApply({
                editedNumber: $scope.userCommonInfo.number,
                type: codeConfig.APPLY_CODE.SALARY_INFO,
                content: data,
                reason: $scope.reason,
                executeDate: executeTime
            }).then(function () {
                var nowMonth = new Date().getMonth();
                var executeMonth = $scope.executeDate.getMonth();
                alert(applyConfig.SUCCESS_TIP + '审批通过后将从' + (executeMonth + 1) + '月1日生效');
                closeParam.hadSuccess = true;
                $modalInstance.dismiss(closeParam);
            });
        }

        /**
         * 检查是否符合关联修改的要求
         * @returns {boolean}
         */
        function validateRelateChange() {
            if ($scope.level && !$scope.position) {
                alert('等级调整请一起调整职位名称');
                return false;
            }
            return true;
        }

        /**
         * 添加工资参数
         */
        function addSalaryToRequestData(data, field) {
            if (typeof $scope[field].inputVal != 'undefined') {
                data[field] = hrUtil.getSalary($scope[field]);
            } else {
                data[field] = $scope.salaryInfo[field] || {};
            }
        }

        /**
         * 岗位信息
         */
        function getWorkInfo() {
            hrRequest.getStaffWorkInfo({number: $scope.number}).then(function (res) {
                $scope.workInfo = res.data;
                var structure = $scope.workInfo.structure;
                getLevel(structure);
                if ($scope.workInfo.socialSecurityCity) {
                    getSocialSecurityCityInfo($scope.workInfo.socialSecurityCity);
                }
            });
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
            })
        }

        /**
         * 取工资信息
         */
        function getSalaryInfo() {
            hrRequest.getStaffSalaryInfo({number: $scope.number}).then(function (res) {
                $scope.salaryInfo = res.data;
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
                    structure: $scope.workInfo.structure
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

        function addVal(data, field) {
            data[field] = util.inputEmpty($scope[field])
                ? $scope.salaryInfo[field] : +$scope[field];
        }

        /**
         * 查询职位
         */
        function getPosition(value) {
            if (value) {
                hrRequest.getPosition({
                    structure: $scope.workInfo.structure,
                    level: $scope.level
                }).then(function (res) {
                    res.data.unshift(config.EMPTY);
                    $scope.inputOptions.position.items = res.data;
                })
            } else {
                $scope.inputOptions.position.items = [];
            }
        };
    }
});