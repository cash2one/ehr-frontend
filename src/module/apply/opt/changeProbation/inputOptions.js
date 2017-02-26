/**
 * @file 输入的options
 * @author wangmeng wangmeng01@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope) {
        var config = require('module/config');
        var codeConfig = require('module/codeConfig');
        var nameConfig = require('module/nameConfig');
        var obj = {
            probationEndDate: {
                required: true,
                displayName: '试用期截止日期',
                name: 'probationEndDate',
                formName: formName,
                placeholder: 'yy-MM-dd',
                type: 'date'
            },
            commonts: {
                required: true,
                displayName: '备注',
                maxLength: 200,
                name: 'commonts',
                formName: formName,
                placeholder: '请填写试用期变更原因（少于200个字）',
                mode: 'textarea'
            }
        }

        return obj;
    }
});