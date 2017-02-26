/**
 * @file 工作信息
 * @author yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('module/config');
    app.directive('structureInfo', ['ajaxService', 'adminRequest', '$templateCache', '$compile', '$timeout',
        function (ajaxService, adminRequest, $templateCache, $compile, $timeout) {
            return {
                restrict: 'EA',
                scope: {
                    id: '@nodeId'
                },
                replace: false,
                link: function ($scope, elem, attrs) {
                    $(elem).hover(function () {
                        $scope.timer = $timeout(function () {
                            var tpl = 'src/module/admin/directive/structureInfo/tpl.html';
                            var template = $templateCache.get(tpl) || $.ajax({
                                type: 'GET',
                                url: tpl,
                                async: false
                            }).responseText;
                            adminRequest.getStuctureInfo({
                                id: $scope.id
                            }).then(function (res) {
                                $scope.info = res.data;
                            });

                            var res = $compile(template)($scope);
                            $(elem).parent().parent().parent().append(res);
                        }, 500)
                    }, function () {
                        $timeout.cancel($scope.timer);
                        $('.admin-directive-structureInfo').detach();
                    })
                }
            };
        }])
});
