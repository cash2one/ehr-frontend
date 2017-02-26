/**
 * @file 等级信息
 * @author yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('module/config');
    app.directive('levelInfo', ['ajaxService', 'adminRequest',
        function (ajaxService, adminRequest) {
            return {
                restrict: 'EA',
                scope: {
                    options: '='
                },
                require: '?ngModel',
                templateUrl: 'src/module/admin/directive/levelInfo/tpl.html',
                replace: false,
                compile: function ($scope, elem, attrs, ngModel) {

                    return {
                        pre: function ($scope, elem, attrs) {
                            var formName = 'levelForm';
                            $scope.inputOptions = {
                                level: {
                                    required: true,
                                    displayName: '等级',
                                    name: 'level',
                                    formName: formName,
                                    maxLength: 10,
                                    placeholder: '少于10个字'
                                },
                                levelName: {
                                    required: true,
                                    displayName: '等级名称',
                                    name: 'levelName',
                                    formName: formName,
                                    maxLength: 30,
                                    placeholder: '少于30个字'
                                }
                            };
                        },
                        post: function ($scope, elem, attrs) {
                            $scope.emptyValue = config.EMPTY_VALUE;

                            /**
                             * 删除
                             * @returns {*}
                             */
                            $scope.onDel = function () {
                                confirm('确认删除该等级吗？', function () {
                                    adminRequest.delLevel({
                                        id: $scope.options.id
                                    }).then(function (res) {
                                        info('删除成功');
                                        $(elem).html('');
                                    });
                                })
                            };

                            /**
                             * 编辑保存
                             * @returns {*}
                             */
                            $scope.onEditSave = function (form) {
                                form.$submitted = true;
                                if (!form.$valid) {
                                    return;
                                }
                                var data = {
                                    id: $scope.editInfo.id,
                                    level: $scope.editInfo.level,
                                    levelName: $scope.editInfo.levelName
                                };
                                adminRequest.modLevel(data).then(function (res) {
                                    info('修改成功');
                                    $.extend(true, $scope.options, data);
                                    $scope.editing = false;
                                });
                            };

                            /**
                             * 编辑
                             * @returns {*}
                             */
                            $scope.onEdit = function () {
                                $scope.editing = true;
                                initEditInfo();
                            };

                            /**
                             * 取消编辑
                             */
                            $scope.onCancelEdit = function () {
                                $scope.editing = false;
                                clearInfo();
                            };

                            /**
                             * 初始editInfo
                             */
                            function initEditInfo() {
                                $scope.editInfo = $.extend(
                                    true,
                                    $scope.editInfo,
                                    $scope.options);
                            }

                            /**
                             * 清楚info
                             */
                            function clearInfo() {
                                $scope.editInfo = {
                                    level: undefined,
                                    levelName: undefined
                                }
                            }
                        }
                    }
                }
            };
        }])
});
