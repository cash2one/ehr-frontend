/**
 * @file 单项选择
 * @author yanlingling
 */
define(function (require) {
    var app = require('../../app');
    app.directive('singleSelect', ['$http', function ($http) {
        return {
            restrict: 'EA',
            scope: {
                values: '=',
                clickHandler: '&'
            },
            require: '?ngModel',
            templateUrl: 'src/common/directive/singleSelect/tpl.html',
            replace: false,
            link: function ($scope, elem, attrs, ngModel) {

                $scope.valueChange = function (val, index) {
                    ngModel.$setViewValue(val);
                    $scope.value = val;
                    $scope.clickHandler({val: val, index: index});
                };

                /**
                 * modelValue转为视图用的数据
                 */
                ngModel.$formatters.push(function (modelValue) {
                    return modelValue;
                });


                ngModel.$parsers.push(function (viewValue) {
                    return viewValue;
                });


                ngModel.$render = function () {
                    $scope.value = ngModel.$viewValue;
                };
            }
        };
    }])
});