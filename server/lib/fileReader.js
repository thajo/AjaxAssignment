//fileReader.js
/*
	This module is reading a file (param url) in an syncronus way
	The file must be a JSON-file.
*/

(function(){
	'use strict';
	var fs = require('fs');



	var readFile = function(url) {
		if(typeof url === 'string' && url.endsWith('.json')) {
			var data;
			try {
				// try to read the file here - Dp it syncronus
				// encode it for returning a correct string
				data = fs.readFileSync(url, {encoding: 'utf-8'});
				return data;
			}
			catch(err) {
				return false;
			}
		}
		else {
			return false;
		}
	};

	// Export the readFile function for **Node.js**, with
	// backwards-compatibility for the old `require()` API. If we're in
	// the browser, add `_` as a global object.
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = readFile;
		}
		exports.readFile= readFile;
	} else {
		// This is a nodejs module, cant run in browser
	}

	// http://stackoverflow.com/questions/280634/endswith-in-javascript
	if (typeof String.prototype.endsWith !== 'function') {
		String.prototype.endsWith = function(suffix) {
			return this.indexOf(suffix, this.length - suffix.length) !== -1;
		};
	}
}());
