/**
 * @file 组织架构选择
 * @author yanlingling
 */
define(function (require) {
    var app = require('../../app');
    var config = require('module/config');
    app.directive('structureSelector', ['adminRequest', 'util', '$rootScope', function (adminRequest, util, $rootScope) {
        return {
            restrict: 'EA',
            scope: {
                /**
                 * @param {Array.<number>} options.manageNodes 可以操作的节点
                 */
                options: '=',
                disable: '=',
                require: '@',
                errorOption: '=',
                name: '@'
            },
            replace: false,
            require: '?ngModel',
            templateUrl: 'src/common/directive/structureSelector/tpl.html',
            compile: function () {
                /**
                 * 找指定id的节点
                 * @param data
                 * @param id
                 * @returns {{}}
                 */
                function findItem(data, id) {
                    var res = {};
                    for (var i = 0, item; item = data[i++];) {
                        if (item.id == id) {
                            res = item;
                            break;
                        } else {
                            if (item.children) {
                                res = findItem(item.children, id);
                                // 找到
                                if (res.id) {
                                    break;
                                }
                            }
                        }
                    }
                    return res;
                }


                /**
                 * 获取父节点的集合
                 * @param structureData
                 * @param nodeItem
                 * @returns {Array}
                 */
                function getParentNodeItems(structureData, nodeItem) {
                    var parentId = nodeItem.parentId;
                    var res = [];
                    while (parentId) {
                        var node = findItem(structureData, parentId);
                        if (node) {
                            res.unshift(node);
                            parentId = node.parentId;
                        } else {
                            break;
                        }
                    }
                    return res;
                }


                /**
                 * 获取子节点的值
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
                            if (item.children) {
                                util.merge(res, getChildNodeItems(item));
                            }
                        }
                    }
                    return res;
                }

                /**
                 * 获取直接下级结点的id
                 */
                function getNextLevelChildNodeId(item) {
                    if (!item) {
                        return [];
                    }
                    var children = item.children;
                    var res = [];
                    if (children) {
                        for (var i = 0, item; item = children[i++];) {
                            res.push(item.id);
                        }
                    }
                    return res;
                }


                return {
                    pre: function ($scope, elem, attrs, ngModel) {
                        $scope.optableNodes = [];
                        $scope.opts = {
                            isSelectable: function (curNode) {
                                var index = util.findIndexInObjArr($scope.optableNodes, 'id', curNode.id);
                                return index != -1;
                            }
                        }
                    },
                    post: function ($scope, elem, attrs, ngModel) {
                        $scope.options = $scope.options || {};
                        $scope.options.manageNodes = $scope.options.manageNodes || [];
                        if ($scope.options && $scope.options.manageNodes) {
                            if (!$scope.options.manageNodes instanceof Array) {
                                console.error('组织架构数的manageNodes必须是数组');
                                return;
                            }
                        }
                        $scope.status = {};
                        $scope.status.isopen = false;

                        $scope.structureData = [];

                        /**
                         * 过滤节点
                         */
                        $scope.nodeFilter = function (node) {
                            var index = util.findIndexInObjArr($scope.visibleNodes, 'id', node.id);
                            return index != -1;
                        }


                        /**
                         * 填充名字
                         */
                        $scope.paintName = function (node) {
                            var nodes = getParentNodeItems($scope.structureData, node);
                            var res = [];
                            for (var i = 0, item; item = nodes[i++];) {
                                res.push(item.label);
                            }
                            res.push(node.label);
                            $scope.selectedNodeName = res.join('-');
                        };

                        /**
                         * ng-model render方法
                         * $viewValue格式为
                         * {
                         *    id:12,
                         *    name : 'name'
                         * }
                         */
                        ngModel.$render = function () {
                            if (ngModel.$viewValue) {
                                var nodeId = ngModel.$viewValue.id;
                                $scope.selectedNode = findItem($scope.structureData, nodeId);
                                $scope.expandedNodes = getParentNodeItems($scope.structureData, $scope.selectedNode);
                                $scope.selectedNodeName = ngModel.$viewValue.name;
                            } else {
                                $scope.selectedNode = undefined;
                                $scope.initExpandedData();
                                $scope.selectedNodeName = undefined;
                            }
                        };

                        /**
                         * 取组织架构
                         */
                        $scope.getStructureList = function () {
                            adminRequest.getStructure({
                                containDisabled: 0
                            }).then(function (res) {
                                var isAgent = $scope.$root.isAgent;
                                $scope.structureData = util.getTreeData(res.data);
                                if ($scope.$root.userInfo.isAgent) {
                                    $scope.structureData = util.getAgentStructure($scope.structureData);
                                }
                                $rootScope.structureData = $scope.structureData;
                                if (ngModel.$viewValue) {
                                    setNodeSelected(ngModel.$viewValue.id);
                                }
                                $scope.initTreeAttribute();
                            });
                        };

                        /**
                         * 初始化树的可选择和可见性
                         */
                        $scope.initTreeAttribute = function () {
                            $scope.initSelectaleData();
                            $scope.initVisibleData();
                            $scope.initExpandedData();
                        }

                        /**
                         * 初始化展开的节点
                         */
                        $scope.initExpandedData = function () {

                            if ($scope.selectedNode && $scope.selectedNode.id) {
                                // 展开选中的点的上级
                                $scope.expandedNodes = getParentNodeItems(
                                    $scope.structureData,
                                    $scope.selectedNode
                                );
                            } else {
                                var expandNodes = [];
                                var optableNodes = [];
                                if ($scope.options.manageNodes
                                    && $scope.options.manageNodes.length) {
                                    optableNodes = $scope.options.manageNodes;
                                } else { // 不设置默认管理第二级结点
                                    optableNodes = getNextLevelChildNodeId($scope.structureData[0]);
                                }
                                // 展开上级结点
                                for (var i = 0, val; val = optableNodes[i++];) {
                                    var node = findItem($scope.structureData, val);
                                    // 展开结点自己
                                    expandNodes.push(node);
                                    util.merge(
                                        expandNodes,
                                        getParentNodeItems($scope.structureData, node)
                                    );
                                }
                                $scope.expandedNodes = expandNodes;
                            }
                        }

                        /**
                         * 可见的节点集合
                         */
                        $scope.initVisibleData = function () {
                            var data = $scope.structureData;
                            var nodes = [];
                            var optableNodes = [];
                            if ($scope.options.manageNodes
                                && $scope.options.manageNodes.length) {
                                optableNodes = $scope.options.manageNodes;
                            } else { // 不设置默认管理第二级结点
                                optableNodes = getNextLevelChildNodeId($scope.structureData[0]);
                            }

                            for (var i = 0, val; val = optableNodes[i++];) {
                                nodes.push(findItem(data, val));
                            }
                            var parentNodes = [];
                            for (var i = 0, item; item = nodes[i++];) {
                                var parent = getParentNodeItems($scope.structureData,
                                    item
                                );
                                util.merge(parentNodes, parent);
                            }
                            $scope.parentNodes = parentNodes;
                            $scope.visibleNodes = util.merge(parentNodes, $scope.childrenNodes);
                        };

                        /**
                         * 可选择的节点集合
                         */
                        $scope.initSelectaleData = function () {
                            var data = $scope.structureData;
                            var nodes = [];
                            var optableNodes = [];
                            if ($scope.options.manageNodes
                                && $scope.options.manageNodes.length) {
                                optableNodes = $scope.options.manageNodes;
                            } else { // 不设置默认管理第二级结点
                                optableNodes = getNextLevelChildNodeId($scope.structureData[0]);
                            }

                            for (var i = 0, val; val = optableNodes[i++];) {
                                nodes.push(findItem(data, val));
                            }
                            var childrenNodes = [];
                            for (var i = 0, item; item = nodes[i++];) {
                                var child = getChildNodeItems(
                                    item
                                );
                                util.merge(childrenNodes, child);
                            }
                            // 管理的节点本身也是可以编辑的
                            util.merge(childrenNodes, nodes);
                            $scope.childrenNodes = childrenNodes;
                            $scope.optableNodes = childrenNodes;
                        };

                        /**
                         * 点击树上的点
                         * @param node
                         */
                        $scope.onSelect = function (node) {
                            $scope.paintName(node);
                            ngModel.$setViewValue({
                                id: node.id,
                                name: $scope.selectedNodeName
                            });
                            $scope.status.isopen = false;
                        }


                        /**
                         * 设置点的选中
                         * @param nodeId
                         */
                        function setNodeSelected(nodeId) {
                            $scope.selectedNode = findItem($scope.structureData, nodeId);
                            $scope.expandedNodes = getParentNodeItems($scope.structureData, $scope.selectedNode);
                            $scope.paintName($scope.selectedNode);
                        };

                        $scope.$watch('options.manageNodes', function (newVal, oldVal) {
                            if (newVal != oldVal) {
                                if ($scope.structureData) {
                                    $scope.initTreeAttribute();
                                }
                            }
                        }, true);

                        $scope.getStructureList();
                    }
                }
            }
        };
    }]);
});
