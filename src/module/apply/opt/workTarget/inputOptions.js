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
                displayName: '目标设定',
                maxLength: 1000,
                minLength: 200,
                name: 'detail',
                formName: formName,
                placeholder: '该工作计划将作为考察员工试用期是否符合正式录用的依据，请与上级协商后再进行填写。（不少于200字，不超过1000字）',
                mode: 'textarea'
            }
        }
        return obj;
    }
})