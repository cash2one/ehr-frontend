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
                regularCount: 123,    // 正式员工数量, int
                traineeCount: 20,    // 实习生数量,int
                labourserviceCount: 10 //劳务员工数量,int
            },
            {
                structureName: '二级部门名字',
                regularCount: 123,    // 正式员工数量, int
                traineeCount: 20,    // 实习生数量,int
                labourserviceCount: 10 //劳务员工数量,int
            }
        ],
        "error": null
    };
    return data;
}