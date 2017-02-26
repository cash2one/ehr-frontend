/**
 * @file  登陆框
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('./config');
    app.factory('login', [ '$rootScope', '$modal',
        function ($rootScope, $modal, $modalInstance) {
            return  {
                /**
                 * 登陆框
                 * @param value
                 * @param yesCallback
                 */
                show: function () {
                    $modal.open({
                        animation: false,
                        backdrop: 'static',
                        size: 'sm',
                        templateUrl: 'src/common/service/login/login.html',
                        controller: [ '$scope', '$modalInstance', '$http',
                            function ($scope, $modalInstance, $http) {
                                $scope.saveHandler = function () {
                                    if (!$scope.username || !$scope.password) {
                                        alert('请输入用户名和密码');
                                    }
                                    $http({
                                        method: 'POST',
                                        url: '/GET/user/login.json',
                                        data: {
                                            password: $scope.password,
                                            username: $scope.username
                                        }
                                    }).success(function (data) {
                                        if (data.status == 200) {
                                            window.location.reload();
                                        } else if (data.status == 500) {
                                            alert('系统异常');
                                        } else if (data.status == 400 || data.status == 800) {
                                            alert(data.error.message);
                                        }
                                    });
                                }
                            }]
                    });
                }
            }
        }]);
});
