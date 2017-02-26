/**
 * @file 联系方式options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName) {
        var config = require('module/config');
        return {
            mobile: {
                required: false,
                displayName: '手机号',
                maxLength: 15,
                name: 'mobile',
                formName: formName,
                pattern: '\\d*',
                placeholder: '少于15个数字',
                prefixClass: 'blue'
            },
            personalEmail: {
                required: false,
                displayName: '邮箱',
                maxLength: 50,
                name: 'personalEmail',
                formName: formName,
                type: 'email',
                placeholder: '50位英文字母+数字+字符'
            }
        }
    }
});