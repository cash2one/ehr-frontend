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
    var moment = require('moment');
    var closeParam = {};
    var rawStructure;

    app.controller('applyOptChangeStructureCtrl', applyOptChangeStructure);

    applyOptChangeStructure.$inject = ['$rootScope', '$scope', 'applyRequest', 'localStorage', '$modalInstance', 'util', 'hrRequest',
        'isFromHRBP'];

    function applyOptChangeStructure($rootScope, $scope, applyRequest, localStorage, $modalInstance, util, hrRequest, isFromHRBP) {
        $scope.number = localStorage.get('number');
        $scope.save = onSave;
        $scope.closeHandler = closeHandler;
        $scope.inputOptions = getInputOptions('changeStructureForm', $scope);
        var closeParam = {};

        init();

        /**
         * 初始化
         */
        function init() {
            getWorkInfo();
            $scope.$watch('level', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    getPosition(newVal);
                    if (typeof oldVal != 'undefined') {
                        $scope.position = undefined;
                    }
                }
            }, true)
            $scope.$watch('structure.id', function (newVal, oldVal) {
                if (newVal != oldVal) {
                    getLevel(newVal);
                    if (typeof oldVal != 'undefined') {
                        $scope.level = undefined;
                        $scope.position = undefined;
                    }
                }
            }, true)
        }

        /**
         * 保存
         */
        function onSave(form) {
            if (!form.$valid) {
                return;
            }
            if (!($scope.structure && $scope.structure.id)
                && (!$scope.leader)
                && (!$scope.level)
                && (!$scope.position)
                ) {
                alert('请输入至少一项变更');
                return;
            }
            if (!validateRelateChange()) {
                return;
            }
            if (util.diffDaysFromNow($scope.executeDate, 'days')
                < applyConfig.EXECUTE_TIP_DAYS) {
                confirm(applyConfig.EXECUTE_TIP, function () {
                    doApply();
                })
            } else {
                doApply();
            }
        }

        function doApply() {
            var workInfo = $scope.workInfo;
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
            var data = {
                level: $scope.level || workInfo.level,
                position: $scope.position || workInfo.position,
                structure: ($scope.structure && $scope.structure.id) || workInfo.structure,
                leader: util.getUsernameFromSuggestion($scope.leader) || workInfo.leader
            };
            var applyType = codeConfig.APPLY_CODE.STRUCTURE;
            if ($scope.isAgent) {
                applyType = codeConfig.APPLY_CODE.AGENT_STRUCTURE;
            }
            applyRequest.addApply({
                type: applyType,
                content: data,
                editedNumber: $scope.userCommonInfo.number,
                reason: $scope.reason,
                executeDate: executeTime
            }).then(function () {
                alert(applyConfig.SUCCESS_TIP);
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
                alert('调整等级时请一起调整职位名称');
                return false;
            }
            return true;
        }

        /**
         * 关闭函数
         */
        function closeHandler() {
            $modalInstance.dismiss(closeParam);
        }

        /**
         * 岗位信息
         */
        function getWorkInfo() {
            hrRequest.getStaffWorkInfo({number: $scope.number}).then(function (res) {
                $scope.workInfo = res.data;
                rawStructure = $scope.workInfo.structure;
                getLevel(rawStructure);
            });
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
                    structure: ($scope.structure && $scope.structure.id) || rawStructure,
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