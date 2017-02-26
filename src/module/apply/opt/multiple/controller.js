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

        app.controller('applyOptMultipleCtrl', applyOptChangeMultiple);

        applyOptChangeMultiple.$inject = ['$rootScope', '$scope', 'applyRequest', 'localStorage', '$modalInstance', 'util', 'hrRequest', 'hrUtil',
            'isFromHRBP'];

        function applyOptChangeMultiple($rootScope, $scope, applyRequest, localStorage, $modalInstance, util, hrRequest, hrUtil, isFromHRBP) {
            $scope.number = localStorage.get('number');
            $scope.save = onSave;
            $scope.closeHandler = closeHandler;
            $scope.probationarySalaryChange = onProbationaryChange;
            $scope.inputOptions = getInputOptions('changeMultipleForm', $scope);
            $scope.canModProbationarySalary = true;

            $scope.onGetUserCommonInfo = onGetUserCommonInfo;
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
            $scope.fiveBaseInitOptions = {
                formName: 'changeMultipleForm',
                required: false,
                fieldName: '调整为'
            }
            var closeParam = {};
            var socialSecurityCityInfo = {};


            init();

            /**
             * 初始化
             */
            function init() {
                getWorkInfo();
                getSalaryInfo();
                getContractCompany();
                getOffice();
                getSocialSecurityCity();

                $scope.$watch('structure.id', function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        getLevel(newVal);
                        if (typeof oldVal != 'undefined') {
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
                }, true);
                $scope.$watch('socialSecurityCity', function (newVal, oldVal) {
                    if (newVal) {
                        getSocialSecurityCityInfo(newVal);
                    } else {
                        socialSecurityCityInfo = {};
                    }
                }, true);
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
                    if ($scope.probationarySalary.inputVal) {
                        util.setDefaultSocialBase({}, socialSecurityCityInfo, $scope);
                        util.setDefaultHouseBase({}, socialSecurityCityInfo, $scope);
                    }
                })
            }

            /**
             * 工资输入变化
             */
            function onProbationaryChange(val) {

                var type = $scope.userCommonInfo.type;
                if (type == typeCode.INTERNS
                    || type == typeCode.LABOR) {
                    return;
                }
                util.setDefaultSocialBase({
                    salary: val
                }, socialSecurityCityInfo, $scope);
                util.setDefaultHouseBase({
                    salary: val
                }, socialSecurityCityInfo, $scope);
            }


            /**
             * 没有数据变化
             */
            function isNothingChange() {
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

                return !($scope.structure && $scope.structure.id)
                    && (!$scope.leader)
                    && (!$scope.level)
                    && (!$scope.position)
                    && (!$scope.office)
                    && (!$scope.contractCompany)
                    && (!$scope.socialSecurityCity)
                    && (typeof $scope.baseSalary.inputVal == 'undefined')
                    && (typeof $scope.probationarySalary.inputVal == 'undefined')
                    && (typeof $scope.mobileSubsidy.inputVal == 'undefined')
                    && (typeof $scope.trafficSubsidy.inputVal == 'undefined')
                    && (!$scope.salaryType)
                    && (!$scope.socialSecurityBase)
                    && (!$scope.houseFundBase)
                    && !($scope.structure && $scope.structure.id)
                    && (!$scope.leader)
                    && fiveBaseNotChange()
            }

            /**
             * 保存
             */
            function onSave(form) {
                if (!form.$valid) {
                    return;
                }
                if (isNothingChange()) {
                    alert('请输入至少一项变更');
                    return;
                }
                if (!validateRelateChange()) {
                    return;
                }
                var workInfo = $scope.workInfo;
                var data = {
                    structure: ($scope.structure && $scope.structure.id) || workInfo.structure,
                    leader: util.getUsernameFromSuggestion($scope.leader) || workInfo.leader,
                    level: $scope.level || workInfo.level,
                    position: $scope.position || workInfo.position,
                    office: $scope.office || workInfo.office,
                    contractCompany: $scope.contractCompany || workInfo.contractCompany,
                    socialSecurityCity: $scope.socialSecurityCity || workInfo.socialSecurityCity,
                    salaryType: $scope.salaryType || $scope.salaryInfo.salaryType,
                    socialSecurityBase: util.inputEmpty($scope.socialSecurityBase) ? $scope.salaryInfo.socialSecurityBase : +$scope.socialSecurityBase,
                    houseFundBase: util.inputEmpty($scope.houseFundBase) ? $scope.salaryInfo.houseFundBase : +$scope.houseFundBase
                };

                function addVal(data, field) {
                    data[field] = util.inputEmpty($scope[field])
                        ? $scope.salaryInfo[field] : +$scope[field];
                }

                if (socialSecurityCityInfo.needFiveBase) {
                    if (socialSecurityCityInfo.needFiveBase) {
                        addVal(data, 'endowBase');
                        addVal(data, 'unemployBase');
                        addVal(data, 'medicalBase');
                        addVal(data, 'injuryBase');
                        addVal(data, 'maternityBase');
                    }
                }
                if (!util.validateSocialAndHouseFundBase(data, socialSecurityCityInfo)) {
                    return;
                }
                addSalaryToRequestData(data, 'baseSalary');
                addSalaryToRequestData(data, 'probationarySalary');
                addSalaryToRequestData(data, 'mobileSubsidy');
                addSalaryToRequestData(data, 'trafficSubsidy');
                /*                if (hasExcuteNextMonthField($scope)) {
                 var nowMonth = new Date().getMonth();
                 var executeMonth = $scope.executeDate.getMonth();
                 // 不是当前月需要1号生效
                 if (nowMonth != executeMonth && $scope.executeDate.getDate() != 1) {
                 alert('社保缴纳城市、基本工资、社保缴纳基数、' +
                 '公积金缴纳基数、通讯补贴、交通补贴、工资类型修改' +
                 '必须指定生效日期为某月1号生效');
                 return;
                 }
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
                    type: codeConfig.APPLY_CODE.MULTIPLE,
                    content: data,
                    reason: $scope.reason,
                    executeDate: $scope.executeDate.getTime()
                }).then(function () {
                    var nowMonth = new Date().getMonth();
                    var executeMonth = $scope.executeDate.getMonth();
                    if (hasExcuteNextMonthField($scope)) {
                        alert(applyConfig.SUCCESS_TIP + '审批通过后将从' + ( executeMonth + 1) + '月1日生效');
                    } else {
                        alert(applyConfig.SUCCESS_TIP);
                    }
                    closeParam.hadSuccess = true;
                    $modalInstance.dismiss(closeParam);
                });
            }

            /**
             * 检查是否符合关联修改的要求
             * @returns {boolean}
             */
            function validateRelateChange() {
                if ($scope.structure && $scope.structure.id) {
                    var newStructure = util.getParentKeyNodeItem(
                        $rootScope.structureData,
                        $scope.structure.id);
                    var oldStructure = util.getParentKeyNodeItem(
                        $rootScope.structureData,
                        $scope.workInfo.structure);

                    var parentIds = [];
                    parentIds.push($scope.workInfo.structure);
                    var parentId = util.getParentIds($rootScope.structureData,
                        $scope.workInfo.structure);
                    while (parentId) {
                        parentIds.push(parentId);
                        parentId = util.getParentIds($rootScope.structureData,
                        parentId);
                    }

                    var isHRBP = false;
                    if ($scope.userInfo.hasRoles.businessPartnerHR &&
                        !!$scope.userInfo.hasRoles.businessPartnerHR) {
                        for (var i = 0, item; item = $scope.userInfo.hasRoles.businessPartnerHR[i++];) {
                            if (parentIds.indexOf(item) != -1) {
                                isHRBP = true;
                                break;
                            }
                        }
                    }

                    if (!isFromHRBP) {
                        isHRBP = false;
                    }
                    // 非HRBP不允许进行跨公司调整员工
                    if (!isHRBP && newStructure && oldStructure) {
                        if (newStructure.id != oldStructure.id) {
                            alert('您没有权限进行跨公司员工调整');
                            return false;
                        }
                    }

                    if ((newStructure && oldStructure
                        && (newStructure.parentId != oldStructure.parentId))
                        || (!newStructure || !oldStructure)) {
                        if (!$scope.level) {
                            alert('跨公司调整时请一起调整等级');
                            return false;
                        }
                        if (!$scope.position) {
                            alert('跨公司调整时请一起调整职位名称');
                            return false;
                        }
                    }
                }
                if ($scope.level && !$scope.position) {
                    alert('请一起调整职位名称');
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
                    getSocialSecurityCityInfo($scope.workInfo.socialSecurityCity);
                });
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
             * 查询签约公司
             */
            function getContractCompany() {
                hrRequest.getContractCompany().then(function (res) {
                    res.data.unshift(config.EMPTY);
                    $scope.inputOptions.contractCompany.items = res.data;
                });
            };

            /**
             * 查询办公地点
             */
            function getOffice() {
                hrRequest.getOffice().then(function (res) {
                    res.data.unshift(config.EMPTY);
                    $scope.inputOptions.office.items = res.data;
                })
            }

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
             * 是否有需要下个月生效的字段
             */
            function hasExcuteNextMonthField(data) {
                var fields = ['socialSecurityCity', 'baseSalary', 'probationarySalary',
                    'socialSecurityBase', 'houseFundBase',
                    'trafficSubsidy', 'mobileSubsidy', 'salaryType'];
                if (socialSecurityCityInfo.needFiveBase) {
                    fields.push['endowBase'];
                    fields.push['unemployBase'];
                    fields.push['medicalBase'];
                    fields.push['injuryBase'];
                    fields.push['maternityBase'];
                }
                for (var i = 0, val; val = fields[i++];) {
                    if (val == 'baseSalary'
                        || val == 'probationarySalary'
                        || val == 'trafficSubsidy'
                        || val == 'mobileSubsidy'
                        ) {
                        if (typeof data[val].inputVal !== 'undefined') {
                            return true;
                        }
                    } else {
                        if (typeof data[val] != 'undefined') {
                            return true;
                        }
                    }
                }
                return false;
            }
        }
    }
)
;