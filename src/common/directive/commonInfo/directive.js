/**
 * @file 输入名字的suggestion
 * @author yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var codeConfig = require('module/codeConfig');
    app.directive('commonInfo', ['$http', 'ajaxService', 'hrOptUtil',
        function ($http, ajaxService, hrOptUtil) {
            return {
                restrict: 'EA',
                templateUrl: 'src/common/directive/commonInfo/tpl.html',
                scope: false,
                require: '?ngModel',
                replace: false,
                link: function ($scope, elem, attrs, ngModel) {
                    var codeConfig = require('module/codeConfig');
                    var statusCode = codeConfig.STAFF_STATUS_CODE;
                    if (($scope.isFromHRBP || $scope.isFromRelationshipHR)
                        && $scope.commonInfo.status != statusCode.LEAVED) {
                        $scope.canEditHeadImg = true;
                    }

                    /**
                     * 点击上传
                     */
                    $scope.uploadClick = function () {
                        if (!$scope.canEditHeadImg) {
                            return;
                        }
                        uploadImg();
                    }

                    /**
                     * 点击编辑
                     */
                    $scope.editClick = function () {
                        if (!$scope.canEditHeadImg) {
                            return;
                        }
                        uploadImg();
                    }

                    /**
                     * 上传图片
                     */
                    function uploadImg() {
                        hrOptUtil.uploadHeadImg($scope.commonInfo.number,
                            function (params) {
                                if (params.hadSuccess) {
                                    $scope.commonInfo.headImgUrl = params.url;
                                }
                            });
                    }
                }
            };
        }])
});
