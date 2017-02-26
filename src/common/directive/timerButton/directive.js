/**
 * @file 点击后开始计时的button,如验证码发送后，计时60秒后，才能再次使用
 * @author yanlingling
 */
define(function (require) {
    var app = require('../../app');
    app.directive('timerButton',
        ['$interval' , function ($interval) {
            return {
                restrict: 'EA',
                replace: false,
                scope: {
                    /**
                     * 点击事件
                     */
                    onClick: '&clickhandler',

                    /**
                     * 开始倒计时
                     */
                    begintimer: '=',

                    /**
                     * 多少秒后按钮重新变为可点击
                     */
                    remain: '@time'
                },
                templateUrl: 'src/common/directive/timerButton/tpl.html',
                link: function (scope, element, attrs) {
                    var timeMax = scope.remain;
                    // 默认密码已经发送，显示倒计时
                    // scope.begintimer = true;
                    /**
                     * 计时函数
                     */
                    function beginTimer() {
                        scope.remain = timeMax;
                        scope.showTimer = true;
                        var intervalPromise = $interval(function () {
                            scope.remain--;
                            if (scope.remain == 0) {
                                scope.showTimer = false;
                                scope.begintimer = false;
                                $interval.cancel(intervalPromise);
                            }
                        }, 1000);
                    }

                    scope.clickHandler = function () {
                        scope.onClick();
                    };
                    scope.$watch('begintimer', function (newValue, oldValue) {
                        if (newValue == true) {
                            beginTimer();
                        }
                    }, true)
                }
            }
        }])
});
