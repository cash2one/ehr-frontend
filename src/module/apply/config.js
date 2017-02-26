/**
 * @file 配置项
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return {
        /**
         * tab查询类型
         */
        TAB_CODE: {
            // 待处理
            TO_HANDLE: 0,
            // 已处理
            HAS_HANDLED: 1,
            // 我发起的
            PROMOTE_MYSELF: 4
        },


        /**
         * 状态code
         */
        STATUS_CODE: {

            /**
             * 待审批
             */
            TO_HANDLE: 0,

            /**
             * 审批中
             */
            IN_PROCESS: 1,

            /**
             * 已执行
             */
            PASS: 5,

            /**
             * 审批拒绝
             */
            REJECT: 3,

            /**
             * 审批撤回
             */
            CANCEL: 4,

            /**
             * 待执行
             */
            TO_EXCUTE: 2
        },


        /**
         * 处理结果
         */
        HANDLE_RESULT: {
            AGREE: 2,
            REJECT: 3
        },

        EXECUTE_TIP_DAYS: 5,
        EXECUTE_TIP: '生效日期距离当前时间比较近，' +
            '如月底之前未审批通过，' +
            '将自动变为无效审批,确认提交该审批吗？',

        TRANSFULL_EXECUTE_TIP: '转正日期距离当前时间比较近，' +
            '如转正日期之前未被审批通过，' +
            '将自动变为无效审批,确认提交该审批吗？',
        LEAVE_EXECUTE_TIP: '最后工作日期距离当前时间比较近，' +
            '如最后工作日期之前未被审批通过，' +
            '将自动变为无效审批,确认提交该审批吗？',
        SUCCESS_TIP: '已经进入审批流程，请注意查看邮件。',
        EXECUTE_DATE_TIP: '生效日期指通过审批后，变更实际生效的日期。' +
            '生效日期当月月底前未能通过的审批，需重新发起。',
        WORK_TARGET_EXECUTE_TIP: '确定要提交试用期工作目标吗？',
        FORMAL_APPLY_EXECUTE_TIP: '确定要提交转正申请吗？'
    };
});