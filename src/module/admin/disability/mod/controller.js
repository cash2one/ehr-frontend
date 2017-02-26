/**
 * @file 添加名单
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('module/config');
    app.controller('disabilityModCtrl', ['$scope', '$stateParams',
        'adminRequest', 'hrRequest', '$modalInstance', 'util',
        function (
            $scope, $stateParams, adminRequest, hrRequest, $modalInstance, util) {

            /**
             * 关闭modal
             */
            $scope.closeHandler = function () {
                $modalInstance.dismiss({});
            }

            /**
             * 保存
             */
            $scope.saveHandler = function (form) {
                form.$submitted = true;
                if (!form.$valid) {
                    return;
                }
                var data = {
                    username: util.getUsernameFromSuggestion($scope.name)
                };
                adminRequest.addDisability(data).then(function (res) {
                    info('操作成功');
                    $modalInstance.dismiss({
                        hasSuccess: true
                    });
                });
            }
        }]);
})
