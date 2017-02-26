/**
 * @file 工资单查询
 *
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var app = require('../app');
    var config = require('module/config');
    var codeConfig = require('module/codeConfig');
    var nameConfig = require('module/nameConfig');
    var hrConfig = require('../config')
    var getColsConfig = require('./colsConfig');
    var moment = require('moment');

    app.controller('hrSalaryListController', hrSalaryListController);

    hrSalaryListController.$inject = [
        '$scope', 'hrRequest', 'util', 'hrOptUtil',
        'adminRequest', 'bigDecimal', 'hrUtil', '$sce'
    ];

    function hrSalaryListController(
        $scope, hrRequest, util, hrOptUtil, adminRequest, bigDecimal, hrUtil, $sce) {


        /**
         * 当前页
         * @type {number}
         */
        $scope.currentPage = 1;
        $scope.query = {};
        // $scope.canEditSalary = false;
        $scope.canEditSalary = true;
        $scope.onlyViewMode = false;
        var queryData = {};
        var changedDataMap = {};
        var daySalaryType = codeConfig.SALARY_TYPE.DAY;
        var typeCode = codeConfig.TYPE_CODE;
        var pageSize = 20;
        var structureName = '';
        var structureInfo = {};

        /**
         * 操作类型
         * @type {{SAVE: number, CONFIRM: number}}
         */
        var OPT_TYPE = {
            SAVE: 1,
            CONFIRM: 2
        }

        var addFun = bigDecimal.add;
        var minusFun = bigDecimal.minus;
        var multiplyFun = bigDecimal.multiply;
        var divideFun = bigDecimal.div;

        $scope.optType = OPT_TYPE;

        init();

        /**
         * 初始
         */
        function init() {
            $scope.onSearch = onSearch;
            $scope.onSave = onSave;
            $scope.onConfirm = onConfirm;
            $scope.onEdit = onEdit;
            $scope.onOtherSalaryClick = onOtherSalaryClick;
            $scope.onBatchSaveClick = onBatchSaveClick;
            $scope.onBatchConfirmClick = onBatchConfirmClick;
            $scope.onSumSocialSecurityPerClick = onSumSocialSecurityPerClick;
            $scope.onSumSocialSecurityComClick = onSumSocialSecurityComClick;
            $scope.onDetailClick = onDetailClick;
            $scope.onStructureChange = onStructureChange;
            var lastMonthStr = moment().add(-1, 'M').format("YYYY-MM");
            $scope.monthMax = lastMonthStr;

            /**
             * 表格配置
             */
            $scope.tableOptions = {
                data: [],
                canSelect: true,
                hasTwoHead: true,
                totalCount: 0,
                cols: getColsConfig($scope),
                pageSize: pageSize,
                onPageChange: function (pageNum) {
                    $scope.currentPage = pageNum;
                    getList();
                },
                selectedItems: [],
                mainScope: $scope,
                bodyScroll: true
            };
            $scope.getList = getList;
            $scope.query.month = new Date(lastMonthStr + ' 00:00:00');
            getStructureList();
        }

        function onSearch() {
            getList();
            getStructureInfo($scope.query.structure);
        }


        /**
         * 数据处理
         * @param data
         * @returns {*}
         */
        function processData(data) {
            for (var i = 0, item; item = data[i++];) {
                item.i = i - 1;
                item.rawRealDay = item.realDay;
                if (item.status == OPT_TYPE.SAVE
                    && $scope.canEditSalary) {
                    item.isEdit = true;
                }
                if (item.staffType != typeCode.REGULAR) {
                    item.noInsurance = true;
                }
                // 由于扣减导致福利工资没有的
                if (item.welfareSalary == 0 &&
                    item.welfareSalaryOri != 0) {
                    item.style = {
                        'background': '#f2dede'
                    };
                }
                item.structureName = util.getShortStructureName(item.structureName, structureName);
                item.staffTypeValue = item.staffTypeValue.replace(/员工/g, '');
                item.foreigner = (item.isForeign != config.ID_CARD_CODE);
                item.realSumAll = util.fix(addFun(item.realSum, item.yearAwardFinal));
                if (!util.isNodeSalaryHR($scope.query.structure)) {
                    //setAllRowReadonly();
                    $scope.onlyViewMode = true;
                } else {
                    $scope.onlyViewMode = false;
                }
            }
            return data;
        };


        /**
         * 获取列表
         */
        function getList() {
            if (!$scope.query.structure) {
                alert('请选择组织架构');
                return;
            }
            if (!$scope.query.month) {
                alert('请输入查询月份');
                return;
            }
            var currentDate = new Date().getDate();
            var currentMonth = new Date().getMonth() + 1;
            var month = $scope.query.month.getMonth() + 1;
            var lastMonth = currentMonth - 1;
            // 1月的上一个月是12
            if (lastMonth == 0) {
                lastMonth = 12;
            }
            if (currentDate > 10) {
                $scope.canEditSalary = false;
            } else if (month == lastMonth) {
                $scope.canEditSalary = true;
            } else {
                $scope.canEditSalary = false;
            }
            var queryData = {
                pageDto: {
                    pageNum: $scope.currentPage || 1,
                    pageSize: pageSize
                },
                structure: $scope.query.structure,
                month: moment($scope.query.month.getTime()).format('YYYY-MM')
            };

            hrRequest.getSalaryList(queryData).then(function (data) {
                $scope.tableOptions.data = processData(data.data);
                $scope.tableOptions.totalCount = (data.pageDto && data.pageDto.count) || 0;
                initOptions();
            });
            $scope.exportUrl = getExportUrl(queryData);
            $scope.exportMealSubsidyListUrl = getMealSubsidyExportUrl(queryData);
            $scope.exportWelfareSalaryListUrl = getWelfareExportUrl(queryData);
        }

        /**
         * 组织架构列表
         */
        function getStructureList() {
            adminRequest.getStructure().then(function (res) {
                $scope.structureList = util.getSalaryNode(res.data, $scope);
                if ($scope.structureList.length) {
                    var id = $scope.structureList[0].id;
                    $scope.query.structure = id;
                    if (!util.isNodeSalaryHR($scope.query.structure)) {
                        //setAllRowReadonly();
                        $scope.onlyViewMode = true;
                    }
                    getStructureInfo(id);
                    structureName = $scope.structureList[0].name;
                    getList();
                }
            });
        }


        /**
         * 保存
         * @param index
         */
        function onSave(index) {
            var item = getItem(index);
            var form = $scope.salaryComputeForm;
            if (!form.$valid) {
                return;
            }
            if (!validateRealSum(item)) {
                return;
            }

            save([item]);
        }


        /**
         * 校验实发工资是够正确
         * @param {Object} item 当行数据
         */
        function validateRealSum(item) {
            if (item.realSumAll < 0) {
                alert('实发工资不能为负数');
                return false;
            }
            return true;
        }

        /**
         * 组织架构发生变化
         * @param {string} val
         */
        function onStructureChange(val) {
            for (var i = 0, item; item = $scope.structureList[i++];) {
                if (item.id == val) {
                    structureName = item.name;
                    break;
                }
            }
        }

        /**
         * 获取组织架构信息
         * @param  {number} id 结点id
         */
        function getStructureInfo(id) {
            adminRequest.getStuctureInfo({
                id: id
            }).then(function (res) {
                structureInfo = res.data;
                if (structureInfo.isPunchCard == codeConfig.PUNCH_CARD.NEED_SUBSIDY_NOT_BY_SALARY) {
                    $scope.mealSubsidyToMealCard = true;
                    $scope.hasMealSubsidyList = true;
                } else {
                    $scope.mealSubsidyToMealCard = false;
                    $scope.hasMealSubsidyList = false;
                }
            });
        }


        /**
         * 批量保存点击
         */
        function onBatchSaveClick() {
            var form = $scope.salaryComputeForm;
            if (!form.$valid) {
                return;
            }
            var selected = $scope.tableOptions.selectedItems;
            var items = getChangedItems(selected, OPT_TYPE.SAVE);
            for (var i = 0, item; item = items[i++];) {
                if (!validateRealSum(item)) {
                    return;
                }
            }
            save(items);
        }

        /**
         * 取出发生变化了的item
         * @param selected
         */
        function getChangedItems(selected, optType) {
            var items = [];
            var tableData = $scope.tableOptions.data;
            for (var i = 0, item; item = selected[i++];) {
                if (changedDataMap[item.number] || item.status != optType) {
                    items.push(item);
                } else {
                    // 没有变化的确认 直接变成确认状态
                    if (optType == OPT_TYPE.CONFIRM) {
                        setRowReadonly(item, true);
                        tableData[item.i].isEdit = false;
                    }
                }
            }
            return items;
        }

        /**
         * 保存
         * @param items
         */
        function save(items) {
            if (!items.length) {
                info('保存成功');
                return;
            }
            doOpt(items, OPT_TYPE.SAVE);
        }

        /**
         * 发送请求
         *
         * @param items
         * @param type
         */
        function doOpt(items, type) {
            var tip = '保存成功';
            if (type == OPT_TYPE.CONFIRM) {
                tip = '确认成功';
            }
            var fields = ['id', 'realDay', 'executeSalary', 'trafficSubsidy',
                'mobileSubsidy', 'mealSubsidy', 'otherSalary',
                'mealPlus', 'recomend', 'houseSubsidy', 'specialReward', 'performExtSalary',
                'performLeaveSalary', 'otherSubSidy', 'sumSalary', 'endowPer', 'unemployPer',
                'medicalPer', 'injuryPer', 'maternityPer', 'sumSocialSecurityPer',
                'personTax', 'houseFundPer', 'sumMinusPer', 'endowCom', 'unemployCom',
                'medicalCom', 'injuryCom', 'maternityCom', 'sumSocialSecurityCom',
                'houseFundCom', 'sumCom', 'detail', 'realSum', 'recommend',
                'otherSubsidy', 'taxFreeSubsidy', 'welfareSalary'];
            var reqestItems = [];
            for (var i = 0, item; item = items[i++];) {
                var obj = {};
                for (var j = 0, val; val = fields[j++];) {
                    obj[val] = item[val];
                }
                reqestItems.push(obj);
            }
            hrRequest.modSalary({
                items: reqestItems,
                optType: type
            }).then(function (res) {
                info(tip);
                var data = $scope.tableOptions.data;
                for (var i = 0, item; item = items[i++];) {
                    var tableItem = data[item.i];
                    if (type == OPT_TYPE.CONFIRM) {
                        setRowReadonly(tableItem, true);
                        tableItem.isEdit = false;
                    }
                    tableItem.status = type;
                }
            });
        }

        /**
         * 设置某行的只读
         *
         * @param {Object} item 行数据
         * @param {boolean} readonly 是否可读
         */
        function setRowReadonly(item, readonly) {
            var i = item.i;
            if (item.executeSalaryOri != 0) {
                $scope['realDayOptions' + i].disable = readonly;
            }
            //$scope['performSalaryOptions' + i].disable = readonly;
            $scope['taxFreeSubsidyOptions' + i].disable = readonly;
            if (!item.noInsurance) {
                $scope['houseFundPerOptions' + i].disable = readonly;
                $scope['houseFundComOptions' + i].disable = readonly;
            }
            // $scope['personTaxOptions' + i].disable = readonly;
        };


        /**
         * 设置所有行为只读
         */
        function setAllRowReadonly(readonly) {
            var items = $scope.tableOptions.data;
            for (var i = 0, item; item = items[i++];) {
                setRowReadonly(item, readonly);
            }
        };

        /**
         * 确认
         * @param index
         */
        function onConfirm(index) {
            var item = getItem(index);
            var form = $scope.salaryComputeForm;
            if (!form.$valid) {
                return;
            }
            if (!validateRealSum(item)) {
                return;
            }
            confirm([item]);
        }

        /**
         * 编辑
         *
         * @param item
         */
        function onEdit(index) {
            var item = getItem(index);
            item.isEdit = true;
            setRowReadonly(item, false);
        }

        /**
         * 批量确认点击
         */
        function onBatchConfirmClick() {
            var form = $scope.salaryComputeForm;
            if (!form.$valid) {
                return;
            }
            var selected = $scope.tableOptions.selectedItems;
            var items = getChangedItems(selected, OPT_TYPE.CONFIRM);
            for (var i = 0, item; item = items[i++];) {
                if (!validateRealSum(item)) {
                    return;
                }
            }
            confirm(items);
        }

        /**
         * 确认
         * @param items
         */
        function confirm(items) {
            if (!items.length) {
                info('成功');
                return;
            }
            doOpt(items, OPT_TYPE.CONFIRM);
        }

        /**
         * 导出的url
         */
        function getExportUrl(data) {
            return 'EXPORT/salary/list.json?' + getGETParam(data);
        }

        /**
         * 获取get格式的参数
         */
        function getGETParam(data) {
            var res = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (key != 'pageDto') {
                        res.push(key + '=' + data[key]);
                    }
                }
            }
            return res.join('&');
        }

        /**
         * 获取餐补导出的url
         */
        function getMealSubsidyExportUrl(data) {
            return 'EXPORT/staff/mealSubsidy.json?' + getGETParam(data);
        }

        /**
         * 导出福利工资的url
         */
        function getWelfareExportUrl(data) {
            return 'EXPORT/salary/welfareSalary.json?' + getGETParam(data);
        }


        /**
         * options
         */
        function initOptions() {
            var confirm = OPT_TYPE.CONFIRM;
            for (var i = 0; i < pageSize; i++) {
                var item = $scope.tableOptions.data[i];
                if (!item) {
                    break;
                }
                if(item.performDetail != '[]' && item.performDetail ) {
                    item.performSalaryHtml =
                    $sce.trustAsHtml(
                        "<div style=\"font-size:10px\" class=\"perform-table\">\n" +
                        hrUtil.getPerformSalaryHtml(JSON.parse(item.performDetail), item.performSalary)
                        + "</div>"
                        );
                }
                if(typeof item.performLeaveSalary != 'undefined') {
                    item.realSumHtml = getRealSumHtml(item.performLeaveSalary);
                }

                $scope['realDayOptions' + i] = {
                    required: true,
                    displayName: '',
                    name: 'realDay' + i,
                    formName: 'salaryComputeForm',
                    placeholder: '',
                    errorDisplayName: '实际出勤天数',
                    pattern: config.BASE_REG_STR,
                    blurHandler: getRealDayChangeHandler(i),
                    disable: (item.status == confirm) || (item.executeSalaryOri == 0) || $scope.onlyViewMode
                };
                $scope['performSalaryOptions' + i] = {
                    required: true,
                    displayName: '',
                    name: 'performSalary' + i,
                    formName: 'salaryComputeForm',
                    placeholder: '',
                    errorDisplayName: '绩效工资',
                    pattern: config.NEGATIVE_BASE_REG_STR,
                    blurHandler: getPerformSalaryChangeHandler(i),
                    //disable: (item.status == confirm) || $scope.onlyViewMode
                    disable: true
                };
                $scope['houseFundPerOptions' + i] = {
                    required: true,
                    displayName: '',
                    name: 'houseFundPer' + i,
                    formName: 'salaryComputeForm',
                    placeholder: '',
                    errorDisplayName: '住房公积金',
                    pattern: config.NEG_SIX_NUMBER_REG,
                    blurHandler: getHouseFundPerChangeHandler(i),
                    disable: (item.status == confirm) || item.noInsurance || $scope.onlyViewMode
                };
                $scope['houseFundComOptions' + i] = {
                    required: true,
                    displayName: '',
                    name: 'houseFundCom' + i,
                    formName: 'salaryComputeForm',
                    placeholder: '',
                    errorDisplayName: '住房公积金',
                    pattern: config.NEG_SIX_NUMBER_REG,
                    blurHandler: getHouseFundComChangeHandler(i),
                    disable: (item.status == confirm) || item.noInsurance || $scope.onlyViewMode
                };
                $scope['taxFreeSubsidyOptions' + i] = {
                    required: true,
                    displayName: '',
                    name: 'taxFreeSubsidy' + i,
                    formName: 'salaryComputeForm',
                    placeholder: '',
                    errorDisplayName: '免税所得',
                    pattern: config.NEGATIVE_BASE_REG_STR,
                    blurHandler: getTaxFreeSubsidyChangeHandler(i),
                    disable: (item.status == confirm) || $scope.onlyViewMode
                };
                $scope['personTaxOptions' + i] = {
                    required: true,
                    displayName: '',
                    name: 'personTax' + i,
                    formName: 'salaryComputeForm',
                    placeholder: '',
                    errorDisplayName: '个人所得税',
                    pattern: config.BASE_REG_STR,
                    blurHandler: getPersonTaxChangeHandler(i),
                    disable: true // 个税说不定什么时候要放开修改，这个逻辑先留着了
                };
            }
        };

        /**
         * 应发工资其它点击
         */
        function onOtherSalaryClick(index) {
            var item = getItem(index);
            hrOptUtil.salaryOtherView(item, function (param) {
                if (param.hasSuccess) {
                    var fieldSet = ['mealPlus', 'recommend', 'houseSubsidy',
                        'specialReward', 'performExtSalary', 'otherSubsidy', 'otherSalary', 'sumSalary'
                    ];
                    for (var i = 0, field; field = fieldSet[i++];) {
                        item[field] = param.item[field];
                    }
                    if (item.executeSalaryType != daySalaryType) {
                        reComputeExecuteSalary(item);
                    }
                    reComputeSumSalary(item);
                    reComputePersonTax(item);
                    reComputeSumMinusPer(item);
                    reComputeRealSum(item);
                    refreshChangedData(item);
                }
            });
        }


        /**
         * 五险总计点击
         * @param item
         */
        function onSumSocialSecurityPerClick(index) {
            var item = getItem(index);
            hrOptUtil.fiveInsuranceView(item, function (param) {
                if (param.hasSuccess) {
                    var fieldSet = ['endowPer', 'unemployPer',
                        'medicalPer', 'injuryPer', 'maternityPer',
                        'sumSocialSecurityPer'
                    ];
                    for (var i = 0, field; field = fieldSet[i++];) {
                        item[field] = param.item[field];
                    }
                    reComputePersonTax(item);
                    reComputeSumMinusPer(item);
                    reComputeRealSum(item);
                    refreshChangedData(item);
                }
            });
        }

        function onSumSocialSecurityComClick(index) {
            var item = getItem(index);
            hrOptUtil.fiveInsuranceComView(item, function (param) {
                if (param.hasSuccess) {
                    var fieldSet = ['endowCom', 'unemployCom',
                        'medicalCom', 'injuryCom', 'maternityCom',
                        'sumSocialSecurityCom'
                    ];
                    for (var i = 0, field; field = fieldSet[i++];) {
                        item[field] = param.item[field];
                    }
                    reComputeSumMinusCom(item);
                    refreshChangedData(item);
                }
            });
        }

        function onDetailClick(index) {
            var item = getItem(index);
            hrOptUtil.salaryDetailView(item, function (param) {
                if (param.hasSuccess) {
                    item.detail = param.item.detail;
                    refreshChangedData(item);
                }
            });
        }

        /**
         * 取单条数据
         * @param index
         * @returns {*}
         */
        function getItem(index) {
            return $scope.tableOptions.data[index]
        }


        /**
         * 实际出勤天数变化处理
         * @param index
         */
        function getRealDayChangeHandler(index) {
            return function (val, scope) {
                var item = getItem(index);
                var oldVal = item.realDay;
                if (util.inputEmpty(val)) {
                    alert('请输入实际出勤天数');
                    return;
                }
                val = +val;
                /*                if (val > item.maxDay) {
                 alert('实际出勤天数应小于最大出勤天数');
                 scope.$parent.$parent.result.value = oldVal;
                 return;
                 }*/
                item.realDay = val;
                if (item.executeSalaryType != daySalaryType) {
                    reComputeExecuteSalary(item, oldVal);
                }
                /*
                item.trafficSubsidy = util.fix(item.trafficSubsidyOri * val / item.maxDay);
                item.mobileSubsidy = util.fix(item.mobileSubsidyOri * val / item.maxDay);
                */
                item.trafficSubsidy = util.fix(item.trafficSubsidy + (item.realDay - oldVal)*item.trafficSubsidyOri/item.maxDay);
                item.mobileSubsidy = util.fix(item.mobileSubsidy + (item.realDay - oldVal)*item.mobileSubsidyOri/item.maxDay);
                item.mealSubsidy = util.fix(item.mealSubsidyOri * val / item.maxDay);
                reComputeSumSalary(item);
                reComputePersonTax(item);
                reComputeSumMinusPer(item);
                reComputeRealSum(item);
                refreshChangedData(item);
            }
        }

        /**
         * 重新计算执行工资，因为出勤天数变化，
         * 或者因为扣减会影响执行工资
         * @param item
         */
        function reComputeExecuteSalary(item, oldVal) {
            //var abtain = util.fix(item.executeSalaryOri * item.realDay / item.maxDay);
            if(typeof oldVal == 'undefined') {
                oldVal = item.realDay;
            }

            var abtain = util.fix(
                   addFun(item.executeSalary,
                        divideFun(
                            multiplyFun(
                                minusFun(item.realDay, oldVal),
                                item.executeSalaryOri),
                            item.maxDay)
                   )
                );

            var subsidy = addFun(
                addFun(item.trafficSubsidy, item.mobileSubsidy),
                item.mealSubsidy
            );

            var realAbtain = addFun(abtain, subsidy);
            /*var minus = addFun(
                item.sumSocialSecurityPer,
                    item.houseFundPer || 0
            );*/
            //var realAbtain = minusFun(abtain, minus);
            if (item.performSalary) {
                realAbtain = addFun(realAbtain, item.performSalary);
            }

            // 扣除过福利费了
            if (item.welfareSalary) {
                realAbtain = addFun(realAbtain, item.welfareSalary);
            }
            // 工资有扣减
            if (item.otherSalary < 0) {
                realAbtain = addFun(realAbtain, item.otherSalary);
            }

            var realSum = util.fix(
                addFun(
                    minusFun(realAbtain, item.sumMinusPer),
                    item.taxFreeSubsidy
                )
            );

            realSum = util.fix(
                addFun(
                    realSum, item.yearAwardFinal || 0
                )
            );

            if (realAbtain > item.welfareSalaryOri && realSum > item.welfareSalaryOri) {
                if(item.welfareSalary) {
                     item.executeSalary = abtain;
                } else {
                    item.executeSalary = minusFun(abtain, item.welfareSalaryOri);
                    item.style = {
                        'background': 'white'
                    };
                    // 工资剩余够福利工资,恢复福利工资的值
                    item.welfareSalary = item.welfareSalaryOri;

                }
            } else { // 实际工资不够扣除福利费的
                if(item.welfareSalary) {
                    item.executeSalary = addFun(abtain, item.welfareSalary);
                    item.welfareSalary = 0;
                } else {
                    item.executeSalary = abtain;
                    item.welfareSalary = 0;
                    if (item.welfareSalary == 0 && item.welfareSalaryOri != 0) {
                        // 这种人要进行标记处理
                        item.style = {
                            'background': '#f2dede'
                        };
                    } else {
                        item.style = {
                            'background': 'white'
                        };
                    }
                }

            }
        }

        /**
         * 绩效工资输入变化
         * @param val
         * @param scope
         */
        function getPerformSalaryChangeHandler(index) {
            return function (val, scope) {
                var item = getItem(index);
                if (util.inputEmpty(val)) {
                    item.performSalary = 0;
                } else {
                    item.performSalary = +val;
                }
                reComputeSumSalary(item);
                reComputePersonTax(item);
                reComputeSumMinusPer(item);
                reComputeRealSum(item);
                refreshChangedData(item);
            }
        }

        /**
         * 公积金输入变化
         * @param val
         * @param scope
         */
        function getHouseFundPerChangeHandler(index) {
            return function (val, scope) {
                var item = getItem(index);
                if (util.inputEmpty(val)) {
                    item.houseFundPer = 0;
                } else {
                    item.houseFundPer = +val;
                }
                reComputePersonTax(item);
                reComputeSumMinusPer(item);
                reComputeRealSum(item);
                refreshChangedData(item);
            }
        }

        function getHouseFundComChangeHandler(index) {
            return function (val, scope) {
                var item = getItem(index);
                if (util.inputEmpty(val)) {
                    item.houseFundCom = 0;
                } else {
                    item.houseFundCom = +val;
                }
                reComputeSumMinusCom(item);
                reComputeRealSum(item);
                refreshChangedData(item);
            }
        }

        /**
         * 免税所得变化
         * @param index
         * @returns {Function}
         */
        function getTaxFreeSubsidyChangeHandler(index) {
            return function (val, scope) {
                var item = getItem(index);
                if (util.inputEmpty(val)) {
                    item.taxFreeSubsidy = 0;
                } else {
                    item.taxFreeSubsidy = +val;
                }
                reComputeRealSum(item);
            }
        }


        /**
         * 个税输入变化
         * @param val
         * @param scope
         */
        function getPersonTaxChangeHandler(index) {
            return function (val, scope) {
                var item = getItem(index);
                if (util.inputEmpty(val)) {
                    item.personTax = 0;
                } else {
                    item.personTax = +val;
                }
                reComputeSumMinusPer(item);
                reComputeRealSum(item);
                refreshChangedData(item);
            }
        }

        /**
         * 详情变化
         * @param val
         * @param scope
         */
        function detailChangeHandler(val, scope) {
            /*            var item = getItem(index);
             item.detail = val;
             refreshChangedData(item);*/
        }


        /**
         * 重新计算工资小计
         * @param item
         */
        function reComputeSumSalary(item) {
            var salary = item.executeSalary;
            // 工资按天计算
            if (item.executeSalaryType == daySalaryType) {
                salary = util.fix(item.executeSalary * item.realDay);
            }
            var subsidy = addFun(
                addFun(item.trafficSubsidy, item.mobileSubsidy),
                item.mealSubsidy
            );
            var temp = addFun(item.performSalary || 0, item.otherSalary)
            item.sumSalary = util.fix(
                addFun(
                    addFun(salary, subsidy),
                    temp
                )
            );
        }

        /**
         * 重新计算个人扣减小计
         * @param item
         */
        function reComputeSumMinusPer(item) {
            var sum = addFun(
                addFun(
                    item.sumSocialSecurityPer,
                        item.houseFundPer || 0
                ),
                    item.personTax || 0
            );
            item.sumMinusPer = util.fix(sum);
        }

        /**
         * 重新计算公司扣减
         * @param item
         */
        function reComputeSumMinusCom(item) {
            item.sumCom = util.fix(
                addFun(item.sumSocialSecurityCom, item.houseFundCom || 0)
            );
        }


        /**
         * 重新计算个税
         * @param item
         */
        function reComputePersonTax(item) {
            var minusSum = addFun(
                item.sumSocialSecurityPer,
                item.houseFundPer
            );
            var taxSalary = minusFun(item.sumSalary, minusSum);
            item.personTax = computePersonTax(
                item.staffType,
                item.foreigner,
                taxSalary);
            if (item.isDisability) {
                item.personTax = divideFun(item.personTax, 2);
            }
        }

        /**
         * 重新计算实发工资
         * @param item
         */
        function reComputeRealSum(item) {
            item.realSum = util.fix(
                addFun(
                    minusFun(item.sumSalary, item.sumMinusPer),
                    item.taxFreeSubsidy
                )
            );
            item.realSumAll = util.fix(
                addFun(
                    item.realSum,
                        item.yearAwardFinal || 0
                )
            );
        }


        /**
         * 更新变化的值
         * @param item
         */
        function refreshChangedData(item) {
            changedDataMap[item.number] = true;
        }


        /**
         * 计算个人所得税金额
         * @param staffType
         * @param foreigner
         * @param beforeTaxSalary
         */
        function computePersonTax(staffType, foreigner, beforeTaxSalary) {
            var freeTax = foreigner ? 4800 : 3500;
            var shouldTax = minusFun(beforeTaxSalary, freeTax);
            var percent = 0;
            var minus = 0;
            var res = 0;
            if (staffType == typeCode.LABOR) {
                shouldTax = beforeTaxSalary;
                if (shouldTax < 800) {
                    res = 0;
                } else if (shouldTax < 4000) {
                    res = multiplyFun(minusFun(shouldTax, 800), 0.2);
                } else if (shouldTax < 25000) {
                    res = multiplyFun(shouldTax, 0.16);
                } else if (shouldTax < 62500) {
                    res = minusFun(multiplyFun(shouldTax, 0.24), 2000);
                } else {
                    res = minusFun(multiplyFun(shouldTax, 0.32), 7000);
                }
            } else {
                if (shouldTax <= 1500) {
                    percent = 0.03;
                    minus = 0
                } else if (shouldTax <= 4500) {
                    percent = 0.1;
                    minus = 105;
                } else if (shouldTax <= 9000) {
                    percent = 0.2;
                    minus = 555;
                } else if (shouldTax <= 35000) {
                    percent = 0.25;
                    minus = 1005;
                } else if (shouldTax <= 55000) {
                    percent = 0.3;
                    minus = 2755;
                } else if (shouldTax <= 80000) {
                    percent = 0.35;
                    minus = 5505;
                } else {
                    percent = 0.45;
                    minus = 13505;
                }
                res = minusFun(
                    multiplyFun(shouldTax, percent),
                    minus
                );
            }
            return res > 0 ? util.fix(res) : 0;
        }



        /**
        * 根据绩效遗留显示实发工资详情html浮层
        */
        function getRealSumHtml(data) {
            var tpl ='';
            tpl += "<table border=\"1\">\n" +
                   "    <tr>\n" +
                   "        <th>本月是否结清</th>\n" +
                   "        <th>下月需补扣</th>\n" +
                   "    </tr>\n" +
                   "    <tr>\n" +
                   "        <td>" +(data < 0 ? '否' : '是' ) + "</td>\n" +
                   "        <td>" + (-data) + "</td>\n" +
                   "    </tr>\n" +
                   "</table>\n";
            return $sce.trustAsHtml(tpl);
        }
    }
});