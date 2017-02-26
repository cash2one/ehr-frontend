/**
 * @file 基本信息输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope) {
        var config = require('module/config');
        return {
            type: {
                required: false,
                displayName: '员工类型',
                mode: 'select',
                formName: formName,
                name: 'type',
                items: config.TYPE,
                prefixClass: 'blue',
                filter: 'type',
                changeHandler: $scope.typeChange
            },
            structure: {
                required: false,
                displayName: '组织架构',
                name: 'structure',
                formName: formName,
                manageNodes: $scope.userInfo.hasRoles.recruitHR,
                mode: 'structure',
                prefixClass: 'blue'
            },
            level: {
                required: false,
                displayName: '等级',
                mode: 'select',
                formName: formName,
                name: 'level',
                items: [],
                prefixClass: 'blue'
            },
            position: {
                required: false,
                displayName: '职位',
                mode: 'select',
                formName: formName,
                name: 'position',
                items: [],
                prefixClass: 'blue'
            },
            leader: {
                required: false,
                displayName: '直属领导',
                mode: 'nameSuggestion',
                formName: formName,
                name: 'leader',
                prefixClass: 'blue'
            },
            formalDate: {
                required: false,
                displayName:'转正日期',
                mode: 'select',
                formName: formName,
                name: 'formalDate',
                items: [],
                prefixClass: 'blue'
            },
            promiseEnterDate: {
                required: false,
                displayName: '入职时间',
                name: 'promiseEnterDate',
                formName: formName,
                placeholder: 'yy-MM-dd',
                type: 'date',
                prefixClass: 'blue'
            },
            contractCompany: {
                required: false,
                displayName: '合同签约公司',
                mode: 'select',
                formName: formName,
                name: 'contractCompany',
                items: [],
                prefixClass: 'blue'
            },
            socialSecurityCity: {
                required: false,
                displayName: '社保缴纳城市',
                mode: 'select',
                name: 'socialSecurityCity',
                formName: formName,
                items: []
            }
        }
    }
});