/**
 * @file  临时卡删除
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var getInputOptions = require('./inputOptions');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var closeParam = {};

    app.controller('hrOptTempCardDelCtrl', ['$scope', 'hrRequest',
        '$stateParams', 'localStorage',
        '$state', 'util', '$modalInstance', 'item',
        function (
            $scope, hrRequest, $stateParams, localStorage, $state, util, $modalInstance, item) {
            var closeParam = {};

            init();

            function init() {
                $scope.save = save;
                $scope.closeHandler = closeHandler;
                $scope.inputOptions = getInputOptions('tempCardDelForm',
                    $scope, util);
            }

            /**
             * 确认
             */
            function save(form) {
                if (!form.$valid) {
                    return;
                }
                confirm('确认要删除该临时卡吗？删除后的临时卡无门禁和打卡记录功能，请谨慎操作。' +
                        '如有问题请联系ehr@baijiahulian.com',
                    function () {
                        hrRequest.delTempCard({
                            cardNumber: item.cardNumber,
                            detail: $scope.detail
                        }).then(function () {
                            closeParam.hadSuccess = true;
                            info('删除成功');
                            $modalInstance.dismiss(closeParam);
                        });
                    })
            };


            /**
             * 关闭modal
             */
            function closeHandler() {
                $modalInstance.dismiss(closeParam);
            }
        }
    ]);
});