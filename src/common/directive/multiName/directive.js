/**
 * @file 输入名字的suggestion
 * @author yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    app.directive('multiName', ['$http', 'ajaxService',
        function ($http, ajaxService) {
            return {
                restrict: 'EA',
                templateUrl: 'src/common/directive/multiName/tpl.html',
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
                            $scope.errorOption = $scope.errorOption || {};

                            $scope.itemSetOption = {
                                tpl: 'src/common/directive/multiName/itemSetTpl.html'
                            };


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
                                    return res.data.map(function (item) {
                                        return  item.displayName + ',' + item.username;
                                    });
                                });
                            };

                            /**
                             * 用户是否存在
                             * @param key
                             */
                            $scope.isUserExisted = function (userName) {
                                for (var i = 0, item; item = $scope.listValue[i++];) {
                                    if (item.userName == userName) {
                                        return true;
                                    }
                                }
                                return false;
                            };

                            /**
                             * 选项选择
                             * @param item
                             */
                            $scope.typeaheadOnSelect = function (item) {
                                var split = $scope.value.split(',');
                                if (!$scope.isUserExisted(split[1])) {
                                    $scope.listValue.push({
                                        name: split[0],
                                        userName: split[1]
                                    });
                                }
                                $scope.value = '';
                                ngModel.$setViewValue($scope.listValue);
                            };

                            /**
                             * ng-model render方法
                             */
                            ngModel.$render = function () {
                                $scope.listValue = ngModel.$viewValue || [];
                            };
                        }
                    }
                }
            };
        }])
});
