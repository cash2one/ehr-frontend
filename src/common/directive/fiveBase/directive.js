/**
 * @file 输入名字的suggestion
 * @author yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var codeConfig = require('module/codeConfig');
    var getOptions = require('./inputOptions');
    app.directive('fiveBase', ['$http', 'ajaxService', 'hrOptUtil',
        function ($http, ajaxService, hrOptUtil) {
            return {
                restrict: 'EA',
                templateUrl: 'src/common/directive/fiveBase/tpl.html',
                scope: false,
                require: '?ngModel',
                replace: false,
                compile: function ($scope, elem, attrs, ngModel) {
                    return {
                        pre: function ($scope) {
                            var initOptions = $scope.fiveBaseInitOptions;
                            $scope.fiveBaseInitOptions.fieldName = initOptions.fieldName || '五险基数';
                            $scope.fiveBaseOptions = getOptions(initOptions.formName, $scope);
                        }
                    }
                }
            };
        }])
});
