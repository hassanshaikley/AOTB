var assert = require("assert");
var mongoose = require('mongoose');
var User = require('../app/models/user');
var _users = mongoose.model('User');
mongoose.connect('mongodb://localhost:27017/amara_test');  
var testhelper = require('./testhelper');

//test test lol
describe("Swag", function() {
  describe(".parse()", function() {
    it("should detect malformed JSON strings", function(){
      //Test Goes Here
    });
  });
});

