/**
 * @file 替换图片cdn地址
 * @author mayue@baidu.com
 */
module.exports = function(grunt) {

var rewriter = function (url) {
    if (url.indexOf('http:') >= 0) {
        return url;
    } else {
        var summary = grunt.filerev.summary;
        for (var key in summary) {
            var replacedPicName = key.split(/\//).pop();
            var urlPicName = url.split(/\//).pop();
            if (urlPicName == replacedPicName) {
                var cdnList = [
                    'tuiguang-p1.bdstatic.com',
                    'tuiguang-p2.bdstatic.com',
                    'tuiguang-p3.bdstatic.com',
                    'tuiguang-s1.bdstatic.com',
                    'tuiguang-s2.bdstatic.com',
                    'tuiguang-s3.bdstatic.com'
                ];

                var fileName = summary[key].split(/\//).pop();
                var md5Value = fileName.split('.')[1];
                var newUrl = 'http://'
                    + cdnList[parseInt(md5Value, 16) % 6]
                    + '/asset/common/img/' + fileName;
                grunt.log.writeln(url + '->' + newUrl);
                return newUrl;
            }
        }
    }

    return url;
};

return rewriter;

};