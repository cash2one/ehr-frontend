/**
 * @file 城市修改
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('module/config');
    app.controller('adminOfficeModControllor', ['$scope', '$stateParams',
        'adminRequest', 'hrRequest', 'item', 'optType', '$modalInstance',
        function (
            $scope, $stateParams, adminRequest, hrRequest, item, optType, $modalInstance) {
            var title = '办公地点';
            $scope.name = item.name;
            if (optType == 'mod') {
                $scope.title = '修改' + title + '名称';
            } else {
                $scope.title = '新增' + title;
            }
            var formName = 'modOfficeForm';
            $scope.inputOptions = {
                name: {
                    required: true,
                    displayName: title,
                    maxLength: 50,
                    name: 'name',
                    formName: formName,
                    placeholder: '少于50个字'
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
                    request = adminRequest.modOffice;
                    data.office= item.id;
                    data.officeName = $scope.name;
                } else {
                    request = adminRequest.addOffice;
                    data.officeName = $scope.name;
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
