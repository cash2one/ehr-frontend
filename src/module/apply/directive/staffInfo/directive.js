/**
 * @file  员工信息
 * @author yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var moment = require('moment');
    app.directive('applyStaffInfo', ['$http', 'ajaxService',
        function ($http, ajaxService) {
            return {
                restrict: 'EA',
                templateUrl: 'src/module/apply/directive/staffInfo/tpl.html',
                scope: false,
                require: '?ngModel',
                replace: false,
                link: function ($scope, elem, attrs, ngModel) {
                    $scope.showFormalDate = false;
                    /**
                     * 获取账号信息
                     * @param key
                     * @returns {*}
                     */
                    $scope.getInfo = function () {
                        if (!$scope.number) {
                            return;
                        }
                        return ajaxService.send('/GET/approve/staffCommonInfo.json', {
                            data: {number: $scope.number}
                        }).then(function (res) {
                            $scope.userCommonInfo = res.data;
                            $scope.isAgent = ($scope.userCommonInfo.type == 21);
                            if ($scope.userCommonInfo.type == 1) {
                                if (+moment($scope.userCommonInfo.formalTime).format('YYYYMMDD') >
                                    +moment().format('YYYYMMDD')) {
                                    $scope.showFormalDate = true;
                                }
                            }
                            $scope.onGetUserCommonInfo && $scope.onGetUserCommonInfo();
                        });

                    };
                    $scope.$watch('number', function (newVal, oldVal) {
                        if (newVal != oldVal) {
                            $scope.getInfo();
                        }
                    }, true);
                    $scope.getInfo();
                }
            };
        }])
});
