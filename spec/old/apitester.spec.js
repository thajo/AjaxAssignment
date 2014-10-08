//apitester.spec.js
/*"use strict";


var request = require('request');
var sh = require("./spechelper.js");
var state = false;
var base = "http://localhost:";
var counter = 0;
var nrOfTests = 7;
var cF;
function checkAndClose(){
    counter++;

    if(counter >= nrOfTests) {
        cF();
    }
}

describe("API tests", function(){


    sh.startServer(function(closeFnk, port){
       cF = closeFnk;
       base  += port + "/";
        state = true;

    });

    beforeEach(function(){
        waitsFor(function() {
            return state;
        }, "Timeout on checking Redis connection", 2000);

    });

    it('Server should respond to /question/1', function() {
        console.log("Base: " +base +'question/1');
        request.get(base +'question/1', function(err, response){
            console.log(err);
            expect(response.statusCode).toBe(200);
           checkAndClose();
        });
    });

    it('Server should respond to /question/1', function() {
        console.log("Base: " +base +'question/1');
        request.get(base +'question/1', function(err, response){
            console.log(err);
            expect(response.statusCode).toBe(200);
            checkAndClose();
        });
    });

    it('Server should respond to /bad with 404', function() {
        request.get(base +'bad', function(err, response){
            expect(response.statusCode).toBe(404);
            checkAndClose();
        });
    });

    it('Server should respond to /question/1234567xxx with 404', function() {
        request.get(base +'question/1234567xxx', function(err, response){
            expect(response.statusCode).toBe(400);
            checkAndClose();
        });
    });

    it("When a GET is send to /answer/:id a 405 (bad method) should be returned", function() {
        request.get(base +'answer/1', function(error, response, body){

            expect(response.statusCode).toBe(405);
            checkAndClose();

        });
    });

    it("When wrong answer is submitted server should return 400 and a message", function() {
        request.post({
            url:     base + 'answer/1',
            body:    '{"answer" : "1"}',
            headers: {
                'Content-Type': 'application/json'
            }
        }, function(error, response, body){
            expect(response.statusCode).toBe(400);
            checkAndClose();
        });
    });

    it("When correct answer is submitted we should get a 200 and a nextURL", function() {
        request.post({
            url:     base + 'answer/1',
            body:    '{"answer" : "2"}',
            headers: {
                'Content-Type': 'application/json'
            }
        }, function(error, response, body){
            expect(response.statusCode).toBe(200);
            var mess = JSON.parse(body).message;
            expect(mess).toContain("Correct answer");
            var next = JSON.parse(body).nextURL;
            expect(next).toBeDefined();
            checkAndClose();
        });
    });


});
*/
