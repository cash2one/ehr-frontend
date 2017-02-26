/**
 * @file 权限控制
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('./config');
    app.factory('authUtil', ['ajaxService', '$rootScope', function (ajaxService, $rootScope) {
        return  {

            /**
             * 是否是领导
             * @returns {boolean}
             */
            isManager: function () {
                return $rootScope.userInfo && $rootScope.userInfo.isManager;
            },

            /**
             * 是普通用户
             * @returns {boolean}
             */
            isCommonUser: function () {
                return $rootScope.userInfo && !($rootScope.userInfo.isManager
                    || $rootScope.userInfo.isAdmin
                    || $rootScope.userInfo.isBasicHr
                    );
            },

            /**
             * 是hr
             * @returns {boolean}
             */
            isHR: function () {
                return this.isSalaryHR()
                    || this.isTrainingHR()
                    || this.isHRBP()
                    || this.isRelationshipHR()
                    || this.isRecruitHR();
            },


            /**
             * 是否前台
             *
             * @returns {$rootScope.userInfo|*|boolean}
             */
            isReception: function () {
                return $rootScope.userInfo
                    && !!$rootScope.userInfo.hasRoles.reception;
            },

            /**
             * 是管理员
             * @returns {boolean}
             */
            isAdmin: function () {
                return $rootScope.userInfo && $rootScope.userInfo.isAdmin;
            },

            /**
             * 是合作伙伴
             * @returns {boolean}
             */
            isAgent: function () {
                return $rootScope.userInfo && $rootScope.userInfo.isAgent;
            },


            /**
             * 是hrbp
             * @returns {*}
             */
            isHRBP: function () {
                return $rootScope.userInfo && !!$rootScope.userInfo.hasRoles.businessPartnerHR;
            },

            /**
             * 招聘hr
             * @returns {*}
             */
            isRecruitHR: function () {
                return $rootScope.userInfo && !!$rootScope.userInfo.hasRoles.recruitHR;
            },

            /**
             * 薪酬hr
             * @returns {*}
             */
            isSalaryHR: function () {
                return $rootScope.userInfo && !!$rootScope.userInfo.hasRoles.salaryHR;
            },

            /**
             * 员工关系hr
             * @returns {*}
             */
            isRelationshipHR: function () {
                return $rootScope.userInfo && !!$rootScope.userInfo.hasRoles.relationshipHR;
            },

            /**
             * 员工关系hr
             * @returns {*}
             */
            isTrainingHR: function () {
                return $rootScope.userInfo && !!$rootScope.userInfo.hasRoles.trainingHR;
            },

            /**
             * 是否是资产管理员
             */
            isAssetManager: function () {
                return $rootScope.userInfo && !!$rootScope.userInfo.hasRoles.assetManager;
            },

            /**
             * 是it负责人
             * @returns {boolean}
             */
            isItOwner: function () {
                return $rootScope.userInfo && !!$rootScope.userInfo.hasRoles.itOwner;
            },

            /**
             * 是结点负责人
             * @returns {boolean}
             */
            isStructureOwner: function () {
                return $rootScope.userInfo && !!$rootScope.userInfo.hasRoles.roleOwner;
            },

            /**
             * 是否有员工查询的权限
             * @returns {boolean}
             */
            canSearchStaff: function () {
                if (this.isHRBP()
                    || this.isSalaryHR()
                    || this.isTrainingHR()
                    || this.isRelationshipHR()
                    || this.isSalaryHR()
                    || this.isAdmin()) {
                    return true;
                }
                return false;
            },

            /**
             * 可以办理转正
             */
            canDoTransFullTime: function () {
                if (this.isHRBP()) {
                    return true;
                }
                return false;
            },


            /**
             * 可以调整部门
             * @returns {boolean}
             */
            canDoChangeStructure: function () {
                if (this.isHRBP()) {
                    return true;
                }
                return false;
            },

            /**
             * 可以调岗调薪
             * @returns {boolean}
             */
            canDoChangeSalary: function () {
                if (this.isHRBP()) {
                    return true;
                }
                return false;
            },

            /**
             * 可以做离职
             * @returns {boolean}
             */
            canDoLeave: function () {
                if (this.isHRBP()) {
                    return true;
                }
                return false;
            },

            /**
             * 是否是总部的hr
             * @returns {boolean}
             */
            isHeadquartersHR: function () {
                return $rootScope.userInfo
                    && ($rootScope.userInfo.structureName.indexOf('人力资源部') != -1);
            }
        }
    }
    ]);
});
