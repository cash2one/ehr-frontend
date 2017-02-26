/**
 * @file 列表
 * @author yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    app.directive('itemSet', ['$http', function ($http) {
        return {
            restrict: 'EA',
            scope: {
                options: '='
            },
            require: '?ngModel',
            templateUrl: 'src/common/directive/itemSet/tpl.html',
            replace: false,
            link: function ($scope, elem, attrs, ngModel) {

                /**
                 * 获取id的集合
                 * @param data
                 */
                function getIdSet(data) {
                    var res = [];
                    for (var  i= 0, item;  item = data[i++];) {
                      res.push(item.id);
                    }
                    return res;
                }

                /**
                 * 点击删除的函数
                 * @param {Object} item 被点击行的数据
                 * @param {number} index 行号 从0开始
                 */
                $scope.delClickHandler = function (item, index) {
                    $scope.listData.splice(index, 1);
                    ngModel.$setViewValue($scope.listData);
                    $scope.options.delClickHandler
                    && $scope.options.delClickHandler(item, index);
                };

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
                    $scope.listData = ngModel.$viewValue;
                };
            }
        };
    }])
});