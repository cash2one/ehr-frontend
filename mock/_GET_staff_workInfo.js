/**
 * @file 获取岗位信息
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    //return {"status":200,"data":{"sit":"ä½œä¸º","office":1,"officeName":"åŠžå…¬åœ°ç‚¹","type":1,"company":1,"companyName":"å…¬å¸åå­—","contractCompany":1,"contractCompanyName":"ç­¾çº¦å…¬å¸","department":1,"departmentName":"éƒ¨é—¨åå­—","scdDepartment":1,"scdDepartmentName":"è¿è¥äº§å“","socialSecurityCity":1,"socialSecurityCityName":"ç¤¾ä¿ç¼´çº³åŸŽå¸‚","level":"a5","structure":1,"structureName":"åŽåŒ—å¤§åŒº-æ­¦æ±‰åˆ†å…¬å¸","position":1,"positionName":"ç ”å‘å·¥ç¨‹å¸ˆ","leader":"taoyanping","leaderName":"é™¶äºšå¹³","requireCheckTime":1},"error":null,"pageDto":{"count":100}};
    var data = {
        status: 200,
        data: {},
        "error": null,
        "pageDto": {
            count: 100
        }
    };
    data.data = {
        sit: '作为',
        office: 1,

        officeName: '办公地点',
        type: 1,

        company: 1,

        companyName: '公司名字',
        contractCompany: 1,
        contractCompanyName: '签约公司',

        department: 1,

        departmentName: '部门名字',

        scdDepartment: 1,

        scdDepartmentName: '运营产品',

        socialSecurityCity: 1,
        socialSecurityCityName: '社保缴纳城市',

        level: 'a5',

        structure: 1,

        structureName: '华北大区-武汉分公司',

        position: 1,

        positionName: '研发工程师', //传id
        leader: 'taoyanping', //直属领导邮箱前缀
        leaderName: '陶亚平',//直属领导 名字
        requireCheckTime: 1,
        workEmail: 'yanlingling@baijiahulian.com' // 邮箱

    };
    return data;
}
