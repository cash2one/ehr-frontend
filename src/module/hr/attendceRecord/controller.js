/**
 * @file HRBP导出出勤记录
 * @author Helinfeng helinfeng@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var getColsConfig = require('./colsConfig');

    app.controller('attendceRecordCtrl', attendceRecord);

    attendceRecord.$inject = ['$scope', 'adminRequest', 'util', 'hrRequest'];

    function attendceRecord($scope, adminRequest, util, hrRequest) {
        function getStructureList() {
            adminRequest.getStructure().then(function (res) {
                //$scope.structureList = util.getSalaryNode(res.data, $scope);
                $scope.structureList = util.getPunchCard(res.data);
            });
        }

        function getList() {
            if (!$scope.query.structure) {
                alert('请选择组织架构');
                return;
            }

            if (!$scope.query.startDate || !$scope.query.endDate) {
                alert('请选择时间');
                return;
            }

            if ($scope.query.startDate >= $scope.query.endDate) {
                alert('结束时间要大于开始时间');
                return;
            }

            var queryData = {
                pageDto: {
                    pageNum: $scope.currentPage || 1,
                    pageSize: $scope.pageSize
                },
                structure: $scope.query.structure,
                // userName: $scope.query.name,
                startTs: +new Date($scope.query.startDate),
                endTs: +new Date($scope.query.endDate)
            };

            var name = $.trim($scope.query.name);

            if (name.length) {
                if (name.indexOf(',') !== -1) {
                    queryData.userName = $.trim(name.split(',')[1]);
                }
                // else {
                //     queryData.userName = name;
                // }
            }

            hrRequest.getCardRecord(queryData).then(function (res) {
                $scope.tableOptions.data = res.data;
                $scope.tableOptions.totalCount = (res.pageDto && res.pageDto.count) || 0;
                $scope.exportUrl = getExportUrl(queryData);
            });
        }

        function getExportUrl(data) {
            return '/EXPORT/cardRecord/list.json?' + getGETParam(data);
        }

        function getGETParam(data) {
            var res = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (key != 'pageDto') {
                        res.push(key + '=' + data[key]);
                    }
                }
            }
            res.push('fields' + '=' + 'name,number,day,calendar,weekend,firstPunch,lastPunch,totalTime,reason');

            return res.join('&');
        }

        function initValue() {
            $scope.pageSize = 20;
            $scope.query = {};
            $scope.tableOptions = {
                data: [],
                canSelect: false,
                totalCount: 0,
                cols: getColsConfig($scope),
                pageSize: $scope.pageSize,
                onPageChange: function (pageNum) {
                    $scope.currentPage = pageNum;
                    getList();
                },
                selectedItems: [],
                // mainScope: $scope,
                // bodyScroll: true
            };
        }

        function bindEvent() {
            $scope.onSearch = getList;
        }


        function main() {
            initValue();
            bindEvent();
            getStructureList();
        }

        main();
    }
});