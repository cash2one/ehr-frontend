/**
 * @file 输入的options
 * @author Minsi Zhan zhanminsi@baijiahulian.com
 */
define(function(require) {
    return function(formName, $scope) {
        var config = require('module/config');
        var obj = {
            detail: {
                required: true,
                displayName: '转正申请',
                maxLength: 1000,
                minLength: 200,
                name: 'detail',
                formName: formName,
                placeholder: '该转正申请主要是总结试用期工作目标的完成情况及对接下来工作的规划。（不少于200字，不超过1000字）',
                mode: 'textarea'
            }
        }
        return obj;
    }
})