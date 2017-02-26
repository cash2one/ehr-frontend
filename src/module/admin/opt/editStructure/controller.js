/**
 * @file 编辑组织架构
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var getInputOptions = require('./inputOptions');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var closeParam = {};

    app.controller('adminEditStructureCtrl', ['$scope', 'adminRequest', '$stateParams', 'localStorage', '$state', 'util', '$modalInstance', 'parentId', 'nodeId', 'hrRequest',
        function ($scope, adminRequest, $stateParams, localStorage, $state, util, $modalInstance, parentId, nodeId, hrRequest) {

            function getFieldArray(list, field) {
                if (!list) {
                    return undefined;
                }
                var res = [];
                for (var i = 0, item; item = list[i++];) {
                    res.push(item[field]);
                }
                if (res.length) {
                    return res;
                }
                return undefined;
            }


            /**
             * 确认
             */
            $scope.save = function (form) {
                if (!form.$valid) {
                    return;
                }
                var owner = util.getUsernameFromSuggestion($scope.owner);
                var ownerName = util.getNameFromSuggestion($scope.owner);
                if ($scope.punchDevice == '' || $scope.punchDevice == null) {
                    $scope.punchDevice = undefined;
                }
                var data = {
                    name: $scope.name,
                    shortName: $scope.shortName,
                    owner: owner ? [owner] : [],
                    ownerName: ownerName ? [ownerName] : [],
                    recruitHR: getFieldArray($scope.recruitHR, 'userName'),
                    recruitHRName: getFieldArray($scope.recruitHR, 'name'),
                    salaryHR: getFieldArray($scope.salaryHR, 'userName'),
                    salaryHRName: getFieldArray($scope.salaryHR, 'name'),
                    relationshipHR: getFieldArray($scope.relationshipHR, 'userName'),
                    relationshipHRName: getFieldArray($scope.relationshipHR, 'name'),
                    trainingHR: getFieldArray($scope.trainingHR, 'userName'),
                    trainingHRName: getFieldArray($scope.trainingHR, 'name'),
                    businessPartnerHR: getFieldArray($scope.businessPartnerHR, 'userName'),
                    businessPartnerHRName: getFieldArray($scope.businessPartnerHR, 'name'),
                    assetManager: getFieldArray($scope.assetManager, 'userName'),
                    assetManagerName: getFieldArray($scope.assetManager, 'name'),
                    itOwner: getFieldArray($scope.itOwner, 'userName'),
                    itOwnerName: getFieldArray($scope.itOwner, 'name'),
                    reception: getFieldArray($scope.reception, 'userName'),
                    receptionName: getFieldArray($scope.reception, 'name'),
                    punchDevice: $scope.punchDevice,
                    isKeyNode: $scope.isKeyNode ? 1 : 0,
                    isPunchCard: $scope.isPunchCard,
                    socialSecurityCity: $scope.socialSecurityCity,
                    levelTemplate: $scope.levelTemplate,
                    calendar: $scope.calendar,
                    mailSuffix: $scope.mailSuffix,
                    taxLocal: $scope.taxLocal ? 1 : 0,
                    isWelfareDefault: $scope.isWelfareDefault ? 1 : 0,
                    isGroupNode: $scope.isGroupNode? 1 : 0,
                    mealSubsidy: $scope.mealSubsidy ? +$scope.mealSubsidy : 0,
                    numberPrefix: $scope.numberPrefix,
                    lowestSalary: $scope.lowestSalary
                };
                // 不是缴纳结点 都不起作用
                if (!data.isKeyNode) {
                    data.socialSecurityCity = '';
                    data.levelTemplate = '';
                    data.taxLocal = 0;
                    data.isWelfareDefault = 0;
                    data.mealSubsidy = 0;
                    data.isPunchCard = 0;
                    data.reception = [];
                    data.receptionName = [];
                    data.punchDevice = undefined;
                } else {
                    if (data.isPunchCard == 0) {
                        data.reception = [];
                        data.receptionName = [];
                        data.punchDevice = undefined;
                    }
                    if (!data.salaryHR) {
                        alert('请为工资结算结点配置薪酬HR');
                        return;
                    }
                }
                var request = adminRequest.addStructure;
                if ($scope.isEdit) {
                    data.id = nodeId;
                    // 根结点没有parentStructure
                    if ($scope.parentStructure.id) {
                        data.parentStructure = $scope.parentStructure.id;
                        data.parentStructureName = $scope.parentStructure.name;
                    }
                    request = adminRequest.modStructure;
                }
                if ($scope.isAdd) {
                    data.parentStructure = parentId;
                }
                request(data).then(function (res) {
                    info('添加成功');
                    $modalInstance.dismiss({
                        hadSuccess: true
                    });

                })
            }

            /**
             * 关闭modal
             */
            $scope.closeHandler = function () {
                $modalInstance.dismiss({});
            }

            /**
             * 处理名称数据
             */
            function processNameForDisplay(field) {
                var ids = $scope[field];
                var names = $scope[field + 'Name'];
                var res = [];
                var len = ids.length;
                for (var i = 0; i < len; i++) {
                    res.push({
                        userName: ids[i],
                        name: names[i]
                    });
                }
                return res;
            }

            /**
             * 获取结点信息
             */
            $scope.getStructureInfo = function () {
                adminRequest.getStuctureInfo({
                    id: nodeId
                }).then(function (res) {
                    var data = res.data;
                    $.extend(true, $scope, data);
                    if($scope.numberPrefix) {
                        $scope.inputOptions.numberPrefix.forbid = true;
                    }
                    $scope.owner = util.getShowUserName($scope.owner[0],
                        $scope.ownerName[0]);
                    $scope.parentStructure = {
                        id: $scope.parentStructure,
                        name: $scope.parentStructureName
                    }
                    if ($scope.isEdit && (nodeId != config.STRUCTURE_ROOT_ID)) {
                        $scope.showParentStructure = true;
                        $scope.showName = true;
                    }
                    $scope.recruitHR = processNameForDisplay('recruitHR');
                    $scope.salaryHR = processNameForDisplay('salaryHR');
                    $scope.relationshipHR = processNameForDisplay('relationshipHR');
                    $scope.trainingHR = processNameForDisplay('trainingHR');
                    $scope.businessPartnerHR = processNameForDisplay('businessPartnerHR');
                    $scope.assetManager = processNameForDisplay('assetManager');
                    $scope.itOwner = processNameForDisplay('itOwner');
                    $scope.reception = processNameForDisplay('reception');
                });
            }

            function main() {
                $scope.parendId = parentId;
                $scope.title = '新建';
                if (parentId) {
                    $scope.isAdd = true;
                    $scope.showName = true;
                    // 默认不打卡
                    $scope.isPunchCard = 0;
                }
                if (nodeId) {
                    $scope.isEdit = true;
                    $scope.title = '编辑';
                    $scope.getStructureInfo();
                }
                $scope.inputOptions = getInputOptions('editStructureForm', $scope);
                getSocialSecurityCity();
                getCalendarList();
                getLevelTemplate();
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
             * 查询等级模板
             */
            function getLevelTemplate() {
                adminRequest.getLevelTemplate().then(function (res) {
                    res.data.unshift(config.EMPTY);
                    $scope.inputOptions.levelTemplate.items = res.data;
                })
            }


            /**
             * 查社日历模板
             */
            function getCalendarList() {
                adminRequest.getCalendarList().then(function (res) {
                    res.data.unshift(config.EMPTY);
                    $scope.inputOptions.calendar.items = res.data;
                })
            }

            main();
        }
    ]);
});