/**
 * @file 工具方法
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    var moment = require('moment');
    app.factory('util', ['ajaxService', '$rootScope', '$modal',
        function (ajaxService, $rootScope, $modal, $modalInstance) {
            var defautSalaryType = config.SALARY_TYPE[1].id;
            return  {

                /**
                 * 空值无效值的判断
                 * @returns {boolean}
                 */
                isEmpty: function (value) {
                    return angular.isUndefined(value)
                        || value === ''
                        || value === null;
                },


                /**
                 * 重写alert
                 * @param value
                 */
                alert: function (value) {
                    $modal.open({
                        animation: false,
                        templateUrl: 'src/common/service/alert/alert.html',
                        controller: [ '$scope', '$modalInstance', function ($scope, $modalInstance) {
                            $scope.tip = value;
                            /**
                             * 关闭modal
                             */
                            $scope.closeHandler = function () {
                                $modalInstance.dismiss();
                            }
                        }],
                        size: 'sm'
                    });
                },

                /**
                 * 通知
                 * @param value
                 */
                info: function (value) {
                    $modal.open({
                        animation: false,
                        templateUrl: 'src/common/service/info/info.html',
                        controller: [ '$scope', '$modalInstance', '$timeout', function ($scope, $modalInstance, $timeout) {
                            $scope.tip = value;
                            /**
                             * 关闭modal
                             */
                            $scope.closeHandler = function () {
                                $modalInstance.dismiss();
                            }
                            $timeout(function () {
                                $modalInstance.dismiss();
                            }, 1000);
                        }],
                        size: 'sm'
                    });
                },

                /**
                 * 重写confirm
                 * @param value
                 * @param yesCallback 选确定的回调
                 */
                confirm: function (value, yesCallback) {
                    $modal.open({
                        animation: false,
                        templateUrl: 'src/common/service/confirm/confirm.html',
                        controller: [ '$scope', '$modalInstance', function ($scope, $modalInstance) {
                            $scope.tip = value;

                            $scope.saveHandler = function () {
                                $modalInstance.dismiss();
                                yesCallback();
                            }
                            /**
                             * 关闭modal
                             */
                            $scope.closeHandler = function () {
                                $modalInstance.dismiss();
                            }
                        }],
                        size: 'sm'
                    });
                },

                /**
                 * 输出选择框的options选项，根据code和name
                 * @param nameObj
                 * @param hasEmpty 是否有請選擇
                 */
                buildSelectOpitons: function (nameObj, hasEmpty) {
                    var res = [];
                    for (var key in nameObj) {
                        if (nameObj.hasOwnProperty(key)) {
                            res.push({
                                id: +key,
                                name: nameObj[key]
                            })
                        }
                    }
                    if (hasEmpty) {
                        res.unshift(config.EMPTY);
                    }
                    return res;
                },

                /**
                 * 在对象数组中查找满足某个field值的index
                 * @param data
                 * @param field
                 * @param val
                 * @returns {number}
                 */
                findIndexInObjArr: function (data, field, val) {
                    for (var i = 0, item; item = data[i++];) {
                        if (item[field] == val) {
                            return i - 1;
                        }
                    }
                    return -1;
                },


                /**
                 * 在树形机构中，通过id获取结点
                 * @param data
                 * @param id
                 * @returns {*}
                 */
                getObjById: function (data, id) {
                    var res = null;
                    for (var i = 0, item; item = data[i++];) {
                        if (item.id == id) {
                            res = item;
                            break;
                        } else {
                            if (item.children) {
                                var res = this.getObjById(item.children, id);
                                if (res) {
                                    break;
                                }
                            }
                        }
                    }
                    return res;
                },

                /**
                 * 得到tree组件的数据格式,输入为这种平面化的格式
                 * [
                 *{
                 *   id: 1,
                 *  name: '百家互联'
                 *},
                 *{
                 *   id: 2,
                 *  name: '总部',
                 * parendId: 1
                 *}]
                 * @param data
                 */
                getTreeData: function (data) {
                    var data = $.extend(true, [], data);
                    for (var i = 0, item; item = data[i++];) {
                        item.label = item.name;
                        // 根结点
                        if (item.parentId) {
                            var parentItem = this.getObjById(data, item.parentId);
                            if (!parentItem.children) {
                                parentItem.children = []
                            }
                            parentItem.children.push(item);
                            i = i - 1;
                            // 移除该点
                            data.splice(i, 1);
                        }
                    }
                    this.appendNodeLevelAndSort(data);
                    return data;
                },

                /**
                 * 合作伙伴过滤掉百家互联
                 * @param structuraData
                 * @return {[type]} [description]
                 */
                getAgentStructure: function (data) {
                    var data = $.extend(true, [], data);
                    for (var i = 0, item; item = data[0].children[i++];)
                    if (item.label !== '合作伙伴') {
                        data[0].children.splice(i - 1, 1);
                    }
                    return data;
                },

                /**
                 * 获取指定结点的上级结算结点
                 * @param data
                 * @param id
                 * @returns {*}
                 */
                getParentKeyNodeItem: function (data, id) {
                    var item = this.getObjById(data, id);
                    if (item) {
                        var parentId = item.parentId;
                    } else {
                        return undefined;
                    }
                    while (parentId) {
                        if (item.isKeyNode) {
                            return item;
                        }
                        item = this.getObjById(data, parentId);
                        if (item) {
                            parentId = item.parentId;
                        } else {
                            return undefined;
                        }
                    }
                    // 找不到返回根结点
                    return data[0];
                },

                /**
                 * 查找节点的所有父节点
                 * @param data
                 * @param id
                 * @return []
                 */
                getParentIds: function (data, id) {
                    var item = this.getObjById(data, id);
                    if (item) {
                        var parentId = item.parentId;
                    }
                    if (parentId) {
                        return parentId;
                    }

                    return undefined;
                },

                /**
                 * 给节点加level,子节点排序,通过广度遍历
                 */
                appendNodeLevelAndSort: function (data) {
                    var queue = [];
                    var level = 1;
                    data = this.pinyinSort(data, 'name');
                    for (var i = 0, item; item = data[i++];) {
                        item.level = level;
                        queue.push(item);
                    }
                    while (queue.length) {
                        var head = queue.splice(0, 1)[0]; // 出队列
                        var children = head.children;
                        if (children) {
                            children = this.pinyinSort(children, 'name');
                            for (var i = 0, item; item = children[i++];) {
                                item.level = head.level + 1;
                                queue.push(item);
                            }
                        }
                    }
                },

                /**
                 * 过滤结算结点
                 * @param list
                 */
                getSalaryNode: function (list, $scope) {
                    var res = [];
                    var manageNodes = $scope.userInfo.hasAllRoles.salaryHR;
                    for (var i = 0, item; item = list[i++];) {
                        if (item.isKeyNode && ($.inArray(item.id, manageNodes) != -1)) {
                            // if (item.isKeyNode) {
                            res.push(item)
                        }
                    }
                    return res;
                },

                /**
                 * 过滤打卡节点
                 * @param list
                 */
                getPunchCard: function (list) {
                    var res = [];
                    for (var i = 0, item; item = list[i++];) {
                        if (item.isPunchCard) {
                            res.push(item);
                        }
                    }
                    return res;
                },

                /**
                 * 当前用户是否配置为改结点的薪酬hr
                 *
                 * @param nodeId
                 */
                isNodeSalaryHR: function (nodeId) {
                    var manageNodes = $rootScope.userInfo.hasRoles.salaryHR;
                    if ($.inArray(nodeId, manageNodes) != -1) {
                        return true;
                    }
                    return false;
                },

                /**
                 * 是否可以管理该结点的薪酬，
                 * 包含结点的薪酬hr和上级结点的薪酬hr
                 *
                 * @param nodeId
                 * @returns {boolean}
                 */
                canManageNodeSalary: function (nodeId) {
                    var manageNodes = $rootScope.userInfo.hasAllRoles.salaryHR;
                    if ($.inArray(nodeId, manageNodes) != -1) {
                        return true;
                    }
                    return false;
                },

                /**
                 * 从namesuggestion的控件值里面获取username
                 * @param $scope
                 */
                getUsernameFromSuggestion: function (value) {
                    if (!value) {
                        return undefined;
                    }
                    return value.split(',')[1];
                },

                /**
                 * 从namesuggestion的控件值里面获取name
                 * @param $scope
                 */
                getNameFromSuggestion: function (value) {
                    if (!value) {
                        return undefined;
                    }
                    return value.split(',')[0];
                },

                /**
                 * get显示名字
                 * @param userName
                 * @param displayName
                 * @returns {string}
                 */
                getShowUserName: function (userName, displayName) {
                    if (userName && displayName) {
                        return displayName + ',' + userName;
                    } else {
                        if (userName) {
                            return userName;
                        }
                        if (displayName) {
                            return userName;
                        }
                    }
                    return config.EMPTY_VALUE;
                },

                /**
                 * 数组合并去重
                 * @param a
                 * @param b
                 * @returns {*}
                 */
                merge: function (a, b) {
                    var res = $.merge(a, b);
                    return $.unique(res);
                },

                /**
                 * 格式化时间戳
                 * @param {string|number}time
                 */
                formatTime: function (time) {
                    var date = new Date(+time);
                    return date.getFullYear() + '-'
                        + (date.getMonth() + 1) + '-' + date.getDate();
                },

                /**
                 * 校验时间本月的最近7天
                 */
                validateLast7Day: function (fieldName, enterTime) {
                    var input = new Date(enterTime);
                    var now = new Date();
                    var inputDate = input.getDate();
                    var nowDate = now.getDate();
                    var inputMonth = input.getMonth();
                    var nowMonth = now.getMonth();
                    if (inputMonth < nowMonth && input < now) {
                        alert(fieldName + '不能早于当前月份');
                        return false;
                    }
                    if (input < now && (nowDate - inputDate) > 7) {
                        alert(fieldName + '不能早于当前时间7天');
                        return false;
                    }
                    return true;
                },

                /**
                 * 实习劳务不能填的项目改为灰色
                 * @param options
                 * @param forbid
                 * @param $scope
                 */
                forbidFieldOfLabor: function (options, forbid, $scope) {
                    var forbidOfLaborStaff = config.FORBID_OF_LABOR_STAFF;
                    for (var i = 0, val; val = forbidOfLaborStaff[i++];) {
                        if (options[val]) {
                            options[val].forbid = forbid;
                            if (forbid) {
                                if (val == 'trafficSubsidy'
                                    || val == 'mobileSubsidy'
                                    || val == 'probationarySalary') {
                                    $scope[val] = {
                                        inputVal: undefined,
                                        selectVal: defautSalaryType
                                    };
                                } else {
                                    $scope[val] = undefined;
                                }
                            }
                        }
                    }
                },



                /**
                 * 转正员工不能填的项目灰色
                 * @param options
                 * @param forbid
                 * @param $scope
                 */
                forbidFieldOfRegular: function (options, forbid, $scope) {
                    var forbidFields = config.FORBID_OF_REGULAR_STAFF;
                    for (var i = 0, val; val = forbidFields[i++];) {
                        if (options[val]) {
                            options[val].forbid = forbid;
                            if (forbid) {
                                if (val == 'probationarySalary') {
                                    $scope[val] = {
                                        inputVal: undefined,
                                        selectVal: defautSalaryType
                                    };
                                } else {
                                    $scope[val] = undefined;
                                }
                            }
                        }
                    }
                },

                /**
                 * 默认提示的社保缴纳金额
                 */
                setDefaultSocialBase: function (param, socialSecurityCityInfo, $scope) {
                    var param = param || {};
                    var info = socialSecurityCityInfo;

                    function setSocialVals(val, fieldName) {
                        if (val > info[fieldName + 'Max']) {
                            $scope[fieldName + 'Base'] = info[fieldName + 'Max'];
                        } else if (val < info[fieldName + 'Min']) {
                            $scope[fieldName + 'Base'] = info[fieldName + 'Min'];
                        } else {
                            $scope[fieldName + 'Base'] = val;
                        }
                    }

                    if (info.socialSecurityBySalary) {
                        var val = typeof param.salary == 'undefined'
                            ? +$scope.probationarySalary.inputVal
                            : +param.salary;
                        setSocialVals(val, 'socialSecurity');
                        setSocialVals(val, 'endow');
                        setSocialVals(val, 'medical');
                        setSocialVals(val, 'unemploy');
                        setSocialVals(val, 'injury');
                        setSocialVals(val, 'maternity');
                        return;
                    }
                    $scope.socialSecurityBase = info.socialSecurityDefault || 0;
                    $scope.endowBase = info.socialSecurityDefault || 0;
                    $scope.medicalBase = info.socialSecurityDefault || 0;
                    $scope.unemployBase = info.socialSecurityDefault || 0;
                    $scope.injuryBase = info.socialSecurityDefault || 0;
                    $scope.maternityBase = info.socialSecurityDefault || 0;
                },

                /**
                 * 默认提示的公积金缴纳金额
                 */
                setDefaultHouseBase: function (param, socialSecurityCityInfo, $scope) {
                    var param = param || {};
                    var info = socialSecurityCityInfo;
                    if (info.houseFundBySalary) {
                        var val = typeof param.salary == 'undefined'
                            ? +$scope.probationarySalary.inputVal
                            : +param.salary;
                        if (val > info.houseFundMax) {
                            $scope.houseFundBase = info.houseFundMax;
                        } else if (val < info.houseFundMin) {
                            $scope.houseFundBase = info.houseFundMin;
                        } else {
                            $scope.houseFundBase = val;
                        }
                        return;
                    }
                    $scope.houseFundBase = info.houseFundDefault;
                },

                /**
                 * 校验上下限制
                 * @param dataQuery
                 * @param socialSecurityCityInfo
                 * @returns {boolean}
                 */
                validateSocialAndHouseFundBase: function (dataQuery, socialSecurityCityInfo) {
                    function validate(dataQuery, fieldName, displayName) {
                        var max = socialSecurityCityInfo[fieldName + 'Max'];
                        var min = socialSecurityCityInfo[fieldName + 'Min'];
                        var value = dataQuery[fieldName + 'Base'];
                        if (value > max) {
                            alert(displayName + '缴纳基数须小于该城市缴纳上限' + max + '元');
                            return false;
                        }
                        if (value < min) {
                            alert(displayName + '缴纳基数须大于该城市缴纳下限'
                                + min + '元');
                            return false;
                        }
                        return true;
                    }

                    var needFiveBase = socialSecurityCityInfo.needFiveBase;

                    if (!validate(dataQuery, 'socialSecurity', '社保')) {
                        return false;
                    }
                    if (!validate(dataQuery, 'houseFund', '公积金')) {
                        return false;
                    }
                    if (needFiveBase && !validate(dataQuery, 'endow', '养老保险')) {
                        return false;
                    }
                    if (needFiveBase && !validate(dataQuery, 'unemploy', '失业保险')) {
                        return false;
                    }
                    if (needFiveBase && !validate(dataQuery, 'medical', '医疗保险')) {
                        return false;
                    }
                    if (needFiveBase && !validate(dataQuery, 'injury', '工伤保险')) {
                        return false;
                    }
                    if (needFiveBase && !validate(dataQuery, 'maternity', '生育保险')) {
                        return false;
                    }
                    return true;
                },

                /**
                 * 距离现在有多少天
                 * @param date
                 */
                diffDaysFromNow: function (date) {
                    var nowTime = moment();
                    var executeTime = moment(date.getTime());
                    return executeTime.diff(nowTime, 'days');
                },

                /**
                 * 输入为空
                 *
                 * @param val
                 */
                inputEmpty: function (val) {
                    if (typeof val == 'undefined' || val === '') {
                        return true;
                    }
                    return false;
                },
                /**
                 * 转为整数undefined变为0
                 *
                 * @param val
                 */
                getInputInt: function (val) {
                    return typeof val == 'undefined' ? 0 : +val;
                },

                /**
                 * 小数处理 四舍五入
                 *
                 * @param {number|string} val 待处理值
                 * @returns {string|*}
                 */
                fix: function (val) {
                    //return +val.toFixed(2);
                    return this.toFixed(+val, 2);
                },

                /**
                 * fixed方法修正
                 *
                 * @param {number} number 待处理的数
                 * @param {number} precision 精度
                 * @returns {number}
                 */
                toFixed: function (number, precision) {
                    var toString = '' + number;
                    var dotNumber = toString.match(/\.\d*/g);
                    if (dotNumber) {
                        if (dotNumber[0].slice(1).length <= precision) {
                            return number;
                        }
                    } else {
                        return number;
                    }

                    var str = Math.abs(number).toString(),
                        negative = number < 0,
                        lastNumber, mult;
                    str = str.substr(0, str.indexOf('.') + precision + 2);
                    lastNumber = str.charAt(str.length - 1);
                    str = str.substr(0, str.length - 1);
                    if (lastNumber >= 5) {
                        mult = Math.pow(10, str.length - str.indexOf('.') - 1);
                        str = (+str + 1 / mult).toFixed(precision);
                    }
                    return str * (negative ? -1 : 1);
                },

                /**
                 * 组织架构名字从某一个架构开始截断
                 * @param {string} structureName 原来的structureName
                 * @param {string} cutStructureName 从哪里开始匹配截断
                 */
                getShortStructureName: function (structureName, cutStructureName) {
                    var index = structureName.indexOf(cutStructureName);
                    var res = '';
                    if (index != -1) {
                        res = structureName.slice(index + cutStructureName.length + 1);
                    } else {
                        res = structureName;
                    }
                    if (res == '') {
                        res = structureName;
                    }
                    return res;
                },

                /**
                 * 按拼音排序
                 * @param {Array} arr 数组
                 * @param {string} field  数组元素为对象的时候，指定要排序的字段
                 */
                pinyinSort: function (arr, field) {
                    if (!field) {
                        return arr.sort(function (param1, param2) {
                            return param1.localeCompare(param2);
                        });
                    }
                    return arr.sort(function (param1, param2) {
                        return param1[field].localeCompare(param2[field]);
                    });
                }
            }
        }]);
});
