/**
 * @file 勾选组
 * @author yanlingling
 */
define(function (require) {
    var app = require('../../app');
    app.directive('checkboxGroup', function () {
        return {
            restrict: 'EA',
            scope: {
                /**
                 * 参数
                 * {Array} options.data
                 * [
                 * {
                 *    key: '1',
                 *    value: '生效老师数',
                 *    checked: true|false  // 选择状态
                 *    isDefault: true|false // 是否是默认项
                 * }
                 * ]
                 */
                options: '=',


                /**
                 * 点击确定的回调
                 */
                confirmHandler: '&',

                /**
                 * 点击取消的回调
                 */
                cancelHandler: '&'
            },
            replace: false,
            templateUrl: 'src/common/directive/checkboxGroup/tpl.html',
            link: function ($scope, elem, attrs) {
                $scope.defaultValues = getDefaultValues();
                $scope.error = '';
                if ($scope.options.checkedValues && $scope.options.checkedValues.length != 0) {
                    initCheckedByDefine();
                } else {
                    initCheckedByDefault();
                }
                resetDefaultButton();

                /**
                 * 获取勾选的值
                 */
                function getValues() {
                    var data = $scope.options.data;
                    var res = [];
                    for (var i = 0, item; item = data[i++];) {
                        for (var j = 0, it; it = item.items[j++];) {
                            if (it.checked) {
                                res.push(it.key);
                            }
                        }
                    }
                    return res;
                }

                /**
                 * 根据默认设置勾选
                 */
                function initCheckedByDefault() {
                    var data = $scope.options.data;
                    for (var j = 0, it; it = data[j++];) {
                        var items = it.items;
                        for (var i = 0, item; item = items[i++];) {
                            if (item.isDefault) {
                                item.checked = true;
                            } else {
                                item.checked = false;
                            }
                        }
                    }
                    $scope.options.checkedValues = $scope.defaultValues;
                }

                /**
                 * 根据传入的值设定勾选
                 */
                function initCheckedByDefine() {
                    var checkedValues = $scope.options.checkedValues;
                    var data = $scope.options.data;
                    for (var j = 0, it; it = data[j++];) {
                        var items = it.items;
                        for (var i = 0, value; value = items[i++];) {
                            if ($.inArray(value.key, checkedValues) != -1) {
                                value.checked = true;
                            } else {
                                value.checked = false;
                            }
                        }
                    }

                }

                /**
                 * 设置默认勾选
                 */
                function getDefaultValues() {
                    var data = $scope.options.data;
                    var res = [];
                    for (var j = 0, it; it = data[j++];) {
                        var items = it.items;
                        for (var i = 0, item; item = items[i++];) {
                            if (item.isDefault) {
                                res.push(item.key);
                            }
                        }
                    }
                    return res;
                }

                /**
                 * 设置默认勾选
                 */
                function setDefaultValues() {
                    var data = $scope.options.data;
                    for (var j = 0, it; it = data[j++];) {
                        var items = it.items;
                        for (var i = 0, item; item = items[i++];) {
                            if (item.isDefault) {
                                item.checked = true;
                            } else {
                                item.checked = false;
                            }
                        }
                    }
                    $scope.options.checkedValues = $scope.defaultValues;
                }

                /**
                 * 已经选择的是否跟默认的项一样
                 * @returns {boolean}
                 */
                function isCheckedValueEquealDefault() {
                    var defaultValues = $scope.defaultValues;
                    var checkedValues = $scope.options.checkedValues;
                    if (defaultValues.length != checkedValues.length) {
                        return false;
                    }
                    for (var i = 0, value; value = defaultValues[i++];) {
                        if ($.inArray(value, checkedValues) == -1) {
                            return false;
                        }
                    }
                    return true;
                }

                /**
                 * 重置默认按钮
                 */
                function resetDefaultButton() {
                    if (isCheckedValueEquealDefault()) {
                        $scope.checkboxGroupType = 'default';
                    } else {
                        $scope.checkboxGroupType = 'selfDefine';
                    }
                }

                /**
                 * 点击选择默认
                 */
                $scope.defaultClick = function () {
                    setDefaultValues();
                };

                /**
                 * 选项点击
                 */
                $scope.itemClick = function () {
                    var values = getValues();
                    var max = $scope.options.maxItems || 8;
                    var len = values.length;
                    if (len == 0) {
                        $scope.error = '请选择至少1个指标';
                        return;
                    }
                    if (len > max) {
                        $scope.error = '请选择少于' + max + '个指标';
                        return;
                    }
                    $scope.error = '';
                    $scope.options.checkedValues = values;
                    resetDefaultButton();
                };


                $scope.$watch('options.checkedValues', function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        initCheckedByDefine();
                        resetDefaultButton();
                    }
                }, true);
            }
        };
    });
});
