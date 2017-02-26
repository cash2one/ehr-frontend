/**
 * @file 自定义列的配置
 * @author yanlingling
 */
define(function (require) {
    var searchConfig = require('./config');

    /**
     * 移除列
     * @param cols
     */
    function removeCol(res, col) {
        var index = getIndex(res, col);
        var groupData = res[index.groupIndex];
        groupData.items.splice(index.itemIndex, 1);
    }

    /**
     * 设置默认
     * @param res
     * @param cols
     */
    function setDefaultValues(res, cols) {
        for (var i = 0, val; val = cols[i++];) {
            setDefault(res, val);
        }
    }

    /**
     * 设置为默认
     * @param res
     * @param col
     */
    function setDefault(res, col) {
        var index = getIndex(res, col);
        var groupData = res[index.groupIndex];
        groupData.items[index.itemIndex].isDefault = true;
    }

    /**
     * 取消默认
     * @param res
     * @param col
     */
    function cancelDefault(res, col) {
        var index = getIndex(res, col);
        var groupData = res[index.groupIndex];
        groupData.items[index].isDefault = false;
    }

    /**
     * 获取下标
     * @param res
     * @param col
     * @returns {number}
     */
    function getIndex(res, col) {
        var hasFind = false;
        for (var j = 0, it; it = res[j++];) {
            for (var i = 0, item; item = it.items[i++];) {
                if (item.key == col) {
                    hasFind = true;
                    break;
                }
            }
            if (hasFind) {
                break;
            }
        }
        if (hasFind) {
            return {
                groupIndex: j - 1,
                itemIndex: i - 1
            };
        } else {
            return -1;
        }
    };

    function getAllCols($scope) {
        var res = [];
        if (!$scope.userInfo.isAgent) {
            res = [
                {
                    name: '基本信息',
                    key: 'baseInfo',
                    items: [
                        {
                            key: 'name',
                            value: '姓名',
                            isDefault: false
                        },
                        {
                            key: 'sex',
                            value: '性别',
                            isDefault: false
                        },
                        {
                            key: 'displayNumber',
                            value: '员工编号',
                            isDefault: false
                        },
                        {
                            key: 'status',
                            value: '员工状态',
                            isDefault: false
                        },
                        {
                            key: 'type',
                            value: '员工类型',
                            isDefault: false
                        },
                        {
                            key: 'lawName',
                            value: '法律名',
                            isDefault: false
                        },
                        {
                            key: 'email',
                            value: '邮箱地址',
                            isDefault: false
                        }
                    ]
                },
                {
                    name: '个人资料',
                    key: 'natureInfo',
                    items: [
                        {
                            key: 'hometown',
                            value: '籍贯',
                            isDefault: false
                        },
                        {
                            key: 'ethnic',
                            value: '民族',
                            isDefault: false
                        },
                        {
                            key: 'politicalStatus',
                            value: '政治面貌',
                            isDefault: false
                        },
                        {
                            key: 'birthplace',
                            value: '出生地点',
                            isDefault: false
                        },
                        {
                            key: 'accountLocation',
                            value: '户口所在地',
                            isDefault: false
                        },
                        {
                            key: 'degree',
                            value: '学历',
                            isDefault: false
                        },
                        {
                            key: 'religion',
                            value: '宗教信仰',
                            isDefault: false
                        },
                        {
                            key: 'maritalStatus',
                            value: '婚姻状况',
                            isDefault: false
                        },
                        {
                            key: 'citizenship',
                            value: '国籍',
                            isDefault: false
                        },
                        {
                            key: 'isForeign',
                            value: '证件类型',
                            isDefault: false
                        },
                        {
                            key: 'idCardNumber',
                            value: '证件号码',
                            isDefault: false
                        },
                        {
                            key: 'birthday',
                            value: '出生日期',
                            isDefault: false
                        },
                        {
                            key: 'accountType',
                            value: '户口类型',
                            isDefault: false
                        },
                        {
                            key: 'beginWorkTime',
                            value: '全职参加工作时间',
                            isDefault: false
                        },
                        {
                            key: 'isGraduate',
                            value: '是否毕业生入职',
                            isDefault: false
                        },
                        {
                            key: 'mobile',
                            value: '手机号',
                            isDefault: false
                        },
                        {
                            key: 'enterTime',
                            value: '入职日期',
                            isDefault: false
                        },
                        /*{
                            key: 'contractTime',
                            value: '合同年限',
                            isDefault: false
                        },
                        {
                            key: 'probationPeriod',
                            value: '试用期',
                            isDefault: false
                        },*/
                        {
                            key: 'formalDate',
                            value: '转正日期',
                            isDefault: false
                        },
                        {
                            key: 'contractEndDate',
                            value: '合同到期时间',
                            isDefault: false
                        },
                        {
                            key: 'promiseEnterDate',
                            value: '入职日期',
                            isDefault: false
                        },
                        {
                            key: 'lastModTime',
                            value: '最新更新时间',
                            isDefault: false
                        },
                        /*{
                            key: 'assetCode',
                            value: '固定资产编码',
                            isDefault: false
                        },*/
                        {
                            key: 'pcType',
                            value: '电脑',
                            isDefault: false
                        },
                        {
                            key: 'leaveDate',
                            value: '离职日期',
                            isDefault: false
                        },
                        {
                            key: 'entryLeaveLog',
                            value: '入离职信息',
                            isDefault: false
                        },
                        {
                            key: 'lastEnterTime',
                            value: '上次入职信息',
                            isDefault: false
                        },
                        {
                            key: 'lastLeaveTime',
                            value: '上次离职信息',
                            isDefault: false
                        },
                        {
                            key: 'lastStaffTypeValue',
                            value: '上次员工类型',
                            isDefault: false
                        }

                    ]
                },
                {
                    name: '岗位信息',
                    key: 'workInfo',
                    items: [
                        {
                            key: 'contractCompany',
                            value: '合同签约公司',
                            isDefault: false
                        },
                        {
                            key: 'structureName',
                            value: '组织架构',
                            isDefault: false
                        },
                        {
                            key: 'level',
                            value: '级别',
                            isDefault: false
                        },
                        {
                            key: 'positionName',
                            value: '职位名称',
                            isDefault: false
                        },
                        {
                            key: 'leaderName',
                            value: '直属领导',
                            isDefault: false
                        },
                        {
                            key: 'socialSecurityCity',
                            value: '社保缴纳城市',
                            isDefault: false
                        },
                        {
                            key: 'office',
                            value: '工作地点',
                            isDefault: false
                        },
                        {
                            key: 'sit',
                            value: '工位',
                            isDefault: false
                        },
                        {
                            key: 'icCardNumber',
                            value: '工卡卡号',
                            isDefault: false
                        },
                        {
                            key: 'workEmail',
                            value: '邮箱地址',
                            isDefault: false
                        }
                    ]
                },
                {
                    name: '薪酬信息',
                    key: 'salaryInfo',
                    items: [
                        {
                            key: 'baseSalary',
                            value: '基本工资',
                            isDefault: false
                        },
                        {
                            key: 'probationarySalary',
                            value: '试用期基本工资',
                            isDefault: false
                        },
                        {
                            key: 'salaryType',
                            value: '工资类型',
                            isDefault: false
                        },
                        {
                            key: 'socialSecurityBase',
                            value: '社保基数',
                            isDefault: false
                        },
                        {
                            key: 'houseFundBase',
                            value: '公积金基数',
                            isDefault: false
                        },
                        {
                            key: 'salaryLastDay',
                            value: '最近薪酬日期',
                            isDefault: false
                        },
                        {
                            key: 'salaryLastSalary',
                            value: '最近薪酬金额',
                            isDefault: false
                        },
                        {
                            key: 'welfareSalary',
                            value: '职位福利费',
                            isDefault: false
                        }
                        /*                    {
                         {
                         key: 'socialSecurityBase,
                         value: '社保基数',
                         isDefault: false
                         }
                         key: 'excuteSalary',
                         value: '执行工资',
                         isDefault: false
                         }*/
                    ]
                },
                {
                    name: '隐私信息',
                    key: 'secretInfo',
                    items: [
                        {
                            key: 'cardNum',
                            value: '银行卡号'
                        },
                        {
                            key: 'personalEmail',
                            value: '联系邮箱'
                        },
                        {
                            key: 'emergContact',
                            value: '紧急联系人'
                        },
                        {
                            key: 'emergContactMobile',
                            value: '紧急联系人电话'
                        },
                        {
                            key: 'address',
                            value: '住址及邮编'
                        },
                        {
                            key: 'filePlace',
                            value: '档案挂靠处'
                        }
                    ]
                }
            ];
        } else {
            res = [
                {
                    name: '基本信息',
                    key: 'baseInfo',
                    items: [
                        {
                            key: 'name',
                            value: '姓名',
                            isDefault: false
                        },
                        {
                            key: 'sex',
                            value: '性别',
                            isDefault: false
                        },
                        {
                            key: 'displayNumber',
                            value: '员工编号',
                            isDefault: false
                        },
                        {
                            key: 'mobile',
                            value: '手机号',
                            isDefault: false
                        },
                        {
                            key: 'enterTime',
                            value: '入职日期',
                            isDefault: false
                        },
                        {
                            key: 'email',
                            value: '邮箱地址',
                            isDefault: false
                        },
                        {
                            key: 'birthday',
                            value: '出生日期',
                            isDefault: false
                        },
                        {
                            key: 'accountLocation',
                            value: '户口所在地',
                            isDefault: false
                        },
                        {
                            key: 'degree',
                            value: '学历',
                            isDefault: false
                        },
                        {
                            key: 'isForeign',
                            value: '证件类型',
                            isDefault: false
                        },
                        {
                            key: 'idCardNumber',
                            value: '证件号码',
                            isDefault: false
                        },
                        {
                            key: 'beginWorkTime',
                            value: '全职参加工作时间',
                            isDefault: false
                        },
                        {
                            key: 'status',
                            value: '员工状态',
                            isDefault: false
                        },
                        {
                            key: 'leaveDate',
                            value: '离职日期',
                            isDefault: false
                        }
                    ]
                },
                {
                    name: '岗位信息',
                    key: 'workInfo',
                    items: [
                        {
                            key: 'leaderName',
                            value: '直属领导',
                            isDefault: false
                        },
                        {
                            key: 'structureName',
                            value: '组织架构',
                            isDefault: false
                        },
                        {
                            key: 'level',
                            value: '级别',
                            isDefault: false
                        },
                        {
                            key: 'positionName',
                            value: '职位名称',
                            isDefault: false
                        },
                        {
                            key: 'workEmail',
                            value: '邮箱地址',
                            isDefault: false
                        }
                    ]
                }
            ]
        }

        if (!$scope.userInfo.isAgent) {
            if (!$scope.isRecruitHRSearch) {  // 其它hr
                if (!$scope.isAssetManagerSearch) {
                    removeCol(res, 'promiseEnterDate');
                }
                removeCol(res, 'lastModTime');
            }
            else {
                removeCol(res, 'enterTime');
                removeCol(res, 'leaveDate');
                removeCol(res, 'hometown');
                removeCol(res, 'ethnic');
                removeCol(res, 'politicalStatus');
                removeCol(res, 'birthplace');
                removeCol(res, 'accountLocation');
                removeCol(res, 'religion');
                removeCol(res, 'maritalStatus');
                removeCol(res, 'citizenship');
                removeCol(res, 'isForeign');
                removeCol(res, 'birthday');
                removeCol(res, 'accountType');
                removeCol(res, 'beginWorkTime');
                removeCol(res, 'isGraduate');
                removeCol(res, 'contractEndDate');
               //removeCol(res, 'contractTime');
                removeCol(res, 'cardNum');
                removeCol(res, 'emergContact');
                removeCol(res, 'emergContactMobile');
                removeCol(res, 'address');
                removeCol(res, 'filePlace');
                removeCol(res, 'email');
                removeCol(res, 'office');
                removeCol(res, 'sit');
            }
            /*        if (!$scope.isSalaryHRSearch) {
             removeCol(res, 'excuteSalary');
             }*/
            if (!$scope.isAssetManagerSearch) {
                removeCol(res, 'pcType');
            }
        }

        initDefaultValue();
        return res;

        /**
         * 初始默认值
         */
        function initDefaultValue() {
            var valueMap = searchConfig.DEFAULT_COLS;
            if (!$scope.userInfo.isAgent) {
                if ($scope.isRecruitHRSearch) {
                    setDefaultValues(res, valueMap.RECRUIT_HR);
                }
                else if ($scope.isSalaryHRSearch) {
                    setDefaultValues(res, valueMap.SALARY_HR);
                }
                else if ($scope.isBusinessPartnerHRSearch) {
                    setDefaultValues(res, valueMap.HRBP_HR);
                }
                else if ($scope.isTrainingHRSearch) {
                    setDefaultValues(res, valueMap.TRAINING_HR);
                }
                else if ($scope.isRelationshipHRSearch) {
                    setDefaultValues(res, valueMap.RELATIONSHIP_HR);
                }
                else if ($scope.isSubordinateSearch) {
                    setDefaultValues(res, valueMap.MANAGER);
                }
            } else {
                setDefaultValues(res, valueMap.AGENT);
            }

        }
    }

    return getAllCols;
});
