/**
 * @file hmtl unsafe的浮层
 * @author yanlingling
 */
define(function (require) {
    var app = require('../app');
    app.directive("popoverHtmlUnsafe", [ "$tooltip", function ($tooltip) {
        return $tooltip("popoverHtmlUnsafe", "popover", "click");
    }])
});
