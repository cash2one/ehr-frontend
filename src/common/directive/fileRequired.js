/**
 * @file 文件必须
 * @author yanlingling
 */
define(function (require) {
    var app = require('../app');
    app.directive('fileRequired', ['util', function (util) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {

                ctrl.$validators.fileRequired = function(modelValue, viewValue) {
                    return !attr.required || !ctrl.$isEmpty(viewValue);
                };

                attr.$observe('required', function() {
                    ctrl.$validate();
                });
            }
        };
    }]);
});
