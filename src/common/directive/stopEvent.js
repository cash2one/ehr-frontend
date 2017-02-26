/**
 * @file 阻止事件冒泡
 * @author yanlingling
 */
define(function (require) {
    var app = require('../app');
    app.directive('stopEvent', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind(attr.stopEvent, function (e) {
                    e.stopPropagation();
                });
            }
        };
    });
});

