/**
 * @file 输入控件
 * 支持文本输入和下拉选择两种类型，自带bootstrap 2 4栅格样式，自带校验
 * 1)使用方式
 * <div input-control options="nameOptions">
 *     </div>
 * 2）参数说明
 *
 * 文本输入方式：
 *      {
 *         required: true, // 是否必填
 *         displayName: '姓名',
 *         maxLength: 10,
 *         minLength: 4,
 *         name: 'name',
 *         formName: 'newerEnterForm',
 *         placeholder: '请输入4-10个字符',
 *        type: 'number'
 *     }
 * 下拉列表方式：
 *     {
 *         displayName: '性别',
 *         name: 'sex',
 *         formName: 'newerEnterForm',
 *         mode: 'select',  // 模式 默认是文本输入
 *        items: [ // 下拉选项
 *           {
 *             id: 1121213,
 *             name: '选项1'
 *          },
 *         {
 *           id: 888,
 *          name: '选项2'
 *        }
 *      ]
 *     }
 * @author yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var nameConfig = require('module/nameConfig');
    var config = require('module/config');
    var moment = require('moment');
    app.directive('inputControl', ['$filter', '$timeout', 'ajaxService', 'util',
        function ($filter, $timeout, ajaxService, util) {
            return {
                restrict: 'EA',
                scope: {
                    options: '='
                },
                require: '?ngModel',
                templateUrl: 'src/common/directive/inputControl/tpl.html',
                replace: false,
                compile: function ($scope, elem, attrs, ngModel) {
                    return {
                        pre: function ($scope, elem, attrs) {
                            $scope.options.min = $scope.options.min || new Date('1900-01-01');
                            $scope.errorOption = {
                                displayName: $scope.options.errorDisplayName
                                    || $scope.options.displayName,
                                formName: $scope.options.formName,
                                name: $scope.options.name,
                                mode: $scope.options.mode,
                                min: $scope.options.min,
                                max: $scope.options.max,
                                minLength: $scope.options.minLength,
                                maxLength: $scope.options.maxLength
                            }
                            if ($scope.options.mode
                                && $scope.options.mode == 'nameSuggestion') {
                                $scope.disable = $scope.options.disable;
                                $scope.require = $scope.options.require;
                            }

                            // 组织架构选择
                            if ($scope.options.mode
                                && $scope.options.mode == 'structure') {
                                $scope.treeSelectorOptions = {
                                    manageNodes: $scope.options.manageNodes
                                }
                            }
                        },
                        post: function ($scope, elem, attrs, ngModel) {
                            $scope.result = {};
                            var formName = $scope.options.formName;
                            var parent = $scope.$parent;
                            $scope.form = parent[formName];
                            while (!$scope.form) {
                                parent = parent.$parent;
                                $scope.form = parent[formName];
                            }
                            $scope.$watch('options.min', function (newVal, oldVal) {
                                $scope.errorOption.min = moment(newVal).subtract(1, 'day').toDate();
                            });
                            $scope.$watch('options.max', function (newVal, oldVal) {
                                $scope.errorOption.max = moment(newVal).add(1, 'day').toDate();
                            })


                            /**
                             * 初始只读模式的显示值
                             * Options.displayValue的优先级最高
                             * 然后是内置的一些计算
                             * 然后默认是model的值
                             */
                            function initDisplayValue() {
                                var filter = $scope.options.filter;
                                var mode = $scope.options.mode;
                                if ($scope.options.displayValue) {
                                    $scope.displayValue = $scope.options.displayValue;
                                    return;
                                }
                                if (mode == 'combine') {
                                    if (filter) {
                                        $scope.displayValue =
                                            $filter(filter)({
                                                input: $scope.result.input,
                                                select: $scope.result.select
                                            });
                                        return;
                                    }
                                    $scope.displayValue = $scope.result.input
                                        + $scope.result.select;
                                    return;
                                }
                                if (mode == 'structure') {
                                    $scope.displayValue = ($scope.result.value
                                        && $scope.result.value.name)
                                        || nameConfig.EMPTY_VALUE;
                                    return;
                                }
                                if ($scope.result.value instanceof Date) {
                                    var time = $scope.result.value.getTime();
                                    $scope.displayValue = $filter('date')(time, 'yyyy-MM-dd')
                                    return;
                                }
                                if (filter) {
                                    $scope.displayValue =
                                        $filter(filter)($scope.result.value);
                                    return;
                                }
                                $scope.displayValue = util.isEmpty($scope.result.value)
                                    ? nameConfig.EMPTY_VALUE : $scope.result.value;
                            }

                            /**
                             * 验证合法的图片
                             * @param img
                             */
                            function isValidFile(img) {
                                var split = img.name.split('.');
                                var name = split[split.length - 1];

                                function find(arr, val) {
                                    var val = val.toLowerCase();
                                    for (var i = 0; i < arr.length; i++) {
                                        if (val == arr[i]) {
                                            return true;
                                        }
                                    }
                                    return false;
                                }

                                var allowed = ['pdf', 'png', 'jpg',
                                    'jpeg', 'doc', 'docx'];
                                if (!find(allowed, name)) {
                                    return false;
                                }
                                return true;
                            }

                            /**
                             * 文件选择变化
                             */
                            $scope.fileChange = function () {
                                $scope.uploadFile();
                            }

                            /**
                             * 当组件mode为file的时候会调用
                             */
                            $scope.uploadFile = function () {
                                var name = $scope.options.name;
                                var file = $("input[name=" + name + "]")[0].files[0];
                                var control = $scope.form[$scope.options.name];
                                if (file && !isValidFile(file)) {
                                    $scope.$apply(function () {
                                        control.$setValidity('file', false);
                                    });
                                    return;
                                }
                                $scope.$apply(function () {
                                    control.$setValidity('file', true);
                                });
                                $scope.fileError = '';
                                var data = new FormData();
                                data.append('file', file);

                                ajaxService.send('/ADD/file/file.json', {
                                    data: data,
                                    type: 'file'
                                }).then(function (response) {
                                    ngModel.$setViewValue(response.data.storageId);
                                    $scope.options.fileUrl = response.data.url;
                                    if ($scope.options.required) {
                                        control.$setValidity('fileRequired', true);
                                    }
                                    info('上传成功');
                                });
                            };

                            /**
                             * ng-model render方法
                             */
                            ngModel.$render = function () {
                                if ($scope.options.mode
                                    && $scope.options.mode == 'combine') {
                                    if (ngModel.$viewValue) {
                                        $scope.result.input = ngModel.$viewValue.inputVal;
                                        $scope.result.select = ngModel.$viewValue.selectVal;
                                    }
                                } else if ($scope.options.mode
                                    && $scope.options.mode == 'selectWithInput') {
                                    if (ngModel.$viewValue) {
                                        $scope.result.input = ngModel.$viewValue.inputVal;
                                        $scope.result.select = ngModel.$viewValue.selectVal;
                                    }
                                }
                                else if ($scope.options.mode
                                    && $scope.options.mode == 'file') {
                                    if ($scope.options.required) {
                                        // 指令初始化完了才做。。
                                        $timeout(function () {
                                            if (ngModel.$viewValue) {
                                                $scope.form[$scope.options.name].$setValidity('fileRequired', true);
                                            } else {
                                                $scope.form[$scope.options.name].$setValidity('fileRequired', false);
                                            }
                                        }, 0);
                                    }
                                }
                                else if ($scope.options.mode
                                    && $scope.options.mode == 'checkbox') {
                                    $scope.result.value = !!ngModel.$viewValue;
                                } else {
                                    $scope.result.value = ngModel.$viewValue;
                                }
                                initDisplayValue();
                            };

                            if ($scope.options.mode == 'selectWithInput') {
                                $scope.$watch('result.input', function (newVal, oldVal) {
                                    ngModel.$setViewValue({
                                        inputVal: $scope.result.input,
                                        selectVal: $scope.result.select
                                    });
                                    initDisplayValue();
                                }, true);

                                $scope.$watch('result.select', function (newVal, oldVal) {
                                    ngModel.$setViewValue({
                                        inputVal: $scope.result.input,
                                        selectVal: $scope.result.select
                                    });
                                    initDisplayValue();
                                }, true);
                            } else if ($scope.options.mode == 'selectWithInput' || $scope.options.mode == 'combine') {
                                $scope.$watch('result.input', function (newVal, oldVal) {
                                    ngModel.$setViewValue({
                                        inputVal: $scope.result.input,
                                        selectVal: $scope.result.select
                                    });
                                    initDisplayValue();
                                }, true);

                                $scope.$watch('result.select', function (newVal, oldVal) {
                                    ngModel.$setViewValue({
                                        inputVal: $scope.result.input,
                                        selectVal: $scope.result.select
                                    });
                                    initDisplayValue();
                                }, true);

                            } else {
                                $scope.$watch('result.value', function (newVal, oldVal) {
                                    if (newVal != oldVal) {
                                        ngModel.$setViewValue(newVal);
                                    }
                                    initDisplayValue();
                                }, true)
                            }
                            $scope.$watch('options.displayValue', function (newVal, oldVal) {
                                if (newVal != oldVal) {
                                    $scope.displayValue = newVal;
                                }
                            }, true)
                        }
                    }
                }
            };
        }])
});
