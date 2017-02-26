/**
 * @file  自然信息输入的options
 * @author  Minsi Zhan zhanminsi@baijiahulian.com
 */
define(function (require) {
    return function(formName) {
        var config = require('module/config');
        var moment = require('moment');
        return {
            name: {
                required: false,
                displayName: '常用名',
                maxLength: 5,
                name: 'name',
                formName: formName,
                placeholder: '少于5个字，不填默认同法律名'
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
            isForeign: {
                required: true,
                displayName: '证件类型',
                name: 'isForeign',
                formName: formName,
                mode: 'select',
                items: config.ID_CARD_TYPE,
                filter: 'idCardType'
            },
            idCardNumber: {
                required: true,
                displayName: '证件号',
                maxLength: 18,
                name: 'idCardNumber',
                formName: formName,
                pattern: '[0-9a-zA-Z()（）]*',
                placeholder: '少于18个字'
            },
            accountLocation: {
                required: true,
                displayName: '户口所在地',
                maxLength: 10,
                name: 'accountLocation',
                formName: formName,
                placeholder: ''
            },
            birthday: {
                required: true,
                displayName: '出生日期',
                name: 'birthday',
                formName: formName,
                placeholder: 'yy-MM-dd',
                type: 'date',
                filter: 'dateFormat',
                max: moment().toDate()
            },
            beginWorkTime: {
                required: true,
                displayName: '全职参加工作时间',
                name: 'beginWorkTime',
                formName: formName,
                placeholder: 'yy-MM-dd',
                type: 'date',
                filter: 'dateFormat',
                max: moment().toDate()
            }
        }
    }
})