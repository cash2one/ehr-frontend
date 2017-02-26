/**
 * @file 数据接口
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    app.factory('adminRequest', ['ajaxService', function (ajaxService) {
        return  {
            /**
             * 查询权限
             * @param {Object} params
             */
            getAuth: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/auth.json', {
                    data: params
                });
            },

            /**
             * 修改权限
             * @param params
             * @returns {*}
             */
            modAuth: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/staff/auth.json', {
                    data: params
                });
            },

            /**
             * 修改公司
             * @param params
             * @returns {*}
             */
            modCompany: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/company/company.json', {
                    data: params
                });
            },

            /**
             * 修改签约公司
             * @param params
             * @returns {*}
             */
            modContractCompany: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/contractCompany/contractCompany.json', {
                    data: params
                });
            },

            /**
             * 修改社保缴纳城市
             * @param params
             * @returns {*}
             */
            modSocialSecurityCity: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/socialSecurityCity/socialSecurityCity.json', {
                    data: params
                });
            },

            /**
             * 修改办公地点
             * @param params
             * @returns {*}
             */
            modOffice: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/office/office.json', {
                    data: params
                });
            },

            /**
             * 修改部门
             * @param params
             * @returns {*}
             */
            modDepartment: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/department/department.json', {
                    data: params
                });
            },

            /**
             * 修改二级部门
             * @param params
             * @returns {*}
             */
            modScdDepartment: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/scdDepartment/scdDepartment.json', {
                    data: params
                });
            },

            /**
             * 添加公司
             * @param params
             * @returns {*}
             */
            addCompany: function (params) {
                var params = params || {};
                return ajaxService.send('/ADD/company/company.json', {
                    data: params
                });
            },

            /**
             * 添加公司
             * @param params
             * @returns {*}
             */
            addContractCompany: function (params) {
                var params = params || {};
                return ajaxService.send('/ADD/contractCompany/contractCompany.json', {
                    data: params
                });
            },

            /**
             * 添加社保缴纳城市
             * @param params
             * @returns {*}
             */
            addSocialSecurityCity: function (params) {
                var params = params || {};
                return ajaxService.send('/ADD/socialSecurityCity/socialSecurityCity.json', {
                    data: params
                });
            },

            /**
             * 添加办公地点
             * @param params
             * @returns {*}
             */
            addOffice: function (params) {
                var params = params || {};
                return ajaxService.send('/ADD/office/office.json', {
                    data: params
                });
            },

            /**
             * 添加部门
             * @param params
             * @returns {*}
             */
            addDepartment: function (params) {
                var params = params || {};
                return ajaxService.send('/ADD/department/department.json', {
                    data: params
                });
            },

            /**
             * 添加二级部门
             * @param params
             * @returns {*}
             */
            addScdDepartment: function (params) {
                var params = params || {};
                return ajaxService.send('/ADD/scdDepartment/scdDepartment.json', {
                    data: params
                });
            },

            /**
             * 获取组织架构结点信息
             * @param params
             * @returns {*}
             */
            getStuctureInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/structure/info.json', {
                    data: params
                });
            },

            /**
             * 获取结算结点信息
             * @param params
             * @returns {*}
             */
            getKeyNodeInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/structure/keyNodeInfo.json', {
                    data: params
                });
            },


            /**
             * 获取组织架构人员编制信息
             * @param params
             * @returns {*}
             */
            getStuctureStaffCount: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/structure/staffCount.json', {
                    data: params
                });
            },

            /**
             * 获取合作伙伴架构人员编制信息
             * @param params
             * @returns {*}
             */
            getStructureAgentStaffCount: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/structure/agentStaffCount.json', {
                    data: params
                });
            },


            /**
             *  设置隐藏结点
             * @param params
             * @returns {*}
             */
            delStucture: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/structure/disable.json', {
                    data: params
                });
            },

            enableStucture: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/structure/enable.json', {
                    data: params
                });
            },

            /**
             * 查询组织架构
             * @param {Object} params
             */
            getStructure: function (params) {
                var params = params || {};
                var containDisabled = params.containDisabled;
                params.containDisabled = typeof  containDisabled == 'undefined'
                    ? 1 : containDisabled;
                return ajaxService.send('/GET/structure/list.json', {
                    data: params
                });
            },

            /**
             * 添加组织架构
             * @param {Object} params
             */
            addStructure: function (params) {
                var params = params || {};
                return ajaxService.send('/ADD/structure/structure.json', {
                    data: params
                });
            },

            /**
             * 修改组织架构
             * @param params
             * @returns {*}
             */
            modStructure: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/structure/structure.json', {
                    data: params
                });
            },

            /**
             * 查询工作日
             * @param params
             * @returns {*}
             */
            getWorkdays: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/workday/days.json', {
                    data: params
                });
            },

            /**
             * 修改工作日
             * @param params
             * @returns {*}
             */
            modWorkdays: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/calendar/calendar.json', {
                    data: params
                });
            },

            /**
             * 修改关键信息
             * @param params
             * @returns {*}
             */
            modKeyInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/staff/keyInfo.json', {
                    data: params
                });
            },

            /**
             * 日历模板列表
             * @param params
             * @returns {*}
             */
            getCalendarList: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/calendar/list.json', {
                    data: params
                });
            },

            /**
             * 修改日历名字
             * @param params
             * @returns {*}
             */
            modCalendarName: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/calendar/name.json', {
                    data: params
                });
            },

            /**
             * 修改日历的休假信息
             * @param params
             * @returns {*}
             */
            modCalendarDay: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/calendar/calendar.json', {
                    data: params
                });
            },

            /**
             * 添加日历模板
             * @param params
             * @returns {*}
             */
            addCalendar: function (params) {
                var params = params || {};
                return ajaxService.send('/ADD/calendar/calendar.json', {
                    data: params
                });
            },
            getDisability: function (params) {
                var params = params || {}
                return ajaxService.send('/GET/disability/list.json', {
                    data: params
                });
            },

            addDisability: function (params) {
                var params = params || {}
                return ajaxService.send('/ADD/disability/disability.json', {
                    data: params
                });
            },

            delDisability: function (params) {
                var params = params || {}
                return ajaxService.send('/DEL/disability/disability.json', {
                    data: params
                });
            },

            getLevelTemplate: function (params) {
                var params = params || {}
                return ajaxService.send('/GET/levelTemplate/list.json', {
                    data: params
                });
            },

            addLevelTemplate: function (params) {
                var params = params || {}
                return ajaxService.send('/ADD/levelTemplate/template.json', {
                    data: params
                });
            },
            delLevelTemplate: function (params) {
                var params = params || {}
                return ajaxService.send('/DEL/levelTemplate/template.json', {
                    data: params
                });
            },
            modLevelTemplate: function (params) {
                var params = params || {}
                return ajaxService.send('/MOD/levelTemplate/template.json', {
                    data: params
                });
            },
            addLevel: function (params) {
                var params = params || {}
                return ajaxService.send('/ADD/levelTemplate/level.json', {
                    data: params
                });
            },
            delLevel: function (params) {
                var params = params || {}
                return ajaxService.send('/DEL/levelTemplate/level.json', {
                    data: params
                });
            },
            modLevel: function (params) {
                var params = params || {}
                return ajaxService.send('/MOD/levelTemplate/level.json', {
                    data: params
                });
            },
            getLevel: function (params) {
                var params = params || {}
                return ajaxService.send('/GET/levelTemplate/levelList.json', {
                    data: params
                });
            }
        }
    }]);
});
