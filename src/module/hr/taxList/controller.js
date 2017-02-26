/**
 * @file 个税名单
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var nameConfig = require('module/nameConfig');
    var hrConfig = require('../config')
    var getColsConfig = require('./colsConfig');
    var moment = require('moment');

    app.controller('hrTaxListController', hrTaxListController);

    hrTaxListController.$inject = [
        '$scope', 'hrRequest', '$state',
        'hrUtil', 'util', 'hrOptUtil', 'adminUtil',
        'adminRequest'
    ];

    function hrTaxListController(
        $scope, hrRequest, $state, hrUtil, util, hrOptUtil, adminUtil, adminRequest) {

        /**
         * 当前页
         * @type {number}
         */
        $scope.currentPage = 1;
        $scope.query = {};

        init();

        /**
         * 初始
         */
        function init() {
            $scope.onSearch = onSearch;

            /**
             * 表格配置
             */
            $scope.tableOptions = {
                data: [],
                canSelect: true,
                totalCount: 0,
                cols: getColsConfig($scope),
                pageSize: config.PAGE_SIZE,
                onPageChange: function (pageNum) {
                    $scope.currentPage = pageNum;
                    getList();
                },
                selectedItems: []
            };
            $scope.getList = getList;
            var lastMonthStr = moment().add(-1, 'M').format("YYYY-MM");
            $scope.monthMax = lastMonthStr;
            $scope.query.month = new Date(lastMonthStr + ' 00:00:00');
            getStructureList();
        }

        /**
         * 查询
         */
        function onSearch() {
            getList();
        }

        /**
         * 数据处理
         * @param data
         * @returns {*}
         */
        function processData(data) {
            for (var i = 0, item; item = data[i++];) {
            }
            return data;
        };


        /**
         * 获取列表
         */
        function getList() {
            if (!$scope.query.month) {
                alert('请输入查询月份');
                return;
            }
            var queryData = {
                pageDto: {
                    pageNum: $scope.currentPage || 1,
                    pageSize: config.PAGE_SIZE
                },
                structure: $scope.query.structure,
                month: moment($scope.query.month.getTime()).format('YYYY-MM')
            };

            hrRequest.getTaxList(queryData).then(function (data) {
                    $scope.tableOptions.data = processData(data.data);
                    $scope.tableOptions.totalCount = (data.pageDto && data.pageDto.count) || 0;
                }
            );
            $scope.exportUrl = getExportUrl(queryData);
        }

        /**
         * 组织架构列表
         */
        function getStructureList() {
            adminRequest.getStructure().then(function (res) {
                $scope.structureList = util.getSalaryNode(res.data, $scope);
                $scope.query.structure = $scope.structureList[0].id;
                getList();
            });
        }

        /**
         * 导出的url
         */
        function getExportUrl(data) {
            var res = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (key != 'pageDto') {
                        res.push(key + '=' + data[key]);
                    }
                }
            }
            return 'EXPORT/staff/taxList.json?' + res.join('&');
        }
    }
});