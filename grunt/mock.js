/**
 * @file 伪造ajax响应数据
 * @authory yanlingling@baijiahulian.com
 */
module.exports = function (grunt) {
    var fs = require('fs');
    var pathInfo = {};
    var param = {};
    var mock = function (req, res, next) {
        var fileToRead = "";
        var path = req.url;
        var len = req.url.indexOf('.json');
        var type = 'POST';
        console.log(path);
        if (len >= 0) {
            path = req.url.split('/').join('_').slice(0, len);
            fileToRead = "./mock/" + path;
            if (req.method === 'POST') {
                var content = '';
                req.on('data', function (data) {

                    content += data.toString();
                    var allParams = content && content.split('&');

                    if (allParams && allParams.length) {
                        if (content.indexOf('&') >= 0) {
                            var params = {};
                            for (var i = 0; i < allParams.length; i++) {
                                var params = allParams[i].split('=');
                                param[params[0]] = params[1];
                            }
                        }
                    } else {
                        param = JSON.parse(content);
                    }

                    var ajaxInfo = {
                        path: path,
                        type: type,
                        param: param
                    }
                    pathInfo[path] = ajaxInfo;

                    //fs.appendFile('./nodeUtil/param.txt', '\n' + JSON.stringify(ajaxInfo));
                });

                req.on('end', function () {
                    var data = fs.readFileSync(fileToRead + '.js');
                    eval(data.toString());
                    res.end(
                        JSON.stringify(
                            mockCreatFunction ? mockCreatFunction(param) : {status: 500}
                        )
                    );
                });

            } else {
                type = 'GET';
                var allParams = '';
                var index = path.indexOf('?');
                if (index != -1) {
                    path = path.slice(0, index);
                    allParams = path.slice(index);
                }
                // 处理参数
                for (var i = 0, item; item = allParams[i++];) {
                    var val = item.split('=');
                    param[val[0]] = val[1];
                }
                var data = fs.readFileSync(fileToRead + '.js');
                eval(data.toString());
                res.end(
                    JSON.stringify(
                        mockCreatFunction ? mockCreatFunction(param) : {status: 500}
                    )
                );
                var ajaxInfo = {
                    path: path,
                    type: type,
                    param: param
                }
                pathInfo[path] = ajaxInfo;
                //fs.appendFile('./nodeUtil/param.txt', '\n' + JSON.stringify(ajaxInfo));
            }
        }
        // 非ajax请求 不处理
        else {
            return next();
        }
    };
    return mock;
};