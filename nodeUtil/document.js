/**
 * @file 根据mock下面的mock文件，自动生成接口文档
 * @author yanlingling@baijiahulian.com
 *
 */
var fs = require('fs');
var line = 0;
var fileline = {};
var resultString = [
    '<!doctype html>',
    '<html lang="en" ng-app="shiziLogin">',
    '<head>',
    '<meta charset="utf-8">',
    '</head>',
    '<body>'
].join('\n');
var count = 0;
var beautify = require('js-beautify').js_beautify;
var allPathParam = {};

/**
 *  处理参数文件
 */
(function processParamFile() {
    var paramData = fs.readFileSync('./param.txt');
    var lines = paramData.toString().split('\n');
    for (var i = 1, item; item = lines[i++];) {
        var line = JSON.parse(item);
        var path = line.path.replace(/_/g, '/')
        allPathParam[path] = {
            type: line.type,
            param: line.param
        }

    }
})();
function walk(path) {
    var dirList = fs.readdirSync(path);
    dirList.forEach(function (item) {
        if (fs.statSync(path + '/' + item).isDirectory()) {
            walk(path + '/' + item);
        } else {
            createDocument(path + '/' + item);
            count++;
        }
    });
}

/**
 * 得到请求参数
 * @param  {string} path 请求路径
 */
function getParam(path) {
    if (allPathParam[path]) {
        return beautyCode(JSON.stringify(allPathParam[path].param));
    }
    return 'no path find ' + path;
}

/**
 * 得到请求方法
 * @param  {string} path 请求路径
 */
function getType(path) {
    if (allPathParam[path]) {
        return allPathParam[path].type;
    }
    return 'no path find' + path;
}

/**
 * 格式化代码
 * @param {string} str 代码chuan
 */
function beautyCode(str) {
    return beautify(str, {indent_size: 4});
}
function creatTable(param) {
    var htmlStr = [
            '</br><p>' + count + param.name + '</p>',
        '<table cellspacing="0" style="width: 100%">'
    ];

    function createRow(name, content) {
        var htmlStr = ['    <tr>'];
        htmlStr[htmlStr.length] = '        <td style="width: 20%;border:1px solid gray;">';
        htmlStr[htmlStr.length] = '        ' + name;
        htmlStr[htmlStr.length] = '        </td>';
        htmlStr[htmlStr.length] = '        <td style="border:1px solid gray;">';
        htmlStr[htmlStr.length] = '       <pre>' + content + '</pre>';
        htmlStr[htmlStr.length] = '        </td>';
        htmlStr[htmlStr.length] = '    </tr>';
        return htmlStr.join('\n');
    }

    htmlStr[htmlStr.length] = createRow('接口名称', param.name);
    htmlStr[htmlStr.length] = createRow('接口类型', param.type);
    htmlStr[htmlStr.length] = createRow('path', param.path);
    htmlStr[htmlStr.length] = createRow('参数', param.param);
    htmlStr[htmlStr.length] = createRow('返回内容', param.response);
    htmlStr[htmlStr.length] = '</table>';
    return htmlStr.join('\n');

}
function createDocument(path) {
    var reg = /(\.js)$/i;
    if (!reg.test(path) || /(util\.js)$/.test(path)) {
        return;
    }
    /*    if (path != './mock/_teacher_search.js') {
     return;
     }*/
    var data = fs.readFileSync(path).toString();
    var name = data.match(/@file.*/);
    var param = {};
    param.path = path.replace(/..\/mock\//g, '')
        .replace(/_/g, '/').replace(/\.js/g, '');
    param.name = name[0].replace('@file', '');
    param.type = getType(param.path);
    param.param = getParam(param.path);
    eval(data);
    param.response = mockCreatFunction();
    if (param.response.data) {
        if (param.response.data instanceof Array) {
            param.response.data = param.response.data.splice(0, 1);
        }
        if (param.response.data.list) {
            param.response.data.list = param.response.data.list.splice(0, 1);
        }
    }
    param.response = beautyCode(JSON.stringify(param.response));
    resultString += creatTable(param);
}
walk('../mock');
resultString += '</body></html>';
fs.writeFile('./document.html', resultString);
