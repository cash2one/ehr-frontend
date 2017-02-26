/**
 * @file 新员工入职
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var closeParam = {};
    app.controller('homeYearAwardController', hrOptRejoinController);
    hrOptRejoinController.$inject = ['$scope', '$modalInstance', 'ajaxService'];

    function hrOptRejoinController($scope, $modalInstance, ajaxService) {

        init();

        /**
         * 初始化
         */
        function init() {
            $scope.fileChange = fileChange;
            $scope.closeHandler = closeHandler;
        };

        function fileChange() {
            var file = $("#year-award-upload")[0].files[0];
            var split = file.name.split('.');
            var postfix = split[split.length - 1];
            if (file && (postfix != 'xlsx')) {
                alert('请上传.xlsx格式的文件');
                return;
            }
            var data = new FormData();
            data.append('file', file);

            ajaxService.send('/ADD/file/bonusFile.json', {
                data: data,
                type: 'file'
            }).then(function (response) {
                info('已导入' + response.data + '条数据');
            });
        };

        function closeHandler() {
            $modalInstance.dismiss(closeParam);
        };
    }

});