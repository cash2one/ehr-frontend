/**
 * @file 表格配置项
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function ($scope) {
        return [
            {
                field: 'date',
                displayName: '时间',
                filter: 'dateFormat'
            },
            {
                field: 'content',
                displayName: '变动内容',
                cellTpl: 'src/module/hr/salaryChangeInfo/tableTpl/content.html'
            }
        ]
    }
});