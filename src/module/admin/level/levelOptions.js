/**
 * @file 等级输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName) {
        var config = require('module/config');
        return  {
            level: {
                required: true,
                displayName: '等级',
                name: 'level',
                formName: formName,
                maxLength: 10,
                placeholder: '少于10个字'
            },
            levelName: {
                required: true,
                displayName: '等级名称',
                name: 'levelName',
                formName: formName,
                maxLength: 30,
                placeholder: '少于30个字'
            }
        }
    };
});