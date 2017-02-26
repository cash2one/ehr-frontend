/**
 * 配置
 */
define(function(require) {
    return function(formName, $scope) {
        var config = require('module/config');
        return {
            leaveSignBill: {
                required: false,
                displayName: '离职签单/申请',
                name: 'leaveSignBill',
                formName: formName,
                mode: 'file'
            },
            leaveDate: {
                required: true,
                displayName: '离职日期',
                name: 'leaveDate',
                formName: formName,
                placeholder: 'yy-MM-dd',
                type: 'date',
                filter: 'dateFormat'
            },

            reasonFromHr: {
                required: false,
                displayName: '真实离职原因',
                mode: 'select',
                formName: formName,
                name: 'reasonFromHr',
                items: config.LEAVE_REASON
            }
        }
    }
});