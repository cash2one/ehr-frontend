/**
 * @file 编辑offer
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName) {
        var config = require('module/config');
        return {
            reason: {
                required: false,
                displayName: '变动原因',
                maxLength: 200,
                name: 'reason',
                formName: formName,
                placeholder: '少于200个字',
                mode: 'textarea'
            }
        };
    };
});