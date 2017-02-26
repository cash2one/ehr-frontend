var mockCreatFunction = function (param) {
    var data = {
        status: 200,
        data: {
            number: 345678,

            email: '333@baijiahulian​.com',

            password: '666555',
            displayNumber: '0' + Math.floor(Math.random() * 1000)
        },
        "error": null,
        "pageDto": null
    };
    return data;
}
