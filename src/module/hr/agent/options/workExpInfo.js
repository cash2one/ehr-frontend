/**
 * @file 工作经历信息输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName) {
        var config = require('module/config');
        return  {
            start: {
                required: true,
                displayName: '开始时间',
                name: 'start',
                formName: formName,
                type: 'month',
                placeholder: 'YYYY-MM'
            },
            end: {
                required: true,
                displayName: '结束时间',
                name: 'end',
                formName: formName,
                type: 'month'
            },
            company: {
                required: true,
                displayName: '单位',
                name: 'company',
                formName: formName,
                maxLength: 30,
                placeholder: '少于30个字'
            },
            position: {
                required: true,
                displayName: '职位',
                name: 'position',
                formName: formName,
                maxLength: 30,
                placeholder: '少于30个字'
            }
        }
    }
});