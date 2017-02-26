/**
 * @file mock數據的工具
 * @author yanlingling@baijiahulian.com
 */
module.exports = {
    /**
     * 返回0到n之间的随机数
     * @param {number} n 随机数的上限
     * @returns {number} 随机数
     */
    getNum: function (n) {
        var num = Math.floor(Math.random() * 10);
        return num % (n + 1);
    },
    /**
     * 生成tag
     * @param {string} param.type
     * @param {string} param.systemType
     */
    createRole: function (param) {
        var type;
        var systemType;
        if (param) {
            type = param.type;
            systemType = param.systemType;
        }

        var allType = ['zongjian', 'jingli', 'zhuguan', 'zhuanyuan'];
        var allSystemType = ['fengongsi', 'kefu', 'jigou', 'gaoxiao', 'jigoukefu'];
        var typeName = {
            zongjian: '总监',
            jingli: '经理',
            zhuguan: '主管',
            zhuanyuan: '专员'
        };
        var systemTypeName = {
            fengongsi: '分公司',
            kefu: '客服',
            jigou: '机构',
            gaoxiao: '高校',
            jigoukefu: '机构客服'
        };
        if (typeof type == 'undefined') {
            type = allType[this.getNum(3)];
        }
        if (typeof systemType == 'undefined') {
            systemType = allSystemType[this.getNum(4)];
        }
        return {
            tag: 'yunying_shizi_' + type + '_' + systemType,
            name: systemTypeName[systemType] + typeName[type]
        };
    },
    appendPageDto: function (data) {
        data.pageDto = {
            count: 36,
            pageNum: 1,
            pageSize: 20,
            sort: null
        }
    }
}