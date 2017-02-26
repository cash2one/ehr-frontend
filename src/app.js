/**
 * @file 应用入口
 * @author linda
 */
define(function(require) {
    require('common/main');
    require('module/home/app');
    require('module/hr/main');
    require('module/admin/main');
    require('module/subordinate/main');
    require('module/home/main');
    require('module/apply/main');
    require('jsLibrary/src/ngFilter/module');
    require('jsLibrary/src/ngFilter/parseRmb');

    // 这个变量在发布打包的时候 会被替换成 '1'
    var isDebugging = '@@isDebugging';


    var dep = [
        'app.common',
        'app.admin',
        'app.subordinate',
        'app.home',
        'app.hr',
        'app.apply',
        'ui.router',
        'ngSanitize',
        'ui.bootstrap',
        'treeControl',
        'library.filters'
    ];
    // 生产环境读js里面的模板
    if (isDebugging == '1') {
        require('module/main.tpl');
        dep.push('templates-main')
    }

    var app = angular.module('app', dep) // 依赖模块
        .config(['$tooltipProvider',
            function($tooltipProvider) {
                $tooltipProvider.options({
                    appendToBody: true
                });
            }
        ])
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('', '/home');
        }])

    // 配置http的转码
    .config(['$httpProvider', function($httpProvider) {
            $httpProvider.defaults.headers.post = {
                'Content-Type': 'application/json'
            }
        }])
        .run(['$rootScope', '$state', '$stateParams', 'authUtil', 'ajaxService', 'applyRequest', 'util',
            function($rootScope, $state, $stateParams, authUtil, ajaxService, applyRequest, util) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                $rootScope.refreshApplyNum = refreshApplyNum;
                /**
                 * 待审批的数量获取
                 */
                function refreshApplyNum() {
                    applyRequest.getCount({
                        status: 0
                    }).then(function(res) {
                        var index = util.findIndexInObjArr($rootScope.navigator,
                            'state', 'apply.list.toHandle.all');
                        $rootScope.navigator[index].num = res.data.total;
                    });
                }
            }
        ])
        .controller('mainCtrl', ['$scope', '$rootScope', 'authUtil', 'ajaxService', 'localStorage', '$state', 'util', 'applyRequest',
            function($scope, $rootScope, authUtil, ajaxService, localStorage, $state, util, applyRequest) {
                // 重写浏览器的alert
                alert = util.alert;
                // 重写浏览器的confirm
                confirm = util.confirm;
                info = util.info;

                ajaxService.send('/GET/staff/loginUserInfo.json', {
                    asyn: false
                }).then(function(res) {
                    $rootScope.userInfo = res.data;
                    var roleTypes = $rootScope.userInfo.roleTypes;
                    $rootScope.userInfo.roleTypes = roleTypes ? roleTypes.split(',') : [];
                    initAuth();
                    initNavigator();
                    initHeaderAndFooterVisibility();
                    $scope.refreshApplyNum();
                });

                function initHeaderAndFooterVisibility() {
                    var hash = window.location.hash;

                    function hasString(str, subStr) {
                        return str.indexOf(subStr) != -1;
                    }

                    if (!(/#\/hr\/\w*-staffInfo/g.test(hash) || hasString(hash, 'subordinate/info') || hasString(hash, 'admin/info') || /#\/apply\/\d*\/modal[\w|\/]*/g.test(hash))) {
                        $('#header').removeClass('hide');
                        $('#footer').removeClass('hide');
                    }
                };

                /**
                 * 初始化权限
                 */
                function initAuth() {
                    $rootScope.userInfo.isHRBP = authUtil.isHRBP();
                    $rootScope.userInfo.isRecruitHR = authUtil.isRecruitHR();
                    $rootScope.userInfo.isSalaryHR = authUtil.isSalaryHR();
                    $rootScope.userInfo.isRelationshipHR = authUtil.isRelationshipHR();
                    $rootScope.userInfo.isTrainingHR = authUtil.isTrainingHR();
                    $rootScope.userInfo.isAssetManager = authUtil.isAssetManager();
                    $rootScope.userInfo.isItOwner = authUtil.isItOwner();
                    $rootScope.userInfo.isStructureOwner = authUtil.isStructureOwner();
                    $rootScope.userInfo.isAdmin = authUtil.isAdmin();
                    $rootScope.userInfo.isHR = authUtil.isHR();
                    $rootScope.userInfo.isManager = authUtil.isManager();
                }


                /**
                 * 退出
                 */
                $scope.logout = function() {
                    ajaxService.send('/GET/user/loginout.json', {}).then(function(data) {
                        window.location.href = 'login.html';
                    })
                }

                /**
                 * 点击导航
                 * @param item
                 */
                $scope.navClick = function(item) {
                    if (item.state == 'subordinate.self.baseInfo') {
                        localStorage.set('number', $scope.userInfo.number);
                    }
                    $state.go(item.state);
                }

                /**
                 * 初始化顶导
                 */
                function initNavigator() {
                    $rootScope.navigator = [{
                        state: 'home',
                        title: '首页',
                        rootState: 'home'
                    }, {
                        state: 'subordinate.self.baseInfo',
                        title: '我的信息',
                        rootState: 'self'
                    }, {
                        state: 'apply.list.toHandle.all',
                        title: '我的审批',
                        rootState: 'apply'
                    }];

                    if (authUtil.isAdmin()) {
                        $rootScope.navigator.push({
                            state: 'admin',
                            title: '管理员配置',
                            rootState: 'admin',
                            items: [{
                                state: 'admin.structure',
                                title: '组织架构'
                            }, {
                                state: 'admin.contractCompany',
                                title: '签约公司配置'
                            }, {
                                state: 'admin.socialSecurityCity',
                                title: '社保缴纳城市配置'
                            }, {
                                state: 'admin.office',
                                title: '办公地点配置'
                            }, {
                                state: 'admin.holiday',
                                title: '工作日配置'
                            }, {
                                state: 'admin.search',
                                title: '关键信息修改'
                            },
                            {
                                state: 'admin.disability',
                                title: '残疾员工名单'
                            },{
                                state: 'admin.level',
                                title: '职级体系配置'
                            }]
                        });
                    }
                    if (authUtil.isReception()) {
                        $scope.navigator.push({
                            state: 'hr.tempCard.all',
                            title: '前台工作'
                        });
                    }
                    if (authUtil.isAssetManager()) {
                        $scope.navigator.push({
                            state: 'hr.assetManagerSearch',
                            title: '资产管理'
                        });
                    }
                    if (authUtil.isItOwner()) {
                        $scope.navigator.push({
                            state: 'hr.itManagerSearch',
                            title: 'IT管理'
                        });
                    }
                    if (authUtil.isHR()) {
                        var hrItem = {
                            state: 'hr',
                            rootState: 'hr',
                            title: 'HR工作',
                            items: []

                        }
                        var items = [];
                        if (authUtil.isRecruitHR()) {
                            items.push({
                                state: 'hr.newer',
                                title: '发送offer'
                            }, {
                                state: 'hr.newerSearch',
                                title: 'offer信息查询'
                            }, {
                                state: 'hr.abandonSearch',
                                title: '取消offer'
                            }, {
                                state: 'hr.rejoin',
                                title: '员工再入职'
                            });
                        }
                        if (authUtil.isRelationshipHR()) {
                            if (authUtil.isAgent()) {
                                items.push({
                                    state: 'hr.toJoinSearchAgent',
                                    title: '办理入职手续'
                                });
                                items.push({
                                    state: 'hr.rejoinAgent',
                                    title: '员工再入职'
                                });
                                items.push({
                                    state: 'hr.relationshipHRSearch',
                                    title: '员工信息查询-员工关系'
                                });
                            } else {
                                items.push({
                                    state: 'hr.toJoinSearch',
                                    title: '办理入职手续'
                                });
                                items.push({
                                    state: 'hr.relationshipHRSearch',
                                    title: '员工信息查询-员工关系'
                                });
                            }

                        }
                        if (authUtil.isSalaryHR()) {
                            items.push({
                                state: 'hr.salaryBillSearch',
                                title: '应发工资名单'
                            });
                            items.push({
                                state: 'hr.securityList',
                                title: '社保缴纳名单'
                            });
                            items.push({
                                state: 'hr.taxList',
                                title: '个税名单'
                            });
                            items.push({
                                state: 'hr.salaryHRSearch',
                                title: '员工信息查询-薪酬'
                            });
                        }
                        if (authUtil.isTrainingHR()) {
                            items.push({
                                state: 'hr.trainingHRSearch',
                                title: '员工信息查询-培训'
                            });
                        }
                        if (authUtil.isHRBP()) {
                            items.push({
                                state: 'hr.businessPartnerHRSearch',
                                title: '员工信息查询-HRBP'
                            });

                            items.push({
                                state: 'hr.attendceRecord',
                                title: '出勤记录'
                            });
                        }

                        hrItem.items = items;
                        $rootScope.navigator.push(hrItem);
                    }
                    if (authUtil.isManager()) {
                        $rootScope.navigator.push({
                            state: 'subordinate.search',
                            title: '下属信息',
                            rootState: 'subordinate'
                        });
                    }
                    if (authUtil.isStructureOwner()) {
                        $rootScope.navigator.push({
                            state: 'subordinate.ownerSearch',
                            title: '部门员工信息',
                            rootState: 'subordinate'
                        });
                    }
                }
            }
        ]);
    angular.bootstrap(document, ['app']);
    return app;
});