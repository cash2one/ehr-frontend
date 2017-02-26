/**
 * @file 输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope) {
        var config = require('module/config');
        var codeConfig = require('module/codeConfig');
        var nameConfig = require('module/nameConfig');

        var obj = {
            lawName: {
                required: true,
                displayName: '法律名',
                maxLength: 5,
                name: 'lawName',
                formName: formName,
                placeholder: '少于5个字'
            },
            sex: {
                required: true,
                displayName: '性别',
                name: 'sex',
                formName: formName,
                mode: 'select',
                items: config.SEX,
                filter: 'sex'
            }
        }
        return obj;
    }
});