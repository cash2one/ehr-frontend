/**
 * @file 主文件
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('./app');
    require('./directive/main');
    require('./filter/main');
    require('./list/main');
    require('./detail/main');
    require('./opt/main');
    require('./util');
    require('./optUtil');
    require('./request');

    app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('apply', {
                    abstract: '',
                    url: '/apply',
                    templateUrl: 'src/module/apply/tpl.html'
                })
                .state('apply.list', {
                    abstract: '',
                    url: '/list',
                    templateUrl: 'src/module/apply/list/tpl.html',
                    controller: 'applyListCtrl'
                })
                .state('apply.list.toHandle', {
                    abstract: '',
                    url: '/toHandle',
                    templateUrl: 'src/module/apply/list/subTab/tpl.html',
                    controller: 'applyListSubTabCtrl'
                })
                .state('apply.list.hasHandled', {
                    abstract: '',
                    url: '/hasHandled',
                    templateUrl: 'src/module/apply/list/subTab/tpl.html',
                    controller: 'applyListSubTabCtrl'
                })
                .state('apply.list.promoteMyself', {
                    abstract: '',
                    url: '/promoteMyself',
                    templateUrl: 'src/module/apply/list/subTab/tpl.html',
                    controller: 'applyListSubTabCtrl'
                })
                .state('apply.detail', {
                    url: '/:applyId',
                    templateUrl: 'src/module/apply/detail/tpl.html',
                    controller: 'applyDetailCtrl'
                })

            createDetailState('modal');
            createDetailState('modalMy-');
            createDetailState('modalFinished-');
            createDetailState('');
            createDetailState('my-');
            createDetailState('finished-');

            createSubTabState('toHandle');
            createSubTabState('hasHandled');
            createSubTabState('promoteMyself');

            /**
             * 审批详情的detail创建
             */
            function createDetailState(prefix) {
                $stateProvider
                    .state('apply.detail.' + prefix + 'staffEnter', {
                        url: '/' + prefix + 'staffEnter',
                        templateUrl: 'src/module/apply/detail/offerInfos/tpl.html',
                        controller: 'applyDetailOfferInfosCtrl'
                    })
                    .state('apply.detail.' + prefix + 'leave', {
                        url: '/' + prefix + 'leave',
                        templateUrl: 'src/module/apply/detail/leave/tpl.html',
                        controller: 'applyDetailLeaveCtrl'
                    })
                    .state('apply.detail.' + prefix + 'multiple', {
                        url: '/' + prefix + 'multiple',
                        templateUrl: 'src/module/apply/detail/infos/tpl.html',
                        controller: 'applyDetailInfosCtrl'
                    })
                    .state('apply.detail.' + prefix + 'salary', {
                        url: '/' + prefix + 'salary',
                        templateUrl: 'src/module/apply/detail/infos/tpl.html',
                        controller: 'applyDetailInfosCtrl'
                    })
                    .state('apply.detail.' + prefix + 'structure', {
                        url: '/' + prefix + 'structure',
                        templateUrl: 'src/module/apply/detail/infos/tpl.html',
                        controller: 'applyDetailInfosCtrl'
                    })
                    .state('apply.detail.' + prefix + 'transFullMember', {
                        url: '/' + prefix + 'transFullMember',
                        templateUrl: 'src/module/apply/detail/transFullMember/tpl.html',
                        controller: 'applyTransFullMemberCtrl'
                    })
                    .state('apply.detail.' + prefix + 'offerChange', {
                        url: '/' + prefix + 'offerChange',
                        templateUrl: 'src/module/apply/detail/offerChange/tpl.html',
                        controller: 'applyDetailOfferChangeCtrl'
                    })
                    .state('apply.detail.' + prefix + 'offerChange.offerInfo', {
                        url: '/' + prefix + 'offerInfo',
                        templateUrl: 'src/module/apply/detail/offerInfos/tpl.html',
                        controller: 'applyDetailOfferInfosCtrl'
                    })
                    .state('apply.detail.' + prefix + 'workTarget', {
                        url: '/' + prefix + 'workTarget',
                        templateUrl: 'src/module/apply/detail/workTarget/tpl.html',
                        controller: 'applyDetailWorkTargetCtrl'
                    })
                    .state('apply.detail.' + prefix  + 'formalApply', {
                        url: '/' + prefix + 'formalApply',
                        templateUrl: 'src/module/apply/detail/formalApply/tpl.html',
                        controller: 'applyDetailFormalApplyCtrl'
                    })
                    .state('apply.detail.' + prefix + 'agentEnter', {
                        url: '/' + prefix + 'agentEnter',
                        templateUrl: 'src/module/apply/detail/offerInfos/tpl.html',
                        controller: 'applyDetailOfferInfosCtrl'
                    })
                    .state('apply.detail.' + prefix + 'agentRejoin', {
                        url: '/' + prefix + 'agentRejoin',
                        templateUrl: 'src/module/apply/detail/offerInfos/tpl.html',
                        controller: 'applyDetailOfferInfosCtrl'
                    })
                    .state('apply.detail.' + prefix + 'agentStructure', {
                        url: '/' + prefix + 'agentStructure',
                        templateUrl: 'src/module/apply/detail/infos/tpl.html',
                        controller: 'applyDetailInfosCtrl'
                    })
                    .state('apply.detail.' + prefix + 'agentLeave', {
                        url: '/' + prefix + 'agentLeave',
                        templateUrl: 'src/module/apply/detail/leave/tpl.html',
                        controller: 'applyDetailLeaveCtrl'
                    })
            }
            /**
             * 添加子tab的name
             * @param tabName
             */
            function createSubTabState(tabName) {
                var subTabs = ['all', 'staffEnter', 'leave', 'rejoin', 'workInfo',
                    'structure', 'transFullMember', 'multiple', 'workTarget',
                    'formalApply', 'agentEnter', 'agentRejoin', 'agentStructure',
                    'agentLeave'];
                for (var i = 0, val; val = subTabs[i++];) {
                    $stateProvider
                        .state('apply.list.' + tabName + '.' + val, {
                            url: '/' + val,
                            templateUrl: 'src/module/apply/list/table/tpl.html',
                            controller: 'applyListTableCtrl'
                        });
                }
            }

        }]);
});