/**
 * @file 输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function(require) {
    return function(formName, $scope, util) {
        var config = require('module/config');
        var codeConfig = require('module/codeConfig');
        var nameConfig = require('module/nameConfig');
        var obj = {

            borrowUserName: {
                required: true,
                displayName: '借卡人',
                mode: 'nameSuggestion',
                formName: formName,
                name: 'borrowUserName'
            },

            idCardNumber: {
                required: true,
                displayName: '身份证后6位',
                name: 'idCardNumber',
                formName: formName,
                minLength: 6,
                maxLength: 6,
                pattern: '[0-9a-zA-Z()（）]*',
                placeholder: '请输入借卡人身份证号码后六位'
            },

            memo: {
                required: false,
                displayName: '备注',
                maxLength: 100,
                name: 'memo',
                formName: formName,
                placeholder: '少于100个字',
                mode: 'textarea'
            }
        }
        return obj;
    }
});