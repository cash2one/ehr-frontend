/**
 * @file 等级模板的添加和修改
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('module/config');
    app.controller('levelModCtrl', ['$scope', '$stateParams',
        'adminRequest', 'hrRequest', 'item', 'optType', '$modalInstance',
        function (
            $scope, $stateParams, adminRequest, hrRequest, item, optType, $modalInstance) {
            var title = '等级模板';
            $scope.name = item.name;
            if (optType == 'mod') {
                $scope.title = '修改' + title + '名称';
            } else {
                $scope.title = '新增' + title;
            }
            var formName = 'modLevelForm';
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
                    request = adminRequest.modLevelTemplate;
                    data.id = item.id;
                    data.name = $scope.name;
                } else {
                    request = adminRequest.addLevelTemplate;
                    data.name = $scope.name;
                }
                request(data).then(function (res) {
                    info('操作成功');
                    $modalInstance.dismiss({
                        hasSuccess: true,
                        optType: optType,
                        id: data.id,
                        name: data.name
                    });
                });
            }
        }]);
})
