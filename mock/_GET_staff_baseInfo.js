/**
 * @file 获取等级
 * yanlingling@baijiahulian.com
 */
var mockCreatFunction = function (param) {
    //return  {"data":{"accountType":2,"degree":1,"enterTime":1437667200000,"formalDate":1445616000000,"idCardAndContractFile":"","idCardNumber":"1234567890123456780077","idCardUploadFile":"","limitAgreementFile":"","mobile":"13770571033","probationary":1,"resumeFile":""},"status":200};
    //return {"data":{"accountLocation":"1234","accountType":1,"beginWorkTime":1475251200000,"birthday":1475604000000,"birthplace":"234","citizenship":"123","contractEndDate":'',"contractTime":'',"degree":1,"enterTime":1471795200000,"ethnic":"234","formalDate":1481212800000,"contractEndDate":1481212800000,"hometown":"12345","idCardAndContract":1070,"idCardAndContractFile":"http://test-ehr.baijiahulian.com/GET/file/file.json?file=a116d0c3-1a91-49ce-a768-28c5d644b4e5.jpeg","idCardNumber":"123456712341234123","idCardUpload":1071,"idCardUploadFile":"http://test-ehr.baijiahulian.com/GET/file/file.json?file=0e612838-d7cf-4756-bf71-e6bbc67f3803.jpeg","isForeign":1,"isGraduate":1,"limitAgreement":1072,"limitAgreementFile":"http://test-ehr.baijiahulian.com/GET/file/file.json?file=995ba4f2-ceb0-4c96-a304-219ff73f3276.png","maritalStatus":2,"mobile":"12345","politicalStatus":"1234","probationary":3,"religion":"`123","resume":1047,"resumeFile":"http://test-ehr.baijiahulian.com/GET/file/file.json?file=43ef5c57-3060-4114-a800-cbf7659e8110.png"},"status":200};
    var data = {
        status: 200,
        data: {},
        "error": null,
        "pageDto": {
            count: 100
        }
    };
    data.data = {
        number: 123,

        name: 'namei',

        sex: 1,

        namePinyin: 'yanlingling',

        number: 12222,

        email: 'yanlingling',

        // 个人信息1

        hometown: '籍贯', //籍贯

        ethnic: '民族',

        politicalStatus: '党员', // 政治面貌

        birthplace: '海南',

        accountLocation: '户口所在地',

        degree: 1,

        religion: '宗教信仰',

        maritalStatus: 1,  // 婚姻状况

        citizenship: '国籍',

        isForeign: 1,  //是否外国

        birthday: 2342342344545,

        accountType: 1, // 户口类型

        beginWorkTime: 17635536737,

        isGraduate: 1, // 是否毕业生入职

        mobile: 45678890090,
        enterTime: 45678890090,
        contractTime: 1,
        contractEndDate: 45678890090,
        formalDate: 45678890090,
        idCardNumber: '123456789012345678',
        idCardAndContract: 'A.B',
        idCardAndContractFile: undefined,
        idCardUpload: 'cc',
        idCardUploadFile: undefined,
        probationary: 3,
        displayNumber: '0' + Math.floor(Math.random() * 1000)
    };
    return data;
}
