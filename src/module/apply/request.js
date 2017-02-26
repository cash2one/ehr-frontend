/**
 * @file 审批请求
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../common/app');
    app.factory('applyRequest', ['ajaxService', '$q', 'localStorage', function (ajaxService, $q, localStorage) {
        return  {
            /**
             * 申请列表
             * @param {Object} params
             */
            getApplyList: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/approve/list.json', {
                    data: params
                });
            },

            /**
             * 审批详情获取
             * @param params
             * @returns {*}
             */
            getApplyDetail: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/approve/detail.json', {
                    data: params
                });
            },

            /**
             * 获取总数
             * @param params
             * @returns {*}
             */
            getCount: function (params) {
                var params = params || {};
                return ajaxService.send('/GET/approve/amount.json', {
                    data: params
                });
            },

            /**
             * 处理申请
             * @param params
             * @returns {*}
             */
            handleApply: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/approve/batch.json', {
                    data: params
                });
            },

            /**
             * 创建申请
             * @param params
             * @returns {*}
             */
            addApply: function (params) {
                var params = params || {};
                if (params.content) {
                    params.content = JSON.stringify(params.content);
                }
                return ajaxService.send('/ADD/approve/approve.json', {
                    data: params
                });
            },

            /**
             * 撤回申请
             * @param params
             * @returns {*}
             */
            cancelApply: function (params) {
                var params = params || {};
                return ajaxService.send('/MOD/approve/cancel.json', {
                    data: params
                });
            }
        }
    }]);
});
