/**
 * @file 基本信息输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope) {
        var config = require('module/config');
        var nameConfig = require('module/nameConfig');
        var codeConfig = require('module/codeConfig');
        var obj = {
            contractCompany: {
                required: true,
                displayName: '合同签约公司',
                mode: 'select',
                formName: formName,
                name: 'contractCompany',
                items: []
            },
            socialSecurityCity: {
                required: false,
                displayName: '社保缴纳城市',
                mode: 'select',
                name: 'socialSecurityCity',
                formName: formName,
                items: []
            },
            office: {
                required: true,
                displayName: '工作地点',
                mode: 'select',
                name: 'office',
                formName: formName,
                items: []
            },

            sit: {
                required: false,
                displayName: '工位',
                maxLength: 15,
                name: 'sit',
                formName: formName,
                placeholder: '示例:F1-001'
            },

            icCardNumber: {
                required: false,
                displayName: '工卡卡号',
                maxLength: 50,
                name: 'icCardNumber',
                formName: formName,
                placeholder: '少于50个字'
            },

            requireCheckTime: {
                required: false,
                displayName: '检查打卡时间',
                mode: 'select',
                name: 'requireCheckTime',
                formName: formName,
                filter: 'boolean',
                items: [
                    {
                        id: 1,
                        name: '是'
                    },
                    {
                        id: 0,
                        name: '否'
                    }
                ]
            },

            remotePunchCard: {
                required: false,
                displayName: '是否异地打卡',
                name: 'remotePunchCard',
                formName: formName,
                mode: 'select',
                items: config.REMOTE_PUNCH_CARD,
                filter:'remotePunchCard'
            },
            workEmail: {
                required: false,
                displayName: '邮箱地址',
                name: 'workEmail',
                formName: formName
            }
        }
        var type = $scope.staffType;
        if (type == codeConfig.TYPE_CODE.REGULAR) {
            obj.socialSecurityCity.required = true;
        }
        return obj;
    }
});