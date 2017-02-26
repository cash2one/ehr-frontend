/**
 * @file 是否打卡情况
 * @author Jeff Dean
 */
define(function(require) {
	var app = require('../app');
	var config = require('module/nameConfig');
	app.filter('remotePunchCard', function() {
		return function(value) {
			return (value === null || value === '' || typeof value == 'undefined')
				? config.EMPTY_VALUE : config.REMOTE_PUNCH_CARD[value];
		};
	})
});