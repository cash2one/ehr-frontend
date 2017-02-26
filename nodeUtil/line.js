/**
 * @file 统计src目录下的代码行数
 * @author yanlingling@baijiahulian.com
 *
 */
var fs = require('fs');
var line = 0;
var fileline = {};

function walk(path) { var dirList = fs.readdirSync(path);
    dirList.forEach(function (item) {
        if (fs.statSync(path + '/' + item).isDirectory()) {
            walk(path + '/' + item);
        } else {
            computeLine(path + '/' + item);
            //fileList.push(path + '/' + item);
        }
    });
}
function computeLine(path) {
    var data = fs.readFileSync(path);
    var reg = /(\.png|\.jpg|\.gif|\.eot|\.svg|\.woff|\.ttf)$/i;
    if (reg.test(path)) {
        return;
    }
    var lines = data.toString().split('\n').length;
    fileline[path] = lines;
    line += lines;
}
walk('./src');
console.log(fileline);
console.log('sum' + line);
