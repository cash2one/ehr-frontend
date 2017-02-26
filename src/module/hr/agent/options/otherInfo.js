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
                mode: 'file'
            },
            idCardAndContract: {
                required: false,
                displayName: '劳动合同/实习协议',
                name: 'idCardAndContract',
                formName: formName,
                mode: 'file'
            },
            idCardUpload: {
                required: false,
                displayName: '身份证复印件',
                name: 'idCardUpload',
                formName: formName,
                mode: 'file'
            },
            limitAgreement: {
                required: false,
                displayName: '竞业协议',
                name: 'limitAgreement',
                formName: formName,
                mode: 'file'
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