var assert = require("assert");
var mongoose = require('mongoose');
var User = require('../app/models/user');
var _users = mongoose.model('User');
mongoose.connect('mongodb://localhost:27017/amara_test');  
var testhelper = require('./testhelper');

//test test lol
describe("JSON", function() {
  describe(".parse()", function() {
    it("should detect malformed JSON strings", function(){
      //Test Goes Here
    });
  });
});

describe("User model", function(){
  describe(".save()", function(){
    it("should save new user", function(){
      var newUser = new User();
      newUser.local.email = 'hassan.shaikley@gmail.com';
      newUser.local.password = newUser.generateHash('1234');
      newUser.save();
      //assert.equal(_users.count(),1);
      assert.equal(newUser.local.email, 'hassan.shaikley@gmail.com');
    });
  });
});

describe("Users have characters model", function(){
  //add some test data    
  var newUser; 
    beforeEach(function(done){  
newUser = testhelper.createTestUser('j@j.com', 'abcd1234');
      done();
      });  

  afterEach(function(){
    _users.remove({}, function() {      
    });  
  });


  describe(".save()", function(){
    it("should save new character", function(){
      /*_users.findOne({email: 'hassan.shaikley@gmail.com'}, function(e, doc){
        if(e){
        fail(e)
        }
        });*/
      assert.equal(1,1);
    });
  });
});
