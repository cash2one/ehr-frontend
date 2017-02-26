/**
 * @file 替换图片cdn地址
 * @author mayue@baidu.com
 */
module.exports = function(grunt) {

var mock = function(req, res, next) {
    var url = req.url;
    if (url.indexOf('.css') > 0 && url.indexOf('output') < 0) {
        var less = require('less');

        var url = req.url;
        var end = url.indexOf('?');
        if (end > 0) {
            url = url.slice(0, end);
        }
        console.log(url);

        less.render(
            grunt.file.read('.' + url),
            {
                paths: ['./src/common/css/']
            },
            function (e, css) {
                res.end(css);
            }
        );
    } else {
        return next();
    }
};

return mock;

};