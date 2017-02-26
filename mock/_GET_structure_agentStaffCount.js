/**
 * @file 查询组织架构
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    var data = {
        status: 200,
        data: [
            {
                structureName: '一级部门名字',
                agentCount: 123    // 代理商员工数量, int
            },
            {
                structureName: '二级部门名字',
                agentCount: 123    // 代理商员工数量, int
            }
        ],
        "error": null
    };
    return data;
}