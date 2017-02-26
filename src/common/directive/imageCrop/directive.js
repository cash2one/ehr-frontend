/**
 * @file 图片剪裁
 * @author yanlingling
 */
define(function (require) {
    var app = require('../../app');
    require('imageCrop/imageCrop');
    app.directive('imageCrop', ['$http', function ($http) {
        return {
            restrict: 'EA',
            scope: {
                /**
                 * @property {Object} options
                 */
                options: '='
            },
            require: '?ngModel',
            templateUrl: 'src/common/directive/imageCrop/tpl.html',
            replace: false,
            link: function ($scope, elem, attrs, ngModel) {
                var options = $scope.options;
                options.element = $(elem);
                options.flashUrl = '../../../../../../../js-library/dep/imageCrop/bin/src/imageCrop.swf';
                new ImageCrop(options);
            }
        };
    }])
});