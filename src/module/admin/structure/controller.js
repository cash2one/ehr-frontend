/**
 * @file 组织结构变更
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    app.controller('structureCtrl', ['$scope', '$stateParams', 'util', 'adminRequest', 'hrRequest', '$modal', 'adminUtil',
        function ($scope, $stateParams, util, adminRequest, hrRequest, $modal, adminUtil) {

            $scope.treeData = [];
            $scope.expandedNodes = [];
            $scope.treeOptions = {
                injectClasses: {
                    li: 'node-header'
                },
                allowDeselect: false
            };
            $scope.hasParentNode = false;


            /**
             * 查看信息
             * @param node
             */
            $scope.viewNode = function (node) {

            };

            /**
             * 添加结点
             * @param node
             */
            $scope.addNode = function (node) {
                adminUtil.addStructure(node.id, function (res) {
                    if (res.hadSuccess) {
                        $scope.getStructureList();
                    }
                });
            };

            /**
             * 编辑结点
             * @param node
             */
            $scope.editNode = function (node) {
                adminUtil.editStructure(node.id, function (res) {
                    if (res.hadSuccess) {
                        $scope.getStructureList();
                        $scope.getNodeInfo($scope.selectedNode.id);
                    }
                });
            };

            $scope.delNode = function (node) {
                if (node.isKeyNode) {
                    alert('结算结点不能隐藏，如需隐藏，请先设置为非结算结点');
                    return;
                }
                confirm('确认要将该节点设置为隐藏吗？', function () {
                    adminRequest.delStucture({
                        number: node.id
                    }).then(function () {
                        info('设置成功');
                        $scope.getStructureList();
                        /*$scope.getNodeInfo($scope.selectedNode.id);*/
                    });
                });
            };

            $scope.enableNode = function (node) {
                confirm('确认要将该节点恢复使用吗？', function () {
                    adminRequest.enableStucture({
                        number: node.id
                    }).then(function () {
                        info('设置成功');
                        $scope.getStructureList();
                        /*$scope.getNodeInfo($scope.selectedNode.id);*/
                    });
                });
            };

            /**
             * 选择结点
             * @param node
             */
            $scope.onNodeSelect = function (node) {
                $scope.getNodeInfo(node.id);
                if (node.id == config.STRUCTURE_ROOT_ID) {
                    $scope.hasParentNode = false;
                } else {
                    $scope.hasParentNode = true;
                }
            };

            /**
             * 获取结点的信息
             * @param nodeId
             */
            $scope.getNodeInfo = function (nodeId) {
                adminRequest.getStuctureInfo({
                    id: nodeId
                }).then(function (res) {
                    $scope.info = res.data;
                });
            };

            /**
             * 取组织架构
             */
            $scope.getStructureList = function () {
                adminRequest.getStructure().then(function (res) {
                    $scope.treeData = util.getTreeData(res.data);
                    if (!$scope.selectedNode) {
                        $scope.selectedNode = $scope.treeData[0];
                        $scope.getNodeInfo($scope.selectedNode.id);
                        initExpanedNodes();
                    }
                });
            };

            $scope.getStructureList();

            // 去掉树形最左面的线
            setTimeout(function () {
                $('treecontrol').find('ul').find('li').eq(0).css({
                    'border-left': '0px'
                });
            }, 300)

            /**
             * 初始展开的节点
             */
            function initExpanedNodes() {
                // 默认展开到三级节点
                $scope.expandedNodes = util.merge([$scope.selectedNode], []);
                $scope.expandedNodes = util.merge([$scope.selectedNode],
                    getChildNodeItems($scope.selectedNode));
            }

            /**
             * 获取第一级子节点的值
             * @param structureData
             * @param nodeItem
             * @returns {Array}
             */
            function getChildNodeItems(item) {
                var children = item.children;
                var res = [];
                if (children) {
                    for (var i = 0, item; item = children[i++];) {
                        res.push(item);
                    }
                }
                return res;
            }

            $(window).scroll(function () {
                var top = $(window).scrollTop();
                if (top >= 110) {
                    $('#structure-info').css({
                        position: 'fixed',
                        top: '5px',
                        right: '33px',
                        bottom: 0,
                        overflow: 'auto'
                    })
                } else {
                    $('#structure-info').css({
                        position: 'static'
                    })
                }
            });
        }
    ]);
})