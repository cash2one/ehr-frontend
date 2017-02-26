/**
 * @file 输入控件校验
 *
 * 用于根据校验规则自动显示错误提示，所在的form必须采用angular的form校验方式
 *
 * 使用说明：
 *
 *  1）标签加上属性 input-validate="errorOption" 传递关联参数
 *   <input class="form-control" input-validate="errorOption" />
 *  2) 参数说明
 *     {
 *       displayName: '显示名字',
 *       formName: 'formName', // 所在的form名字
 *       name: ‘name’   // 字段名字
 *     }
 * @author yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    app.directive('inputValidate', ['$http', '$templateCache', '$compile',
        function ($http, $templateCache, $compile) {
            return {
                restrict: 'EA',
                scope: {
                    options: '=inputValidate'
                },
                replace: false,
                link: function ($scope, elem, attrs) {
                    if ($scope.options) {
                        $scope.optTip = '输入';
                        if ($scope.options.mode == 'file') {
                            $scope.optTip = '上传';
                        }
                        var tpl = 'src/common/directive/inputValidate/tpl.html';
                        $scope.maxlength = $scope.options.maxLength;
                        $scope.minlength = $scope.options.minLength;
                        $scope.min = $scope.options.min;
                        $scope.max = $scope.options.max;
                        $scope.$watch('options.min', function (newVal, oldVal) {
                            $scope.min = newVal;
                        });
                        $scope.$watch('options.max', function (newVal, oldVal) {
                            $scope.max = newVal;
                        });
                        var errorTemplate = $templateCache.get(tpl) || $.ajax({
                            type: 'GET',
                            url: tpl,
                            async: false
                        }).responseText;
                        $scope.name = $scope.options.name;
                        var formName = $scope.options.formName;
                        var parent = $scope.$parent;
                        $scope.form = parent[formName];
                        while (!$scope.form) {
                            parent = parent.$parent;
                            $scope.form = parent[formName];
                        }
                        var res = $compile(errorTemplate)($scope);
                        $(elem).after(res);
                    }
                }
            };
        }])
});
