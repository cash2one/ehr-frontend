/**
 * @file  空数据处理
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/nameConfig');
    app.filter('emptyFormat', ['util', function (util) {
            return function (value) {
                if (util.isEmpty(value)) {
                    return config.EMPTY_VALUE;
                }
                return value;
            }
        }]
    )
});
