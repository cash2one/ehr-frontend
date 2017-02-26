var fs = require('fs');

//fs.writeFileSync(fileChanges[1].newPath, 'test', function (err) {
fs.writeFile('test.js', 'eeee' ,function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});
