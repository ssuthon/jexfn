var fs = require('fs');
var data = JSON.parse(fs.readFileSync('ex6.json', 'utf8'));

var result = {};	//empty map, object
for(var i = 1; i <=9; i++){
	result[i] = 0;
}
for(var i = 0; i < data.length; i++){
	result[data[i]]++;
}
var max_val = result[1];
var max_key = 1;
for(var i = 2; i <=9; i++){
	if(max_val < result[i]){
		max_val = result[i];
		max_key = i;
	}
}
console.log("Ans = " + max_key);
