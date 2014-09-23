//fileReader.js

'use strict';

var fs = require('fs');

exports.readFile = function(url) {
	if(typeof url === 'string' && url.endsWith('.json')) {
		var data = null;
		try {
			// try to read the file here - Dp it syncronus 
			// encode it for returning a correct string
			data = fs.readFileSync(url, {encoding: 'utf-8'});
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