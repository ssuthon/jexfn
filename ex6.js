var fs = require('fs');
var data = JSON.parse(fs.readFileSync('ex6.json', 'utf8'));

console.log(data);