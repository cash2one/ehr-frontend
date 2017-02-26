/**
 * @file 新员工入职
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var getWorkOptions = require('./options');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');

    app.controller('hrWorkInfoCtrl', ['$scope', 'hrRequest', 'adminRequest', '$stateParams', 'localStorage', '$state', 'authUtil', 'hrUtil', 'util',
        function ($scope, hrRequest, adminRequest, $stateParams, localStorage, $state, authUtil, hrUtil, util) {
            $scope.number = localStorage.get('number');
            $scope.structure = {};
            $scope.isReadOnly = true;

            /**
             * 入口
             * @type {string}
             */
            $scope.entryName = $state.current.name;

            $scope.workOptions = getWorkOptions('workInfoForm', $scope);

            $scope.onEdit = onEdit;


            /**
             * 查询签约公司
             */
            $scope.getContractCompany = function () {
                if ($scope.canEditWorkInfo) {
                    hrRequest.getContractCompany().then(function (res) {
                        res.data.unshift(config.EMPTY);
                        $scope.workOptions.contractCompany.items = res.data;
                    })
                }
            };

            /**
             * 禁止工作信息的修改
             */
            $scope.disbaleWorkInput = function () {
                hrUtil.disableOptions($scope.workOptions);
            };

            /**
             * get岗位信息
             */
            $scope.getWorkInfo = function () {
                hrRequest.getStaffWorkInfo({
                    number: $scope.number
                }).then(function (res) {
                    $.extend(true, $scope, res.data);
                    $scope.leader = util.getShowUserName($scope.leader, $scope.leaderName);
                    $scope.workOptions.contractCompany.displayValue = $scope.contractCompanyName;
                    $scope.workOptions.office.displayValue = $scope.officeName;
                    $scope.workOptions.socialSecurityCity.displayValue
                        = $scope.socialSecurityCityName;
                    getKeyNodeInfo();
                });
            };


            /**
             * 保存工作信息
             */
            $scope.saveWorkInfo = function (form) {
                if (!form.$valid) {
                    return;
                }
                var data = {
                    number: $scope.number,
                    office: $scope.office,
                    socialSecurityCity: $scope.socialSecurityCity,
                    contractCompany: $scope.contractCompany,
                    sit: $scope.sit,
                    icCardNumber: $scope.icCardNumber,
                    remotePunchCard: $scope.remotePunchCard,
                    requireCheckTime: $scope.requireCheckTime
                };
                hrRequest.saveWorkInfo(data).then(function () {
                    info('保存成功');
                    $scope.isReadOnly = true;
                    $scope.disbaleWorkInput();
                    $scope.getWorkInfo();
                });
            };

            init();


            function init() {
                if ($scope.entryName == 'subordinate.self.workInfo') {
                    $scope.canEditWorkInfo = true;
                } else if ($scope.entryName == 'subordinate.info.workInfo') {
                    $scope.canEditWorkInfo = false;
                } else {
                    hrUtil.initEntryHRType($scope);
                    if ($scope.isFromHRBP) {
                        $scope.canEditWorkInfo = true;
                    }
                    if ($scope.isFromRelationshipHR) {
                        $scope.canEditWorkInfo = true;
                        /*                        if ($scope.commonInfo.status
                         == codeConfig.STAFF_STATUS_CODE.TO_JOIN) {
                         $scope.canEditWorkInfo = true;
                         }*/
                    }
                }
                if (!$scope.canEditWorkInfo || $scope.isReadOnly) {
                    $scope.disbaleWorkInput();
                }
                $scope.getWorkInfo();
                hrUtil.initCommonInfo($scope);
                $scope.getContractCompany();
                getOffice();
                getSocialSecurityCity();
            }

            /**
             * 编辑编辑
             */
            function onEdit() {
                if ($scope.entryName == 'subordinate.self.workInfo') {
                    $scope.workOptions['sit'].disable = false;
                } else {
                    $scope.workOptions['sit'].disable = false;
                    $scope.workOptions['icCardNumber'].disable = false;
                    $scope.workOptions['remotePunchCard'].disable = false;
                    $scope.workOptions['requireCheckTime'].disable = false;
                    if ($scope.commonInfo.status
                        == codeConfig.STAFF_STATUS_CODE.TO_JOIN) {
                        $scope.workOptions['office'].disable = false;
                        $scope.workOptions['contractCompany'].disable = false;
                        if ($scope.commonInfo.type
                            == codeConfig.TYPE_CODE.REGULAR) {
                            $scope.workOptions['socialSecurityCity'].disable = false;
                        }
                    }
                }
                $scope.isReadOnly = false;
            }

            /**
             * 查询办公地点
             */
            function getOffice() {
                if ($scope.canEditWorkInfo) {
                    hrRequest.getOffice().then(function (res) {
                        res.data.unshift(config.EMPTY);
                        $scope.workOptions.office.items = res.data;
                    })
                }
            }

            /**
             * 查社保缴纳城市
             */
            function getSocialSecurityCity() {
                if ($scope.canEditWorkInfo) {
                    hrRequest.getSocialSecurityCity().then(function (res) {
                        res.data.unshift(config.EMPTY);
                        $scope.workOptions.socialSecurityCity.items = res.data;
                    })
                }
            }

            /**
             * 获取结算结点信息
             */
            function getKeyNodeInfo() {
                adminRequest.getKeyNodeInfo({
                    structure: $scope.structure
                }).then(function (res) {
                    if (res.data.punchCard) {
                        $scope.isPunchCardNode = true;
                    } else {
                        $scope.isPunchCardNode = false;
                    }
                })
            }
        }
    ]);
});