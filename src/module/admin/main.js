/**
 * @file 主文件
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('./app');
    require('./directive/main');
    require('./permission/controller');
    require('./structure/controller');
    require('./contractCompany/controller');
    require('./contractCompany/mod/controller');
    require('./opt/editStructure/controller');
    require('./opt/editKeyInfo/controller');
    require('./socialSecurityCity/controller');
    require('./socialSecurityCity/mod/controller');
    require('./office/controller');
    require('./office/mod/controller');
    require('./holiday/controller');
    require('./disability/controller');
    require('./disability/mod/controller');
    require('./level/controller');
    require('./level/mod/controller');
    require('./util');
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('admin', {
                abstract: '',
                url: '/admin',
                templateUrl: 'src/module/admin/tpl.html'
            })
            .state('admin.permission', {
                url: '/permission',
                templateUrl: 'src/module/admin/permission/tpl.html',
                controller: 'permissionCtrl'
            })
            .state('admin.search', {
                url: '/search',
                templateUrl: 'src/module/hr/search/tpl.html',
                controller: 'searchCtrl'
            })
            .state('admin.contractCompany', {
                url: '/contractCompany',
                templateUrl: 'src/module/admin/contractCompany/tpl.html',
                controller: 'adminContractCompanyCtrl'
            })
            .state('admin.socialSecurityCity', {
                url: '/socialSecurityCity',
                templateUrl: 'src/module/admin/socialSecurityCity/tpl.html',
                controller: 'adminSocialSecurityCityControllor'
            })
            .state('admin.disability', {
                url: '/disability',
                templateUrl: 'src/module/admin/disability/tpl.html',
                controller: 'adminDisabilityCtrl'
            })
            .state('admin.office', {
                url: '/office',
                templateUrl: 'src/module/admin/office/tpl.html',
                controller: 'adminOfficeControllor'
            })

            .state('admin.structure', {
                url: '/structure',
                templateUrl: 'src/module/admin/structure/tpl.html',
                controller: 'structureCtrl'
            })
            .state('admin.holiday', {
                url: '/holiday',
                templateUrl: 'src/module/admin/holiday/tpl.html',
                controller: 'adminHolidayControllor'
            })
            .state('admin.level', {
                url: '/level',
                templateUrl: 'src/module/admin/level/tpl.html',
                controller: 'adminLevelControllor'
            })
            .state('admin.staffInfo', {
                url: '/info',
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
            .state('admin.staffInfo.baseInfo', {
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
            .state('admin.staffInfo.workInfo', {
                url: '/workInfo',
                templateUrl: 'src/module/hr/workInfo/tpl.html',
                controller: 'hrWorkInfoCtrl'
            })
            .state('admin.staffInfo.salaryInfo', {
                url: '/salaryInfo',
                templateUrl: 'src/module/hr/salaryInfo/tpl.html',
                controller: 'hrSalaryInfoCtrl'
            })
            .state('admin.staffInfo.secretInfo', {
                url: '/secretInfo',
                templateUrl: 'src/module/hr/secretInfo/tpl.html',
                controller: 'hrSecretInfoCtrl'
            })
            .state('admin.staffInfo.changeInfo', {
                url: '/changeInfo',
                templateUrl: 'src/module/hr/changeInfo/tpl.html',
                controller: 'hrChangeInfoCtrl'
            })
            .state('admin.staffInfo.salaryChangeInfo', {
                url: '/salaryChangeInfo',
                templateUrl: 'src/module/hr/salaryChangeInfo/tpl.html',
                controller: 'hrSalaryChangeInfoCtrl'
            })
            .state('admin.staffInfo.leaveInfo', {
                url: '/leaveInfo',
                templateUrl: 'src/module/hr/dimission/tpl.html',
                controller: 'hrDimissionCtrl'
            })
            .state('admin.staffInfo.workTargetInfo', {
                url: '/workTargetInfo',
                templateUrl: 'src/module/hr/workTargetInfo/tpl.html',
                controller: 'hrWorkTargetInfoCtrl'
            })
            .state('admin.staffInfo.formalApplyInfo', {
                url: '/formalApplyInfo',
                templateUrl: 'src/module/hr/formalApplyInfo/tpl.html',
                controller: 'hrFormalApplyInfoCtrl'
            })
    }]);
});