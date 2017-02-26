/**
 * @file 工作经历信息输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName) {
        var config = require('module/config');
        return  {
            name: {
                required: true,
                displayName: '姓名',
                name: 'name',
                formName: formName,
                maxLength: 30,
                placeholder: '少于30个字'
            },
            title: {
                required: true,
                displayName: '称谓',
                name: 'title',
                formName: formName,
                maxLength: 30,
                placeholder: '少于30个字'
            },
            birthday: {
                required: false,
                displayName: '生日',
                name: 'birthday',
                formName: formName,
                type: 'date',
                placeholder: 'YYYY-MM-DD',
                filter: 'dateFormat'
            },
            company: {
                required: false,
                displayName: '单位',
                name: 'company',
                formName: formName,
                maxLength: 30,
                placeholder: '少于30个字'
            },
            position: {
                required: false,
                displayName: '职位',
                name: 'position',
                formName: formName,
                maxLength: 30,
                placeholder: '少于30个字'
            },
            mobile: {
                required: false,
                displayName: '联系电话',
                maxLength: 15,
                name: 'mobile',
                formName: formName,
                type: 'number',
                placeholder: '少于15个数字'
            }
        }
    };
});