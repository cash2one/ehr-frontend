/**
 * @file 等级模板配置
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var moment = require('moment');
    require('./mod/controller');
    app.controller('adminLevelControllor', controller);
    controller.$inject = ['$scope', '$stateParams', 'adminRequest', 'hrRequest', '$modal'];
    function controller($scope, $stateParams, adminRequest, hrRequest, $modal) {
        $scope.levelOptions = require('./levelOptions')('levelAddForm');
        $scope.type = 'M';
        $scope.types = [
            {
                key: 'M',
                value: 'M序列'
            },
            {
                key: 'T',
                value: 'T序列'
            },
            {
                key: 'P',
                value: 'P序列'
            },
            {
                key: 'U',
                value: 'U序列'
            },
            {
                key: 'A',
                value: 'A序列'
            }
        ];

        $scope.typeChangeHandler = typeChangeHandler;
        $scope.nameClick = nameClickHandler;
        $scope.modifyClick = modifyClick;
        $scope.add = add;
        $scope.lid = undefined;

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
                    cellTpl: 'src/module/admin/level/tableTpl/name.html'
                },
                {
                    field: 'opt',
                    displayName: '操作',
                    cellTpl: 'src/module/admin/level/tableTpl/opt.html'
                }
            ]
        };


        /**
         * 添加等级相关的逻辑
         */
        $scope.levelAdd = {
            addClick: function () {
                $scope.addingLevel = true;
            },
            onCancel: function () {
                var me = this;
                $scope.addingLevel = false;
                me.clearInfo();
            },
            clearInfo: function () {
                $scope.levelAdd.level = undefined;
                $scope.levelAdd.levelName = undefined;
            },
            onSave: function (form) {
                form.$submitted = true;
                var me = this;
                if (!form.$valid) {
                    return;
                }
                adminRequest.addLevel({
                    type: $scope.type,
                    level: $scope.levelAdd.level,
                    levelName: $scope.levelAdd.levelName,
                    templateId: $scope.tid
                }).then(function (res) {
                    info('添加成功');
                    $scope.addingLevel = false;
                    getLevels();
                    form.$submitted = false;
                    me.clearInfo();
                })
            }
        }

        init();

        function init() {
            getTemplateList();
        }

        /**
         * 模板列表
         */
        function getTemplateList() {
            adminRequest.getLevelTemplate().then(function (res) {
                $scope.tableOptions.data = res.data;
                if (typeof $scope.tid == 'undefined') {
                    var item = res.data[0];
                    $scope.tid = item.id;
                    $scope.curName = item.name;
                    getLevels();
                }
            });
        }


        /**
         * 月份变化
         */
        function typeChangeHandler(val, index) {
            getLevels();
        }


        /**
         * 查询模板等级
         */
        function getLevels() {
            var query = {
                templateId: $scope.tid,
                type: $scope.type
            }
            adminRequest.getLevel(query).then(function (res) {
                $scope.levelList = res.data;
            });
        }


        /**
         * 模板名字点击
         * @param item
         */
        function nameClickHandler(item) {
            $scope.tid = item.id;
            $scope.curName = item.name;
            getLevels();
        }


        /**
         * 修改点击
         */
        function modifyClick(item) {
            var modalInstance = $modal.open({
                templateUrl: 'src/module/admin/level/mod/tpl.html',
                controller: 'levelModCtrl',
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
                    getTemplateList();
                    if ($scope.tid == res.id) {
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
                templateUrl: 'src/module/admin/level/mod/tpl.html',
                controller: 'levelModCtrl',
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
                    getTemplateList();
                }
            });
        }
    }
})
