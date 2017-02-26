/**
/**
/**
 * @file 布尔值显示
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function(require) {
	var app = require('../app');
	var config = require('module/nameConfig');
	app.filter('boolean', function() {
		return function(value) {
			return (value === null || value === '' || typeof value == 'undefined') ? config.EMPTY_VALUE : (value ? '是' : '否');
		};
	})
});