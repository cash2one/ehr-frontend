/**
 * @file 新员工入职
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    var cols = require('./colsConfig');

    app.controller('hrChangeInfoCtrl', ['$scope', 'hrRequest', '$stateParams', 'localStorage', '$state', 'authUtil', 'hrUtil', '$sce',
        function ($scope, hrRequest, $stateParams, localStorage, $state, authUtil, hrUtil, $sce) {
            $scope.number = localStorage.get('number');

            /**
             * 入口
             * @type {string}
             */
            $scope.entryName = $state.current.name;

            /**
             * 表格配置
             */
            $scope.tableOptions = {
                data: [],
                canSelect: false,
                totalCount: 0,
                cols: cols($scope),
                onPageChange: function (pageNum) {
                    $scope.currentPage = pageNum;
                    $scope.getChangeList();
                }
            };

            /**
             * 变更记录列表
             */
            $scope.getChangeList = function () {
                hrRequest.getStaffChangeInfo({
                    number: $scope.number
                }).then(function (res) {
                    $scope.tableOptions.data = res.data;
                    var data = res.data;
                    for (var i = 0, item; item = data[i++];) {
                        var split = item.content.split(',').join('</br>');
                        item.content = $sce.trustAsHtml(split);
                    }
                    $scope.tableOptions.totalCount = (res.pageDto && res.pageDto.count) || 0;
                })
            };
            $scope.getChangeList();
        }
    ]);
});