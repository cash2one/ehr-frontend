/**
 * @file 新员工信息查询
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var nameConfig = require('module/nameConfig');
    var hrConfig = require('../config')
    var getColsConfig = require('./colsConfig');
    var getCustomColsConfig = require('./customCols');
    var searchConfig = require('./config');
    var moment = require('moment');

    app.controller('searchCtrl', ['$scope', 'hrRequest', '$state', 'hrUtil', 'localStorage', 'authUtil', 'util', 'hrOptUtil', 'adminUtil',
        function ($scope, hrRequest, $state, hrUtil, localStorage, authUtil, util, hrOptUtil, adminUtil) {
            var staffCode = codeConfig.STAFF_STATUS_CODE;
            var draftCode = staffCode.DRAFT;
            var staffStatusName = nameConfig.STAFF_STATUS;
            var queryData = {};

            /**
             * 当前页
             * @type {number}
             */
            $scope.currentPage = 1;

            $scope.pcTypeItems = util.buildSelectOpitons(nameConfig.PC_TYPE, true);

            /**
             * 自定义列确认
             * @param error
             */
            $scope.userDefineColConfirmHandler = function (error) {
                $scope.getTableCols();
                $scope.exportUrl = getExportUrl(queryData);
            };

            /**
             * 根据自定义显示字段初始化表格的列
             */
            $scope.getTableCols = function () {
                var allCols = getColsConfig($scope);
                var checkedValues = $scope.userDefineColOptions.checkedValues;
                var res = [];
                for (var i = 0, item; item = checkedValues[i++];) {
                    if (allCols[item]) {
                        res.push(allCols[item]);
                    }
                }
                res.unshift(allCols['serialNum'])
                res.push(allCols['opt']);
                $scope.tableOptions.cols = res;
            };

            /**
             * 点击查询
             */
            $scope.onSearch = function () {
                $scope.getList();
            };

            /**
             * 数据处理
             * @param data
             * @returns {*}
             */
            function processData(data) {
                for (var i = 0, item; item = data[i++];) {
                    item.canSeeInitInfo = false;
                    // 只是保存的信息不能查看初始信息
                    if ((item.optType != hrConfig.OPT_TYPE.SAVE && $scope.isOfferSearch) || $scope.isAssetManagerSearch || $scope.isItManagerSearch) {
                        item.canSeeInitInfo = true;
                        item.canAddAssetCode = true;//录入资产编码 by wangmeng
                    }

                    if (authUtil.isRelationshipHR() && item.status == staffCode.TO_JOIN && $scope.isToJoinSearch) {
                        item.canSeeJoinWork = true;
                    }
                    if (item.contractEndDate) {
                        item.contractEndDateValue = moment(item.contractEndDate).format('YYYY-MM-DD');
                    }

                    if ((item.status == staffCode.TO_JOIN || item.status == staffCode.DRAFT) && $scope.isAbandonSearch) {
                        item.canSeeAbandon = true;
                    }

                    if (($scope.isSubordinateSearch || $scope.isOwnerSearch)
                        && item.hasSubordinate) {
                        item.canSeeSubAccount = true;
                    }

                    item.serialNum = ($scope.currentPage - 1) * config.PAGE_SIZE + i;
                }
                return data;
            };

            /**
             * 获取列表
             */
            $scope.getList = function () {
                $scope.showExport = true;
                if (!$scope.query.month && $scope.entryName == 'hr.salaryBillSearch') {
                    alert('请输入查询月份');
                    return;
                }
                queryData = {
                    pageDto: {
                        pageNum: $scope.currentPage || 1,
                        pageSize: config.PAGE_SIZE
                    }
                };
                if ($scope.isSubordinateSearch) {
                    queryData.searchType = hrConfig.SEARCH_TYPE.SUBORDINATE;
                } else if ($scope.isOwnerSearch) {
                    queryData.searchType = hrConfig.SEARCH_TYPE.OWNER;
                } else if ($scope.isAdminSearch) {
                    queryData.searchType = hrConfig.SEARCH_TYPE.ADMIN;
                } else if (!$scope.isRecruitHRSearch) {
                    // 招聘hr的接口不用这个参数
                    queryData.searchType = hrConfig.SEARCH_TYPE.HR;
                }

                for (var key in $scope.query) {
                    if ($scope.query.hasOwnProperty(key)) {
                        if (typeof $scope.query[key] != 'undefined' && $scope.query[key] !== null) {
                            if ($scope.query[key] instanceof Date) {
                                queryData[key] = $scope.query[key].getTime();
                            } else {
                                // 传username..不是招聘hr的时候
                                if (key == 'name' && !$scope.isRecruitHRSearch) {
                                    queryData['userName'] = util.getUsernameFromSuggestion(
                                        $scope.query[key]);
                                } else if (key == 'leader') {
                                    queryData[key] = util.getUsernameFromSuggestion(
                                        $scope.query[key]);
                                } else if (key == 'structure') {
                                    queryData.structure = $scope.query.structure.id;
                                } else if (key == 'pcType') {
                                    queryData[key] = +$scope.query[key];
                                } else {
                                    queryData[key] = $scope.query[key];
                                }
                            }
                        }
                    }
                }
                if (!$scope.query.status) {
                    queryData.status = hrUtil.getFieldSet($scope.staffStatus, 'id').join(',');
                } else {
                    queryData.status = '' + $scope.query.status;
                }
                var request = hrRequest.getStaffInfo;
                if ($scope.isRecruitHRSearch) {
                    request = hrRequest.getPreEnterInfo;
                }

                request(queryData).then(function (data) {
                    $scope.tableOptions.data = processData(data.data);
                    $scope.tableOptions.totalCount = (data.pageDto && data.pageDto.count) || 0;
                });
                $scope.exportUrl = getExportUrl(queryData);
            }

            /**
             * 查看初始信息
             */
            $scope.viewInitInfo = function (number) {
                localStorage.set('number', number);
                hrUtil.showInitInfo(number);
            };
            /**
             * 录入员工资产编码 by wangmeng
             */
            $scope.addAssetCodeClick = function (item) {
                hrUtil.showAssetAddInfo(item, $scope.getList);
            };
            /**
             * 办理员工入职
             * @param number
             */
            $scope.joinWorkClick = function (number) {
                hrUtil.joinWork(number).then(function (res) {
                    $scope.getList();
                });
            };

            /**
             * 放弃
             * @param number
             */
            $scope.abandonClick = function (number) {
                hrOptUtil.desertCondidate(number, function (param) {
                    if (param.hadSuccess) {
                        $scope.getList();
                    }
                });
            };


            /**
             * 员工信息查看
             * @param number
             * @param type
             */
            $scope.viewInfo = function (number, type) {
                localStorage.set('number', number);
                var url = '';
                if (type == 'newerSearch') {
                    $state.go('hr.newerEdit');
                    return;
                } else if (type == 'search') {
                    if ($state.current.name == 'hr.toJoinSearch') {
                        $scope.isRelationshipHRSearch = true;
                    }
                    if ($state.current.name == 'hr.salaryBillSearch') {
                        $scope.isSalaryHRSearch = true;
                    }
                    if ($state.current.name == 'admin.search') {
                        $scope.isAdminSearch = true;
                    }
                    if ($scope.isBusinessPartnerHRSearch) {
                        url = $state.href('hr.businessPartnerHR-staffInfo.baseInfo');
                    } else if ($scope.isTrainingHRSearch) {
                        url = $state.href('hr.trainingHR-staffInfo.baseInfo');
                    } else if ($scope.isRelationshipHRSearch) {
                        url = $state.href('hr.relationshipHR-staffInfo.baseInfo');
                    } else if ($scope.isSalaryHRSearch) {
                        url = $state.href('hr.salaryHR-staffInfo.baseInfo');
                    } else if ($scope.isAdminSearch) {
                        url = $state.href('admin.staffInfo.baseInfo');
                    }
                } else if (type == 'subordinateSearch') {
                    url = $state.href('subordinate.info.baseInfo');
                }
                // window.location.href = url;
                hrOptUtil.viewDetail(url, function () {
                    $scope.getList();
                });
            }

            /**
             * 权限设置
             */
            $scope.setPermission = function (number) {
                localStorage.set('number', number);
                window.location.href = '#/admin/permission';
            };

            /**
             * 修改关键信息
             */
            $scope.modKeyInfo = function (item) {
                adminUtil.modKeyInfo(item, function (param) {
                    if (param.hadSuccess) {
                        $scope.getList();
                    }
                });
            };

            /**
             * 没有正式入职的状态组合
             * @returns {*[]}
             */
            $scope.getPreEnterStaffStatuses = function () {
                var res = [
                    {
                        id: staffCode.DRAFT,
                        name: staffStatusName[staffCode.DRAFT]
                    },
                    {
                        id: staffCode.TO_JOIN,
                        name: staffStatusName[staffCode.TO_JOIN]
                    }
                ];
                res.unshift(config.EMPTY);
                return res;
            }

            /**
             * leader名字点击
             * @param item
             */
            $scope.viewSubAccountClick = function (item) {
                if ($scope.query.leader) {
                    var split = $scope.query.leader.split(',');
                    // 当前的leader存储起来
                    $scope.leaderStack.push({
                        leader: split[1],
                        leaderName: split[0]
                    });
                } else {
                    $scope.leaderStack.push({
                        leader: undefined,
                        leaderName: undefined
                    })
                }

                $scope.query.leader = util.getShowUserName(item.userName, item.name);
                $scope.getList();
            }


            /**
             *  返回上一级
             */
            $scope.returnLastLeaderClick = function () {
                var item = $scope.leaderStack.pop();
                if (item.leader) {
                    $scope.query.leader = util.getShowUserName(item.leader, item.leaderName);
                } else {
                    $scope.query.leader = undefined;
                }
                $scope.getList();
            };


            /**
             * 导出的url
             */
            function getExportUrl(data) {
                var path = hrConfig.PATH.STAFF_EXPORT;
                if ($scope.isRecruitHRSearch) {
                    path = hrConfig.PATH.NEW_STAFF_EXPORT;
                }
                var param = hrUtil.getObjectQueryString(data);
                var res = (param == '' ? path : path + '?' + param + '&fields=' + getExportField().join(','));
                return res;
            }

            /**
             * 转为导出的时候的field
             */
            function getExportField() {
                var colsConfig = getColsConfig($scope);
                var checkedValues = $scope.userDefineColOptions.checkedValues;
                var res = [];
                for (var i = 0, value; value = checkedValues[i++];) {
                    var field = colsConfig[value].field;
                    if (field == 'baseSalary') {
                        res.push('baseSalaryValue');
                        res.push('baseSalaryTypeValue');
                    } else if (field == 'probationarySalary') {
                        res.push('probationarySalaryValue');
                        res.push('probationarySalaryTypeValue');
                    } else {
                        res.push(field);
                    }
                }
                return res;
            }

            /**
             * 入口
             * @type {string}
             */
            $scope.entryName = $state.current.name;


            /**
             * 是否显示导出按钮
             * @type {boolean}
             */
            $scope.showExport = false;

            $scope.title = '员工信息查询';

            $scope.query = {};


            $scope.staffStatus = util.buildSelectOpitons(
                nameConfig.STAFF_STATUS
            );

            $scope.staffType = util.buildSelectOpitons(
                nameConfig.TYPE
            );

            // 组织架构选择的配置
            $scope.structureOptions = {};

            $scope.staffStatus.unshift(config.EMPTY);
            $scope.staffType.unshift(config.EMPTY);

            $scope.showCustomCols = true;

            var hasRoles = $scope.userInfo.hasRoles;
            var roleType = codeConfig.ROLE_TYPE;
            var defaultCols = [];
            switch ($scope.entryName) {
                case 'hr.toJoinSearch':
                    $scope.isToJoinSearch = true;
                    $scope.title = '待入职员工查询';
                    $scope.isHRSearch = true;
                    $scope.query.status = staffCode.TO_JOIN;
                    $scope.staffStatus = [
                        {
                            id: staffCode.TO_JOIN,
                            name: staffStatusName[staffCode.TO_JOIN]
                        }
                    ];
                    $scope.query.roleType = roleType.RELATIONSHIP_HR;
                    $scope.structureOptions.manageNodes = hasRoles.relationshipHR;
                    $scope.isRelationshipHRSearch = true;
                    defaultCols = searchConfig.DEFAULT_COLS.RELATIONSHIP_HR;
                    break;
                case 'hr.abandonSearch':
                    $scope.isAbandonSearch = true;
                    $scope.title = '候选人放弃';
                    $scope.staffStatus = $scope.getPreEnterStaffStatuses();
                    $scope.structureOptions.manageNodes = hasRoles.recruitHR;
                    defaultCols = searchConfig.DEFAULT_COLS.RECRUIT_HR;
                    break;
                case 'hr.assetManagerSearch':
                    $scope.isAssetManagerSearch = true;
                    $scope.title = '资产管理';
                    $scope.showCustomCols = false;
                    $scope.query.roleType = roleType.ASSET_MANAGER;
                    // $scope.query.status = staffCode.HAS_JOINED;
                    var res = [
                        {
                            id: staffCode.TO_JOIN,
                            name: staffStatusName[staffCode.TO_JOIN]
                        },
                        {
                            id: staffCode.HAS_JOINED,
                            name: staffStatusName[staffCode.HAS_JOINED]
                        }
                    ];
                    res.unshift(config.EMPTY);
                    $scope.staffStatus = res;
                    $scope.structureOptions.manageNodes = hasRoles.assetManager;
                    defaultCols = searchConfig.DEFAULT_COLS.ASSET_MANAGER;
                    break;
                case 'hr.itManagerSearch':
                    $scope.isItManagerSearch = true;
                    $scope.title = 'IT管理';
                    $scope.showCustomCols = false;
                    $scope.query.roleType = roleType.IT_OWNER;
                    // $scope.query.status = staffCode.HAS_JOINED;
                    var res = [
                        {
                            id: staffCode.TO_JOIN,
                            name: staffStatusName[staffCode.TO_JOIN]
                        },
                        {
                            id: staffCode.HAS_JOINED,
                            name: staffStatusName[staffCode.HAS_JOINED]
                        }
                    ];
                    res.unshift(config.EMPTY);
                    $scope.staffStatus = res;
                    $scope.structureOptions.manageNodes = hasRoles.itOwner;
                    defaultCols = searchConfig.DEFAULT_COLS.IT_MANAGER;
                    break;
                case 'subordinate.search':
                    $scope.isSubordinateSearch = true;
                    $scope.title = '下属查询';
                    var userInfo = $scope.userInfo;
                    if (!$scope.userInfo.isAgent) {
                        $scope.staffStatus = [
                            {
                                id: staffCode.HAS_JOINED,
                                name: staffStatusName[staffCode.HAS_JOINED]
                            },
                            {
                                id: staffCode.TO_LEAVE,
                                name: staffStatusName[staffCode.TO_LEAVE]
                            }
                        ];
                        defaultCols = searchConfig.DEFAULT_COLS.MANAGER;
                    } else {
                        $scope.staffStatus = getAgentStatus();
                        defaultCols = searchConfig.DEFAULT_COLS.AGENT;
                    }
                    $scope.query.status = staffCode.HAS_JOINED;

                    $scope.structureOptions.manageNodes = [config.STRUCTURE_ROOT_ID];
                    //defaultCols = searchConfig.DEFAULT_COLS.MANAGER;
                    break;
                case 'subordinate.ownerSearch':
                    $scope.isOwnerSearch = true;
                    $scope.title = '部门员工查询';
                    var userInfo = $scope.userInfo;

                    if (!$scope.userInfo.isAgent) {
                        removeStatus(draftCode);
                        defaultCols = searchConfig.DEFAULT_COLS.OWNER;
                    } else {
                        $scope.staffStatus = getAgentStatus();
                        defaultCols = searchConfig.DEFAULT_COLS.AGENT;
                    }
                    $scope.query.status = staffCode.HAS_JOINED;
                    $scope.structureOptions.manageNodes = hasRoles.roleOwner;

                    break;
                case 'hr.newerSearch':
                    $scope.isOfferSearch = true;
                    $scope.title = 'offer信息查询';
                    $scope.structureOptions.manageNodes = hasRoles.recruitHR;
                    defaultCols = searchConfig.DEFAULT_COLS.RECRUIT_HR;
                    break;
                case 'admin.search':
                    $scope.isAdminSearch = true;
                    $scope.query.status = staffCode.HAS_JOINED;
                    // 去掉草稿
                    removeStatus(draftCode);
                    $scope.showCustomCols = false;
                    $scope.structureOptions.manageNodes = [config.STRUCTURE_ROOT_ID];
                    defaultCols = searchConfig.DEFAULT_COLS.ADMIN;
                    break;
                case 'hr.salaryHRSearch':
                    $scope.isHRSearch = true;
                    $scope.isSalaryHRSearch = true;
                    $scope.title = '员工信息查询-薪酬';
                    $scope.query.status = staffCode.HAS_JOINED;
                    // 去掉草稿
                    removeStatus(draftCode);
                    $scope.structureOptions.manageNodes = hasRoles.salaryHR;
                    $scope.query.roleType = roleType.SALARY_HR;
                    defaultCols = searchConfig.DEFAULT_COLS.SALARY_HR;
                    break;
                case 'hr.relationshipHRSearch':
                    $scope.isHRSearch = true;
                    $scope.isRelationshipHRSearch = true;
                    $scope.title = '员工信息查询-员工关系';
                    $scope.query.status = staffCode.HAS_JOINED;
                    if (!$scope.userInfo.isAgent) {
                        // 去掉草稿
                        removeStatus(draftCode);
                        defaultCols = searchConfig.DEFAULT_COLS.RELATIONSHIP_HR;
                    } else {
                        $scope.staffStatus = getAgentStatus();
                        defaultCols = searchConfig.DEFAULT_COLS.AGENT;
                    }

                    $scope.query.roleType = roleType.RELATIONSHIP_HR;
                    $scope.structureOptions.manageNodes = hasRoles.relationshipHR;

                    break;
                case 'hr.trainingHRSearch':
                    $scope.isHRSearch = true;
                    $scope.isTrainingHRSearch = true;
                    $scope.title = '员工信息查询-培训';
                    $scope.query.roleType = roleType.TRAINING_HR;
                    $scope.query.status = staffCode.HAS_JOINED;
                    // 去掉草稿
                    removeStatus(draftCode);
                    $scope.structureOptions.manageNodes = hasRoles.trainingHR;
                    defaultCols = searchConfig.DEFAULT_COLS.TRAINING_HR;
                    break;
                case 'hr.businessPartnerHRSearch':
                    $scope.isHRSearch = true;
                    $scope.isBusinessPartnerHRSearch = true;
                    $scope.title = '员工信息查询-HRBP';
                    $scope.query.status = staffCode.HAS_JOINED;
                    // 去掉草稿
                    removeStatus(draftCode);
                    $scope.structureOptions.manageNodes = hasRoles.businessPartnerHR;
                    $scope.query.roleType = roleType.HRBP;
                    defaultCols = searchConfig.DEFAULT_COLS.HRBP_HR;
                    break;
            }

            if ($scope.isOfferSearch || $scope.isAbandonSearch) {
                $scope.isRecruitHRSearch = true;
            }

            $scope.leaderStack = [];


            /**
             * 表格配置
             */
            $scope.tableOptions = {
                data: [],
                canSelect: true,
                totalCount: 0,
                cols: [],
                pageSize: config.PAGE_SIZE,
                onPageChange: function (pageNum) {
                    $scope.currentPage = pageNum;
                    $scope.getList();
                }
            };

            /**
             * 自定义列配置
             */
            $scope.userDefineColOptions = {
                data: getCustomColsConfig($scope),

                name: '自定义显示字段',

                maxItems: 50,

                /**
                 * 自定义列初始化
                 * @type {string[]}
                 */
                checkedValues: defaultCols
            }

            /**
             * 移除查询的某种状态
             */
            function removeStatus(status) {
                for (var i = 0, item; item = $scope.staffStatus[i++];) {
                    if (item.id == status) {
                        $scope.staffStatus.splice(i - 1, 1);
                        return;
                    }
                }
            }

            /**
             * 查询代理商员工状态
             */
            function getAgentStatus() {
                var res = [
                    {
                        id: staffCode.HAS_JOINED,
                        name: staffStatusName[staffCode.HAS_JOINED]
                    },
                    {
                        id: staffCode.LEAVED,
                        name: staffStatusName[staffCode.LEAVED]
                    }
                ];
                res.unshift(config.EMPTY);
                return res;
            }

            $scope.getTableCols();

            $scope.getList();
        }
    ]);
});