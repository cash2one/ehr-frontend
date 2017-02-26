/**
 * @file 主文件
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('./app');
    require('./directive/main');
    require('./newer/controller');
    require('./search/controller');
    require('./salaryList/controller');
    require('./taxList/controller');
    require('./securityList/controller');
    require('./attendceRecord/controller');
    require('./staffInfo/controller');
    require('./baseInfo/controller');
    require('./workInfo/controller');
    require('./salaryInfo/controller');
    require('./secretInfo/controller');
    require('./changeInfo/controller');
    require('./monthSalary/controller');
    require('./salaryChangeInfo/controller');
    require('./dimission/controller');
    require('./initInfo/controller');
    require('./workTargetInfo/controller');
    require('./formalApplyInfo/controller');
    require('./opt/main');
    require('./tempCard/main');
    require('./util');
    require('./optUtil');
    require('./agent/controller');

    app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('hr', {
                    abstract: '',
                    url: '/hr',
                    templateUrl: 'src/module/hr/tpl.html'
                })
                .state('hr.newer', {
                    url: '/newer',
                    templateUrl: 'src/module/hr/newer/tpl.html',
                    controller: 'newerCtrl'
                })
                .state('hr.newerEdit', {
                    url: '/newerEdit',
                    templateUrl: 'src/module/hr/newer/tpl.html',
                    controller: 'newerCtrl'
                })
                .state('hr.newerSearch', {
                    url: '/newerSearch',
                    templateUrl: 'src/module/hr/search/tpl.html',
                    controller: 'searchCtrl'
                })
                .state('hr.rejoin', {
                    url: '/rejoin',
                    templateUrl: 'src/module/hr/newer/tpl.html',
                    controller: 'newerCtrl'
                })
                .state('hr.salaryBillSearch', {
                    url: '/salaryBillSearch',
                    templateUrl: 'src/module/hr/salaryList/tpl.html',
                    controller: 'hrSalaryListController'
                })
                .state('hr.taxList', {
                    url: '/taxList',
                    templateUrl: 'src/module/hr/taxList/tpl.html',
                    controller: 'hrTaxListController'
                })
                .state('hr.attendceRecord', {
                    url: '/attendceRecord',
                    templateUrl: 'src/module/hr/attendceRecord/tpl.html',
                    controller: 'attendceRecordCtrl'
                })
                .state('hr.tempCard', {
                    url: '/tempCard',
                    templateUrl: 'src/module/hr/tempCard/tpl.html',
                    controller: 'hrTempCardCtrl'
                })
                .state('hr.tempCard.all', {
                    url: '/all',
                    templateUrl: 'src/module/hr/tempCard/table/tpl.html',
                    controller: 'hrTempCardTableCtrl'
                })
                .state('hr.tempCard.canBorrow', {
                    url: '/canBorrow',
                    templateUrl: 'src/module/hr/tempCard/table/tpl.html',
                    controller: 'hrTempCardTableCtrl'
                })
                .state('hr.tempCard.hadBorrow', {
                    url: '/hadBorrow',
                    templateUrl: 'src/module/hr/tempCard/table/tpl.html',
                    controller: 'hrTempCardTableCtrl'
                })
                .state('hr.securityList', {
                    url: '/securityList',
                    templateUrl: 'src/module/hr/securityList/tpl.html',
                    controller: 'hrSecurityListController'
                })
                .state('hr.toJoinSearch', {
                    url: '/toJoinSearch',
                    templateUrl: 'src/module/hr/search/tpl.html',
                    controller: 'searchCtrl'
                })
                .state('hr.abandonSearch', {
                    url: '/abandonSearch',
                    templateUrl: 'src/module/hr/search/tpl.html',
                    controller: 'searchCtrl'
                })
                .state('hr.assetManagerSearch', {
                    url: '/assetManagerSearch',
                    templateUrl: 'src/module/hr/search/tpl.html',
                    controller: 'searchCtrl'
                })
                .state('hr.itManagerSearch', {
                    url: '/itManagerSearch',
                    templateUrl: 'src/module/hr/search/tpl.html',
                    controller: 'searchCtrl'
                })
                .state('hr.toJoinSearchAgent', {
                    url: '/toJoinSearchAgent',
                    templateUrl: 'src/module/hr/agent/tpl.html',
                    controller: 'agentCtrl'
                })
                .state('hr.rejoinAgent', {
                    url: '/rejoinAgent',
                    templateUrl: 'src/module/hr/agent/tpl.html',
                    controller: 'agentCtrl'
                })
                ;
            var hrTypes = ['salaryHR', 'relationshipHR', 'businessPartnerHR', 'trainingHR'];
            for (var i = 0, val; val = hrTypes[i++];) {
                $stateProvider
                    .state('hr.' + val + 'Search', {
                        url: '/' + val + 'Search',
                        templateUrl: 'src/module/hr/search/tpl.html',
                        controller: 'searchCtrl'
                    })
                    .state('hr.' + val + '-staffInfo', {
                        url: '/' + val + '-staffInfo',
                        templateUrl: 'src/module/hr/staffInfo/tpl.html',
                        controller: 'staffInfoCtrl',
                        resolve: {
                            commonInfo: ['hrRequest', 'localStorage',
                                function (hrRequest, localStorage) {
                                    return hrRequest.getCommonInfo({
                                        number: localStorage.get('number')
                                    })
                                }
                            ]
                        }
                    })
                    .state('hr.' + val + '-staffInfo.baseInfo', {
                        url: '/baseInfo',
                        templateUrl: 'src/module/hr/baseInfo/tpl.html',
                        controller: 'hrBaseInfoCtrl',
                        resolve: {
                            workInfo: ['hrRequest', 'localStorage',
                                function (hrRequest, localStorage) {
                                    return hrRequest.getStaffWorkInfo({
                                        number: localStorage.get('number')
                                    })
                                }
                            ]
                        }
                    })
                    .state('hr.' + val + '-staffInfo.workInfo', {
                        url: '/workInfo',
                        templateUrl: 'src/module/hr/workInfo/tpl.html',
                        controller: 'hrWorkInfoCtrl'
                    })
                    .state('hr.' + val + '-staffInfo.salaryInfo', {
                        url: '/salaryInfo',
                        templateUrl: 'src/module/hr/salaryInfo/tpl.html',
                        controller: 'hrSalaryInfoCtrl'
                    })
                    .state('hr.' + val + '-staffInfo.monthSalary', {
                        url: '/monthSalary',
                        templateUrl: 'src/module/hr/monthSalary/tpl.html',
                        controller: 'hrMonthSalaryCtrl'
                    })
                    .state('hr.' + val + '-staffInfo.secretInfo', {
                        url: '/secretInfo',
                        templateUrl: 'src/module/hr/secretInfo/tpl.html',
                        controller: 'hrSecretInfoCtrl'
                    })
                    .state('hr.' + val + '-staffInfo.changeInfo', {
                        url: '/changeInfo',
                        templateUrl: 'src/module/hr/changeInfo/tpl.html',
                        controller: 'hrChangeInfoCtrl'
                    })
                    .state('hr.' + val + '-staffInfo.salaryChangeInfo', {
                        url: '/salaryChangeInfo',
                        templateUrl: 'src/module/hr/salaryChangeInfo/tpl.html',
                        controller: 'hrSalaryChangeInfoCtrl'
                    })
                    .state('hr.' + val + '-staffInfo.leaveInfo', {
                        url: '/leaveInfo',
                        templateUrl: 'src/module/hr/dimission/tpl.html',
                        controller: 'hrDimissionCtrl'
                    })
                    .state('hr.' + val + '-staffInfo.workTargetInfo', {
                        url: '/workTargetInfo',
                        templateUrl: 'src/module/hr/workTargetInfo/tpl.html',
                        controller: 'hrWorkTargetInfoCtrl'
                    })
                    .state('hr.' + val + '-staffInfo.formalApplyInfo', {
                        url: '/formalApplyInfo',
                        templateUrl: 'src/module/hr/formalApplyInfo/tpl.html',
                        controller: 'hrFormalApplyInfoCtrl'
                    })
            }

        }]);
});