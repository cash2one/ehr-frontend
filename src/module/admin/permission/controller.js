/**
 * @file 权限配置
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');

    app.controller('permissionCtrl', ['$scope', '$stateParams', 'localStorage', 'adminRequest', 'hrRequest',
        function ($scope, $stateParams, localStorage, adminRequest, hrRequest) {
            $scope.number = localStorage.get('number');


            /**
             * 获得权限
             * @param number
             */
            $scope.getAuth = function () {
                adminRequest.getAuth({
                    number: $scope.number
                }).then(function (res) {
                    var roleType = res.data.roleTypes;
                    $scope.roleType = roleType ? roleType.split(',') : [];
                    for (var i = 0; i < $scope.roleType.length; i++) {
                        $scope[$scope.roleType[i]] = true;
                    }
                    var manageRange = res.data.manageRange || [];
                    for (var i = 0, item; item = manageRange[i++];) {
                        var splits = item.departmentIds.split(',');
                        for (var j = 0; j < splits.length; j++) {
                            splits[j] = +splits[j];
                        }
                        item.departmentIds = splits;
                    }
                    $scope.manageRange = manageRange;
                });
            }

            $scope.departmentsSelectOptions = {
                items: []
            };


            /**
             * 添加公司
             */
            $scope.companyAddClick = function () {
                $scope.isAdding = true;
            }

            /**
             * 查询公司
             */
            $scope.getCompany = function () {
                hrRequest.getCompany().then(function (res) {
                    $scope.add.companys = res.data;
                });
            };

            /**
             * 选择公司变了,请求部门
             */
            $scope.companyChangeHandler = function () {
                hrRequest.getDepartment({
                    company: $scope.add.company
                }).then(function (res) {
                    $scope.departmentsSelectOptions.items = res.data;
                    $scope.add.departments = [];
                });
            };

            $scope.add = {
                /**
                 * 添加取消
                 */
                onCancel: function () {
                    $scope.isAdding = false;
                },

                /**
                 * 添加
                 * @param form
                 */
                onSave: function (form) {
                    if (!form.$valid) {
                        return;
                    }
                    $scope.manageRange.push({
                        companyId: $scope.add.company,
                        companyName: $scope.getCompanyName($scope.add.company),
                        departmentIds: $scope.add.departments,
                        departmentNames: $scope.getDepartmentNames($scope.add.departments)
                    });
                    $scope.isAdding = false;
                    $scope.add.company = undefined;
                    $scope.add.departments = [];
                }
            };

            /**
             * 取公司名字
             * @param id
             * @returns {*}
             */
            $scope.getCompanyName = function (id) {
                for (var i = 0, item; item = $scope.add.companys[i++];) {
                    if (item.id == id) {
                        return item.name;
                    }
                }
            }

            /**
             * 取部门的名字
             * @param ids
             * @returns {Array}
             */
            $scope.getDepartmentNames = function (ids) {
                var res = [];
                var data = $scope.departmentsSelectOptions.items;
                for (var i = 0, item; item = data[i++];) {
                    if ($.inArray(item.id, ids) != -1) {
                        res.push(item.name);
                    }
                }
                return res.join(',');
            }

            $scope.saveAuth = function () {
                var roles = [];
                if ($scope.HRBP) {
                    roles.push('HRBP');
                }
                if ($scope.ZPHR) {
                    roles.push('ZPHR');
                }
                if ($scope.XCHR) {
                    roles.push('XCHR');
                }
                if ($scope.GXHR) {
                    roles.push('GXHR');
                }
                if ($scope.PXHR) {
                    roles.push('PXHR');
                }

                function getManageRange(data) {
                    var res = [];
                    for (var i = 0, item; item = data[i++];) {
                        // 没有companyId是被删除的数据
                        if (!item.companyId) {
                            continue;
                        }
                        res.push({
                            companyId: item.companyId,
                            departmentIds: item.departmentIds.join(',')
                        })
                    }
                    return res;
                }

                var data = {
                    number: +$scope.number,
                    roleTypes: roles.join(','),
                    manageRange: getManageRange($scope.manageRange)
                }
                adminRequest.modAuth(data).then(function (res) {
                    info('修改成功');
                })
            };
            $scope.getCompany();
            $scope.getAuth();
        }
    ]);
});