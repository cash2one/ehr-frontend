/**
 * @file 新员工入职
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var getBaseOptions = require('./options/baseInfo');
    var getContactOptions = require('./options/contactInfo');
    var getInfoOptions = require('./options/info');
    var getOtherOptions = require('./options/otherInfo');
    var getSalaryOptions = require('./options/salaryInfo');
    var getEditOptions = require('./options/editInfo');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var typeCode = codeConfig.TYPE_CODE;
    var hrConfig = require('../config');
    var staffStatus = codeConfig.STAFF_STATUS_CODE;
    var defautSalaryType = config.SALARY_TYPE[1].id;
    var applyConfig = require('module/apply/config');
    var moment = require('moment');

    app.controller('newerCtrl',
        ['$scope', 'hrRequest', '$stateParams', 'localStorage', '$state', 'hrUtil', 'hrOptUtil', 'util', '$filter',
            function ($scope, hrRequest, $stateParams, localStorage, $state, hrUtil, hrOptUtil, util, $filter) {
                $scope.save = save;
                $scope.submit = submit;
                var rawEnterTime = '';
                var socialSecurityCityInfo = {};
                $scope.probationarySalaryChange = onProbationaryChange;
                $scope.typeChange = typeChange;
                $scope.showOfferDetail = showOfferDetail;
                // 实习和劳务不用填的字段
                var forbidOfLaborStaff = config.FORBID_OF_LABOR_STAFF;

                /**
                 * 查询信息
                 */
                $scope.getInfo = function () {
                    hrRequest.getPreEnterInfo({
                        number: $scope.number,
                        pageDto: {
                            pageNum: 1,
                            pageSize: config.PAGE_SIZE
                        }
                    }).then(function (res) {
                        $.extend(true, $scope, res.data[0]);
                        adaptData();
                        setForbitField($scope.type);
                        if ($scope.isReadOnly) {
                            setReadOnly();
                        }
                        if ($scope.socialSecurityCity) {
                            hrRequest.getSocialSecurityCity({
                                socialSecurityCity: $scope.socialSecurityCity
                            }).then(function (res) {
                                socialSecurityCityInfo = res.data[0];
                                $scope.needFiveBase = socialSecurityCityInfo.needFiveBase;
                            });
                        }
                        initVisibility();
                    });
                };

                /**
                 * 查询等级
                 */
                $scope.getLevel = function (value) {
                    if (value) {
                        hrRequest.getLevel({
                            structure: $scope.structure.id
                        }).then(function (res) {
                            for (var i = 0, item; item = res.data[i++];) {
                                item.id = i;
                            }
                            res.data.unshift(config.EMPTY);
                            $scope.infoOptions.level.items = res.data;
                            // level后端返回的只有name，前端用index来存储的,
                            $scope.levelIndex = $scope.getLevelIndex($scope.level);
                        })
                    } else {
                        $scope.infoOptions.level.items = [];
                        $scope.infoOptions.position.items = [];
                    }
                };

                /**
                 * 查询职位
                 */
                $scope.getPosition = function (value) {
                    if (value) {
                        hrRequest.getPosition({
                            structure: $scope.structure.id,
                            level: $scope.level
                        }).then(function (res) {
                            res.data.unshift(config.EMPTY);
                            $scope.infoOptions.position.items = res.data;
                        })
                    } else {
                        $scope.infoOptions.position.items = [];
                    }
                };

                $scope.$watch('structure', function (newVal, oldVal) {
                    if ((newVal != oldVal) && (newVal && newVal.id)) {
                        $scope.getLevel(newVal);
                        $scope.getPosition(newVal);
                        if (oldVal && (typeof oldVal.id != 'undefined')) {
                            $scope.level = undefined;
                            $scope.position = undefined;
                        }
                    }
                }, true);

                // 当入职日期变化的时候，转正日期也要变化
                $scope.$watch('promiseEnterDate', function(newVal, oldVla) {
                    if (!$scope.isReadOnly) {
                        if (newVal && $scope.type === 1) {
                            $scope.infoOptions.formalDate.forbid = false;
                            $scope.infoOptions.formalDate.items = [{id:1,name:moment(newVal).add(3, 'month').format('YYYY/MM/DD')},
                                                                   {id:2,name:moment(newVal).add(6, 'month').format('YYYY/MM/DD')}];
                            $scope.formalDate = 2;
                        } else {
                            $scope.infoOptions.formalDate.forbid = true;
                            $scope.formalDate = undefined;
                        }
                    }
                })

                // 当员工类型变成正式的时候，转正日期也要变化
                $scope.$watch('type', function(newVal, oldVal) {
                    if (!$scope.isReadOnly) {
                        if (newVal === 1 && $scope.promiseEnterDate) {
                            $scope.infoOptions.formalDate.forbid = false;
                            $scope.infoOptions.formalDate.items = [{id:1,name:moment($scope.promiseEnterDate).add(3, 'month').format('YYYY/MM/DD')},
                                                                   {id:2,name:moment($scope.promiseEnterDate).add(6, 'month').format('YYYY/MM/DD')}];
                            $scope.formalDate = 2;
                        }
                    }
                })

                $scope.$watch('socialSecurityCity', function (newVal, oldVal) {
                    if (newVal) {
                        if (oldVal) {
                            getSocialSecurityCityInfo(newVal);
                        } else {
                            getSocialSecurityCityInfo(newVal, true);
                        }

                    } else {
                        socialSecurityCityInfo = {};
                    }
                }, true);

                $scope.$watch('levelIndex', function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        $scope.level = $scope.getLevelByIndex(newVal);
                    }
                }, true);

                $scope.$watch('level', function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        $scope.getPosition(newVal);
                        if (typeof oldVal != 'undefined') {
                            $scope.position = undefined;
                        }
                    }
                }, true);

                /**
                 * level值通过index来取，因为后端返回值只有name,
                 * id如果用name的话，不知道为什么值总是set不上。。。
                 * TODO：为什么会这样 ？？
                 * @param index
                 * @returns {*}
                 */
                $scope.getLevelByIndex = function (index) {
                    if (typeof index == 'undefined') {
                        return undefined;
                    }
                    return $scope.infoOptions.level.items[index].name;
                }

                /**
                 * 已知level的name，求id
                 * @param index
                 * @returns {*}
                 */
                $scope.getLevelIndex = function (level) {
                    var items = $scope.infoOptions.level.items;
                    for (var i = 0, item; item = items[i++];) {
                        if (item.name == level) {
                            return item.id;
                        }
                    }
                }

                /**
                 * 查询签约公司
                 */
                $scope.getContractCompany = function () {
                    hrRequest.getContractCompany().then(function (res) {
                        res.data.unshift(config.EMPTY);
                        $scope.infoOptions.contractCompany.items = res.data;
                    })
                };

                /**
                 * 点击放弃
                 */
                $scope.desertClick = function () {
                    hrOptUtil.desertCondidate($scope.number, function () {
                        $scope.getInfo();
                    });
                };

                /**
                 * 初始化scope变量
                 */
                $scope.initScopeVar = function () {
                    // 标记请求在处理中
                    $scope.fiveBaseInitOptions = {
                        formName: 'newerEnterForm',
                        required: false
                    }
                    var formName = 'newerEnterForm';

                    /**
                     * 是否有保存按钮
                     * @type {boolean}
                     */
                    $scope.canSave = true;
                    $scope.fiveBaseRequired = false;


                    $scope.baseOptions = getBaseOptions(formName);

                    $scope.contactOptions = getContactOptions(formName);

                    $scope.infoOptions = getInfoOptions(formName, $scope);

                    $scope.otherOptions = getOtherOptions(formName);

                    $scope.salaryOptions = getSalaryOptions(formName, $scope);

                    $scope.editOptions = getEditOptions(formName);

                    $scope.onEditClick = onEditClick;


                    $scope.baseSalary = {
                        selectVal: defautSalaryType
                    }
                    $scope.probationarySalary = {
                        selectVal: defautSalaryType
                    }
                    $scope.trafficSubsidy = {
                        selectVal: defautSalaryType
                    }
                    $scope.mobileSubsidy = {
                        selectVal: defautSalaryType
                    }

                    /**
                     * 提交的时候的非必填字段
                     * @type {string[]}
                     */
                    $scope.notRequiredFieldWhenSubmit = [
                        'recommendDetail',
                        'detail',
                        'personalEmail',
                        'idCardNumber',
                        'socialSecurityCity',
                        'name'
                    ];
                    $scope.showAbandonBtn = false;
                };

                init();

                function init() {
                    initEntry();
                    initEntryRelatedVar();
                    $scope.initScopeVar();
                    if ($scope.entry == 'newerEdit') {
                        $scope.getInfo();
                    }
                    if ($scope.entry == 'rejoin') {
                        hrOptUtil.rejoin(rejoinSearchCallback);
                    }
                    $scope.getContractCompany();
                    getSocialSecurityCity();
                    getOffice();
                };

                /**
                 * 初始化入口
                 */
                function initEntry() {
                    $scope.entry = '';
                    switch ($state.current.name) {
                        // 候选人
                        case 'hr.newerEdit':
                            $scope.entry = 'newerEdit';
                            break;
                        case 'hr.rejoin':
                            $scope.entry = 'rejoin';
                            break;
                    }
                }

                /**
                 * 入口相关的一些变量
                 */
                function initEntryRelatedVar() {
                    $scope.title = '添加offer';
                    $scope.canEdit = false;
                    $scope.number = localStorage.get('number');
                    $scope.fromApply = false;
                    if ($scope.entry == 'newerEdit') {
                        $scope.title = 'offer信息';
                        $scope.isReadOnly = true;
                        $scope.canEdit = true;
                    }
                    if ($scope.entry == 'rejoin') {
                        $scope.title = '员工再入职';
                    }
                }

                /**
                 * 只读模式
                 */
                function setReadOnly() {
                    disableOptions($scope.baseOptions);
                    disableOptions($scope.contactOptions);
                    disableOptions($scope.infoOptions);
                    disableOptions($scope.otherOptions);
                    disableOptions($scope.salaryOptions);
                    disableOptions($scope.fiveBaseOptions);
                    $scope.infoOptions.position.displayValue = $scope.positionName;
                    $scope.infoOptions.formalDate.displayValue = $scope.formalDate && moment($scope.infoOptions.formalDate.items[$scope.formalDate - 1].name).format('YYYY-MM-DD');
                    $scope.infoOptions.contractCompany.displayValue = $scope.contractCompanyName;
                    $scope.infoOptions.socialSecurityCity.displayValue = $scope.socialSecurityCityName;
                    $scope.salaryOptions.baseSalary.displayValue =
                        getSalaryDisplayValue($scope.baseSalary);
                    $scope.salaryOptions.reportAddress.displayValue = $scope.reportAddressName;
                    $scope.salaryOptions.probationarySalary.displayValue =
                        getSalaryDisplayValue($scope.probationarySalary);
                    $scope.salaryOptions.trafficSubsidy.displayValue =
                        getSalaryDisplayValue($scope.trafficSubsidy);
                    $scope.salaryOptions.mobileSubsidy.displayValue
                        = getSalaryDisplayValue($scope.mobileSubsidy);
                    $scope.infoOptions.level.displayValue = $scope.level;
                }

                /**
                 * 工资显示值
                 */
                function getSalaryDisplayValue(salaryObj) {
                    return $filter('salary')({
                        value: salaryObj.inputVal,
                        salaryType: salaryObj.selectVal
                    })
                }

                /**
                 * 点击编辑
                 */
                function onEditClick() {
                    enableOptions($scope.baseOptions);
                    enableOptions($scope.contactOptions);
                    enableOptions($scope.infoOptions);
                    enableOptions($scope.otherOptions);
                    enableOptions($scope.salaryOptions);
                    enableOptions($scope.fiveBaseOptions);
                    $scope.isEditing = true;
                    $scope.isReadOnly = false;
                }

                /**
                 * 把字段变成必填项目
                 * @param field
                 * @param options
                 */
                function isFilled(field, form) {
                    //不是必填的
                    if ($.inArray(field, $scope.notRequiredFieldWhenSubmit) != -1) {
                        return true;
                    }
                    var type = $scope.type;
                    // 实习劳务有些字段也不填
                    if ((type == typeCode.INTERNS
                        || type == typeCode.LABOR)
                        && $.inArray(field, forbidOfLaborStaff) != -1) {
                        return true;
                    }
                    if (field == 'probationarySalary'
                        || field == 'baseSalary'
                        || field == 'mobileSubsidy'
                        || field == 'trafficSubsidy'
                        ) {
                        var inputVal = $scope[field].inputVal;
                        if (typeof  inputVal == 'undefined'
                            || inputVal == null) {
                            form[field].$setViewValue(undefined);
                            form[field].$setValidity('required', false);
                            return false;
                        }
                    }
                    if (field == 'structure') {
                        if (!($scope[field] && $scope[field].id)) {
                            form[field].$error.requiredSubmitted = true;
                            return false;
                        }
                    } else {
                        if (typeof $scope[field] == 'undefined') {
                            if (field == 'promiseEnterDate') {
                                form[field].$error.dateRequired = true;
                            } else if (field == 'leader') {
                                form[field].$error.sugguestionRequired = true;
                            } else {
                                form[field].$error.requiredSubmitted = true;
                            }
                            return false;
                        }
                    }
                    if (field == 'promiseEnterDate') {
                        form[field].$error.dateRequired = false;
                    } else if (field == 'leader') {
                        form[field].$error.sugguestionRequired = false;
                    } else {
                        form[field].$error.requiredSubmitted = false;
                    }
                    return true;
                }

                /**
                 * 检查必填项
                 * @param options
                 * @param form
                 * @returns {boolean}
                 */
                function checkRequired(options, form) {
                    var res = true;
                    for (var key in options) {
                        if (options.hasOwnProperty(key)) {
                            var field = options[key].name;
                            if (!isFilled(field, form)) {
                                res = false;
                            }
                        }
                    }
                    return res;
                }

                /**
                 * 设置option为disable
                 * @param option
                 */
                function disableOptions(option) {
                    for (var key in option) {
                        option[key].disable = true;
                        /*                    if (key != 'promiseEnterDate') {
                         if (option.hasOwnProperty(key)) {
                         option[key].disable = true;
                         }
                         } else {
                         if ($scope.handleUser != $scope.userInfo.userName) {
                         option[key].disable = true;
                         $scope.hideSubmit = true;
                         }
                         }*/
                    }
                }

                /**
                 * input变为可编辑的
                 * @param option
                 */
                function enableOptions(option) {
                    for (var key in option) {
                        // 姓名和姓名拼音不可以改
                        if (key != 'name' && key != 'lawName' && key != 'namePinyin') {
                            option[key].disable = false;
                        }
                    }
                }

                /**
                 * 组合查询数据
                 */
                function getQueryData() {
                    if ($scope.type === 1) {
                        $scope.contractEndDate = $scope.promiseEnterDate && (new Date(moment($scope.promiseEnterDate).add(3, 'year').format()));
                    } else {
                        $scope.contractEndDate = $scope.promiseEnterDate && (new Date(moment($scope.promiseEnterDate).add(6, 'month').format()));
                    }
                    var res = {
                        // 自然信息
                        name: $scope.name || $scope.lawName,
                        namePinyin: $scope.namePinyin,
                        sex: $scope.sex,
                        degree: $scope.degree,
                        lawName: $scope.lawName,
                        // 联系方式
                        mobile: $scope.mobile,
                        personalEmail: $scope.personalEmail,
                        idCardNumber: $scope.idCardNumber,
                        // 基本信息
                        type: $scope.type,
                        contractCompany: $scope.contractCompany,
                        socialSecurityCity: $scope.socialSecurityCity,
                        structure: $scope.structure && $scope.structure.id,
                        structureName: $scope.structure && $scope.structure.name,
                        level: $scope.level,
                        position: $scope.position,
                        formalDate: $scope.formalDate && (new Date($scope.infoOptions.formalDate.items[$scope.formalDate-1].name)).getTime(),
                        promiseEnterDate: $scope.promiseEnterDate && $scope.promiseEnterDate.getTime(),
                        contractEndDate: $scope.contractEndDate && $scope.contractEndDate.getTime(),
                        leader: util.getUsernameFromSuggestion($scope.leader),
                        // 工资信息
                        baseSalary: hrUtil.getSalary($scope.baseSalary),
                        probationarySalary: hrUtil.getSalary($scope.probationarySalary),
                        mobileSubsidy: hrUtil.getSalary($scope.mobileSubsidy),
                        trafficSubsidy: hrUtil.getSalary($scope.trafficSubsidy),
                        socialSecurityBase: +$scope.socialSecurityBase,
                        houseFundBase: +$scope.houseFundBase,
                        salaryType: +$scope.salaryType,
                        reportAddress: +$scope.reportAddress,
                        // 其它信息
                        pcType: $scope.pcType,
                        recommendType: $scope.recommendType,
                        resumeStorageId: $scope.resumeStorageId
                    }
                    if (socialSecurityCityInfo.needFiveBase) {
                        res.endowBase = +$scope.endowBase;
                        res.unemployBase = +$scope.unemployBase;
                        res.medicalBase = +$scope.medicalBase;
                        res.injuryBase = +$scope.injuryBase;
                        res.maternityBase = +$scope.maternityBase;
                    }
                    return res;
                }

                /**
                 * 添加非必须填写的项
                 * @param name
                 */
                function addNotMustValue(name, dataQuery) {
                    if ($scope[name]) {
                        dataQuery[name] = $scope[name];
                    }
                }

                /**
                 * 清空数据
                 * @param dataQuery
                 */
                function clearData(dataQuery) {
                    for (var key in dataQuery) {
                        if (dataQuery.hasOwnProperty(key)) {
                            if (key == 'baseSalary'
                                || key == 'probationarySalary'
                                || key == 'mobileSubsidy'
                                || key == 'trafficSubsidy'
                                ) {
                                $scope[key] = {
                                    inputVal: undefined,
                                    selectVal: defautSalaryType
                                };
                            } else if (key == 'resumeStorageId') {
                                $scope.otherOptions.resumeStorageId.fileUrl = undefined;
                                $scope.resumeStorageId = undefined;
                            }
                            else {
                                $scope[key] = undefined;
                            }
                        }
                    }
                    $scope['levelIndex'] = undefined;
                }

                /**
                 * 点击保存
                 */
                function save(form) {
                    var form = $scope.newerEnterForm;
                    if (!form.$valid) {
                        return;
                    }
                    var dataQuery = getQueryData();
                    if (!util.validateSocialAndHouseFundBase(dataQuery, socialSecurityCityInfo)) {
                        return;
                    }
                    dataQuery.optType = hrConfig.OPT_TYPE.SAVE;
                    addNotMustValue('detail', dataQuery);
                    addNotMustValue('recommendDetail', dataQuery);
                    addNotMustValue('scdDepartment', dataQuery);
                    var request = hrRequest.savePreEnterInfo;
                    if ($scope.entry == 'newerEdit') {
                        request = hrRequest.modPreEnterInfo;
                        dataQuery.number = $scope.number;
                    }
                    request(dataQuery).then(function (res) {
                        info('操作成功');
                        // 新建时候
                        if ($scope.entry != 'newerEdit') {
                            localStorage.set('number', res.data.number);
                        }
                        clearData(dataQuery);
                        form.$submitted = false;
                    })
                }


                /**
                 * 点击提交
                 */
                function submit() {
                    var form = $scope.newerEnterForm;

                    // 不需要填五个基数的，总是等于社保基数
                    if (!socialSecurityCityInfo.needFiveBase) {
                        var base = $scope.socialSecurityBase;
                        $scope.endowBase = base;
                        $scope.unemployBase = base;
                        $scope.medicalBase = base;
                        $scope.injuryBase = base;
                        $scope.maternityBase = base;
                    }
                    var checkBase = checkRequired($scope.baseOptions, form);
                    var checkContact = checkRequired($scope.contactOptions, form);
                    var checkInfo = checkRequired($scope.infoOptions, form);
                    var checkOther = checkRequired($scope.otherOptions, form);
                    var checkSalary = checkRequired($scope.salaryOptions, form);
                    var checkFiveBase = checkRequired($scope.fiveBaseOptions, form);
                    // 提交的时候，字段基本都是必填的
                    if (!form.$valid
                        || !checkBase
                        || !checkContact
                        || !checkInfo
                        || !checkOther
                        || !checkSalary
                        || !checkFiveBase
                        ) {
                        return;
                    }
                    var dataQuery = getQueryData();
                    if (!util.validateSocialAndHouseFundBase(dataQuery, socialSecurityCityInfo)) {
                        return;
                    }
                    if (dataQuery.type == codeConfig.TYPE_CODE.REGULAR
                        && (!dataQuery.socialSecurityCity)) {
                        alert('正式员工必须填写社保缴纳城市');
                        return;
                    }
                    dataQuery.optType = hrConfig.OPT_TYPE.COMMIT;
                    addNotMustValue('detail', dataQuery);
                    addNotMustValue('recommendDetail', dataQuery);
                    addNotMustValue('scdDepartment', dataQuery);
                    if (rawEnterTime != dataQuery.promiseEnterDate
                        && !util.validateLast7Day('入职时间', dataQuery.promiseEnterDate)) {
                        return;
                    }
                    var request = hrRequest.submitPreEnterInfo;
                    var data = {
                        content: dataQuery,
                        type: codeConfig.APPLY_CODE.STAFF_ENTER
                    }

                    if ($scope.entry == 'rejoin') {
                        var number = $scope.number;
                        data.type = codeConfig.APPLY_CODE.REJOIN;
                        data.editedNumber = number;
                        data.content.number = number;
                    }
                    if ($scope.entry == 'newerEdit') {
                        var number = $scope.number;
                        if ($scope.optType == hrConfig.OPT_TYPE.COMMIT) {
                            data.type = codeConfig.APPLY_CODE.OFFER_CHANGE;
                        } else {
                            data.type = codeConfig.APPLY_CODE.STAFF_ENTER;
                        }
                        data.editedNumber = number;
                        data.content.number = number;
                        data.reason = $scope.reason;
                    }
                    request(data).then(function (res) {
                        alert('系统已经接受了您的请求，开始审批流程，请注意查看审批结果邮件');
                        clearData(dataQuery);
                        if ($scope.entry == 'newerEdit') {
                            $state.go('hr.newer');
                        }
                        form.$submitted = false;
                    });
                }


                /**
                 * 按钮的可见性初始化
                 */
                function initVisibility() {
                    if ($scope.optType == hrConfig.OPT_TYPE.COMMIT) {
                        $scope.canSave = false;
                        $scope.commited = true;
                    }
                    if (($scope.status == staffStatus.DRAFT
                        || $scope.status == staffStatus.TO_JOIN)) {
                        $scope.showAbandonBtn = true;
                    } else {
                        $scope.showAbandonBtn = false;
                    }
                    if ($scope.entry == 'rejoin') {
                        $scope.canSave = false;
                        $scope.showAbandonBtn = false;
                    }
                    if ($scope.status == staffStatus.ABANDED) {
                        $scope.showAbandonInfo = true;
                    }
                }

                /**
                 * 数据适配
                 */
                function adaptData() {
                    if ($scope.promiseEnterDate) {
                        rawEnterTime = $scope.promiseEnterDate;
                        $scope.promiseEnterDate = new Date($scope.promiseEnterDate);
                        // 当员工类型是正式员工的时候，填充转正日期select的item
                        if ($scope.type === 1) {
                            $scope.infoOptions.formalDate.items = [{id:1,name:moment($scope.promiseEnterDate).add(3, 'month').format('YYYY/MM/DD')},
                                                                   {id:2,name:moment($scope.promiseEnterDate).add(6, 'month').format('YYYY/MM/DD')}];
                        }
                    }
                    // 转正日期处理，如果转正日期是入职日期之后三个月，item选择1，否则，选2
                    if ($scope.formalDate) {
                        if (+moment($scope.promiseEnterDate).add(3, 'month').format('YYYYMMDD') == +moment($scope.formalDate).format('YYYYMMDD')) {
                            $scope.formalDate = 1;
                        } else {
                            $scope.formalDate = 2;
                        }
                    }

                    $scope.mobile = $scope.mobile;
                    if ($scope.leader) {
                        $scope.leader = $scope.leaderName + ',' + $scope.leader;
                    }
                    $scope.baseSalary = hrUtil.transSalaryInfo($scope.baseSalary);
                    $scope.probationarySalary = hrUtil.transSalaryInfo($scope.probationarySalary);
                    $scope.mobileSubsidy = hrUtil.transSalaryInfo($scope.mobileSubsidy);
                    $scope.trafficSubsidy = hrUtil.transSalaryInfo($scope.trafficSubsidy);
                    $scope.structure = {
                        id: $scope.structure,
                        name: $scope.structureName
                    }
                    $scope.otherOptions.resumeStorageId.fileUrl = $scope.resumeUrl;
                }

                /**
                 * 再入职查询的回调
                 */
                function rejoinSearchCallback(data) {
                    $.extend(true, $scope, data.staffInfo);
                    setForbitField($scope.type);
                    $scope.baseOptions.name.disable = true;
                    $scope.baseOptions.namePinyin.disable = true;
                    $scope.baseOptions.lawName.disable = true;
                    $scope.baseOptions.idCardNumber.disable = true;
                    $scope.baseOptions.sex.disable = true;
                    adaptData();
                    initVisibility();
                }

                /**
                 * 查社保缴纳城市
                 */
                function getSocialSecurityCity() {
                    hrRequest.getSocialSecurityCity().then(function (res) {
                        res.data.unshift(config.EMPTY);
                        $scope.infoOptions.socialSecurityCity.items = res.data;
                    })
                }

                /**
                 * 获取社保缴纳城市信息
                 * @param cityId
                 * @param  isInit 是否数据初始化的时候获取的
                 */
                function getSocialSecurityCityInfo(cityId, isInit) {
                    hrRequest.getSocialSecurityCity({
                        socialSecurityCity: cityId
                    }).then(function (res) {
                        socialSecurityCityInfo = res.data[0];
                        $scope.needFiveBase = socialSecurityCityInfo.needFiveBase;
                        if (!isInit) {
                            setDefaultSocialBase();
                            setDefaultHouseBase();
                        }
                    })
                }

                /**
                 * 默认提示的社保缴纳金额
                 */
                function setDefaultSocialBase(param) {
                    var param = param || {};
                    if (typeof param.type == 'undefined') {
                        type = $scope.type;
                    } else {
                        type = param.type;
                    }
                    if (type == typeCode.INTERNS
                        || type == typeCode.LABOR) {
                        return;
                    }
                    util.setDefaultSocialBase(param, socialSecurityCityInfo, $scope);
                }

                /**
                 * 默认提示的公积金缴纳金额
                 */
                function setDefaultHouseBase(param) {
                    var param = param || {};
                    var info = socialSecurityCityInfo;
                    if (typeof param.type == 'undefined') {
                        type = $scope.type;
                    } else {
                        type = param.type;
                    }
                    if (type == typeCode.INTERNS
                        || type == typeCode.LABOR) {
                        return;
                    }
                    if (info.houseFundBySalary) {
                        var val = typeof param.salary == 'undefined'
                            ? +$scope.probationarySalary.inputVal
                            : +param.salary;
                        if (val > info.houseFundMax) {
                            $scope.houseFundBase = info.houseFundMax;
                        } else if (val < info.houseFundMin) {
                            $scope.houseFundBase = info.houseFundMin;
                        } else {
                            $scope.houseFundBase = val;
                        }
                        return;
                    }
                    $scope.houseFundBase = info.houseFundDefault;
                }

                /**
                 * 工资输入变化
                 */
                function onProbationaryChange(val) {
                    setDefaultSocialBase({
                        salary: val
                    });
                    setDefaultHouseBase({
                        salary: val
                    });
                }


                /**
                 * 员工类型变化
                 */
                function typeChange(val) {
                    setDefaultSocialBase({
                        type: val
                    });
                    setDefaultHouseBase({
                        type: val
                    });

                    setForbitField(val);
                }

                /**
                 * 转正日期变化
                 */
                function formalChange(val) {

                }

                /**
                 * 设置禁用
                 */
                function setForbitField(type) {
                    if (type == typeCode.INTERNS
                        || type == typeCode.LABOR) {
                        util.forbidFieldOfLabor($scope.baseOptions, true, $scope);
                        util.forbidFieldOfLabor($scope.contactOptions, true, $scope);
                        util.forbidFieldOfLabor($scope.infoOptions, true, $scope);
                        util.forbidFieldOfLabor($scope.otherOptions, true, $scope);
                        util.forbidFieldOfLabor($scope.salaryOptions, true, $scope);
                        util.forbidFieldOfLabor($scope.fiveBaseOptions, true, $scope);
                    } else {
                        util.forbidFieldOfLabor($scope.baseOptions, false, $scope);
                        util.forbidFieldOfLabor($scope.contactOptions, false, $scope);
                        util.forbidFieldOfLabor($scope.infoOptions, false, $scope);
                        util.forbidFieldOfLabor($scope.otherOptions, false, $scope);
                        util.forbidFieldOfLabor($scope.salaryOptions, false, $scope);
                        util.forbidFieldOfLabor($scope.fiveBaseOptions, false, $scope);
                    }
                }

                /**
                *查询办公地点
                */
                function getOffice() {
                    hrRequest.getOffice().then(function (res) {
                        res.data.unshift(config.EMPTY);
                        $scope.salaryOptions.reportAddress.items = res.data;
                    })
                }

                /**
                *根据Id从items中查询对应的值
                */
                function getItermsValueById(items, id) {
                    var result = '';
                    if(typeof id != 'undefined') {
                        for(var i=0;i<items.length;i++) {
                            if(items[i].id === id) {
                                result = items[i].name;
                                break;
                            }
                        }
                    }
                    return result;
                }

                /**
                * 预览Offer
                */
                function showOfferDetail() {
                    var form = $scope.newerEnterForm;
                    if (!form.$valid) {
                        return;
                    }
                    var data = getOfferDetail();
                    hrOptUtil.showOfferDetail(data);
                }

                /**
                *组合Offer预览所需要的数据data
                */
                function getOfferDetail() {
                    var positionVal = '';
                    if ($scope.position) {
                        for (var i = 0; i < $scope.infoOptions.position.items.length; i++) {
                            if ($scope.infoOptions.position.items[i].id === $scope.position) {
                                positionVal = $scope.infoOptions.position.items[i].name;
                                break;
                            }
                        }
                    }

                    var res = {
                        lawName: $scope.lawName,
                        promiseEnterDate: typeof $scope.promiseEnterDate == 'undefined' ? '' : $scope.promiseEnterDate,
                        office: getItermsValueById($scope.salaryOptions.reportAddress.items, $scope.reportAddress),
                        structure: typeof $scope.structure == 'undefined' ? '' : $scope.structure.name,
                        position: getItermsValueById($scope.infoOptions.position.items, $scope.position),
                        probationarySalary: typeof $scope.probationarySalary.inputVal == 'undefined' ? '' :$scope.probationarySalary.inputVal,
                        baseSalary: typeof $scope.baseSalary.inputVal == 'undefined' ? '' : $scope.baseSalary.inputVal,
                        formalDate: $scope.formalDate,
                        type: $scope.type
                    }
                    return res;
                }
            }
        ]);
});