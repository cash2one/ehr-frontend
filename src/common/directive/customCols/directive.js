/**
 * @file 勾选组
 * @author yanlingling
 */
define(function (require) {
    var app = require('../../app');
    app.directive('customCols', function () {
        return {
            restrict: 'EA',

            scope: {
                options: '=',


                /**
                 * 点击确定的回调
                 */
                confirmHandler: '&'
            },
            replace: false,
            templateUrl: 'src/common/directive/customCols/tpl.html',
            link: function ($scope, elem, attrs) {
                $scope.status = {};
                $scope.status.isopen = false;

                /**
                 * 点击确定
                 * @param error
                 */
                $scope.confirmBtnClickHandler = function (error) {
                    if (error != '') {
                        return;
                    } else {
                        $scope.confirmHandler();
                        $scope.status.isopen = false;
                    }
                }

                /**
                 * 点击取消
                 */
                $scope.cancelBtnClickHandler = function () {
                    $scope.status.isopen = false;
                }
            }
        };
    });
});
