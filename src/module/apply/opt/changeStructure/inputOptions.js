/**
 * @file 输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope) {
        var config = require('module/config');
        var codeConfig = require('module/codeConfig');
        var nameConfig = require('module/nameConfig');
        var applyConfig = require('../../config');
        var moment = require('moment');
        var obj = {
            level: {
                required: false,
                displayName: '调整为',
                mode: 'select',
                formName: formName,
                name: 'level',
                items: []
            },
            position: {
                required: false,
                displayName: '调整为',
                mode: 'select',
                formName: formName,
                name: 'position',
                items: []
            },
            structure: {
                required: false,
                displayName: '调整为',
                name: 'structure',
                formName: formName,
                manageNodes: [],
                mode: 'structure'
            },
            leader: {
                required: false,
                displayName: '调整为',
                mode: 'nameSuggestion',
                formName: formName,
                name: 'leader'
            },
            executeDate: {
                required: true,
                displayName: '生效日期',
                min: new Date(moment().format('YYYY-MM-DD') + " 00:00:00"),
                name: 'executeDate',
                formName: formName,
                placeholder: 'yy-MM-dd',
                type: 'date',
                tip: applyConfig.EXECUTE_DATE_TIP
            },
            reason: {
                required: false,
                displayName: '变动原因',
                maxLength: 200,
                name: 'reason',
                formName: formName,
                placeholder: '少于200个字',
                mode: 'textarea'
            }
        }
        return obj;
    }
});