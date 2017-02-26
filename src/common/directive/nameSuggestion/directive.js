/**
 * @file 输入名字的suggestion
 * @author yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    app.directive('nameSuggestion', ['$http', 'ajaxService',
        function ($http, ajaxService) {
            return {
                restrict: 'EA',
                templateUrl: 'src/common/directive/nameSuggestion/tpl.html',
                scope: {
                    name: '@',
                    disable: '=',
                    require: '@',
                    errorOption: '='
                },
                require: '?ngModel',
                replace: false,
                compile: function ($scope, elem, attrs, ngModel) {
                    return {
                        pre: function ($scope, elem, attrs, ngModel) {
                        },
                        post: function ($scope, elem, attrs, ngModel) {

                            /**
                             * 获取账号
                             * @param key
                             * @returns {*}
                             */
                            $scope.getAccounts = function (key) {
                                return ajaxService.send('/GET/ac/queryAccounts.json', {
                                    showLoading: false,
                                    data: {searchKey: key}
                                }).then(function (res) {
                                    var nameList = res.data.map(function (item) {
                                        return item.displayName + ',' + item.username;
                                    });
                                    var result = [];
                                    if ($scope.$root.userInfo.isAgent) {
                                        nameList.forEach(function (item, indexOf) {
                                            if (item.indexOf('a-') > -1) {
                                                result.push(item);
                                            }
                                        })
                                    } else {
                                        result = nameList;
                                    }
                                    return result;
                                });
                            };

                            /**
                             * 选项选择
                             * @param item
                             */
                            $scope.typeaheadOnSelect = function (item) {
                                ngModel.$setViewValue($scope.value);
                            };

                            $scope.$watch('value', function (newVal, oldVal) {
                                if (!newVal) {
                                    ngModel.$setViewValue(newVal);
                                }
                            });

                            /**
                             * ng-model render方法
                             */
                            ngModel.$render = function () {
                                $scope.value = ngModel.$viewValue;
                            };
                        }
                    }
                }
            };
        }])
});
