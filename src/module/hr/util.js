/**
 * @file 工具方法
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('./app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var nameConfig = require('module/nameConfig');
    var hrConfig = require('./config');
    app.factory('hrUtil', ['$modal', 'authUtil', '$q', 'hrRequest', 'util', '$state', 'bigDecimal',
        function ($modal, authUtil, $q, hrRequest, util, $state, bigDecimal) {
            var defautSalaryType = config.SALARY_TYPE[1].id;
            var addFun = bigDecimal.add;
            var minusFun = bigDecimal.minus;
            var multiplyFun = bigDecimal.multiply;
            var divideFun = bigDecimal.div;
            return  {
                /**
                 * 显示初始化信息
                 * @param {Object} params
                 */
                showInitInfo: function (number) {
                    $modal.open({
                        templateUrl: 'src/module/hr/initInfo/tpl.html',
                        controller: 'hrInitInfoCtrl',
                        resolve: {
                            number: function () {
                                return number;
                            }
                        }
                    });
                },
                showAssetAddInfo: function (item, closedCallback) {
                    var dialog = $modal.open({
                        templateUrl: 'src/module/hr/opt/addAssetId/tpl.html',
                        controller: 'hrOptAddAssetIdCtrl',
                        resolve: {
                            item: function () {
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
                 * 组合薪酬信息，给后端传值用
                 * @param controlValue
                 * @returns {*}
                 */
                getSalary: function (controlValue) {
                    if (typeof controlValue.inputVal == 'undefined') {
                        return undefined;
                    }
                    return {
                        value: controlValue.inputVal,
                        salaryType: controlValue.selectVal
                    }
                },

                /**
                 * 组合工资信息
                 */
                transSalaryInfo: function (salary) {
                    return {
                        inputVal: salary.value,
                        selectVal: salary.salaryType || defautSalaryType
                    }
                },

                /**
                 * 获取查询的字符串
                 */
                getObjectQueryString: function (obj) {
                    var res = [];
                    for (var key in obj) {
                        if (key == 'pageDto') {
                            continue;
                        }
                        if (obj.hasOwnProperty(key) && obj[key]) {
                            if (obj[key]instanceof Date) {
                                res.push(key + '=' + obj[key].getTime());
                            } else {
                                res.push(key + '=' + obj[key]);
                            }
                        }
                    }
                    return res.join('&');
                },

                /**
                 * 获取月的第一天
                 */
                getFirstDayOfMonth: function () {
                    var now = new Date();
                    var year = now.getFullYear();
                    var month = now.getMonth() + 1;
                    return new Date(year + '-' + month + '-' + '01');
                },
                /**
                 * 编辑基本信息
                 */
                canEditBaseInfo: function () {
                    if (authUtil.isHRBP()) {
                        return true;
                    }
                    return false;
                },

                /**
                 * 编辑工作信息
                 */
                canEditWorkInfo: function () {
                    if (authUtil.isHRBP()) {
                        return true;
                    }
                    return false;
                },

                /**
                 * 编辑工资信息
                 */
                canEditSalaryInfo: function () {
                    if (authUtil.isHRBP()) {
                        return true;
                    }
                    return false;
                },

                /**
                 * 编辑隐私信息
                 */
                canEditSecretInfo: function () {
                    if (authUtil.isHRBP()
                        || authUtil.isRelationshipHR()
                        ) {
                        return true;
                    }
                    return false;
                },

                /**
                 * 编辑离职信息
                 */
                canEditLeaveInfo: function () {
                    if (authUtil.isHRBP()
                        || authUtil.isRelationshipHR()
                        ) {
                        return true;
                    }
                    return false;
                },

                /**
                 * 编辑基本信息
                 */
                canReadBaseInfo: function () {
                    if (authUtil.isHRBP()
                        || authUtil.isRelationshipHR()
                        || authUtil.isSalaryHR()
                        || authUtil.isTrainingHR()
                        ) {
                        return true;
                    }
                    return false;
                },

                /**
                 * 查看工作信息
                 */
                canReadChangeInfo: function () {
                    if (authUtil.isHRBP()
                        || authUtil.isRelationshipHR()
                        || authUtil.isSalaryHR()
                        || authUtil.isTrainingHR()
                        ) {
                        return true;
                    }
                    return false;
                },

                /**
                 * 查看工作信息
                 */
                canReadWorkInfo: function () {
                    if (authUtil.isHRBP()
                        || authUtil.isRelationshipHR()
                        || authUtil.isSalaryHR()
                        || authUtil.isTrainingHR()
                        ) {
                        return true;
                    }
                    return false;
                },

                /**
                 * 查看工资信息
                 */
                canReadSalaryInfo: function () {
                    if (authUtil.isHRBP()
                        || authUtil.isSalaryHR()
                        ) {
                        return true;
                    }
                    return false;
                },

                /**
                 * 查看隐私信息
                 */
                canReadSecretInfo: function () {
                    if (authUtil.isRelationshipHR()
                        ) {
                        return true;
                    }
                    return false;
                },

                /**
                 * 查看离职信息
                 */
                canReadLeaveInfo: function () {
                    if (authUtil.isHRBP()
                        || authUtil.isRelationshipHR()
                        ) {
                        return true;
                    }
                    return false;
                },
                /**
                 * 设置option为disable
                 * @param option
                 */
                disableOptions: function (option) {
                    for (var key in option) {
                        if (option.hasOwnProperty(key)) {
                            option[key].disable = true;
                        }
                    }
                },

                /**
                 * 设置option为可用
                 * @param option
                 */
                enableOptions: function (option) {
                    for (var key in option) {
                        if (option.hasOwnProperty(key)) {
                            option[key].disable = false;
                        }
                    }
                },

                /**
                 * 在对象数组中，根据id获取指定字段
                 * @param arr
                 */
                getValueByKey: function (arr, id, fieldName) {
                    for (var i = 0, item; item = arr[i++];) {
                        if (item.id == id) {
                            return item[fieldName];
                        }
                    }
                    // 找不到
                    return undefined;
                },

                /**
                 * 判断公司是否是分公司
                 * @param name
                 * @returns {boolean}
                 */
                isBranchCompany: function (name) {
                    if (name.indexOf(hrConfig.BRANCH_COMPANY_FLAG) >= 0) {
                        return true;
                    }
                    return false;
                },

                /**
                 * 必须上传竞业协议
                 */
                needUploadLimitAgreement: function (companyName, level, type, isSelfMod) {
                    if (this.isBranchCompany(companyName)) {
                        var levelNum = level.match(/\d$/);
                        var levelName = level.match(/^[a-zA-Z]/);
                        if (levelName == config.LEVEL_NAME.M) {
                            return true;
                        }
                        if (levelName == config.LEVEL_NAME.A
                            && levelNum > 4
                            ) {
                            return true;
                        }
                        return false;
                    }
                    // 总公司正式员工必须传
                    if (type == codeConfig.TYPE_CODE.REGULAR) {
                        return true;
                    }
                    return false;
                },

                /**
                 * 设置为必填状态
                 * @param option
                 */
                setFieldRequired: function (option, status) {
                    option.required = status;
                },

                /**
                 * 查询commoninfo。。。
                 */
                initCommonInfo: function ($scope) {
                    $scope.staffInfo = $scope.commonInfo;
                    $scope.staffType = $scope.commonInfo.type;
                },


                /**
                 * 员工入职
                 * @param number
                 */
                joinWork: function (number) {
                    var me = this;
                    var defer = $q.defer();
                    confirm('确认该员工入职手续已经办完，可以入职？', function () {
                        hrRequest.modStaffStatus({
                            number: +number,
                            status: codeConfig.STAFF_STATUS_CODE.HAS_JOINED
                        }).then(function (res) {
                            info('入职成功');
                            defer.resolve(res);
                        })
                    })
                    return defer.promise;
                },

                /**
                 * 对于obj类型的数组，得到obj指定field的值的数组
                 * @param arr
                 * @param field
                 */
                getFieldSet: function (arr, field) {
                    var res = [];
                    for (var i = 0, item; item = arr[i++];) {
                        if (item[field]) {
                            res.push(item[field]);
                        }
                    }
                    return res;
                },


                /**
                 * 获取离职原因
                 * @param reason
                 * @param detailReason
                 */
                getLeaveReasonName: function (reason, detailReason) {
                    var reasonChar = nameConfig.LEAVE_REASON[reason] || '';
                    if (reason) {
                        var detailReasonChar = nameConfig.LEAVE_DETAIL_REASON[reason][detailReason] || '';
                    } else {
                        var detailReasonChar = '';
                    }
                    return reasonChar + '-' + detailReasonChar;
                },

                /**
                 * 初始化hr的来源
                 * @param $state
                 */
                initEntryHRType: function ($scope) {
                    if ($state.includes('subordinate.self.salaryInfo')) {
                        $scope.isFromSelf = true;
                    }
                    if ($state.includes('hr.relationshipHR-staffInfo')) {
                        $scope.isFromRelationshipHR = true;
                    }
                    if ($state.includes('hr.businessPartnerHR-staffInfo')) {
                        $scope.canEditBaseInfo = true;
                        $scope.isFromHRBP = true;
                    }
                    if ($state.includes('hr.trainingHR-staffInfo')) {
                        $scope.isFromTrainingHR = true;
                    }
                    if ($state.includes('hr.salaryHR-staffInfo')) {
                        $scope.isFromSalaryHR = true;
                    }
                },

                /**
                * 根据绩效详情数据生成html浮层
                */
                getPerformSalaryHtml: function (data, performSalary) {
                    var tpl= '';
                    for(var i = 0; i<data.length; i++) {
                        var partment = "";
                        var level = "";
                        if (data[i].accountInfo.businessUnit) {
                            partment = nameConfig.BUSINESS_UNIT[data[i].accountInfo.businessUnit];
                        }

                        // 修改之前
                        if (data[i].accountInfo.businessUnit) {
                            partment = nameConfig.BUSINESS_UNIT[data[i].accountInfo.businessUnit];
                            var str = "";
                            var str1 = "";
                            if (data[i].accountInfo.businessUnit == 3) {
                                str = "        <td rowspan=\"4\">牌级佣金:</td>\n" +
                                      "        <td rowspan=\"4\">" + this.performDataHandle(data[i].commissionData.levelCommission) + "</td>\n" ;
                                str1 = "        <td>成交手佣金:</td>\n" +
                                       "        <td>" + this.performDataHandle(data[i].commissionData.receiverCommission) + "</td>\n";
                            } else {
                                str = "        <td rowspan=\"5\">牌级佣金:</td>\n" +
                                      "        <td rowspan=\"5\">" + this.performDataHandle(data[i].commissionData.levelCommission) + "</td>\n" ;
                            }
                        }

                        if (data[i].accountInfo.role == 7) {
                            if (data[i].statData.lastLevel) {
                                level = nameConfig.ACHIEVEMENT_LEVEL[data[i].statData.lastLevel];
                            }
                            tpl += "<table class=\"table table-bordered\">\n" +
                                   "    <tr>\n" +
                                   "        <td>绩效部门:</td>\n" +
                                   "        <td>" + (partment) + "</td>\n" +
                                   str +
                                   "    </tr>\n" +
                                   "    <tr>\n" +
                                   "        <td>上月牌级</td>\n" +
                                   "        <td>" + (level) + "</td>\n" +
                                   "    </tr>\n" +
                                   "    <tr>\n" +
                                   "        <td>新签业绩</td>\n" +
                                   "        <td>"+ this.performDataHandle(data[i].statData.newAchievement) + "</td>\n" +
                                   "    </tr>\n" +
                                   "    <tr>\n" +
                                   "        <td>续签业绩</td>\n" +
                                   "        <td>" + this.performDataHandle(data[i].statData.renewAchievement) + "</td>\n" +
                                   "    </tr>\n" +
                                   "    <tr>\n" +
                                   "        <td>百家云业绩:</td>\n" +
                                   "        <td>" + this.performDataHandle(data[i].statData.cloudAchievement) + "</td>\n" +
                                   str1 +
                                   "    </tr>\n" +
                                   "    <tr>\n" +
                                   "        <td>百家云退款业绩</td>\n" +
                                   "        <td>" + this.performDataHandle(data[i].statData.cloudRefundMoney) + "</td>\n" +
                                   "        <td>百家云佣金:</td>\n" +
                                   "        <td>" + this.performDataHandle(data[i].commissionData.cloudCommission) + "</td>\n" +
                                   "    </tr>\n" +
                                   "    <tr>\n" +
                                   "        <td>退款业绩</td>\n" +
                                   "        <td>" + this.performDataHandle(data[i].statData.refundAchievement) + "</td>\n" +
                                   "        <td>退款佣金:</td>\n" +
                                   "        <td>" + this.performDataHandle(data[i].commissionData.refundCommission) + "</td>\n" +
                                   "    </tr>\n" +
                                   "    <tr>\n" +
                                   "        <td></td>\n" +
                                   "        <td></td>\n" +
                                   "        <td>合计:</td>\n" +
                                   "        <td>￥&nbsp;" + (performSalary).toFixed(2) + "</td>\n" +
                                   "    </tr>\n" +
                                   "</table><br>\n";
                                   ;
                        }
                        else {
                            tpl += "<table class=\"table table-bordered\">\n" +
                                   "    <tr>\n" +
                                   "        <td>绩效部门:</td>\n" +
                                   "        <td>" + (partment) + "</td>\n" +
                                   "        <td>主管佣金:</td>\n" +
                                   "        <td>" + this.performDataHandle(data[i].commissionData.supervisorCommission) + "</td>\n" +
                                   "     </tr>\n";
                            if (data[i].accountInfo.businessUnit == 3) {
                                tpl += "     <tr>\n" +
                                       "        <td>成交手佣金:</td>\n" +
                                       "        <td>" + this.performDataHandle(data[i].commissionData.supervisorReceiverCommission) + "</td>\n" +
                                       "        <td>百家云佣金:</td>\n" +
                                       "        <td>" + this.performDataHandle(data[i].commissionData.cloudCommission) + "</td>\n" +
                                       "     </tr>\n" +
                                       "     <tr>\n" +
                                       "        <td></td>\n" +
                                       "        <td></td>\n" +
                                       "        <td>总佣金:</td>\n" +
                                       "        <td>" + this.performDataHandle(data[i].commissionData.actualSupervisorCommission) + "</td>\n" +
                                       "     </tr>\n";
                            } else {
                                tpl += "     <tr>\n" +
                                       "        <td>百家云佣金:</td>\n" +
                                       "        <td>" + this.performDataHandle(data[i].commissionData.cloudCommission) + "</td>\n" +
                                       "        <td>总佣金:</td>\n" +
                                       "        <td>" + this.performDataHandle(data[i].commissionData.actualSupervisorCommission) + "</td>\n" +
                                       "     </tr>\n";
                            }
                            tpl += "</table><br>\n";
                         }
                    }
                return tpl;
                },

                /**
                 * 绩效显示数据项不存在的处理
                 */
                performDataHandle: function (param) {
                    if (param === 0) {
                        return '￥&nbsp;' + divideFun(param, 100.0).toFixed(2);
                    } else {
                        return param ? ('￥&nbsp;' + divideFun(param, 100.0).toFixed(2)) : '';
                    }
                }
            }
        }]);
});
