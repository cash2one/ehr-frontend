/**
 * @file 新员工入职
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var closeParam = {};
    app.controller('hrOptUploadHeadImgController', hrOptUploadHeadImgController);
    hrOptUploadHeadImgController.$inject = ['$scope', '$modalInstance', 'number', 'hrRequest', 'ajaxService'];

    function hrOptUploadHeadImgController($scope, $modalInstance, number, hrRequest, ajaxService) {
        $scope.closeHandler = closeHandler;
        $scope.uploadImg = uploadImg;
        var closeParam = {};

        init();

        /**
         * 初始化
         */
        function init() {
            $scope.imgOptions = {
                width: 550,
                height: 350,
                action: '/ADD/file/file.json',
                accept: ['png', 'jpg', 'jpeg'],
                minSize: 100,
                maxSize: 5 * 1024,

                button: {
                    select: {
                        x: 80,
                        y: 310,
                        width: 80,
                        height: 36,
                        text: '选择图片'
                    },
                    upload: {
                        x: 200,
                        y: 310,
                        width: 80,
                        height: 36,
                        text: '保存图片'
                    },
                    leftRotate: {
                        x: 0,
                        y: 310,
                        width: 40,
                        height: 36,
                        text: '左转'
                    },
                    rightRotate: {
                        x: 320,
                        y: 310,
                        width: 40,
                        height: 36,
                        text: '右转'
                    }
                },

                src: {
                    x: 0,
                    y: 0,
                    width: 360,
                    height: 300
                },

                dest: [
                    {
                        x: 380,
                        y: 100,
                        width: 150,
                        height: 200,
                        text: '头像'
                    }
                ],

                onValidateError: function (data) {
                    if (data.type == 'size') {
                        alert('请上传大于100KB的文件');
                    }
                },

                onUploadComplete: function (response) {
                    var res = JSON.parse(response.data);
                    closeParam.url = res.data.url;
                    hrRequest.modHeadImg({
                        storageId: res.data.storageId,
                        number: number
                    }).then(function () {
                        info('上传成功');
                        closeParam.hadSuccess = true;
                        $modalInstance.dismiss(closeParam);
                    })
                }
            };
        };

        /**
         * 上传图片
         */
        function uploadImg() {
            var file = $("#head-img-upload")[0].files[0];
            if (!isValidFile(file)) {
                alert('请上传正确后缀的文件');
                return;
            }
            var data = new FormData();
            data.append('file', file);
            ajaxService.send('/ADD/file/file.json', {
                data: data,
                type: 'file'
            }).then(function (response) {
                closeParam.url = response.data.url;
                hrRequest.modHeadImg({
                    storageId: response.data.storageId,
                    number: number
                }).then(function () {
                    info('上传成功');
                    closeParam.hadSuccess = true;
                    $modalInstance.dismiss(closeParam);
                })
            });
        }

        function isValidFile(img) {
            var split = img.name.split('.');
            var name = split[split.length - 1];

            function find(arr, val) {
                var val = val.toLowerCase();
                for (var i = 0; i < arr.length; i++) {
                    if (val == arr[i]) {
                        return true;
                    }
                }
                return false;
            }

            var allowed = ['png', 'jpg', 'jpeg'];
            if (!find(allowed, name)) {
                return false;
            }
            return true;
        }

        /**
         * 关闭
         */
        function closeHandler() {
            $modalInstance.dismiss(closeParam);
        };
    }
});