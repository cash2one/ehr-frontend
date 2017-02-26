/**
 * @file 新员工入职
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    return {"data":[{"birthday":5149065600000,"company":"电饭锅","id":31,"mobile":"234","name":"玩儿","number":2,"position":"个是否","title":"放大"},{"id":42,"name":"234","number":2,"title":"234"}],"status":200};
    var data = {
        status: 200,
        data: [
            {
                id: 1,
                name: 'ere',
                title: '父母' //称谓
            },

            {
                id: 2,
                name: 'ere2',
                title: '父母2', //称谓
                age: 50,
                company: '工作单位2',
                position: '职位2',
                birthday: new Date().getTime(),
                mobile: '1861100876'
            }
        ]
    };
    return data;
}
