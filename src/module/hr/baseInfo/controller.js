/**
 * @file 新员工入职
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var getBaseOptions = require('./options');
    var getEducationOptions = require('./educationInfo');
    var getWorkExpOptions = require('./workExpInfo');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var hrConfig = require('../config');
    var moment = require('moment');

    app.controller('hrBaseInfoCtrl', ['$scope', 'hrRequest', '$stateParams',
        'localStorage', '$state', 'authUtil', 'hrUtil', 'util', 'workInfo', 'hrOptUtil',
        function (
            $scope, hrRequest, $stateParams, localStorage, $state, authUtil, hrUtil, util, workInfo, hrOptUtil) {

            $scope.number = localStorage.get('number');
            var workInfo = workInfo.data;
            var rawEnterTime = '';
            var rawFormalDate = '';
            $scope.isSelfView = false;
            var canModSelfFields = ['hometown', 'ethnic', 'politicalStatus',
                'birthplace', 'accountLocation', 'religion', 'maritalStatus',
                'citizenship'];
            var rawData = {};

            /**
             * 入口
             * @type {string}
             */
            $scope.entryName = $state.current.name;

            $scope.educationAddOptions = getEducationOptions('educationAddForm');
            $scope.workExpAddOptions = getWorkExpOptions('workExpAddForm');

            $scope.isReadOnly = true;
            $scope.isReadOnly2 = true;

            $scope.onEdit = onEdit;
            $scope.onEditPart2 = onEditPart2;

            $scope.canDownLoadFile = true;

            $scope.modMobileClick = modMobileClick;

            $scope.cancelPart1 = cancelPart1;
            $scope.cancelPart2 = cancelPart2;

            $scope.showModMobile = false;


            /**
             * 禁止基本信息的修改
             */
            $scope.disbaleBaseInput = function () {
                hrUtil.disableOptions($scope.baseOptions);
                if ($scope.educationList) {
                    for (var i = 0, item; item = $scope.educationList[i++];) {
                        item.disable = true;
                    }
                }
                if ($scope.workExpList) {
                    for (var i = 0, item; item = $scope.workExpList[i++];) {
                        item.disable = true;
                    }
                }
            }

            /**
             * 变为修改状态
             */
            $scope.enableBaseInput = function () {
                hrUtil.enableOptions($scope.baseOptions);
                if ($scope.commonInfo.status
                    != codeConfig.STAFF_STATUS_CODE.TO_JOIN) {
                    $scope.baseOptions.enterTime.disable = true;
                    $scope.baseOptions.formalDate.disable = true;
                }
                $scope.baseOptions.contractEndDate.disable = true;
            }

            /**
             * 教育经历变为可编辑的
             */
            function enableEducationExp(enable) {
                var data = $.extend(true, {}, $scope.educationList);
                for (var i = 0, item; item = data[i++];) {
                    item.disable = !enable;
                }
                $scope.educationList = data;
            }

            /**
             * 工作经历变为可编辑的
             */
            function enableWorkExp(enable) {
                var data = $.extend(true, {}, $scope.workExpList);
                for (var i = 0, item; item = data[i++];) {
                    item.disable = !enable;
                }
                $scope.workExpList = data;
            }

            /**
             * 自己可以修改的字段
             */
            function enableSelfCanModInput() {
                for (var i = 0, val; val = canModSelfFields[i++];) {
                    $scope.baseOptions[val].disable = false;
                }
            }

            /**
             * get基本信息
             */
            $scope.getBaseInfo = function () {
                hrRequest.getStaffBaseInfo({
                    number: $scope.number
                }).then(function (res) {
                    for (var key in res.data) {
                        if (res.data.hasOwnProperty(key)) {
                            $scope[key] = res.data[key];
                        }
                    }
                    if ($scope.birthday) {
                        // 后端会每次都给birthday加上8小时，前端传的时候每次格式为0点
                        $scope.birthday = new Date(util.formatTime($scope.birthday) + ' 00:00:00');
                    }
                    if ($scope.beginWorkTime) {
                        $scope.beginWorkTime = new Date($scope.beginWorkTime);
                    }
                    if ($scope.enterTime) {
                        rawEnterTime = $scope.enterTime;
                        $scope.enterTime = new Date($scope.enterTime);
                        // 当员工类型是正式员工的时候，填充转正日期select的item
                        if ($scope.staffType === 1) {
                            $scope.baseOptions.formalDate.items = [{id:1,name:moment($scope.enterTime).add(3, 'month').format('YYYY/MM/DD')},
                                                                   {id:2,name:moment($scope.enterTime).add(6, 'month').format('YYYY/MM/DD')}];
                        }
                    }
                    if ($scope.formalDate > 0) {
                        rawFormalDate = $scope.formalDate;
                        $scope.baseOptions.formalDate.displayValue = moment($scope.formalDate).format('YYYY-MM-DD');
                        if (+moment($scope.enterTime).add(3, 'month').format('YYYYMMDD') == +moment($scope.formalDate).format('YYYYMMDD')) {
                            $scope.formalDate = 1;
                        } else if (+moment($scope.enterTime).add(6, 'month').format('YYYYMMDD') == +moment($scope.formalDate).format('YYYYMMDD')){
                            $scope.formalDate = 2;
                        } else {
                            $scope.formalDate = new Date($scope.formalDate);
                        }
                    }

                    if ($scope.contractEndDate) {
                        $scope.contractEndDate = new Date($scope.contractEndDate);
                        $scope.baseOptions.contractEndDate.displayValue = moment($scope.contractEndDate).format('YYYY-MM-DD');
                    }

                    $scope.baseOptions.idCardAndContract.fileUrl = $scope.idCardAndContractFile;
                    $scope.baseOptions.idCardUpload.fileUrl = $scope.idCardUploadFile;
                    $scope.baseOptions.limitAgreement.fileUrl = $scope.limitAgreementFile;
                    $scope.baseOptions.resume.fileUrl = $scope.resumeFile;
                })
            };


            /**
             * 保存基本信息的第一部分
             */
            $scope.saveBaseInfo = function (form) {
                if (!form.$valid) {
                    return;
                }
                if ($scope.commonInfo.status
                    == codeConfig.STAFF_STATUS_CODE.TO_JOIN && $scope.staffType === 1) {
                    if ($scope.formalDate) {
                        $scope.formalDate = (new Date($scope.baseOptions.formalDate.items[$scope.formalDate - 1].name));
                    } else {
                        alert('请选择转正日期');
                        return;
                    }

                }
                if ($scope.staffType !== 1) {
                    $scope.formalDate = undefined;
                }
                if (rawFormalDate &&
                    $scope.commonInfo.status !== codeConfig.STAFF_STATUS_CODE.TO_JOIN) {
                    $scope.formalDate = new Date(rawFormalDate);
                }
                var data = {
                    number: $scope.number,
                    hometown: $scope.hometown,
                    ethnic: $scope.ethnic,
                    politicalStatus: $scope.politicalStatus,
                    birthplace: $scope.birthplace,
                    accountLocation: $scope.accountLocation,
                    degree: $scope.degree,
                    religion: $scope.religion,
                    maritalStatus: $scope.maritalStatus,
                    citizenship: $scope.citizenship,
                    isForeign: $scope.isForeign,
                    birthday: $scope.birthday && new Date($scope.birthday).getTime(),
                    accountType: $scope.accountType,
                    beginWorkTime: $scope.beginWorkTime && new Date($scope.beginWorkTime).getTime(),
                    isGraduate: $scope.isGraduate,
                    mobile: $scope.mobile,
                    idCardNumber: $scope.idCardNumber,
                    contractEndDate: $scope.contractEndDate && $scope.contractEndDate.getTime(),
                    formalDate: $scope.formalDate && $scope.formalDate.getTime(),
                    enterTime: $scope.enterTime && $scope.enterTime.getTime(),
                    idCardAndContract: $scope.idCardAndContract,
                    idCardUpload: $scope.idCardUpload,
                    limitAgreement: $scope.limitAgreement,
                    resume: $scope.resume
                };
                if (data.idCardNumber
                    // 大陆身份证,idCardType是个历史字段，。
                    && (data.isForeign == config.ID_CARD_CODE)
                    && (data.idCardNumber.length != hrConfig.CHINESE_ID_CARD_NUMBER_LENGTH)) {
                    alert('请输入18位身份证');
                    return;
                }
                if ((data.enterTime != rawEnterTime)
                    && !util.validateLast7Day('入职日期', data.enterTime)) {
                    return;
                }
                var request = hrRequest.saveBaseInfo;
                if ($scope.isSelfView) {
                    request = hrRequest.saveBaseInfoSelf;
                    // 删掉自己不能修改的字段
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            if ($.inArray(key, canModSelfFields) == -1
                                && key != 'number') {
                                delete data[key];
                            }
                        }
                    }
                }
                request(data).then(function () {
                    info('保存成功');
                    $scope.isReadOnly = true;
                    $scope.disbaleBaseInput();
                    $scope.getBaseInfo();
                });
            };

            /**
             * 查询教育经历
             */
            $scope.getEducationExperience = function () {
                hrRequest.getEducationExperience({
                    number: $scope.number
                }).then(function (res) {
                    for (var i = 0, item; item = res.data[i++];) {
                        item.start = new Date(item.start);
                        item.end = new Date(item.end);
                        if ($scope.isReadOnly2) {
                            item.disable = true;
                        }
                    }
                    $scope.educationList = res.data;
                });
            };

            /**
             * 查询工作经历
             */
            $scope.getWorkExperience = function () {
                hrRequest.getWorkExperience({
                    number: $scope.number
                }).then(function (res) {
                    for (var i = 0, item; item = res.data[i++];) {
                        item.start = new Date(item.start);
                        item.end = new Date(item.end);
                        if ($scope.isReadOnly2) {
                            item.disable = true;
                        }
                    }
                    $scope.workExpList = res.data;
                });
            }

            $scope.educationAdd = {
                /**
                 * 添加
                 */
                addClick: function () {
                    $scope.addingEducation = true;
                },

                /**
                 * 取消
                 */
                onCancel: function () {
                    var me = this;
                    $scope.addingEducation = false;
                    me.clearInfo();
                },

                /**
                 * 清空信息
                 */
                clearInfo: function () {
                    $scope.educationAdd.start = undefined;
                    $scope.educationAdd.end = undefined;
                    $scope.educationAdd.school = undefined;
                    $scope.educationAdd.discipline = undefined;
                    $scope.educationAdd.degree = undefined;
                },
                onSave: function (form) {
                    form.$submitted = true;
                    var me = this;
                    if (!form.$valid) {
                        return;
                    }
                    var start = $scope.educationAdd.start.getTime();
                    var end = $scope.educationAdd.end.getTime();
                    if (start > end) {
                        alert('结束时间必须大于开始时间');
                        return;
                    }
                    hrRequest.addEducationExperience({
                        number: $scope.number,
                        start: start,
                        end: end,
                        school: $scope.educationAdd.school,
                        discipline: $scope.educationAdd.discipline,
                        degree: $scope.educationAdd.degree
                    }).then(function (res) {
                        info('添加成功');
                        $scope.addingEducation = false;
                        $scope.getEducationExperience();
                        form.$submitted = false;
                        me.clearInfo();
                    })
                }
            };

            /**
             * 取消
             */
            function cancelPart1() {
                $scope.isReadOnly = true;
                $scope.disbaleBaseInput();
                $scope.getBaseInfo();
            }

            function cancelPart2 () {
                enableEducationExp(false);
                enableWorkExp(false);
                $scope.isReadOnly2 = true;
                $scope.getEducationExperience();
                $scope.getWorkExperience();
            }

            $scope.workExpAdd = {
                addClick: function () {
                    $scope.addingWorkExp = true;
                },
                onCancel: function () {
                    var me = this;
                    $scope.addingWorkExp = false;
                    me.clearInfo();
                },
                clearInfo: function () {
                    $scope.workExpAdd.start = undefined;
                    $scope.workExpAdd.end = undefined;
                    $scope.workExpAdd.company = undefined;
                    $scope.workExpAdd.position = undefined;
                },
                onSave: function (form) {
                    form.$submitted = true;
                    var me = this;
                    if (!form.$valid) {
                        return;
                    }
                    var start = $scope.workExpAdd.start.getTime();
                    var end = $scope.workExpAdd.end.getTime();
                    if (start > end) {
                        alert('结束时间必须大于开始时间');
                        return;
                    }
                    hrRequest.addWorkExperience({
                        number: $scope.number,
                        start: start,
                        end: end,
                        company: $scope.workExpAdd.company,
                        position: $scope.workExpAdd.position
                    }).then(function (res) {
                        info('添加成功');
                        $scope.addingWorkExp = false;
                        $scope.getWorkExperience();
                        form.$submitted = false;
                        me.clearInfo();
                    })
                }
            }
            init();

            /**
             * 初始化
             */
            function init() {
                if ($scope.commonInfo.type == codeConfig.AGENT_TYPE_CODE.REGULAR) {
                    $scope.isAgent = 1;
                }

                if ($scope.entryName == 'subordinate.self.baseInfo') {
                    $scope.canEditBaseInfo = true;
                    $scope.canEditWorkEduInfo = false;
                    $scope.showModMobile = true;
                    $scope.isSelfView = true;
                } else if ($scope.entryName == 'subordinate.info.baseInfo') {
                    $scope.canEditBaseInfo = false;
                    $scope.canEditWorkEduInfo = false;
                } else {
                    hrUtil.initEntryHRType($scope);
                    if ($scope.isFromRelationshipHR) {
                        $scope.canEditBaseInfo = true;
                        $scope.canEditWorkEduInfo = true;
                        /*                        if ($scope.commonInfo.status
                         == codeConfig.STAFF_STATUS_CODE.TO_JOIN) {
                         $scope.canEditBaseInfo = true;
                         }*/
                    }
                    if ($scope.isFromHRBP) {
                        $scope.canEditBaseInfo = true;
                        $scope.canEditWorkEduInfo = true;
                    }
                }
                $scope.disbaleBaseInput();
                $scope.getBaseInfo();
                hrUtil.initCommonInfo($scope);
                $scope.baseOptions = getBaseOptions('baseInfoForm', $scope, authUtil, workInfo, hrUtil,canModSelfFields);
                if ($scope.staffType !== 1) {
                    $scope.baseOptions.formalDate.forbid = true;
                }
                $scope.disbaleBaseInput($scope.baseOptions);
                $scope.getEducationExperience();
                $scope.getWorkExperience();
                initDownloadAuth();
            }

            /**
             * 下载权限
             */
            function initDownloadAuth() {
                if ($scope.isFromSalaryHR || $scope.isFromTrainingHR) {
                    $scope.canDownLoadFile = false;
                }
            }

            /**
             * 编辑个人信息1
             */
            function onEdit() {
                if ($scope.isSelfView) {
                    enableSelfCanModInput();
                } else {
                    $scope.enableBaseInput();
                }
                $scope.isReadOnly = false;
            };

            $scope.$watch('enterTime', function (newVal, oldVal) {
                if (!$scope.isReadOnly) {
                    modStaffDate(newVal);
                }
            })


            /**
             * 编辑个人信息2
             */
            function onEditPart2() {
                enableEducationExp(true);
                enableWorkExp(true);
                $scope.isReadOnly2 = false;
            };

            /**
             * 修改手机号点击
             */
            function modMobileClick() {
                hrOptUtil.validatePassword($scope.number, openModMobileView);
            }

            /**
             * 修改手机
             */
            function openModMobileView(param) {
                if (param.hadSuccess) {
                    hrOptUtil.modMobile($scope.number, param.password, openModMobileCallback);
                }
            }

            /**
             * 修改完手机号的回调
             * @param param
             */
            function openModMobileCallback(param) {
                if (param.hadSuccess) {
                    $scope.mobile = param.mobile;
                }
            }

            /**
             * 入职日期更改影响合同到期时间和转正日期的默认值
             * @param
             */
            function modStaffDate(param) {
                if (param && !$scope.isReadOnly) {
                    if ($scope.staffType === 1) {
                        $scope.baseOptions.formalDate.items = [{id:1,name:moment(param).add(3, 'month').format('YYYY/MM/DD')},
                                                               {id:2,name:moment(param).add(6, 'month').format('YYYY/MM/DD')}];
                        $scope.formalDate = 2;
                        $scope.contractEndDate = new Date(moment(param).add(3, 'year').format());
                    } else {
                        $scope.formalDate = undefined;
                        $scope.contractEndDate = new Date(moment(param).add(6, 'month').format());
                    }
                    $scope.baseOptions.contractEndDate.displayValue = moment($scope.contractEndDate).subtract(1, 'day').format('YYYY-MM-DD');
                }
            }
        }
    ]);
});