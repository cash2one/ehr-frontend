/**
 * @file 多选的下拉列表
 * @author yanlingling
 */
define(function (require) {
    var app = require('../../app');
    app.directive('multiSelect', function () {
        return {
            restrict: 'EA',
            scope: {
                options: '='
            },
            replace: false,
            require: '?ngModel',
            templateUrl: 'src/common/directive/multiSelect/tpl.html',
            link: function ($scope, elem, attrs, ngModel) {
                $scope.itemChange = function (value) {
                    $scope.selected = [];
                    var names = [];
                    for (var i = 0, item; item = $scope.options.items[i++];) {
                        if (item.checked == true) {
                            $scope.selected.push(item.id);
                            names.push(item.name);
                        }
                    }
                    $scope.selectedNames = names.join(',');
                    ngModel.$setViewValue($scope.selected);
                }
                $scope.status = {};
                $scope.status.isopen = true;

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
                    $scope.selected = ngModel.$viewValue;
                    $scope.paintName();
                };

                /**
                 * 填充名字
                 */
                $scope.paintName = function () {
                    var selectedNames = [];
                    for (var i = 0, item; item = $scope.options.items[i++];) {
                        if ($.inArray(item.id, $scope.selected) != -1) {
                            item.checked = true;
                            selectedNames.push(item.name);
                        }
                    }
                    $scope.selectedNames = selectedNames.join(',');
                };


                $scope.$watch('options.items', function (newVal, oldVal) {
                    $scope.paintName();
                }, true);

            }
        };
    });
});
