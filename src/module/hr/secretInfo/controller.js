/**
 * @file 新员工入职
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var getSecretOptions = require('./options');
    var getFamilyMemberOptions = require('./familyMemberInfo');
    var config = require('module/config');

    app.controller('hrSecretInfoCtrl', ['$scope', 'hrRequest', '$stateParams', 'localStorage', '$state', 'authUtil', 'hrUtil',
        function ($scope, hrRequest, $stateParams, localStorage, $state, authUtil, hrUtil) {
            $scope.number = localStorage.get('number');
            var codeConfig = require('module/codeConfig');

            /**
             * 入口
             * @type {string}
             */
            $scope.entryName = $state.current.name;


            $scope.familyMemberOptions = getFamilyMemberOptions('familyMemberAddForm');

            $scope.disbaleSecretInput = function () {
                hrUtil.disableOptions($scope.secretOptions);
                var data = $scope.familyList;
                if (data) {
                    for (var i = 0, item; item = data[i++];) {
                        item.disable = true;
                    }
                }
            };
            $scope.enableSecretInput = function () {
                hrUtil.enableOptions($scope.secretOptions);
            };

            function enableFamily(enable) {
                var data = $scope.familyList;
                for (var i = 0, item; item = data[i++];) {
                    item.disable = !enable;
                }
                $scope.isReadOnly2 = false;
            };

            $scope.isReadOnly = true;
            $scope.isReadOnly2 = true;

            $scope.onEdit = onEdit;
            $scope.onEditPart2 = onEditPart2;
            $scope.cancelPart1 = cancelPart1;
            $scope.cancelPart2 = cancelPart2;


            /**
             * get隐私信息
             */
            $scope.getSecretInfo = function () {
                hrRequest.getStaffSecretInfo({
                    number: $scope.number
                }).then(function (res) {
                    //$.extend(true, $scope, res.data);
                    var data = res.data;
                    $scope.cardNum = data.cardNum;
                    $scope.emergContactMobile = data.emergContactMobile;
                    $scope.personalEmail = data.personalEmail;
                    $scope.emergContact = data.emergContact;
                    $scope.address = data.address;
                    $scope.address = data.address;
                    $scope.bank = data.bank;
                    $scope.filePlace = data.filePlace;
                    $scope.secretOptions.bank.displayValue
                        = data.bankName;
                });
            };


            /**
             * 家庭成员查询
             */
            $scope.getFamilyMember = function () {
                hrRequest.getFamilyMember({
                    number: $scope.number
                }).then(function (res) {
                    for (var i = 0, item; item = res.data[i++];) {
                        if ($scope.isReadOnly2) {
                            item.disable = true;
                        }
                        item.mobile = +item.mobile;
                    }
                    $scope.familyList = res.data;
                });
            }

            $scope.familyMemberAdd = {
                addClick: function () {
                    $scope.addingFamilyMember = true;
                },
                onCancel: function () {
                    var me = this;
                    $scope.addingFamilyMember = false;
                    me.clearInfo();
                },
                clearInfo: function () {
                    $scope.familyMemberAdd.name = undefined;
                    $scope.familyMemberAdd.title = undefined;
                    $scope.familyMemberAdd.birthday = undefined;
                    $scope.familyMemberAdd.company = undefined;
                    $scope.familyMemberAdd.position = undefined;
                    $scope.familyMemberAdd.mobile = undefined;
                },
                onSave: function (form) {
                    form.$submitted = true;
                    var me = this;
                    if (!form.$valid) {
                        return;
                    }
                    hrRequest.addFamilyMember({
                        number: $scope.number,
                        name: $scope.familyMemberAdd.name,
                        title: $scope.familyMemberAdd.title,
                        birthday: $scope.familyMemberAdd.birthday && $scope.familyMemberAdd.birthday.getTime(),
                        company: $scope.familyMemberAdd.company,
                        position: $scope.familyMemberAdd.position,
                        mobile: $scope.familyMemberAdd.mobile
                    }).then(function (res) {
                        info('添加成功');
                        $scope.addingFamilyMember = false;
                        $scope.getFamilyMember();
                        form.$submitted = false;
                        me.clearInfo();
                    })
                }
            }

            /**
             * 保存隐私信息
             */
            $scope.saveSecretInfo = function (form) {
                if (!form.$valid) {
                    return;
                }
                var data = {
                    number: $scope.number,
                    cardNum: $scope.cardNum,
                    personalEmail: $scope.personalEmail,
                    emergContact: $scope.emergContact,
                    emergContactMobile: $scope.emergContactMobile,
                    address: $scope.address,
                    filePlace: $scope.filePlace,
                    bank: $scope.bank
                };
                hrRequest.saveSecretInfo(data).then(function () {
                    info('保存成功');
                    $scope.isReadOnly = true;
                    $scope.disbaleSecretInput();
                    $scope.getSecretInfo();
                });
            }

            init();

            /**
             * 初始化
             */
            function init() {
                $scope.getSecretInfo();
                hrUtil.initCommonInfo($scope);
                $scope.secretOptions = getSecretOptions('secretInfoForm', $scope);
                $scope.canEditSecretInfo = false;
                $scope.isReadOnly = true;

                if ($scope.entryName == 'subordinate.info.secretInfo') {
                    $scope.canEditSecretInfo = false;
                } else if ($scope.entryName == 'subordinate.self.secretInfo') {
                    $scope.canEditSecretInfo = true;
                } else {
                    hrUtil.initEntryHRType($scope);
                    if ($scope.isFromRelationshipHR) {
                        $scope.canEditSecretInfo = true;
                        /*                        if ($scope.commonInfo.status
                         == codeConfig.STAFF_STATUS_CODE.TO_JOIN) {
                         $scope.canEditSecretInfo = true;
                         }*/
                    }
                    if ($scope.isFromHRBP) {
                        $scope.canEditSecretInfo = true;
                    }
                }
                if ($scope.isReadOnly) {
                    $scope.disbaleSecretInput();
                }
                $scope.getFamilyMember();
                getBank();
            }

            $scope.$on('hasEntered', function () {
                $scope.canEditSecretInfo = false;
            });

            /**
             * 编辑编辑
             */
            function onEdit() {
                $scope.enableSecretInput();
                $scope.isReadOnly = false;
            }

            /**
             * 编辑个人信息2
             */
            function onEditPart2() {
                enableFamily(true);
                $scope.isReadOnly2 = false;
            };

            /**
             * 取消
             */
            function cancelPart1() {
                $scope.isReadOnly = true;
                $scope.disbaleSecretInput();
                // 重刷一下$scope里面的值
                $scope.getSecretInfo();
            }

            function cancelPart2() {
                enableFamily(false);
                $scope.isReadOnly2 = true;
            }

            /**
             * 查社发卡行
             */
            function getBank() {
                if ($scope.canEditSecretInfo) {
                    hrRequest.getBank().then(function (res) {
                        res.data.unshift(config.EMPTY);
                        $scope.secretOptions.bank.items = res.data;
                    })
                }
            }
        }
    ]);
});