/**
 * @file 表格配置项
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function ($scope) {
        return [
            {
                field: 'displayNumber',
                displayName: '工号',
                width: 50
            },
            {
                field: 'name',
                displayName: '姓名',
                width: 50
            },
            {
                field: 'lawName',
                displayName: '法律名',
                width: 50
            },
            {
                field: 'enterDateValue',
                displayName: '入职日期',
                width: 60
            },
            {
                field: 'leaveDateValue',
                displayName: '离职日期',
                width: 60
            },
            {
                field: 'structureName',
                displayName: '组织架构',
                width: 120
            },
            {
                field: 'socialSecurityCityName',
                displayName: '社保缴纳城市',
                width: 60
            },
            {
                field: 'socialSecurityBase',
                displayName: '社保缴纳基数',
                width: 60
            },
            {
                field: 'houseFundBase',
                displayName: '公积金缴纳基数',
                width: 70
            },
            {
                field: 'detail',
                displayName: '备注',
                width: 60
            }
        ]
    }
});