/**
 * @file 工作日类型
 * @author helinfeng@baijiahulian.com
 */
define(function(require) {
	var app = require('../app');

	app.filter('weekendShow', function () {
        return function (data) {
            if ($.isNumeric(data)) {
                var val = parseInt(data);
                if (val === 0) {
                    return '工作日';
                }
                else if (val === 1) {
                    return '休息日';
                } 
                else {
                    return '--';
                }
            } 
            else {
                return '--';
            }
        };
    })
});