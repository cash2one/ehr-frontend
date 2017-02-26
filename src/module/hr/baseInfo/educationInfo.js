/**
 * @file 教育经历信息输入的options
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
            school: {
                required: true,
                displayName: '学校',
                name: 'school',
                formName: formName,
                maxLength: 15,
                placeholder: '少于15个字'
            },
            discipline: {
                required: true,
                displayName: '专业',
                name: 'discipline',
                formName: formName,
                maxLength: 15,
                placeholder: '少于15个字'
            },
            degree: {
                required: true,
                displayName: '学历',
                name: 'degree',
                formName: formName,
                mode: 'select',
                items: config.DEGREE
            }
        }
    }
});