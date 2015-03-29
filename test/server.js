var assert = require("assert");
var User = require('../app/models/user');
var testhelper = require('./testhelper');

//test test lol
describe("Swag", function() {
  describe(".parse()", function() {
      var mongoose = require('mongoose');
      mongoose.connect('mongodb://localhost:27017/amara_test');  
      var _users = mongoose.model('User');
    it("should detect malformed JSON strings", function(){
      //Test Goes Here
    });
  });
});

