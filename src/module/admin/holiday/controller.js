/**
 * @file 工作地点
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var moment = require('moment');
    require('./mod/controller');
    app.controller('adminHolidayControllor', controller);
    controller.$inject = ['$scope', '$stateParams', 'adminRequest', 'hrRequest', '$modal'];
    function controller($scope, $stateParams, adminRequest, hrRequest, $modal) {
        $scope.query = {
            month: 1
        };
        $scope.weeks = ['一', '二', '三', '四', '五', '六', '日']
        $scope.monthChangeHandler = monthChangeHandler;
        $scope.yearChangeHandler = yearChangeHandler;
        $scope.companyChangeHandler = companyChangeHandler;

        $scope.dayClickHandler = dayClickHandler;
        $scope.saveHandler = saveHandler;
        $scope.nameClick = nameClickHandler;
        $scope.modifyClick = modifyClick;
        $scope.add = add;
        $scope.cid = undefined;
        /**
         * 表格配置
         */
        $scope.tableOptions = {
            data: [],
            canSelect: false,
            mainScope: $scope,
            cols: [
                {
                    field: 'name',
                    displayName: '模板名称',
                    cellTpl: 'src/module/admin/holiday/tableTpl/name.html'
                },
                {
                    field: 'opt',
                    displayName: '操作',
                    cellTpl: 'src/module/admin/holiday/tableTpl/opt.html'
                }
            ]
        };

        init();

        function init() {
            $scope.months = getMonthValues();
            $scope.years = getYears();
            $scope.query.year = $scope.years[0];
            getCalendarList();
        }

        /**
         * 日历列表
         */
        function getCalendarList() {
            adminRequest.getCalendarList().then(function (res) {
                $scope.tableOptions.data = res.data;
                if (typeof $scope.cid == 'undefined') {
                    var item = res.data[0];
                    $scope.cid = item.id;
                    $scope.curName = item.name;
                    getWorkDay();
                }
            });
        }

        /**
         * 获取年份
         * @returns {*[]}
         */
        function getYears() {
            var year = new Date().getFullYear();
            return [year, year + 1];
        }

        /**
         * 初始化月份值
         * @returns {Array}
         */
        function getMonthValues() {
            var res = [];
            for (var i = 1; i < 13; i++) {
                res.push({
                    key: i,
                    value: i + '月'
                });
            }
            return res;
        }

        /**
         * 月份变化
         */
        function monthChangeHandler(val, index) {
            getWorkDay();
        }

        /**
         * 年变化
         */
        function yearChangeHandler() {
            getWorkDay();
        }

        /**
         * 公司变化
         */
        function companyChangeHandler() {
            getWorkDay();
        }

        /**
         * 查询工作日
         */
        function getWorkDay() {
            var query = {
                month: $scope.query.year + '-' + $scope.query.month,
                templateId: $scope.cid
            }
            adminRequest.getWorkdays(query).then(function (res) {
                var days = res.data.split(',');
                $scope.days = initMonthDayStatus(days);
            });
        }

        /**
         * 每天的状态
         */
        function initMonthDayStatus(workdays) {
            var res = [];
            var year = $scope.query.year;
            var month = +$scope.query.month;
            var begin = moment(year + '-' + month);
            var end = moment(year + '-' + month).add(1, 'months').add(-1, 'days');
            var endDay = end.format('D');
            var beginWeekday = begin.day();
            // 周日换成7
            if (beginWeekday == 0) {
                beginWeekday = 7;
            }
            var workdayMap = {};
            for (var i = 0; i < workdays.length; i++) {
                workdayMap[workdays[i]] = true;
            }

            // 补月的第一周的空
            for (var i = 1; i < beginWeekday; i++) {
                res.push({
                    value: '',
                    isHoliday: false
                })
            }
            for (var i = 1; i <= endDay; i++) {
                var isHoliday = true;
                if (workdayMap[i]) {
                    isHoliday = false;
                }
                res.push({
                    value: i,
                    isHoliday: isHoliday
                });
            }
            return res;
        }

        /**
         * 点击某天
         */
        function dayClickHandler(item) {
            if (item.isHoliday == true) {
                item.isHoliday = false;
            } else {
                item.isHoliday = true;
            }
        }

        /**
         * 保存
         */
        function saveHandler() {
            var query = $scope.query;
            adminRequest.modWorkdays({
                month: query.year + '-' + query.month,
                workdays: getSelectedWorkDays().join(','),
                id: $scope.cid
            }).then(function () {
                info('保存成功');
            });
        };

        /**
         * 获取工作日
         * @returns {Array}
         */
        function getSelectedWorkDays() {
            var res = [];
            for (var i = 0, item; item = $scope.days[i++];) {
                if (!item.isHoliday && item.value != '') {
                    res.push(item.value);
                }
            }
            return res;
        }

        /**
         * 模板名字点击
         * @param item
         */
        function nameClickHandler(item) {
            $scope.cid = item.id;
            $scope.curName = item.name;
            $scope.query.year = $scope.years[0];
            $scope.query.month = 1;
            getWorkDay();
        }


        /**
         * 修改点击
         */
        function modifyClick(item) {
            var modalInstance = $modal.open({
                templateUrl: 'src/module/admin/holiday/mod/tpl.html',
                controller: 'calendarModCtrl',
                resolve: {
                    item: function () {
                        return item;
                    },
                    optType: function () {
                        return 'mod';
                    }
                }
            });
            // 窗口关闭
            modalInstance.result.then(function () {
            }, function (res) {
                if (res.hasSuccess == true) {
                    getCalendarList();
                    if ($scope.cid == res.id) {
                        $scope.curName = res.name;
                    }
                }
            });
        }


        /**
         * 添加操作
         * @param type
         * @param item
         */
        function add(item) {
            var modalInstance = $modal.open({
                templateUrl: 'src/module/admin/holiday/mod/tpl.html',
                controller: 'calendarModCtrl',
                resolve: {
                    item: function () {
                        return item;
                    },
                    optType: function () {
                        return 'add';
                    }
                }
            });
            // 窗口关闭
            modalInstance.result.then(function () {
            }, function (res) {
                if (res.hasSuccess == true) {
                    getCalendarList();
                }
            });
        }
    }
})
