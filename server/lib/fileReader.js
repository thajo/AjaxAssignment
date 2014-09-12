//fileReader.js

'use strict';

var fs = require('fs');

exports.readFile = function(url) {
	if(typeof url === 'string' && url.endsWith('.json')) {
		var data = null;
		try {
			// try to read the file here - Dp it syncronus 
			// 
			data = fs.readFileSync(url);
			data = JSON.parse(data);
			return data;
		}
		catch(err) {
			//console.log(err);
			return false;
		}
	}
	else {
		return false;	
	}
	
};

// http://stackoverflow.com/questions/280634/endswith-in-javascript
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}