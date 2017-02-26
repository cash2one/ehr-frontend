/**
 * @file unsafe 的气泡
 * @author yanlingling
 */
define(function (require) {
    var app = require('../../app');
    app.directive("popoverHtmlUnsafePopup", function () {
        return {
            restrict: "EA",
            replace: true,
            scope: { title: "@", content: "@", placement: "@", animation: "&", isOpen: "&"},
            templateUrl: "src/common/directive/popoverHtmlUnsafePopup/tpl.html",
            link: function($scope, elem, attr) {
                $scope.closePopover = function () {
                    $scope.$parent.tt_isOpen = false;
                    elem.remove();
                }
            }
        };
    })
});
