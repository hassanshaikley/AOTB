var User = require('../app/models/user');

module.exports = {
  createTestUser: function(email, password){
                    var newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.save();
                    return newUser;
                  }
};
