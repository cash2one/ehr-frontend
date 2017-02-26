/**
 * @file 代理商入职/再入职
 * @author Minsi Zhan zhanminsi@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    var getBaseOptions = require('./options/baseInfo');
    var getContactOptions = require('./options/contactInfo');
    var getInfoOptions = require('./options/info');
    var getOtherOptions = require('./options/otherInfo');

    var getEducationOptions = require('./options/educationInfo');
    var getWorkExpOptions = require('./options/workExpInfo');

    var codeConfig =require('module/codeConfig');
    var typeCode = codeConfig.TYPE_CODE;
    var hrConfig = require('../config');
    var staffStatus = codeConfig.STAFF_STATUS_CODE;
    var applyConfig = require('module/apply/config');
    var moment = require('moment');

    app.controller('agentCtrl',
        ['$scope', 'hrRequest', '$stateParams', 'localStorage', '$state', 'hrUtil', 'hrOptUtil', 'util', '$filter',
        function ($scope, hrRequest, $stateParams, localStorage, $state, hrUtil, hrOptUtil, util, $filter) {



            function init() {
                initEntry();
                initEntryRelatedVar();

                if ($scope.entry == 'rejoin') {
                    hrOptUtil.rejoin(rejoinSearchCallback);
                }
            }

            init();

            /**
             * 初始化入口
             */
            function initEntry() {
                $scope.entry = '';
                switch ($state.current.name) {
                    // 候选人
                    case 'hr.toJoinSearchAgent':
                        $scope.entry = 'newer';
                        break;
                    case 'hr.rejoinAgent':
                        $scope.entry = 'rejoin';
                        break;
                }
            }

            /**
             * 入口相关的一些变量
             */
            function initEntryRelatedVar() {
                if ($scope.entry == 'newer') {
                    $scope.title = '办理入职手续';
                    $scope.isReadOnly = false;
                }
                if ($scope.entry == 'rejoin') {
                    $scope.title = '员工再入职';
                }
                $scope.rejoinForibidFields = ['name', 'lawName', 'namePinyin', 'sex', 'birthday', 'beginWorkTime',
                    'isForeign', 'idCardNumber'];

                var formName = "agentEnterForm";

                $scope.baseOptions = getBaseOptions(formName);
                $scope.contactOptions = getContactOptions(formName);
                $scope.infoOptions = getInfoOptions(formName, $scope);
                $scope.otherOptions = getOtherOptions('otherInfoForm');

                $scope.educationAddOptions = getEducationOptions('educationAddForm');
                $scope.workExpAddOptions = getWorkExpOptions('workExpAddForm');

                // 个人信息id数组
                $scope.workExperienceId = [];
                $scope.eduExperienceId = [];

                $scope.isReadOnly2 = true;
                $scope.onEditPart2 = onEditPart2;
                $scope.cancelPart2 = cancelPart2;
                $scope.workExpList = [];
                $scope.educationList = [];
                $scope.submit = submit;
            }

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

            /**
             * 再入职查询的回调
             */
            function rejoinSearchCallback(data) {
                if (data.staffInfo) {
                    $.extend(true, $scope, data.staffInfo);
                    $scope.idCardNumber = data.idCardNumber;
                    adaptData();
                    $scope.getWorkExperience();
                    $scope.getEducationExperience();
                    $scope.rejoinForibidFields.forEach(function (item, index) {
                        $scope.baseOptions[item].disable = true;
                    })
                }
            }

            function adaptData() {
                if ($scope.enterTime) {
                    $scope.promiseEnterDate = new Date($scope.enterTime);
                }
                if ($scope.beginWorkTime) {
                    $scope.beginWorkTime = new Date($scope.beginWorkTime);
                }
                if ($scope.birthday) {
                    $scope.birthday = new Date(util.formatTime($scope.birthday) + ' 00:00:00');
                }

                if ($scope.leader) {
                    $scope.leader = $scope.leaderName + ',' + $scope.leader;
                }

                $scope.structure = {
                    id: $scope.structure,
                    name: $scope.structureName
                }
                $scope.otherOptions.resumeStorageId.fileUrl = $scope.resumeUrl;
                $scope.otherOptions.idCardAndContract.fileUrl = $scope.idCardAndContractUrl;
                $scope.otherOptions.idCardUpload.fileUrl = $scope.idCardUploadUrl;
                $scope.otherOptions.limitAgreement.fileUrl = $scope.limitAgreementUrl;
            }

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

            /**
             * 教育经历变为可编辑的
             */
            function enableEducationExp(enable) {
                var data = $scope.educationList;
                for (var i = 0, item; item = $scope.educationList[i++];) {
                    item.disable = !enable;
                }
                $scope.educationList = data;
            }

            /**
             * 工作经历变为可编辑的
             */
            function enableWorkExp(enable) {
                var data = $scope.workExpList;
                for (var i = 0, item; item = $scope.workExpList[i++];) {
                    item.disable = !enable;
                }
                $scope.workExpList = data;
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
                /**
                 * 保存
                 */
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
                        var educationInfo = {
                            id: res.data,
                            start: new Date(start),
                            end: new Date(end),
                            school: $scope.educationAdd.school,
                            discipline: $scope.educationAdd.discipline,
                            degree: $scope.educationAdd.degree,
                            disable: false
                        };

                        $scope.educationList.push(educationInfo);
                        $scope.eduExperienceId.push(res.data);
                        form.$submitted = false;
                        me.clearInfo();
                    })
                }
            };

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
                        var workInfo = {
                            id: res.data,
                            start: new Date(start),
                            end: new Date(end),
                            company: $scope.workExpAdd.company,
                            position: $scope.workExpAdd.position,
                            disable: false
                        };

                        $scope.workExpList.push(workInfo);
                        $scope.workExperienceId.push(res.data);
                        form.$submitted = false;
                        me.clearInfo();
                    })
                }
            }

            /**
             * 取消
             */
            function cancelPart2 () {
                enableEducationExp(false);
                enableWorkExp(false);
                $scope.isReadOnly2 = true;
            }

            /**
             * 编辑个人信息2
             */
            function onEditPart2() {
                enableEducationExp(true);
                enableWorkExp(true);
                $scope.isReadOnly2 = false;
            };

            /**
             * 把字段变成必填项目
             * @param field
             * @param options
             */
            function isFilled(field, form) {
                if (field == 'structure') {
                    if (!($scope[field] && $scope[field].id)) {
                        form[field].$error.requiredSubmitted = true;
                        return false;
                    }
                }
                if (typeof $scope[field] == 'undefined') {
                    if (field == 'leader') {
                        form[field].$error.sugguestionRequired = true;
                        return false;
                    }
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
             * 组合查询数据
             */
            function getQueryData() {
                var res = {
                    // 自然信息
                    name: $scope.name || $scope.lawName,
                    namePinyin: $scope.namePinyin,
                    sex: $scope.sex,
                    degree: $scope.degree,
                    lawName: $scope.lawName,
                    isForeign: $scope.isForeign,
                    idCardNumber: $scope.idCardNumber,
                    accountLocation: $scope.accountLocation,
                    birthday: $scope.birthday,
                    beginWorkTime: $scope.beginWorkTime,
                    type: codeConfig.AGENT_TYPE_CODE.REGULAR,
                    // 联系方式
                    mobile: $scope.mobile,
                    personalEmail: $scope.personalEmail,
                    // 基本信息
                    promiseEnterDate: $scope.promiseEnterDate && $scope.promiseEnterDate.getTime(),
                    structure: $scope.structure && $scope.structure.id,
                    structureName: $scope.structure && $scope.structure.name,
                    level: $scope.level,
                    position: $scope.position,
                    leader: util.getUsernameFromSuggestion($scope.leader),
                    //个人信息
                    workExperienceId: $scope.workExperienceId,
                    eduExperienceId: $scope.eduExperienceId,
                    // 其他信息
                    resumeStorageId: $scope.resumeStorageId,
                    idCardAndContract: $scope.idCardAndContract,
                    idCardUpload: $scope.idCardUpload,
                    limitAgreement: $scope.limitAgreement,
                    detail: $scope.detail,
                    recommendType: $scope.recommendType,
                    recommendDetail: $scope.recommendDetail
                }
                return res;
            }

            /**
             * 清空数据
             * @param dataQuery
             */
            function clearData(dataQuery) {
                var urlField = ['resumeStorageId', 'idCardAndContract', 'idCardUpload', 'limitAgreement'];
                for (var key in dataQuery) {
                    if (urlField.indexOf(key) !== -1) {
                        $scope.otherOptions[key].fileUrl = undefined;
                    }
                    $scope[key] = undefined;
                }
                $scope['levelIndex'] = undefined;
                $scope.workExpList = [];
                $scope.educationList = [];
            }

            /**
             * 提交
             */
            function submit() {
                var form1 = $scope.agentEnterForm;
                var form2 = $scope.otherInfoForm;
                form1.$submitted = true;
                form2.$submitted = true;

                var checkInfoOption = checkRequired($scope.infoOptions, form1);

                if (!form1.$valid || !form2.$valid || !checkInfoOption) {
                    return;
                }

                var dataQuery = getQueryData();

                var request = hrRequest.submitPreEnterInfo;
                var data = {
                    content: dataQuery,
                    type: codeConfig.APPLY_CODE.AGENT_ENTER
                }

                if ($scope.entry == "rejoin") {
                    var number = $scope.number;
                    data.type = codeConfig.APPLY_CODE.AGENT_REJOIN;
                    data.editedNumber = number;
                    data.content.number = number;
                }
                request(data).then(function (res) {
                    alert('系统已经接受了您的请求，开始审批流程，请注意查看审批结果邮件');
                    clearData(dataQuery);
                    form1.$submitted = false;
                    form2.$submitted = false;
                })
            }

        }]);
})