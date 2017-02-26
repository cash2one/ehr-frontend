/**
 * @file 输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope) {
        var config = require('module/config');
        var codeConfig = require('module/codeConfig');
        var nameConfig = require('module/nameConfig');

        var obj = {
            name: {
                required: true,
                displayName: '组织名称',
                maxLength: 20,
                name: 'name',
                formName: formName,
                placeholder: '少于20个字'
            },
            shortName: {
                required: false,
                displayName: '简称',
                maxLength: 20,
                name: 'shortName',
                formName: formName,
                placeholder: '少于20个字'
            },
            numberPrefix: {
                required: false,
                displayName: '员工编号序列',
                maxLength: 2,
                name: 'numberPrefix',
                formName: formName,
                pattern: '^[A-Z]+$',
                placeholder: 'A~Z或者AA~ZZ之间的英文字符'
            },
            parentStructure: {
                required: false,
                displayName: '上级组织',
                name: 'parentStructure',
                formName: formName,
                manageNodes: [config.STRUCTURE_ROOT_ID],
                mode: 'structure'
            },
            owner: {
                required: false,
                displayName: '部门负责人',
                mode: 'nameSuggestion',
                formName: formName,
                name: 'owner'
            },
            recruitHR: {
                required: false,
                displayName: '招聘HR',
                maxLength: 200,
                name: 'recruitHR',
                formName: formName,
                mode: 'multiName'
            },
            salaryHR: {
                required: false,
                displayName: '薪酬HR',
                maxLength: 200,
                name: 'salaryHR',
                formName: formName,
                mode: 'multiName'
            },
            relationshipHR: {
                required: false,
                displayName: '员工关系HR',
                maxLength: 200,
                name: 'relationshipHR',
                formName: formName,
                mode: 'multiName'
            },
            businessPartnerHR: {
                required: false,
                displayName: 'HRBP',
                maxLength: 200,
                name: 'businessPartnerHR',
                formName: formName,
                mode: 'multiName'
            },
            trainingHR: {
                required: false,
                displayName: '培训HR',
                maxLength: 200,
                name: 'trainingHR',
                formName: formName,
                mode: 'multiName'
            },
            reception: {
                required: false,
                displayName: '前台',
                name: 'reception',
                formName: formName,
                mode: 'multiName'
            },

            punchDevice: {
                required: false,
                displayName: '打卡机前缀',
                maxLength: 20,
                name: 'punchDevice',
                formName: formName,
                placeholder: '少于20个字'
            },

            assetManager: {
                required: false,
                displayName: '资产管理员',
                maxLength: 200,
                name: 'assetManager',
                formName: formName,
                mode: 'multiName'
            },
            itOwner: {
                required: false,
                displayName: 'IT负责人',
                maxLength: 20,
                name: 'itOwner',
                formName: formName,
                placeholder: '少于20个字',
                mode: 'multiName'
            },
            isKeyNode: {
                required: false,
                displayName: '工资结算结点',
                name: 'isKeyNode',
                formName: formName,
                mode: 'checkbox'
            },
            isPunchCard: {
                required: false,
                displayName: '打卡情况',
                name: 'isPunchCard',
                formName: formName,
                mode: 'select',
                items: [
                    {
                        id: 0,
                        name: '不打卡'
                    },
                    {
                        id: 1,
                        name: '打卡-餐补不计入工资'
                    },
                    {
                        id: 2,
                        name: '打卡-餐补计入工资'
                    }
                ]
            },


            taxLocal: {
                required: false,
                displayName: '本地缴纳所得税',
                name: 'taxLocal',
                formName: formName,
                mode: 'checkbox'
            },

            isWelfareDefault: {
                required: false,
                displayName: '默认有职位福利费',
                name: 'isWelfareDefault',
                formName: formName,
                mode: 'checkbox'
            },

            mealSubsidy: {
                required: false,
                displayName: '餐补',
                name: 'mealSubsidy',
                formName: formName,
                placeholder: '',
                pattern: '\\d*',
                maxLength: 6,
                postfix: '元/天'
            },

            socialSecurityCity: {
                required: false,
                displayName: '社保缴纳城市',
                mode: 'select',
                name: 'socialSecurityCity',
                formName: formName,
                items: []
            },


            levelTemplate: {
                required: false,
                displayName: '职级体系模板',
                mode: 'select',
                name: 'levelTemplate',
                formName: formName,
                items: []
            },

            calendar: {
                required: false,
                displayName: '日历模板',
                mode: 'select',
                name: 'calendar',
                formName: formName,
                items: []
            },

            mailSuffix: {
                required: false,
                displayName: '邮箱后缀',
                maxLength: 20,
                name: 'mailSuffix',
                formName: formName,
                placeholder: '少于20个字'
            },

            lowestSalary: {
                required: false,
                displayName: '最低工资标准',
                maxLength: 10,
                name: 'lowestSalary',
                formName: formName,
                placeholder: '可精确到小数点后两位',
                pattern: '^[0-9]+(.[0-9]{0,2})?$',
                type: 'number',
                postfix: '元/月'
            },

            isGroupNode: {
                required: false,
                displayName: '集团结点',
                name: 'isGroupNode',
                formName: formName,
                mode: 'checkbox'
            }
        }
        return obj;
    }
});