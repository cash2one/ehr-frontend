/**
 * @file 工资单
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    var moment = require('moment');

    app.controller('hrMonthSalaryCtrl', ['$scope', 'hrRequest', '$stateParams',
        'localStorage', '$state', 'authUtil', 'hrUtil', 'hrUtil', 'bigDecimal', '$sce',
        function ($scope, hrRequest, $stateParams, localStorage, $state, authUtil, hrUtil, hrUtil, bigDecimal, $sce) {
            $scope.abtainSalary = [];
            $scope.minusSalary = [];
            $scope.query = {};
            var lastQueryMonth = {};
            var abtainFields = ['executeSalary', 'trafficSubsidy',
                'mobileSubsidy', 'mealSubsidy', 'performSalary', 'mealPlus',
                'recommend', 'houseSubsidy', 'specialReward', 'otherSubsidy',
                'yearAward'
            ];
            var abtainFieldMap = {
                executeSalary: '本月基本工资',
                trafficSubsidy: '交通补贴',
                mobileSubsidy: '通讯补贴',
                mealSubsidy: '餐补',
                performSalary: '绩效工资',
                mealPlus: '补充餐补',
                recommend: '推荐费用',
                houseSubsidy: '住房补贴',
                specialReward: '分公司经理特别奖',
                otherSubsidy: '其它补贴',
                yearAward: '年终奖'
            };
            var minusFields = ['endowPer', 'unemployPer', 'medicalPer',
                'injuryPer', 'maternityPer', 'houseFundPer', 'personTax'
            ];
            var minusFieldMap = {
                endowPer: '代扣养老保险',
                unemployPer: '代扣失业保险',
                medicalPer: '代扣医疗保险',
                injuryPer: '代扣工伤保险',
                maternityPer: '代扣生育保险',
                houseFundPer: '代扣公积金',
                personTax: '代扣个税'
            };
            var addFun = bigDecimal.add;

            init();


            /**
             * 入口函数
             */
            function init() {
                initMinMonth();
                initMaxMonth();
                getMonthSalary();
                $scope.onMonthChange = onMonthChange;
            }

            /**
             * 设置月份的最小值
             */
            function initMinMonth() {
                $scope.monthMin = '2015-11';
            }


            /**
             * 初始月份设置
             */
            function initMaxMonth() {
                var nowDate = new Date();
                var day = nowDate.getDate();
                // 10号以后才能查看当月工资
                if (day >= 10) {
                    $scope.monthMax = moment().add(-1, 'M').format("YYYY-MM");
                } else {
                    $scope.monthMax = moment().add(-2, 'M').format("YYYY-MM");
                }
                $scope.query.month = new Date($scope.monthMax + '-01 00:00:00');
            }

            /**
             * 查询薪资
             */
            function getMonthSalary() {
                if ($scope.monthSalaryForm && !$scope.monthSalaryForm.$valid) {
                    alert('请输入正确查询月份');
                    $scope.query.month = lastQueryMonth;
                    return;
                }
                lastQueryMonth = $scope.query.month;
                hrRequest.getMonthSalary({
                    number: localStorage.get('number'),
                    month: moment($scope.query.month.getTime()).format('YYYY-MM')
                }).then(function (res) {
                    processData(res.data);
                });
            }

            /**
             * 日期选择变化
             */
            function onMonthChange() {
                getMonthSalary();
            }

            /**
             * 数据处理
             * @param {Object} data
             */
            function processData(data) {
                $scope.abtainSalary = [];
                $scope.minusSalary = [];
                if (!data) {
                    data = {};
                }
                $scope.realSum = addFun(data.realSum, data.yearAwardFinal);
                $scope.sumSalary = addFun(data.sumSalary, data.yearAward);
                $scope.sumMinusPer = addFun(data.sumMinusPer, data.yearAwardTax);
                $scope.detail = data.detail;
                $scope.yearAwardTax = data.yearAwardTax;
                $scope.systemMemo = data.systemMemo;
                if(data.performDetail != '[]' && data.performDetail) {
                    $scope.performDetail = $sce.trustAsHtml(hrUtil.getPerformSalaryHtml(JSON.parse(data.performDetail), data.performSalary));
                }
                for (var i = 0, key; key = abtainFields[i++];) {
                    var value = data[key];
                    if (value) {
                        $scope.abtainSalary.push({
                            name: abtainFieldMap[key],
                            value: value
                        });
                    }
                }
                for (var i = 0, key; key = minusFields[i++];) {
                    var value = data[key];
                    $scope.minusSalary.push({
                        name: minusFieldMap[key],
                        value: value
                    });
                }
            }
        }
    ]);
});