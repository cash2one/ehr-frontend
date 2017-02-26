/**
 * @file 配置项
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    var codeConfig = require('./codeConfig');
    var nameConfig = require('./nameConfig');
    return {
        // 工资类型
        SALARY_TYPE: [
            {
                id: 1,
                name: '元/天'

            },
            {
                id: 2,
                name: '元/月'

            }
        ],

        // 电脑类型
        PC_TYPE: [
            {
                id: undefined,
                name: '请选择'
            },
            {
                id: 2,
                name: 'Windows 笔记本标配'
            },
            {
                id: 5,
                name: 'Mac笔记本（产品技术专用）'
            },
            {
                id: 1,
                name: 'Windows 台式机标配'

            },
            {
                id: 3,
                name: 'Windows台式机高配（影视创作部专用）'
            },
            {
                id: 4,
                name: 'Windows笔记本高配（产品技术专用）'
            },
            {
                id: 6,
                name: 'Mac台式机（设计专用）'

            },
            {
                id: 7,
                name: '无'
            }
        ],
        // 性别
        SEX: [
            {
                id: undefined,
                name: '请选择'
            },
            {
                id: 1,
                name: '女'
            },
            {
                id: 2,
                name: '男'
            }
        ],
        // 学历
        DEGREE: [
            {
                id: undefined,
                name: '请选择'
            },
            {
                id: 1,
                name: '本科'
            },
            {
                id: 2,
                name: '硕士'
            },
            {
                id: 3,
                name: '博士'
            },
            {
                id: 4,
                name: '专科'
            },
            {
                id: 5,
                name: '其它'
            }
        ],
        /**
         * 婚姻状态
         */
        MARITAL_STATUS: [
            {
                id: 1,
                name: '已婚'
            },
            {
                id: 2,
                name: '未婚'
            },
            {
                id: 3,
                name: '离异'
            },
            {
                id: 4,
                name: '丧偶'
            }

        ],

        // 员工类型
        TYPE: [
            {
                id: undefined,
                name: '请选择'
            },
            {
                id: 1,
                name: '正式'
            },
            {
                id: 2,
                name: '实习生'
            },
            {
                id: 3,
                name: '劳务'
            }
        ],

        // 合作伙伴类型
        AGENT_TYPE: [
            {
                id: undefined,
                name: '请选择'
            },
            {
                id: 21,
                name: '正式'
            }
        ],

        /**
         * 推荐方式
         */
        RECOMMEND_TYPE: [
            {
                id: 1,
                name: '招聘经理人脉关系'
            },
            {
                id: 2,
                name: '招聘HR的渠道'
            },
            {
                id: 3,
                name: '其它员工推荐'
            },
            {
                id: 4,
                name: '招聘网站'
            },
            {
                id: 5,
                name: '付费猎头'
            },
            {
                id: 6,
                name: '校园招聘'
            },
            {
                id: 7,
                name: '其它'
            }
        ],

        EMPTY: {
            id: undefined,
            name: '请选择'
        },

        // 户口类型
        ACCOUNT_TYPE: [
            {
                id: 1,
                name: '本地城镇'
            },
            {
                id: 2,
                name: '本地农村'
            },
            {
                id: 3,
                name: '外地城镇'
            },
            {
                id: 4,
                name: '外地农村'
            }
        ],

        // 是否毕业生
        IS_GRADUATE: [
            {
                id: 1,
                name: '是'
            },
            {
                id: 0,
                name: '否'
            }
        ],

        // 是否外籍
        FOREIGN_STATUS: [
            {
                id: 1,
                name: '是'
            },
            {
                id: 0,
                name: '否'
            }
        ],

        // 证件类型
        ID_CARD_TYPE: [
            {
                id: 1,
                name: '身份证'
            },
            {
                id: 2,
                name: '港澳居民来往内地通行证'
            },
            {
                id: 3,
                name: '台湾居民来往内地通行证'
            },
            {
                id: 0,
                name: '护照'
            }
        ],

        // 试用期
        PROBATIONARY: [
            {
                id: 3,
                name: '6个月'
            },
            {
                id: 1,
                name: '3个月'
            },
            {
                id: 2,
                name: '无'
            }
        ],

        // 合同年限
        CONTRACT_TIME: [
            {
                id: 2,
                name: '6个月'
            },
            {
                id: 1,
                name: '三年'
            },
            {
                id: 4,
                name: '五年'
            },
            {
                id: 3,
                name: '无期限'
            }
        ],

        // 工资类型
        SALARY_MODE: [
            {
                id: undefined,
                name: '请选择'
            },
            {
                id: 1,
                name: '固定工资'
            },
            {
                id: 2,
                name: '绩效工资'
            }
        ],

        LEAVE_REASON: [
            {
                id: undefined,
                name: '请选择'
            },
            {
                id: '1-1',
                name: '主动离职 - 工作地点'
            },
            {
                id: '1-2',
                name: '主动离职 - 工作时间'
            },
            {
                id: '1-3',
                name: '主动离职 - 上下级关系'
            },
            {
                id: '1-4',
                name: '主动离职 - 工作内容'
            },
            {
                id: '1-5',
                name: '主动离职 - 工作压力太大'
            },
            {
                id: '1-6',
                name: '主动离职 - 个人发展前景'
            },
            {
                id: '1-7',
                name: '主动离职 - 薪资待遇'
            },
            {
                id: '1-8',
                name: '主动离职 - 身体健康原因'
            },
            {
                id: '1-9',
                name: '主动离职 - 照顾家人'
            },
            {
                id: '1-10',
                name: '主动离职 - 回家乡发展'
            },
            {
                id: '1-11',
                name: '主动离职 - 回学校'
            },
            {
                id: '2-1',
                name: '被动离职 - 主动辞退'
            },
            {
                id: '2-2',
                name: '被动离职 - 业务调整辞退'
            }
        ],

        PAGE_SIZE: 20,


        LEVEL_NAME: {
            M: 'M',
            A: 'A'
        },

        /**
         * 组织架构根节点的id
         */
        STRUCTURE_ROOT_ID: 1,

        /**
         * 日期格式
         */
        DATE_FORMAT: 'YYYY-MM-DD',

        /**
         * 空
         */
        EMPTY_VALUE: '-',

        /**
         * 实习劳务不可以填的字段
         */
        FORBID_OF_LABOR_STAFF: [
            'socialSecurityBase', 'houseFundBase',
            'trafficSubsidy', 'mobileSubsidy', 'socialSecurityCity',
            'endowBase', 'unemployBase', 'medicalBase', 'injuryBase', 'maternityBase'
            ,'probationarySalary', 'probationary', 'formalDate'
        ],

        FORBID_OF_REGULAR_STAFF: ['probationarySalary'],

        /**
         *  各種基數正則驗證
         */
        BASE_REG_STR: '^\\d{1,6}$|^\\d{1,6}\\.\\d{1,2}',

        /**
         * 六位整数校验
         */
        SIX_NUMBER_REG: '^\\d{1,6}$',

        /**
         * 负的六位数
         */
        NEG_SIX_NUMBER_REG: '^-?\\d{1,6}$',

        /**
         * 负数金额输入的正则
         */
        NEGATIVE_BASE_REG_STR: '^-?\\d{1,6}$|^-?\\d{1,6}(\\.\\d{1,2})$',


        /**
         * 文件上传时候的contentType
         */
        FILE_CONTENT_TYPE: 'multipart/form-data; boundary=----WebKitFormBoundary9nsID7VXCAqUXBLI',

        /**
         * 身份證
         */
        ID_CARD_CODE: 1,

        /**
         * 是否支持异地打卡
         */
        REMOTE_PUNCH_CARD: [
            {
                id: 0,
                name: '否'
            },
            {
                id: 1,
                name: '是'
            }
        ]

    };
});