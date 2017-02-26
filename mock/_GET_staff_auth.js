/**
 * @file 获取等级
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    var data = {
        status: 200,
        data: {},
        "error": null,
        "pageDto": {
            count: 100
        }
    };
    data.data = {
        number: 123

/*        roleTypes: 'HRBP,ZPHR,GXHR,PXHR,XCHR',

        manageRange: [
            {
                companyId: 1,

                companyName: '公司名字',

                departmentIds: '1,2,3',

                departmentNames: '二级部门1,二级2'
            }
        ]*/
    };
    return data;
}
