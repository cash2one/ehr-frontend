/**
 * 获取指定账户信息
 * 
 * path: /ac/getAccount
 * 
 * @return {[type]} [description]
 */
var mockCreatFunction = function (param) {
	var data = [];
	for (var i = 0;i < 60; i++) {
		data[i] = {
			"number": 1,
            "username": "test" + i,
            "displayName": "测试" + i
		};
	}

	return {
	    "status": 200,
	    "data": data,
	    "error": null,
	    "pageDto": null
	};
};