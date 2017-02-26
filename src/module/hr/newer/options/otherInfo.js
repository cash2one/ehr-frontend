/**
 * @file 其他信息
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName) {
        var config = require('module/config');
        return {
            resumeStorageId: {
                required: false,
                displayName: '电子简历',
                name: 'resumeStorageId',
                formName: formName,
                prefixClass: 'blue',
                mode: 'file'
            },
            pcType: {
                required: false,
                displayName: '配备电脑',
                name: 'pcType',
                formName: formName,
                mode: 'select',
                items: config.PC_TYPE,
                prefixClass: 'blue',
                filter: 'pcType'
            },
            detail:{
                required: false,
                displayName: '备注',
                maxLength: 200,
                name: 'detail',
                formName: formName,
                placeholder: '少于200个字',
                mode: 'textarea'
            },
            recommendType:{
                required: false,
                displayName: '入职推荐途径',
                name: 'recommendType',
                formName: formName,
                mode: 'select',
                items: config.RECOMMEND_TYPE,
                prefixClass: 'blue',
                filter: 'recommendType'
            },
            recommendDetail:{
                required: false,
                displayName: '推荐详情',
                maxLength: 30,
                name: 'recommendDetail',
                formName: formName,
                placeholder: '少于30个字'
            }
        }
    }
});