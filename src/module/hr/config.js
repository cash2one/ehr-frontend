/**
 * @file 配置项
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return {
        /**
         * 操作类型
         */
        OPT_TYPE: {
            /**
             * 提交
             */
            COMMIT: 2,

            /**
             * 保存
             */
            SAVE: 1
        },

        /**
         * 查询类型
         */
        SEARCH_TYPE: {
            SUBORDINATE: 1,
            HR: 2,
            ADMIN: 3,
            OWNER: 4
        },

        /**
         * 路径
         */
        PATH: {
            // 新员工导出
            NEW_STAFF_EXPORT: 'EXPORT/staff/preEnterInfo.json',
            // 员工导出
            STAFF_EXPORT: 'EXPORT/staff/list.json'
        },

        /**
         * 中国身份证号长度
         */
        CHINESE_ID_CARD_NUMBER_LENGTH: 18,

        BRANCH_COMPANY_FLAG: '分公司',

        /**
         * 离职状态
         */
        DIMISSION_STATUS: {
            /**
             * 未提出申请
             */
            NOT_APPLY: 0,

            /**
             * 申请通过
             */
            APPLY_PASSED: 1,

            /**
             * 已经离职
             */
            HAS_LEAVED: 2
        }
    };
});