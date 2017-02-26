/**
 * @file 打卡情况
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function(require) {
	var app = require('../app');
	var config = require('module/nameConfig');
	app.filter('punchCard', function() {
		return function(value) {
			return (value === null || value === '' || typeof value == 'undefined') ? config.EMPTY_VALUE : config.PUNCH_CARD[value];
		};
	})
});