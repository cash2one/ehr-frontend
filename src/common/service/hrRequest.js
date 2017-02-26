/**
 * @file 数据接口
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    app.factory('hrRequest', ['ajaxService', '$q', 'localStorage', function (ajaxService, $q, localStorage) {
        return  {
            /**
             * 录入资产编码
             * @param {Object} params
             */
            addAssetCode: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/staff/assetCode.json', {
                    data: params
                });
            },
            /**
             * 查询公司
             * @param {Object} params
             */
            getCompany: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/company/list.json', {
                    data: params
                });
            },


            /**
             * 查询签约公司
             * @param params
             * @returns {*}
             */
            getContractCompany: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/contractCompany/list.json', {
                    data: params
                });
            },

            /**
             * 查询社保缴纳城市
             * @param params
             * @returns {*}
             */
            getSocialSecurity: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/socialSecurityCity/list.json', {
                    data: params
                });
            },

            /**
             * 查询办公地点
             * @param params
             * @returns {*}
             */
            getOffice: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/office/list.json', {
                    data: params
                });
            },

            /**
             * 获取社保缴纳城市
             * @param params
             * @returns {*}
             */
            getSocialSecurityCity: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/socialSecurityCity/list.json', {
                    data: params
                });
            },

            /**
             * 查询部门
             * @param {Object} params
             */
            getDepartment: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/department/list.json', {
                    data: params
                });
            },

            /**
             * 查询二级部门
             * @param {Object} params
             */
            getScdDepartment: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/scdDepartment/list.json', {
                    data: params
                });
            },

            /**
             * 查询等级
             * @param {Object} params
             */
            getLevel: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/level/list.json', {
                    data: params
                });
            },

            /**
             * 查询职位
             * @param {Object} params
             */
            getPosition: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/position/list.json', {
                    data: params
                });
            },

            /**
             * 查询出勤记录
             * @param {Object} params
             */
            getCardRecord: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/cardRecord/list.json', {
                    data: params
                });
            },

            /**
             * 保存预入职信息
             * @param params
             * @returns {*}
             */
            savePreEnterInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/ADD/staff/preEnterInfo.json', {
                    data: params
                });
            },

            /**
             * 提交offer信息
             * @param params
             * @returns {*}
             */
            submitPreEnterInfo: function (params) {
                var params = params || {};
                if (params.content) {
                    params.content = JSON.stringify(params.content);
                }
                return ajaxService.send('/ADD/approve/approve.json', {
                    data: params
                });
            },

            /**
             * 修改新员工入职信息
             * @param params
             * @returns {*}
             */
            modPreEnterInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/staff/preEnterInfo.json', {
                    data: params
                });
            },

            /**
             * 获取员工信息
             * @param params
             * @returns {*}
             */
            getStaffInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/list.json', {
                    data: params
                });
            },

            /**
             * 获取员工预入职信息
             * @param params
             * @returns {*}
             */
            getPreEnterInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/preEnterList.json', {
                    data: params
                });
            },

            /**
             * 获取自定义显示字段
             * @param params
             * @returns {*}
             */
            getCustomCols: function (params) {
                return localStorage.get('customCol');
            },

            /**
             * 修改显示字段
             * @param params
             * @returns {*}
             */
            modCustomCols: function (params) {
                localStorage.set('customCol', params.data);
                /*                var params = params || {};
                 return ajaxService.send('/MOD/customItems/items.json', {
                 data: params
                 });*/
            },

            /**
             * 获取基本信息
             * @param params
             * @returns {*}
             */
            getStaffBaseInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/baseInfo.json', {
                    data: params
                });
            },

            /**
             * 获取岗位信息
             * @param params
             * @returns {*}
             */
            getStaffWorkInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/workInfo.json', {
                    data: params
                });
            },

            /**
             * 获取工资信息
             * @param params
             * @returns {*}
             */
            getStaffSalaryInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/salaryInfo.json', {
                    data: params
                });
            },

            /**
             * 获取隐私信息
             * @param params
             * @returns {*}
             */
            getStaffSecretInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/secretInfo.json', {
                    data: params
                });
            },

            /**
             * 获取岗位变动信息
             * @param params
             * @returns {*}
             */
            getStaffChangeInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/changeInfo.json', {
                    data: params
                });
            },

            /**
             * 获取薪酬变动信息
             * @param params
             * @returns {*}
             */
            getStaffSalaryChangeInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/salaryChangeInfo.json', {
                    data: params
                });
            },

            /**
             * 保存预入职信息
             * @param params
             * @returns {*}
             */
            saveBaseInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/staff/baseInfo.json', {
                    data: params
                });
            },

            /**
             * 自己修改基本信息
             * @param params
             * @returns {*}
             */
            saveBaseInfoSelf: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/staff/baseInfoSelf.json', {
                    data: params
                });
            },

            /**
             * 保存工作信息
             * @param params
             * @returns {*}
             */
            saveWorkInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/staff/workInfo.json', {
                    data: params
                });
            },

            /**
             * 保存工作信息
             * @param params
             * @returns {*}
             */
            saveSecretInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/staff/secretInfo.json', {
                    data: params
                });
            },

            /**
             * 保存工资信息
             * @param params
             * @returns {*}
             */
            saveSalaryInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/staff/welfareSalary.json', {
                    data: params
                });
            },

            addEducationExperience: function (params) {
                var params = params || {};
                return ajaxService.send('/ADD/staff/educationExperience.json', {
                    data: params
                });

            },
            delEducationExperience: function (params) {
                var params = params || {};
                return ajaxService.send('/DEL/staff/educationExperience.json', {
                    data: params
                });

            },
            modEducationExperience: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/staff/educationExperience.json', {
                    data: params
                });

            },
            getEducationExperience: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/educationExperienceList.json', {
                    data: params
                });

            },
            addWorkExperience: function (params) {
                var params = params || {};
                return ajaxService.send('/ADD/staff/workExperience.json', {
                    data: params
                });

            },
            delWorkExperience: function (params) {
                var params = params || {};
                return ajaxService.send('/DEL/staff/workExperience.json', {
                    data: params
                });

            },
            getWorkExperience: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/workExperienceList.json', {
                    data: params
                });

            },
            modWorkExperience: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/staff/workExperience.json', {
                    data: params
                });
            },

            addFamilyMember: function (params) {
                var params = params || {};
                return ajaxService.send('/ADD/staff/familyMember.json', {
                    data: params
                });

            },
            delFamilyMember: function (params) {
                var params = params || {};
                return ajaxService.send('/DEL/staff/familyMember.json', {
                    data: params
                });

            },
            getFamilyMember: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/familyMemberList.json', {
                    data: params
                });

            },
            modFamilyMember: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/staff/familyMember.json', {
                    data: params
                });
            },

            getInitInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/initInfo.json', {
                    data: params
                });
            },

            leaveJob: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/staff/dimission.json', {
                    data: params
                });
            },
            getLeaveInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/dimissionInfo.json', {
                    data: params
                });
            },

            /**
             * 获取指定的人的通用信息
             * @param params
             * @returns {*}
             */
            getCommonInfo: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/commonInfo.json', {
                    data: params
                });
            },

            /**
             * 修改员工的入职状态
             * @param params
             * @returns {*}
             */
            modStaffStatus: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/staff/status.json', {
                    data: params
                });
            },

            /**
             * 获取再入职信息
             * @param params
             * @returns {*}
             */
            getRejoinInfo: function (params) {
                var params = params || {}
                return ajaxService.send('/GET/staff/preEnterInfo.json', {
                    data: params
                });
            },

            /**
             * 获取代理商员工再入职信息
             * @param params
             * @return {*}
             */
            getRejoinAgent: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/preAgentEnterInfo.json', {
                    data: params
                });
            },

            /**
             * 修改头像
             * @param params
             * @returns {*}
             */
            modHeadImg: function (params) {
                var params = params || {}
                return ajaxService.send('/MOD/staff/headImg.json', {
                    data: params
                });
            },

            /**
             * 验证密码是否正确
             * @param params
             * @returns {*}
             */
            validatePassword: function (params) {
                var params = params || {}
                return ajaxService.send('/GET/staff/isValidPassword.json', {
                    data: params
                });
            },

            /**
             * 修改手机号的验证码
             * @param params
             * @returns {*}
             */
            modMobileValidateCode: function (params) {
                var params = params || {}
                return ajaxService.send('/SEND/staff/modMobileValidateCode.json', {
                    data: params
                });
            },

            /**
             * 修改手机号
             * @param params
             * @returns {*}
             */
            modMobile: function (params) {
                var params = params || {}
                return ajaxService.send('/MOD/staff/mobile.json', {
                    data: params
                });
            },

            /**
             * 获取发卡银行
             * @param params
             * @returns {*}
             */
            getBank: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/bank/list.json', {
                    data: params
                });
            },

            /**
             * 工资名单
             * @param params
             * @returns {*}
             */
            getSalaryList: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/salary/list.json', {
                    data: params
                });
            },

            /**
             * 修改工资
             * @param params
             * @returns {*}
             */
            modSalary: function (params) {
                var params = params || {}
                return ajaxService.send('/MOD/salary/salary.json', {
                    data: params
                });
            },
            getTaxList: function (params) {
                var params = params || {}
                return ajaxService.send('/GET/staff/taxList.json', {
                    data: params
                });
            },
            getStaffSocialSecurityList: function (params) {
                var params = params || {}
                return ajaxService.send('/GET/staff/socialSecurityList.json', {
                    data: params
                });
            },
            getTempCardCount: function (params) {
                var params = params || {}
                return ajaxService.send('/GET/tempCard/amount.json', {
                    data: params
                });
            },
            getTempCardList: function (params) {
                var params = params || {}
                return ajaxService.send('/GET/tempCard/list.json', {
                    data: params
                });
            },
            borrowTempCard: function (params) {
                var params = params || {}
                return ajaxService.send('/MOD/tempCard/borrow.json', {
                    data: params
                });
            },
            delTempCard: function (params) {
                var params = params || {}
                return ajaxService.send('/DEL/tempCard/tempCard.json', {
                    data: params
                });
            },
            returnTempCard: function (params) {
                var params = params || {}
                return ajaxService.send('/MOD/tempCard/return.json', {
                    data: params
                });
            },
            addTempCard: function (params) {
                var params = params || {}
                return ajaxService.send('/ADD/tempCard/tempCard.json', {
                    data: params
                });
            },

            getMonthSalary: function (params) {
                var params = params || {}
                return ajaxService.send('/GET/staff/monthSalary.json', {
                    data: params
                });
            },

            forbidAccount: function (params) {
                var params = params || {}
                return ajaxService.send('/MOD/staff/forbidAccount.json', {
                    data: params
                });
            },

            changeMealSalaryMethod: function (params) {
                var params = params || {}
                return ajaxService.send('/MOD/staff/mealSalaryMethod.json', {
                    data: params
                });
            },

            /**
             * 生成工号，zhanwentao
             * @param params
             * @returns {*}
             */
            getJobNumber: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/staff/displayNumber.json', {
                    data: params
                });
            },

            /**
             * 根据工号，查询试用期工作目标
             * @param number
             * @return workTarget
             */
            getWorkTarget: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/staff/workTarget.json', {
                    data: params
                })
            }
        }
    }
    ]);
});
