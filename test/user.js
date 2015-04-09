var assert = require("assert");
var mongoose = require('mongoose');
var User = require('../app/models/user');
var _users = mongoose.model('User');
mongoose.connect('mongodb://localhost:27017/amara_test');  
var testhelper = require('./testhelper');

describe("User model", function(){
  describe("should be able to save user", function(){
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

  afterEach(function(done){
    _users.remove({}, function() {      
    }); 
    done(); 
  });


  describe(".save()", function(){
    it("should save new character", function(){
      assert.equal(newUser.email, "j@j.com");
      newUser.createCharacter("hassan", "fly"); 
      assert.equal(1, newUser.characters.count());
    });
  });
});
