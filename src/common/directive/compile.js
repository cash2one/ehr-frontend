/**
 * @file 编译模板指令
 * @author yanlingling
 */
define(function (require) {
    var app = require('../app');
    app.directive('compile', [
        '$compile', '$templateCache',
        function ($compile, $templateCache) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    // Watch for changes to expression.
                    scope.$watch(attrs.compile, function (new_val) {
                        var cellTemplate = $templateCache.get(new_val);
                        if (!cellTemplate) {
                            var tpl = $.ajax({
                                type: 'GET',
                                url: new_val,
                                async: false
                            }).responseText;
                            $templateCache.put(new_val, tpl);
                            cellTemplate = tpl;
                        }

                        /*
                         * Compile creates a linking function
                         * that can be used with any scope.
                         */
                        var link = $compile(cellTemplate);

                        /*
                         * Executing the linking function
                         * creates a new element.
                         */
                        var new_elem = link(scope);

                        // Which we can then append to our DOM element.
                        element.append(new_elem);
                    });
                }
            };
        }])
});
