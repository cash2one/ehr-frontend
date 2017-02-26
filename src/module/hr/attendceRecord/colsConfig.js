/**
 * @file 表格配置项
 * @author Lingling Yan yanlingling@baijiahulian.com
 */
define(function (require) {
    return function ($scope) {
        // var userAgent = window.navigator.userAgent;
        // var optWidth = '38px';
        // if (userAgent.indexOf('Mac') > -1) {
        //     optWidth = '65px';
        // }

        return [
            {
                field: 'name',
                displayName: '姓名',
                // width: 60
                // style: {
                //     width: '8%'
                // }
            },
            {
                field: 'number',
                displayName: '工号',
                // width: 60
            },
            {
                field: 'day',
                displayName: '日期',
                // width: 60
            },
            {
                field: 'calendar',
                displayName: '周历',
                // width: 60
            },
            {
                field: 'weekend',
                displayName: '类型',
                filter: 'weekendShow'
            },
            {
                field: 'firstPunch',
                displayName: '首次打卡时间',
                // width: 60
            },
            {
                field: 'lastPunch',
                displayName: '末次打卡时间',
                // width: 60
            },
            {
                field: 'totalTime',
                displayName: '出勤时长',
                // width: 60
            },
            {
                field: 'reason',
                displayName: '备注',
                // width: 160
            }
        ]
    }
});