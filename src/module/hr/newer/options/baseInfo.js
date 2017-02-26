/**
 * @file 自然信息输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName) {
        var config = require('module/config');
        return {
            name: {
                required: false,
                displayName: '常用名',
                maxLength: 5,
                name: 'name',
                formName: formName,
                placeholder: '少于5个字，不填默认同法律名'
            },
            nickName: {
                required: true,
                displayName: '昵称',
                maxLength: 5,
                name: 'name',
                formName: formName,
                placeholder: '少于5个字'
            },
            namePinyin: {
                required: true,
                displayName: '姓名拼音',
                maxLength: 15,
                name: 'namePinyin',
                formName: formName,
                pattern: '[a-z]*',
                placeholder: '用于生成邮箱，少于15个字符'
            },
            sex: {
                required: true,
                displayName: '性别',
                name: 'sex',
                formName: formName,
                mode: 'select',
                items: config.SEX,
                filter: 'sex'
            },
            degree: {
                required: true,
                displayName: '学历',
                name: 'degree',
                formName: formName,
                mode: 'select',
                items: config.DEGREE,
                filter: 'degree'
            },
            lawName: {
                required: true,
                displayName: '法律名',
                maxLength: 5,
                name: 'lawName',
                formName: formName,
                placeholder: '少于5个字'
            },
            idCardNumber: {
                required: false,
                displayName: '身份证号',
                maxLength: 18,
                name: 'idCardNumber',
                formName: formName,
                pattern: '[0-9a-zA-Z()（）]*',
                placeholder: '少于18个字'
            }
        }
    }
});