/**
 * @file 教育信息
 * @author yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('module/config');
    app.directive('educationInfo', ['ajaxService', 'hrRequest',
        function (ajaxService, hrRequest) {
            return {
                restrict: 'EA',
                scope: {
                    options: '='
                },
                require: '?ngModel',
                templateUrl: 'src/module/hr/directive/educationInfo/tpl.html',
                replace: false,
                compile: function ($scope, elem, attrs, ngModel) {
                    return {
                        pre: function ($scope, elem, attrs, ngModel) {
                            var formName = 'educationForm';
                            $scope.inputOptions = {
                                start: {
                                    required: true,
                                    displayName: '开始时间',
                                    name: 'start',
                                    formName: formName,
                                    type: 'month'
                                },
                                end: {
                                    required: true,
                                    displayName: '结束时间',
                                    name: 'end',
                                    formName: formName,
                                    type: 'month'
                                },
                                school: {
                                    required: true,
                                    displayName: '学校',
                                    name: 'school',
                                    formName: formName,
                                    maxLength: 15,
                                    placeholder: '少于15个字'
                                },
                                discipline: {
                                    required: true,
                                    displayName: '专业',
                                    name: 'discipline',
                                    formName: formName,
                                    maxLength: 15,
                                    placeholder: '少于15个字'
                                },
                                degree: {
                                    required: true,
                                    displayName: '学历',
                                    name: 'degree',
                                    formName: formName,
                                    mode: 'select',
                                    items: config.DEGREE
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
                                    hrRequest.delEducationExperience({
                                        id: $scope.id
                                    }).then(function (res) {
                                        info('删除成功');
                                        if ($scope.$parent.$parent.eduExperList && $scope.$parent.$parent.eduExperienceId) {
                                            var index = 0;
                                            if ($scope.$parent.$parent.eduExpList.indexOf($scope.id) !== -1) {
                                                index = $scope.$parent.$parent.eduExpList.indexOf($scope.id);
                                                $scope.$parent.$parent.eduExpList.splice(index, 1);
                                            }

                                            if ($scope.$parent.$parent.eduExperienceId.indexOf($scope.id) !== -1) {
                                                index = $scope.$parent.$parent.eduExperienceId.indexOf($scope.id);
                                                $scope.$parent.$parent.eduExperienceId.splice(index, 1);
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
                                    school: $scope.editInfo.school,
                                    discipline: $scope.editInfo.discipline,
                                    degree: $scope.editInfo.degree
                                };
                                hrRequest.modEducationExperience(data).then(function (res) {
                                    info('修改成功');
                                    $scope.editing = false;
                                    $scope.start = $scope.editInfo.start;
                                    $scope.end = $scope.editInfo.end;
                                    $scope.startShow = $scope.formatMonth($scope.editInfo.start);
                                    $scope.endShow = $scope.formatMonth($scope.editInfo.end);
                                    $scope.school = $scope.editInfo.school;
                                    $scope.discipline = $scope.editInfo.discipline;
                                    $scope.degree = $scope.editInfo.degree;
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
                             * 清楚info
                             */
                            function clearInfo() {
                                $scope.editInfo = {
                                    startShow: undefined,
                                    endShow: undefined,
                                    school: undefined,
                                    discipline: undefined,
                                    degree: undefined
                                }
                            }

                            /**
                             * 初始editInfo
                             */
                            function initEditInfo() {
                                $scope.editInfo = {
                                    start: $scope.start,
                                    end: $scope.end,
                                    school: $scope.school,
                                    discipline: $scope.discipline,
                                    degree: $scope.degree
                                }
                            }

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
                                $scope.school = ngModel.$viewValue.school;
                                $scope.discipline = ngModel.$viewValue.discipline;
                                $scope.degree = ngModel.$viewValue.degree;
                                $scope.disable = ngModel.$viewValue.disable;
                                $scope.startShow = $scope.formatMonth($scope.start);
                                $scope.endShow = $scope.formatMonth($scope.end);
                            };
                        }
                    }
                }
            };
        }])
});
