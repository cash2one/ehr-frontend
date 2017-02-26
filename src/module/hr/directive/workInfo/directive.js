/**
 * @file 工作信息
 * @author yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('module/config');
    app.directive('workInfo', ['ajaxService', 'hrRequest',
        function (ajaxService, hrRequest) {
            return {
                restrict: 'EA',
                scope: {
                    options: '='
                },
                require: '?ngModel',
                templateUrl: 'src/module/hr/directive/workInfo/tpl.html',
                replace: false,
                compile: function ($scope, elem, attrs, ngModel) {
                    return {
                        pre: function ($scope, elem, attrs, ngModel) {
                            var formName = 'workForm';
                            $scope.inputOptions = {
                                start: {
                                    required: true,
                                    displayName: '开始时间',
                                    name: 'start',
                                    formName: formName,
                                    type: 'month',
                                    placeholder: 'YYYY-MM'
                                },
                                end: {
                                    required: true,
                                    displayName: '结束时间',
                                    name: 'end',
                                    formName: formName,
                                    type: 'month'
                                },
                                company: {
                                    required: true,
                                    displayName: '单位',
                                    name: 'company',
                                    formName: formName,
                                    maxLength: 30,
                                    placeholder: '少于30个字'
                                },
                                position: {
                                    required: true,
                                    displayName: '职位',
                                    name: 'position',
                                    formName: formName,
                                    maxLength: 30,
                                    placeholder: '少于30个字'
                                }
                            };
                        },
                        post: function ($scope, elem, attrs, ngModel) {
                            /**
                             * 删除
                             * @returns {*}
                             */
                            $scope.onDel = function () {
                                confirm('确认删除该条信息吗？', function () {
                                    hrRequest.delWorkExperience({
                                        id: $scope.id
                                    }).then(function (res) {
                                        info('删除成功');
                                        if ($scope.$parent.$parent.workExpList && $scope.$parent.$parent.workExperienceId) {
                                            var index = 0;
                                            if ($scope.$parent.$parent.workExpList.indexOf($scope.id) !== -1) {
                                                index = $scope.$parent.$parent.workExpList.indexOf($scope.id);
                                                $scope.$parent.$parent.workExpList.splice(index, 1);
                                            }

                                            if ($scope.$parent.$parent.workExperienceId.indexOf($scope.id) !== -1) {
                                                index = $scope.$parent.$parent.workExperienceId.indexOf($scope.id);
                                                $scope.$parent.$parent.workExperienceId.splice(index, 1);
                                            }
                                        }
                                        ngModel.$setViewValue({});
                                        $(elem).html('');
                                    });
                                })
                            };

                            /**
                             * 编辑保存
                             * @returns {*}
                             */
                            $scope.onEditSave = function (form) {
                                form.$submitted = true;
                                if (!form.$valid) {
                                    return;
                                }
                                var start = $scope.editInfo.start.getTime();
                                var end = $scope.editInfo.end.getTime();
                                if (start > end) {
                                    alert('结束时间必须大于开始时间');
                                    return;
                                }
                                var data = {
                                    id: $scope.id,
                                    start: start,
                                    end: end,
                                    company: $scope.editInfo.company,
                                    position: $scope.editInfo.position
                                };
                                hrRequest.modWorkExperience(data).then(function (res) {
                                    info('修改成功');
                                    $scope.editing = false;
                                    $scope.start = $scope.editInfo.start;
                                    $scope.end = $scope.editInfo.end;
                                    $scope.startShow = $scope.formatMonth($scope.editInfo.start);
                                    $scope.endShow = $scope.formatMonth($scope.editInfo.end);
                                    $scope.company = $scope.editInfo.company;
                                    $scope.position = $scope.editInfo.position;
                                    ngModel.$setViewValue(data);
                                });
                            };

                            /**
                             * 编辑
                             * @returns {*}
                             */
                            $scope.onEdit = function () {
                                $scope.editing = true;
                                initEditInfo();
                            };

                            /**
                             * 取消编辑
                             */
                            $scope.onCancelEdit = function () {
                                $scope.editing = false;
                                clearInfo();
                            };

                            /**
                             * 格式月份
                             * @param date
                             * @returns {string}
                             */
                            $scope.formatMonth = function (date) {
                                return date.getFullYear() + '-' + (date.getMonth() + 1);
                            }

                            /**
                             * modelValue转为视图用的数据
                             * @param {Arrar.<Object>} modelValue
                             */
                            ngModel.$formatters.push(function (modelValue) {
                                return modelValue;
                            });


                            /**
                             * 将viewValue 转为模型用的数据
                             * @param {Arrar.<Object>}  viewValue
                             */
                            ngModel.$parsers.push(function (viewValue) {
                                return viewValue;
                            });

                            /**
                             * ng-model render方法
                             */
                            ngModel.$render = function () {
                                $scope.id = ngModel.$viewValue.id;
                                $scope.start = ngModel.$viewValue.start;
                                $scope.end = ngModel.$viewValue.end;
                                $scope.company = ngModel.$viewValue.company;
                                $scope.position = ngModel.$viewValue.position;
                                $scope.disable = ngModel.$viewValue.disable;
                                $scope.startShow = $scope.formatMonth($scope.start);
                                $scope.endShow = $scope.formatMonth($scope.end);
                            };


                            /**
                             * 初始editInfo
                             */
                            function initEditInfo() {
                                $scope.editInfo = {
                                    start: $scope.start,
                                    end: $scope.end,
                                    company: $scope.company,
                                    position: $scope.position
                                }
                            }

                            /**
                             * 清楚info
                             */
                            function clearInfo() {
                                $scope.editInfo = {
                                    start: undefined,
                                    end: undefined,
                                    company: undefined,
                                    position: undefined
                                }
                            }
                        }
                    }
                }
            };
        }])
});
