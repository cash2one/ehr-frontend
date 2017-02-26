/**
 * @file 主文件
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('./app');
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var tabConfig = [
            {
                name: 'baseInfo',
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
            },
            {
                name: 'workInfo',
                url: '/workInfo',
                templateUrl: 'src/module/hr/workInfo/tpl.html',
                controller: 'hrWorkInfoCtrl'
            },
            {
                name: 'salaryInfo',
                url: '/salaryInfo',
                templateUrl: 'src/module/hr/salaryInfo/tpl.html',
                controller: 'hrSalaryInfoCtrl'
            },
            {
                name: 'monthSalary',
                url: '/monthSalary',
                templateUrl: 'src/module/hr/monthSalary/tpl.html',
                controller: 'hrMonthSalaryCtrl'
            },
            {
                name: 'secretInfo',
                url: '/secretInfo',
                templateUrl: 'src/module/hr/secretInfo/tpl.html',
                controller: 'hrSecretInfoCtrl'
            },
            {
                name: 'changeInfo',
                url: '/changeInfo',
                templateUrl: 'src/module/hr/changeInfo/tpl.html',
                controller: 'hrChangeInfoCtrl'
            },
            {
                name: 'salaryChangeInfo',
                url: '/salaryChangeInfo',
                templateUrl: 'src/module/hr/salaryChangeInfo/tpl.html',
                controller: 'hrSalaryChangeInfoCtrl'
            },
            {
                name: 'leaveInfo',
                url: '/leaveInfo',
                templateUrl: 'src/module/hr/dimission/tpl.html',
                controller: 'hrDimissionCtrl'
            },
            {
                name: 'workTargetInfo',
                url: '/workTargetInfo',
                templateUrl: 'src/module/hr/workTargetInfo/tpl.html',
                controller: 'hrWorkTargetInfoCtrl'
            },
            {
                name: 'formalApplyInfo',
                url: '/formalApplyInfo',
                templateUrl: 'src/module/hr/formalApplyInfo/tpl.html',
                controller: 'hrFormalApplyInfoCtrl'
            }
        ];


        $stateProvider
            .state('subordinate', {
                abstract: '',
                url: '/subordinate',
                templateUrl: 'src/module/subordinate/tpl.html'
            })
            .state('subordinate.search', {
                url: '/search',
                templateUrl: 'src/module/hr/search/tpl.html',
                controller: 'searchCtrl'
            })
            .state('subordinate.ownerSearch', {
                url: '/ownerSearch',
                templateUrl: 'src/module/hr/search/tpl.html',
                controller: 'searchCtrl'
            })
            // 我的信息配置
            .state('subordinate.self', {
                url: '/selfInfo',
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
            });

        $.each(tabConfig, function (index, item) {
            $stateProvider.state('subordinate.self.' + item.name, {
                url: item.url,
                templateUrl: item.templateUrl,
                controller: item.controller,
                resolve: item.resolve
            });
        });


        // 下属信息配置
        $stateProvider.state('subordinate.info', {
            url: '/info',
            templateUrl: 'src/module/hr/staffInfo/tpl.html',
            controller: 'staffInfoCtrl',
            resolve: {
                commonInfo: ['hrRequest', 'localStorage',
                    function (hrRequest, localStorage) {
                        ;
                        return hrRequest.getCommonInfo({
                            number: localStorage.get('number')
                        })
                    }
                ]
            }
        });
        $.each(tabConfig, function (index, item) {
            $stateProvider.state('subordinate.info.' + item.name, {
                url: item.url,
                templateUrl: item.templateUrl,
                controller: item.controller,
                resolve: item.resolve
            });
        });



        // 部门人员配置
        $stateProvider.state('subordinate.staffInfo', {
            url: '/staffInfo',
            templateUrl: 'src/module/hr/staffInfo/tpl.html',
            controller: 'staffInfoCtrl',
            resolve: {
                commonInfo: ['hrRequest', 'localStorage',
                    function (hrRequest, localStorage) {
                        ;
                        return hrRequest.getCommonInfo({
                            number: localStorage.get('number')
                        })
                    }
                ]
            }
        });
        $.each(tabConfig, function (index, item) {
            $stateProvider.state('subordinate.staffInfo.' + item.name, {
                url: item.url,
                templateUrl: item.templateUrl,
                controller: item.controller,
                resolve: item.resolve
            });
        });
    }]);
});