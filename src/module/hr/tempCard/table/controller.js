/**
 * @file  列表
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var tempCardConfig = require('../config');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    app.controller('hrTempCardTableCtrl', ['$scope', '$state', 'hrRequest', 'tempCardListTableColsConfig', 'hrOptUtil', '$filter',
        function ($scope, $state, hrRequest, tempCardListTableColsConfig, hrOptUtil, $filter) {

            /**
             * 入口
             * @type {string}
             */
            $scope.entryName = $state.current.name;
            var splits = $scope.entryName.split('.');
            $scope.nav = splits[2];
            var tabCode = tempCardConfig.TAB_CODE;
            $scope.tabCode = tempCardConfig.TAB_CODE;

            /**
             * 这个标记给表格用的
             * @type {boolean}
             */
            $scope.isMainScope = true;

            /**
             * 表格配置
             */
            $scope.tableOptions = {
                data: [],
                canSelect: false,
                totalCount: 0,
                cols: tempCardListTableColsConfig.getConfig($scope),
                onPageChange: function (pageNum) {
                    $scope.currentPage = pageNum;
                    getList();
                },
                mainScope: $scope
            };

            init();

            /**
             * 初始化
             */
            function init() {
                getList();
                $scope.addTempCard = addTempCard;
                $scope.onSingleBorrowClick = onSingleBorrowClick;
                $scope.onSingleReturnClick = onSingleReturnClick;
                $scope.onSingleDelClick = onSingleDelClick;
            }


            /**
             * 获取导航code
             * @param nav
             */
            function getNav(nav) {
                if (nav == 'all') {
                    return tabCode.ALL;

                } else if (nav == 'canBorrow') {
                    return tabCode.CAN_BORROW;

                } else if (nav == 'hadBorrow') {
                    return tabCode.HAD_BORROW;
                }
            }


            /**
             * 添加临时卡
             */
            function addTempCard() {
                hrOptUtil.tempCardAdd(function (param) {
                    if (param.hadSuccess) {
                        getList();
                        emitAmountChange();
                    }
                });
            }

            /**
             * 通知父scope amount发生变化
             */
            function emitAmountChange() {
                $scope.$emit('amountChange');
            }

            /**
             * 借出
             * @param {Object} item 行数据
             */
            function onSingleBorrowClick(item) {
                hrOptUtil.tempCardBorrow(item, function (param) {
                    if (param.hadSuccess) {
                        getList();
                        emitAmountChange();
                    }
                });
            }

            /**
             * 归还
             * @param item
             */
            function onSingleReturnClick(item) {
                hrOptUtil.tempCardReturn(item, function (param) {
                    if (param.hadSuccess) {
                        getList();
                        emitAmountChange();
                    }
                });
            };

            /**
             * 删除
             * @param item
             */
            function onSingleDelClick(item) {
                hrOptUtil.tempCardDel(item, function (param) {
                    if (param.hadSuccess) {
                        getList();
                        emitAmountChange();
                    }
                });
            };


            /**
             * 列表
             */
            function getList() {
                var status = getNav($scope.nav);
                if (status == tabCode.ALL) {
                    status = undefined;
                }

                hrRequest.getTempCardList({
                    status: status,
                    pageDto: {
                        pageNum: $scope.currentPage || 1,
                        pageSize: config.PAGE_SIZE
                    }
                }).then(function (res) {
                    var data = res.data;
                    $scope.tableOptions.data = processData(data);
                    $scope.tableOptions.totalCount = res.pageDto.count;
                })
            };

            /**
             * 数据处理
             * @param {Array} data
             */
            function processData(data) {
                for (var i = 0, item; item = data[i++];) {
                    item.statusValue = $filter('tempCardStatus')(item.status);
                }
                return data;
            }
        }
    ]);
});