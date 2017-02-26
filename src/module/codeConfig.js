/**
 * @file code config
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function(require) {
    return {

        /**
         * 员工类型
         */
        TYPE_CODE: {
            // 正式员工
            REGULAR: 1,
            // 实习生
            INTERNS: 2,
            // 劳务
            LABOR: 3
        },

        /**
         * 合作伙伴员工类型
         */
        AGENT_TYPE_CODE: {
            // 正式员工
            REGULAR: 21
        },

        /**
         * 状态的code
         */
        STAFF_STATUS_CODE: {

            /**
             * 草稿
             */
            DRAFT: 6,

            /**
             * 待入职
             */
            TO_JOIN: 5,

            /**
             * 已入职
             */
            HAS_JOINED: 1,

            /**
             * 离职
             */
            LEAVED: 4,

            /**
             * 放弃
             */
            ABANDED: 2,

            /**
             * 待离职
             * @type {Number}
             */
            TO_LEAVE: 8
        },

        /**
         * 放弃候选人原因
         */
        ABANDON_REASON: {

            /**
             * 薪资原因
             */
            SALARY: 1,

            /**
             * 原公司挽留
             */
            SAVE_BY_COMPANY: 2,

            /**
             * 家庭原因
             */
            FAMILY: 3,

            /**
             * 更好的机会
             */
            BETTER_OPPORTUNITY: 4,

            /**
             * 其它
             */
            OTHER: 5
        },

        /**
         * 角色的类型
         */
        ROLE_TYPE: {
            /**
             * 结点负责人
             */
            OWNER: 1,

            /**
             * 招聘hr
             */
            RECRUIT_HR: 2,

            /**
             * 薪酬hr
             */
            SALARY_HR: 3,

            /**
             * 员工关系hr
             */
            RELATIONSHIP_HR: 4,

            /**
             * 培训hr
             */
            TRAINING_HR: 5,

            /**
             * hrbp
             */
            HRBP: 6,

            /**
             * 资产管理员
             */
            ASSET_MANAGER: 7,

            /**
             * it负责人
             */
            IT_OWNER: 8
        },

        /**
         * 申请的类型
         */
        APPLY_CODE: {
            /**
             *试用期变更
             */
            PROBATION_CHANGE: 101,
            /**
             * 新员工入职
             */
            STAFF_ENTER: 1,

            /**
             * 再入职
             */
            REJOIN: 2,

            /**
             * 合作伙伴员工入职
             */
            AGENT_ENTER: 201,

            /**
             * 合作伙伴员工再入职
             */
            AGENT_REJOIN: 202,

            /**
             * 合作伙伴组织架构调整
             */
            AGENT_STRUCTURE: 231,

            /**
             * 合作伙伴员工离职
             */
            AGENT_LEAVE: 241,

            /**
             * 修改offer
             */
            OFFER_CHANGE: 11,

            /**
             * 离职
             */
            LEAVE: 41,

            /**
             * 岗位薪酬信息变动
             */
            SALARY_INFO: 21,

            /**
             * 组织架构调整
             */
            STRUCTURE: 31,

            /**
             * 实习/劳务转正式
             */
            TRANS_FULL_MEMBER: 51,

            /**
             * 综合审批单
             */
            MULTIPLE: 71,

            /**
             * 试用期工作目标
             */
            WORK_TARGET: 111,

            /**
             * 试用期转正申请
             */
            FORMAL_APPLY: 121
        },


        COMPANY_TYPE: {
            HEAD_QUARTERS: 1,
            BRANCH: 2
        },

        SALARY_TYPE: {
            DAY: 1,
            MONTH: 2
        },

        /**
         * 打卡情况
         * @type {Object}
         */
        PUNCH_CARD: {
            /**
             * 不需要打卡
             *
             * @type {Number}
             */
            NO_NEED: 0,

            /**
             * 打卡餐补不计入工资
             *
             * @type {Number}
             */
            NEED_SUBSIDY_NOT_BY_SALARY: 1,

            /**
             * 打卡餐补计入工资
             *
             * @type {Number}
             */
            NEED_SUBSIDY_BY_SALARY: 2
        },

        /**
         * 餐补发放方式
         */
        MEAL_SALARY_METHOD: {

            /**
             * 随工资发放
             */
            SALARY: 1,

            /**
             * 发放到饭卡
             */
            MEALCARD: 2
        }
    };
});