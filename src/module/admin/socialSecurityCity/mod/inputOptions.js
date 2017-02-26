/**
 * @file 输入的options
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function (formName, $scope, util) {
        var config = require('module/config');
        var codeConfig = require('module/codeConfig');
        var nameConfig = require('module/nameConfig');
        var obj = {
            name: {
                required: true,
                displayName: '社保缴纳城市',
                maxLength: 40,
                name: 'name',
                formName: formName,
                placeholder: '少于40个字'
            },
            socialSecurityMax: {
                required: true,
                displayName: '社保基数上限',
                name: 'socialSecurityMax',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: '元'
            },
            socialSecurityMin: {
                required: true,
                displayName: '社保基数下限',
                name: 'socialSecurityMin',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: '元'
            },
            socialSecurityDefault: {
                required: true,
                displayName: '默认社保基数',
                name: 'socialSecurityDefault',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: '元'
            },
            socialSecurityBySalary: {
                required: false,
                displayName: '默认应发工资',
                name: 'socialSecurityBySalary',
                formName: formName,
                mode: 'checkbox',
                changeHandler: $scope.socialSecurityBySalaryChange
            },
            needFiveBase: {
                required: false,
                displayName: '需配置5个基数',
                name: 'needFiveBase',
                formName: formName,
                mode: 'checkbox'
            },
            // 公积金
            houseFundPersonalPer: {
                required: true,
                displayName: '公积金个人缴纳比例',
                name: 'houseFundPersonalPer',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: '%'

            },
            houseFundCompanyPer: {
                required: true,
                displayName: '公积金公司缴纳比例',
                name: 'houseFundCompanyPer',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: '%'
            },
            houseFundMin: {
                required: true,
                displayName: '公积金基数下限',
                name: 'houseFundMin',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: '元'
            },
            houseFundMax: {
                required: true,
                displayName: '公积金基数上限',
                name: 'houseFundMax',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: '元'
            },
            houseFundDefault: {
                required: true,
                displayName: '默认公积金基数',
                name: 'houseFundDefault',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: '元'
            },
            houseFundBySalary: {
                required: false,
                displayName: '默认应发工资',
                name: 'houseFundBySalary',
                formName: formName,
                mode: 'checkbox',
                changeHandler: $scope.houseFundBySalaryChange
            },
            medicalLCityPlus: {
                required: false,
                displayName: '',
                name: 'medicalLCityPlus',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                postfix: ''
            },


            medicalLCityCPlus: {
                required: false,
                displayName: '',
                name: 'medicalLCityCPlus',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                postfix: ''
            },
            medicalLCtryCPlus: {
                required: false,
                displayName: '',
                name: 'medicalLCtryCPlus',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                postfix: ''
            },
            medicalFCityCPlus: {
                required: false,
                displayName: '',
                name: 'medicalFCityCPlus',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                postfix: ''
            },
            medicalFCtryCPlus: {
                required: false,
                displayName: '',
                name: 'medicalFCtryCPlus',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                postfix: ''
            },

            medicalLCtryPlus: {
                required: false,
                displayName: '',
                name: 'medicalLCtryPlus',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                postfix: ''
            },
            medicalFCityPlus: {
                required: false,
                displayName: '',
                name: 'medicalFCityPlus',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                postfix: ''
            },
            medicalFCtryPlus: {
                required: false,
                displayName: '',
                name: 'medicalFCtryPlus',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                postfix: ''
            },
            // 养老保险
            endowMin: {
                required: true,
                displayName: '',
                name: 'endowMin',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            endowMax: {
                required: true,
                displayName: '',
                name: 'endowMax',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            endowCMin: {
                required: false,
                displayName: '',
                name: 'endowCMin',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            endowCMax: {
                required: false,
                displayName: '',
                name: 'endowCMax',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            endowLCityPP: {
                required: true,
                displayName: '',
                name: 'endowLCityPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            endowLCityCP: {
                required: true,
                displayName: '',
                name: 'endowLCityCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            endowLCtryPP: {
                required: true,
                displayName: '',
                name: 'endowLCtryPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },
            endowLCtryCP: {
                required: true,
                displayName: '',
                name: 'endowLCtryCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },

            endowFCityPP: {
                required: true,
                displayName: '',
                name: 'endowFCityPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            endowFCityCP: {
                required: true,
                displayName: '',
                name: 'endowFCityCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            endowFCtryPP: {
                required: true,
                displayName: '',
                name: 'endowFCtryPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },
            endowFCtryCP: {
                required: true,
                displayName: '',
                name: 'endowFCtryCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },

            // 医疗保险
            medicalMin: {
                required: true,
                displayName: '',
                name: 'medicalMin',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            medicalMax: {
                required: true,
                displayName: '',
                name: 'medicalMax',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            medicalCMin: {
                required: false,
                displayName: '',
                name: 'medicalCMin',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            medicalCMax: {
                required: false,
                displayName: '',
                name: 'medicalCMax',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            medicalLCityPP: {
                required: true,
                displayName: '',
                name: 'medicalLCityPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            medicalLCityCP: {
                required: true,
                displayName: '',
                name: 'medicalLCityCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            medicalLCtryPP: {
                required: true,
                displayName: '',
                name: 'medicalLCtryPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },
            medicalLCtryCP: {
                required: true,
                displayName: '',
                name: 'medicalLCtryCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },

            medicalFCityPP: {
                required: true,
                displayName: '',
                name: 'medicalFCityPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            medicalFCityCP: {
                required: true,
                displayName: '',
                name: 'medicalFCityCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            medicalFCtryPP: {
                required: true,
                displayName: '',
                name: 'medicalFCtryPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },
            medicalFCtryCP: {
                required: true,
                displayName: '',
                name: 'medicalFCtryCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },
            // 失业保险
            unemployMin: {
                required: true,
                displayName: '',
                name: 'unemployMin',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            unemployMax: {
                required: true,
                displayName: '',
                name: 'unemployMax',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            unemployCMin: {
                required: false,
                displayName: '',
                name: 'unemployCMin',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            unemployCMax: {
                required: false,
                displayName: '',
                name: 'unemployCMax',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            unemployLCityPP: {
                required: true,
                displayName: '',
                name: 'unemployLCityPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            unemployLCityCP: {
                required: true,
                displayName: '',
                name: 'unemployLCityCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            unemployLCtryPP: {
                required: true,
                displayName: '',
                name: 'unemployLCtryPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },
            unemployLCtryCP: {
                required: true,
                displayName: '',
                name: 'unemployLCtryCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },

            unemployFCityPP: {
                required: true,
                displayName: '',
                name: 'unemployFCityPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            unemployFCityCP: {
                required: true,
                displayName: '',
                name: 'unemployFCityCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            unemployFCtryPP: {
                required: true,
                displayName: '',
                name: 'unemployFCtryPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },
            unemployFCtryCP: {
                required: true,
                displayName: '',
                name: 'unemployFCtryCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },


            // 工伤保险
            injuryMin: {
                required: true,
                displayName: '',
                name: 'injuryMin',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            injuryMax: {
                required: true,
                displayName: '',
                name: 'injuryMax',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            injuryCMin: {
                required: false,
                displayName: '',
                name: 'injuryCMin',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            injuryCMax: {
                required: false,
                displayName: '',
                name: 'injuryCMax',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            injuryLCityPP: {
                required: true,
                displayName: '',
                name: 'injuryLCityPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            injuryLCityCP: {
                required: true,
                displayName: '',
                name: 'injuryLCityCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            injuryLCtryPP: {
                required: true,
                displayName: '',
                name: 'injuryLCtryPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },
            injuryLCtryCP: {
                required: true,
                displayName: '',
                name: 'injuryLCtryCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },

            injuryFCityPP: {
                required: true,
                displayName: '',
                name: 'injuryFCityPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            injuryFCityCP: {
                required: true,
                displayName: '',
                name: 'injuryFCityCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            injuryFCtryPP: {
                required: true,
                displayName: '',
                name: 'injuryFCtryPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },
            injuryFCtryCP: {
                required: true,
                displayName: '',
                name: 'injuryFCtryCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },

            // 生育险
            maternityMin: {
                required: true,
                displayName: '',
                name: 'maternityMin',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            maternityMax: {
                required: true,
                displayName: '',
                name: 'maternityMax',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            maternityCMin: {
                required: false,
                displayName: '',
                name: 'maternityCMin',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            maternityCMax: {
                required: false,
                displayName: '',
                name: 'maternityCMax',
                formName: formName,
                placeholder: '',
                pattern: config.BASE_REG_STR,
                maxLength: 9,
                postfix: ''
            },
            maternityLCityPP: {
                required: true,
                displayName: '',
                name: 'maternityLCityPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            maternityLCityCP: {
                required: true,
                displayName: '',
                name: 'maternityLCityCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            maternityLCtryPP: {
                required: true,
                displayName: '',
                name: 'maternityLCtryPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },
            maternityLCtryCP: {
                required: true,
                displayName: '',
                name: 'maternityLCtryCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },

            maternityFCityPP: {
                required: true,
                displayName: '',
                name: 'maternityFCityPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            maternityFCityCP: {
                required: true,
                displayName: '',
                name: 'maternityFCityCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''

            },
            maternityFCtryPP: {
                required: true,
                displayName: '',
                name: 'maternityFCtryPP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            },
            maternityFCtryCP: {
                required: true,
                displayName: '',
                name: 'maternityFCtryCP',
                formName: formName,
                placeholder: '',
                pattern: '^\\d{1,2}$|^\\d{1,2}\\.\\d*',
                postfix: ''
            }
        };
        return obj;
    }
});