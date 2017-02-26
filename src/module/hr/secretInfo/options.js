/**
 * @file 自然信息输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope) {
        var config = require('module/config');
        var type = $scope.staffType;
        var codeConfig = require('module/codeConfig');
        var obj = {
            cardNum: {
                required: true,
                displayName: '银行卡号',
                maxLength: 20,
                name: 'cardNum',
                formName: formName,
                pattern: '\\d*',
                placeholder: '少于20个数字'
            },
            personalEmail: {
                required: false,
                displayName: '联系邮箱',
                maxLength: 50,
                name: 'personEmail',
                formName: formName,
                type: 'email',
                placeholder: '50位英文字母+数字+字符'
            },
            emergContact: {
                required: false,
                displayName: '紧急联系人',
                maxLength: 10,
                name: 'emergContact',
                formName: formName,
                placeholder: '少于10个字'
            },
            emergContactMobile: {
                required: false,
                displayName: '紧急联系人电话',
                maxLength: 15,
                name: 'emergContactMobile',
                formName: formName,
                pattern: '\\d*',
                placeholder: '少于15个数字'
            },
            address: {
                required: false,
                displayName: '住址及邮编',
                maxLength: 50,
                name: 'address',
                formName: formName,
                placeholder: '少于50个字'
            },

            filePlace: {
                required: false,
                displayName: '档案挂靠处',
                maxLength: 50,
                name: 'filePlace',
                formName: formName,
                placeholder: '少于50个字'
            },
            bank: {
                required: true,
                displayName: '发卡行',
                mode: 'select',
                name: 'bank',
                formName: formName,
                items: []
            }
        };
        if (type == codeConfig.TYPE_CODE.REGULAR) {
            obj.personalEmail.required = true;
            obj.emergContact.required = true;
            obj.emergContactMobile.required = true;
            obj.address.required = true;
        }
        return obj;
    }
});