//filereader_test.js
'use strict';

var fileReader = require('../lib/fileReader.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
	test.expect(numAssertions)
	test.done()
  Test assertions:
	test.ok(value, [message])
	test.equal(actual, expected, [message])
	test.notEqual(actual, expected, [message])
	test.deepEqual(actual, expected, [message])
	test.notDeepEqual(actual, expected, [message])
	test.strictEqual(actual, expected, [message])
	test.notStrictEqual(actual, expected, [message])
	test.throws(block, [error], [message])
	test.doesNotThrow(block, [error], [message])
	test.ifError(value)
*/

exports.fileReader = {
  setUp: function(done) {
	// setup here
	done();
  },
  'functionallity': function(test) {
	test.expect(4);
	// tests here
	test.equal(fileReader.readFile(), false, 'readFile() without parameters shoul return falsy.');
	test.equal(fileReader.readFile("noFile"), false, 'readFile("noFile") without correct should return falsy.');
	test.strictEqual( 
		typeof fileReader.readFile("./data/data.json"),  // relative path from server root
		'object', 
		'readFile with a correct searchpath (ends with .json) should return an object.');
	
	test.ok(false === fileReader.readFile("../data/dat.json"), "Bad filepath should not find a file and return falsy");

	test.done();
  }
};

