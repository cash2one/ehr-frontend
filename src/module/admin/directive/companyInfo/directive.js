/**
 * @file 工作信息
 * @author yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('module/config');
    app.directive('companyInfo', ['ajaxService', 'adminRequest', 'hrRequest',
        function (ajaxService, adminRequest, hrRequest) {
            return {
                restrict: 'EA',
                scope: {
                    options: '='
                },
                require: '?ngModel',
                templateUrl: 'src/module/admin/directive/companyInfo/tpl.html',
                replace: false,
                link: function ($scope, elem, attrs, ngModel) {

                    $scope.departmentsSelectOptions = {
                        items: []
                    };

                    /**
                     * 删除
                     * @returns {*}
                     */
                    $scope.onDel = function () {
                        if (confirm('确认删除该条信息吗？')) {
                            $scope.options.companyId = undefined;
                            $(elem).html('');
                        }
                        confirm('确认删除该条信息吗？', function () {
                            $scope.options.companyId = undefined;
                            $(elem).html('');
                        });
                    };

                    /**
                     * 编辑保存
                     * @returns {*}
                     */
                    $scope.onEditSave = function (form) {
                        if (!form.$valid) {
                            return;
                        }
                        $scope.options.companyName = $scope.getCompanyName($scope.options.companyId);
                        $scope.options.departmentNames = $scope.getDepartmentNames($scope.options.departmentIds);
                        $scope.editing = false;
                    };

                    /**
                     * 取公司名字
                     * @param id
                     * @returns {*}
                     */
                    $scope.getCompanyName = function (id) {
                        for (var i = 0, item; item = $scope.companys[i++];) {
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

                    /**
                     * 编辑
                     * @returns {*}
                     */
                    $scope.onEdit = function () {
                        $scope.editing = true;
                    };

                    /**
                     * 取消编辑
                     */
                    $scope.onCancelEdit = function () {
                        $scope.editing = false;
                    };

                    /**
                     * 查询公司
                     */
                    $scope.getCompany = function () {
                        hrRequest.getCompany().then(function (res) {
                            $scope.companys = res.data;
                        });
                    };

                    /**
                     * 选择公司变了,请求部门
                     */
                    $scope.$watch('options.companyId', function (newVal, oldVal) {
                        hrRequest.getDepartment({
                            company: $scope.options.companyId
                        }).then(function (res) {
                            $scope.departmentsSelectOptions.items = res.data;
                            if (newVal != oldVal) {
                                $scope.options.departmentIds = [];
                            }
                        });
                    }, true)

                    $scope.getCompany();
                }
            };
        }])
});
