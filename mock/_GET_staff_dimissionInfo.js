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
        leaveSignBill: 12,

        leaveSignBillFile: 'http:a.com',// 地址

        leaveApply: 9990,

        leaveApplyFile: 'http:a.com',

        leaveProof: 12313,

        leaveProofFile: 'http:a.com',

        reason: 1,

        detailReason: 1,
     /*            reasonFromHr:1,
        detailReasonFromHr: 1,*/

        leaveDate: 998888777777,

        detail: '对英国进行国事访问的第二天，习大大和彭麻麻在英国王室的金童玉女威廉王子和凯特王妃夫妇的陪同下，参加中英创意产业交流活动。据每日邮报报道，21日，在兰卡斯特宫举行的中英创意产业交流活动中，威廉王子夫妇不仅接待了习大大和彭麻麻，还接待'
    };
    return data;
}
