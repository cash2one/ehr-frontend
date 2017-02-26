/**
 * @file 变更历史
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    var data = {
        status: 200,
        data: [],
        "error": null
    };
    data.data = [
        {
            date: 2323344555666,
            type: '部门变动',
            content: '设计部->研发部'
        },
        {
            date: 2323344555666,
            type: '等级',
            content: 't1->t3'
        }
    ];
    return data;
}
