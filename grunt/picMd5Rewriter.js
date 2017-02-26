/**
 * @file 替换图片为md5名称
 * @author mayue@baidu.com
 */
module.exports = function(grunt) {

var rewriter = function (url) {
    if (url.indexOf('http:') >= 0) {
        return url;
    } else {
        var summary = grunt.filerev.summary;
        for (var key in summary) {
            var picName = key.split(/\//).pop();
            if (url.indexOf(picName) >= 0) {
                var fileName = summary[key].split(/\//).pop();
                var newUrl = url.replace(
                    key.split(/\//).pop(),
                    fileName
                );
                grunt.log.writeln(url + '->' + newUrl);
                return newUrl;
            }
        }
    }

    return url;
};

return rewriter;

};