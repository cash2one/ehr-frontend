/**
 * @file 工具方法
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function(require) {
    var app = require('./app');
    require('./initInfo/controller');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    app.factory('hrOptUtil', ['$modal', 'authUtil', '$q', 'hrRequest', function($modal, authUtil, $q, hrRequest) {
        return {

            /**
             * 详情
             * @param url
             */
            viewDetail: function(url, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/hr/opt/detail/tpl.html',
                    controller: 'hrOptDetailController',
                    windowClass: 'xxx-dialog',
                    resolve: {
                        url: function() {
                            return url;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },
            /**
             * 试用期员工试用期变更
             * @param number
             * @param closedCallback
             */
            changeProbation: function(number, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/apply/opt/changeProbation/tpl.html',
                    controller: 'applyChangeProbation',
                    windowClass: 'xx-dialog',
                    resolve: {
                        number: function() {
                            return number;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },

            /**
             * 试用期工作目标
             * @param number
             * @param closedCallback
             */
            writeWorkTarget: function(number, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/apply/opt/workTarget/tpl.html',
                    controller: 'applyOptWorkTargetCtrl',
                    windowClass: 'xx-dialog',
                    resolve: {
                        number: function() {
                            return number;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },

            /**
             * 试用期转正申请
             * @param number
             * @param closedCallback
             */
            formalApply: function(number, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/apply/opt/formalApply/tpl.html',
                    controller: 'applyOptFormalApplyCtrl',
                    windowClass: 'xx-dialog',
                    resolve: {
                        number: function() {
                            return number;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },



            /**
             * 劳务实习转正式员工
             * @param number
             * @param closedCallback
             */
            transFullTime: function(number, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/apply/opt/transFullTime/tpl.html',
                    controller: 'applyOptTransFullTime',
                    windowClass: 'xx-dialog',
                    resolve: {
                        number: function() {
                            return number;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },

            /**
             * 再入职查询
             * @param number
             * @param closedCallback
             */
            rejoin: function(closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/hr/opt/rejoin/tpl.html',
                    controller: 'hrOptRejoinController',
                    backdrop: 'static'
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },

            /**
             * 组织架构变更
             * @param number
             * @param closedCallback
             */
            changeStructure: function(number, isFromHRBP, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/apply/opt/changeStructure/tpl.html',
                    controller: 'applyOptChangeStructureCtrl',
                    windowClass: 'xx-dialog',
                    resolve: {
                        number: function() {
                            return number;
                        },
                        isFromHRBP: function() {
                            return isFromHRBP;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },

            /**
             * 修改薪酬岗位
             * @param number
             * @param closedCallback
             */
            changeSalary: function(number, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/apply/opt/changeSalary/tpl.html',
                    controller: 'applyOptChangeSalaryCtrl',
                    windowClass: 'xx-dialog',
                    resolve: {
                        number: function() {
                            return number;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },

            /**
             * 离职
             * @param number
             * @param closedCallback
             */
            leave: function(number, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/apply/opt/leave/tpl.html',
                    controller: 'applyOptLeaveCtrl',
                    windowClass: 'xx-dialog',
                    resolve: {
                        number: function() {
                            return number;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },

            /**
             * 综合审批单
             * @param number
             * @param closedCallback
             */
            multipleChange: function(number, isFromHRBP, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/apply/opt/multiple/tpl.html',
                    controller: 'applyOptMultipleCtrl',
                    windowClass: 'xx-dialog',
                    resolve: {
                        number: function() {
                            return number;
                        },
                        isFromHRBP: function() {
                            return isFromHRBP;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },

            /**
             * 候选人放弃
             * @param {Object} params
             */
            desertCondidate: function(number, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/hr/opt/desertCandidate/tpl.html',
                    controller: 'hrDesertCondidateCtrl',
                    resolve: {
                        number: function() {
                            return number;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },

            /**
             * 上传头像
             * @param number
             * @param closedCallback
             */
            uploadHeadImg: function(number, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/hr/opt/uploadHeadImg/tpl.html',
                    controller: 'hrOptUploadHeadImgController',
                    resolve: {
                        number: function() {
                            return number;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },

            /**
             * 验证密码
             * @param number
             * @param closedCallback
             */
            validatePassword: function(number, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/hr/opt/validatePassword/tpl.html',
                    controller: 'hrOptValidatePasswordCtrl',
                    resolve: {
                        number: function() {
                            return number;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },
            modMobile: function(number, password, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/hr/opt/modMobile/tpl.html',
                    controller: 'hrOptModMobileCtrl',
                    resolve: {
                        number: function() {
                            return number;
                        },
                        password: function() {
                            return password;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },

            /**
             * 应发工资其它修改
             * @param item
             * @param closedCallback
             */
            salaryOtherView: function(item, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/hr/opt/salaryOther/tpl.html',
                    controller: 'hrOptSalaryOtherCtrl',
                    size: 'lg',
                    resolve: {
                        item: function() {
                            return item;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },


            /**
             * 五险修改
             * @param item
             * @param closedCallback
             */
            fiveInsuranceView: function(item, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/hr/opt/modFiveInsurance/tpl.html',
                    controller: 'hrOptModFiveInsuranceCtrl',
                    size: 'lg',
                    resolve: {
                        item: function() {
                            return item;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },
            fiveInsuranceComView: function(item, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/hr/opt/modFiveInsuranceCom/tpl.html',
                    controller: 'hrOptModFiveInsuranceComCtrl',
                    size: 'lg',
                    resolve: {
                        item: function() {
                            return item;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },

            salaryDetailView: function(item, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/hr/opt/modSalaryDetail/tpl.html',
                    controller: 'hrOptModSalaryDetailCtrl',
                    resolve: {
                        item: function() {
                            return item;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },


            /**
             * 添加临时卡
             * @param item
             * @param closedCallback
             */
            tempCardAdd: function(closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/hr/opt/tempCardAdd/tpl.html',
                    controller: 'hrOptTempCardAddCtrl'
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },

            /**
             * 归还临时卡
             * @param {Object} item
             * @param {Function} closedCallback
             */
            tempCardReturn: function(item, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/hr/opt/tempCardReturn/tpl.html',
                    controller: 'hrOptTempCardReturnCtrl',
                    resolve: {
                        item: function() {
                            return item;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },

            /**
             * 删除临时卡
             * @param {Object} item
             * @param {Function} closedCallback
             */
            tempCardDel: function(item, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/hr/opt/tempCardDel/tpl.html',
                    controller: 'hrOptTempCardDelCtrl',
                    resolve: {
                        item: function() {
                            return item;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },

            /**
             * 借出临时卡
             * @param {Object} item
             * @param {Function} closedCallback
             */
            tempCardBorrow: function(item, closedCallback) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/hr/opt/tempCardBorrow/tpl.html',
                    controller: 'hrOptTempCardBorrowCtrl',
                    resolve: {
                        item: function() {
                            return item;
                        }
                    }
                });
                // 窗口关闭
                dialog.result.then(function() {}, function(data) {
                    closedCallback(data);
                });
            },

            /**
            * 预览offer
            * @param {Object} item
            */
            showOfferDetail: function(data) {
                var dialog = $modal.open({
                    templateUrl: 'src/module/hr/opt/modOfferDetail/tpl.html',
                    controller: 'hrOptOfferDetailCtrl',
                    resolve: {
                        data: function() {
                            return data;
                        }
                    }
                });
            }
        }
    }]);
});