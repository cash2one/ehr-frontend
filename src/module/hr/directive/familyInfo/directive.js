/**
 * @file 工作信息
 * @author yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../../app');
    var config = require('module/config');
    app.directive('familyInfo', ['ajaxService', 'hrRequest',
        function (ajaxService, hrRequest) {
            return {
                restrict: 'EA',
                scope: {
                    options: '='
                },
                require: '?ngModel',
                templateUrl: 'src/module/hr/directive/familyInfo/tpl.html',
                replace: false,
                compile: function ($scope, elem, attrs, ngModel) {

                    return {
                        pre: function ($scope, elem, attrs) {
                            var formName = 'familyForm';
                            $scope.inputOptions = {
                                name: {
                                    required: true,
                                    displayName: '姓名',
                                    name: 'name',
                                    formName: formName,
                                    maxLength: 30,
                                    placeholder: '少于30个字'
                                },
                                title: {
                                    required: true,
                                    displayName: '称谓',
                                    name: 'title',
                                    formName: formName,
                                    maxLength: 30,
                                    placeholder: '少于30个字'
                                },
                                birthday: {
                                    required: false,
                                    displayName: '生日',
                                    name: 'birthday',
                                    formName: formName,
                                    type: 'date',
                                    placeholder: 'YYYY-MM-DD',
                                    filter: 'dateFormat'
                                },
                                company: {
                                    required: false,
                                    displayName: '单位',
                                    name: 'company',
                                    formName: formName,
                                    maxLength: 30,
                                    placeholder: '少于30个字'
                                },
                                position: {
                                    required: false,
                                    displayName: '职位',
                                    name: 'position',
                                    formName: formName,
                                    maxLength: 30,
                                    placeholder: '少于30个字'
                                },
                                mobile: {
                                    required: false,
                                    displayName: '联系电话',
                                    maxLength: 15,
                                    name: 'mobile',
                                    formName: formName,
                                    pattern: '\\d*',
                                    placeholder: '少于15个数字'
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
                                confirm('确认删除该条信息吗？', function () {
                                    hrRequest.delFamilyMember({
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
                                    name: $scope.editInfo.name,
                                    title: $scope.editInfo.title,
                                    birthday: $scope.editInfo.birthday && $scope.editInfo.birthday.getTime(),
                                    company: $scope.editInfo.company,
                                    position: $scope.editInfo.position,
                                    mobile: $scope.editInfo.mobile
                                };
                                hrRequest.modFamilyMember(data).then(function (res) {
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
                                $scope.editInfo.birthday = $scope.editInfo.birthday
                                    && new Date($scope.editInfo.birthday);
                            }

                            /**
                             * 清楚info
                             */
                            function clearInfo() {
                                $scope.editInfo = {
                                    name: undefined,
                                    title: undefined,
                                    birthday: undefined,
                                    company: undefined,
                                    position: undefined,
                                    mobile: undefined
                                }
                            }
                        }
                    }
                }
            };
        }])
});
