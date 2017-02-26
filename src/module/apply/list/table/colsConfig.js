/**
 * @file 表格配置项
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    app.factory('applyListTableColsConfig', ['$modal', 'util', '$q', 'hrRequest',
        function ($modal, util, $q, hrRequest) {
            return {
                getConfig: function ($scope) {
                    var res = [
                        {
                            field: 'promoteUserName',
                            displayName: '发起人'
                        },
                        {
                            field: 'title',
                            displayName: '标题',
                            cellTpl: 'src/module/apply/list/table/tableTpl/title.html'
                        },
                        {
                            field: 'promoteDate',
                            displayName: '申请日期',
                            filter: 'dateFormat'
                        },
/*                        {
                            field: 'nextModifyUserName',
                            displayName: '下一步处理人'
                        },*/
                        {
                            field: 'currentModifyUserName',
                            displayName: '当前处理人'
                        },
                        {
                            field: 'status',
                            displayName: '流程状态',
                            filter: 'applyStatus'
                        },
                        {
                            field: 'opt',
                            displayName: '操作',
                            cellTpl: 'src/module/apply/list/table/tableTpl/opt.html'
                        }
                    ]
                    var statusIndex = util.findIndexInObjArr(res, 'status', status);
                    if ($scope.nav == 'toHandle') {
                        res.splice(statusIndex - 1, 1);
                        var curIndex = util.findIndexInObjArr(res, 'currentModifyUserName', status);
                        res.splice(curIndex- 1, 1);
                    }

                    if ($scope.nav == 'hasHandled') {
                        var optIndex = util.findIndexInObjArr(res, 'opt', status);
                        res.splice(optIndex, 1);
/*                        var nextModifyIndex = util.findIndexInObjArr(res, 'nextModifyUserName', status);
                        res.splice(nextModifyIndex - 1, 1);*/
                    }
                    if ($scope.nav == 'promoteMyself') {
/*                        var nextModifyIndex = util.findIndexInObjArr(res, 'nextModifyUserName', status);
                        res.splice(nextModifyIndex- 1, 1);*/
                    }
                    return res;
                }
            };
        }]);
});