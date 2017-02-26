/**
 * @file 简单的table控件,支持数据的filter,单元格模板，全选,分页等
 * @author yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    app.directive('tableControl', ['$http', 'ajaxService', '$filter',
        function ($http, ajaxService, $filter) {
            return {
                restrict: 'EA',
                templateUrl: 'src/common/directive/table/tpl.html',
                scope: {

                    /**
                     * @options.data {Array} 数据源
                     * @options.canSelect {boolean} 是否支持选择
                     * @options.hasTwoHead {boolean} 是否支持双重表头
                     * @options.totalCount {number} 表格数据总数，用于分页
                     * @options.cols {Array} 列配置
                     * @options.pageSize {number} 每页显示多少条数据
                     * @options.selectedItems {Array} 在canSelect true的情况下，存放当前选中的数据
                     * @options.bodyScroll {boolean} 表格的body可以出现滚动条，此时表头可以锁定
                     * @options.onPageChange {Function} 分页响应
                     */
                    options: '='
                },
                replace: false,
                link: function ($scope, elem, attrs) {
                    $scope.dataSource = [];

                    $scope.options.pageSize = $scope.options.pageSize || 20;

                    $scope.mainScope = $scope.options.mainScope;

                    /**
                     * 勾选全选
                     */
                    $scope.onSelectCurAllChange = function () {
                        if ($scope.selectCurAll) {
                            setAllSelect(true);
                            $scope.options.onSelectAll && $scope.options.onSelectAll();
                        } else {
                            setAllSelect(false);
                        }
                        $scope.options.selectedItems = getSelectedItem($scope.options.data);
                    }


                    /**
                     * 勾选单个
                     */
                    $scope.onItemSelectChange = function (index, selected) {
                        var item = $scope.dataSource[index];
                        item.selected = selected;
                        var rawItem = $scope.options.data[index];
                        rawItem.selected = selected;
                        if (item.selected == false) {
                            $scope.selectCurAll = false;
                        } else {
                            if (isAllItemSelected()) {
                                $scope.selectCurAll = true;
                            }
                        }
                        $scope.options.selectedItems = getSelectedItem($scope.options.data);
                        $scope.options && $scope.options.onItemSelect && $scope.options.onItemSelect();
                    }

                    /**
                     * 分页变化
                     */
                    $scope.onPageChanged = function () {
                        $scope.options.onPageChange
                        && $scope.options.onPageChange($scope.curPage);
                    };

                    /**
                     * 所有数据全选
                     */
                    function setAllSelect(selected) {
                        var rawData = $scope.options.data;
                        for (var i = 0, item; item = $scope.dataSource[i++];) {
                            item.selected = selected;
                        }
                        for (var i = 0, item; item = rawData[i++];) {
                            item.selected = selected;
                        }
                    }

                    /**
                     * 是否所有的item处于勾选的状态
                     * @returns {boolean}
                     */
                    function isAllItemSelected() {
                        var data = $scope.dataSource;
                        if (!data.length) {
                            return false;
                        }
                        for (var i = 0, item; item = data[i++];) {
                            if (!item.selected) {
                                return  false;
                            }
                        }
                        return true;
                    }

                    $scope.$watch('options.data', function (newVal, oldVal) {
                        processData();
                    }, true);

                    $scope.$watch('options.cols', function (newVal, oldVal) {
                        processData();
                    }, true);

                    /**
                     * 获取表格选中的行数据
                     * @param data
                     */
                    function getSelectedItem(data) {
                        var res = [];
                        for (var i = 0, item; item = data[i++];) {
                            if (item.selected) {
                                res.push(item);
                            }
                        }
                        return res;
                    }

                    /**
                     * 数据处理
                     */
                    function processData() {
                        var filterConfig = {};
                        $scope.dataSource = $.extend(true, [], $scope.options.data);
                        var cols =  $scope.options.cols;
                        var len = cols.length;
                        for (var i = 0; i < len; i++) {
                            var item = cols[i];
                            // item有可能为空，因为有时候改fieldName，
                            // localStorage里面会有没用的值
                            if (item && item.filter) {
                                filterConfig[item.field] = item.filter;
                            }
                        }
                        for (var i = 0, item; item = $scope.dataSource[i++];) {
                            for (var j  = 0, col; col= cols[j ++];) {
                                var field = col.field;
                                var filterStr = filterConfig[field];
                                if (filterStr) {
                                    var sp = filterStr.split(':');
                                    var spcopy = $.extend(true, [], sp);
                                    spcopy[0] = item[field];
                                    item[field] = $filter(sp[0]).apply(undefined, spcopy);
                                }
                            }
                        }
                        refreshSelectCurAll();
                    }


                    /**
                     * 更新全选框的勾选状态
                     */
                    function refreshSelectCurAll() {
                        if (isAllItemSelected()) {
                            $scope.selectCurAll = true;
                        } else {
                            $scope.selectCurAll = false;
                        }
                    }
                }
            };
        }])
});

