var assert = require("assert");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/amara_test');  

//test test lol
describe("JSON", function() {
  describe(".parse()", function() {
    it("should detect malformed JSON strings", function(){
      //Test Goes Here
    });
  });
});

describe("User model", function(){
  var User = require('../app/models/user');
  describe(".save()", function(){
    it("should save new user", function(){
      var newUser = new User();
      newUser.local.email = 'hassan.shaikley@gmail.com';
      newUser.local.password = newUser.generateHash('1234');
      newUser.save();
      var _users = mongoose.model('User');
      //assert.equal(_users.count(),1);
      assert.equal(newUser.local.email, 'hassan.shaikley@gmail.com');
      var _findByEmail = function(email, success, fail){    
        _users.findOne({email:email}, function(e, doc){      
          if(e){        
            fail(e)      
          }else{       
            success(doc);      
          }    
        });
      }  
    });
  });
});
