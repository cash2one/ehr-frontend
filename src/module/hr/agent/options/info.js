/**
 * @file 基本信息输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope) {
        var config = require('module/config');
        return {
            promiseEnterDate: {
                required: true,
                displayName: '入职时间',
                name: 'promiseEnterDate',
                formName: formName,
                placeholder: 'yy-MM-dd',
                type: 'date'
            },
            structure: {
                required: true,
                displayName: '组织架构',
                name: 'structure',
                formName: formName,
                manageNodes: $scope.userInfo.hasRoles.recruitHR,
                mode: 'structure'
            },
            level: {
                required: true,
                displayName: '等级',
                mode: 'select',
                formName: formName,
                name: 'level',
                items: []
            },
            position: {
                required: true,
                displayName: '职位',
                mode: 'select',
                formName: formName,
                name: 'position',
                items: []
            },
            leader: {
                required: true,
                displayName: '直属领导',
                mode: 'nameSuggestion',
                formName: formName,
                name: 'leader'
            }
        }
    }
});