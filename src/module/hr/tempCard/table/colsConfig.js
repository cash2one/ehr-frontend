/**
 * @file 表格配置项
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function(require) {
    var app = require('../../app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    app.factory('tempCardListTableColsConfig', ['$modal', 'util', '$q', 'hrRequest',
        function($modal, util, $q, hrRequest) {
            return {
                getConfig: function($scope) {
                    var tplPrefix = 'src/module/hr/tempCard/table/tableTpl/'
                    var res = [{
                        field: 'cardName',
                        displayName: '卡名'
                    }, {
                        field: 'statusValue',
                        displayName: '当前状态'
                    }, {
                        field: 'borrowName',
                        displayName: '借卡人',
                        filter: 'emptyFormat'
                    }, {
                        field: 'borrowMobile',
                        displayName: '借卡人手机号',
                        filter: 'emptyFormat'
                    }, {
                        field: 'borrowSit',
                        displayName: '借卡人工位',
                        filter: 'emptyFormat'
                    }, {
                        field: 'borrowTime',
                        displayName: '借出时间',
                        filter: 'timeFormat'
                    }, {
                        field: 'cardNumber',
                        displayName: '卡号'
                    }, {
                        field: 'memo',
                        displayName: '备注',
                        filter: 'emptyFormat',
                        style: {
                            'max-width': '200px',
                            'word-break': 'break-all'
                        }
                    }, {
                        field: 'opt',
                        displayName: '操作',
                        cellTpl: tplPrefix + 'opt.html'
                    }]
                    return res;
                }
            };
        }
    ]);
});