/**
 * @file 拆分旧的mock/main.js为一个个单独的小文件，
 * @author yanlingling@baijiahulian.com
 *
 */
var fs = require('fs');
function excute() {
    var data = fs.readFileSync('./mock/main.js');
    var reqs = data.toString().split('|||');
    for (var i = 0, req; req = reqs[i++];) {
        var index = req.indexOf(':');
        var fileName = req.slice(0, index);
        var content = 'exports.response = ' + req.slice(index + 1, req.length);
        var lastIndex = content.lastIndexOf(',');
        content = content.slice(0, lastIndex);
        fs.writeFile('./mock/' + fileName + '.js', content + ';');
    }
}
function splitEval() {
    var data = fs.readFileSync('./mock/main0.js');
    var reqs = data.toString().split('|||');
    for (var i = 0, req; req = reqs[i++];) {
        var index = req.indexOf(':');
        var fileName = req.slice(0, index);
        var comment = "/**\n* @file 数据构造函数\n* yanlingling@baijiahulian.com\n*/\n";
        var content = comment + 'var mockCreatFunction = ' + req.slice(index + 1, req.length);
        // 截去末尾的逗号
        if (i != reqs.length) {
            var lastIndex = content.lastIndexOf(',');
            content = content.slice(0, lastIndex);
        }
        fs.writeFile('./mock/' + fileName + '.js', content + ';');
    }
}
//excute();
splitEval();