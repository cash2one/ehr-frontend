/**
 * @file 签约公司修改
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('module/config');
    app.controller('contractCompanyModCtrl', ['$scope', '$stateParams',
        'adminRequest', 'hrRequest', 'item', 'optType', '$modalInstance',
        function (
            $scope, $stateParams, adminRequest, hrRequest, item, optType, $modalInstance) {
            var title = '签约公司';
            $scope.name = item.name;
            if (optType == 'mod') {
                $scope.title = '修改' + title + '名称';
            } else {
                $scope.title = '新增' + title;
            }
            var formName = 'modContractCompanyForm';
            $scope.inputOptions = {
                name: {
                    required: true,
                    displayName: title,
                    maxLength: 20,
                    name: 'name',
                    formName: formName,
                    placeholder: '少于20个字'
                }
            }

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
                var request = null;
                var data = {};
                if (optType == 'mod') {
                    request = adminRequest.modContractCompany;
                    data.contractCompany = item.id;
                    data.contractCompanyName = $scope.name;
                } else {
                    request = adminRequest.addContractCompany;
                    data.contractCompanyName = $scope.name;
                }
                request(data).then(function (res) {
                    info('操作成功');
                    $modalInstance.dismiss({
                        hasSuccess: true,
                        optType: optType
                    });
                });
            }
        }]);
})
