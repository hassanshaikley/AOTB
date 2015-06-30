// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Character = require('./character');
var character = mongoose.model('Character');

var UserSchema = mongoose.Schema({
  local: {
           email: String,
      nickname: String,
    password: String
         },
    characters: [{type: mongoose.Schema.ObjectId, ref: 'Characters'}]

});

var util = require("util");

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app

var User = mongoose.model('User', UserSchema);

UserSchema.methods.createCharacter = function(user, name, race, cb){
  user.save(
      function(err){
        if (err) console.log(err);
        var _char = new Character();
        _char.name = name;
        _char.race = race;
        _char._user = user._id;
        _char.save(function(err, dude){
          if (err) console.log("aah " + err);
          console.log("SAVED " + dude.name);
          user.characters.push(dude);
          user.save();
          return dude;
        });
      });
};




/* WORKS WORKS WORK
   User.findOne(function(err, __user){
   __user.save(
   function(err){
   if (err) console.log(err);
   var _char = new Character();
   _char.name = 'HKS';
   _char.race = "Fly";
   _char._user = __user._id;
   _char.save(function(err, dude){
   if (err) console.log("aah " + err);
   console.log("SAVED " + dude.name);
   __user.characters.push(dude);
   __user.save();
   });
   });
   });*/
/*
User.findOne(function(err, __user){
  UserSchema.methods.createCharacter(__user, "theotherfly", "Fly", function(err, character){
    if(err) console.log(err);
    console.log(character);
  });
}); */

UserSchema.methods.usersCharacters = function(email,cb){
  User.findOne( {'local.email' : email }).exec(function(err, user){
    if (err) console.log("shit");
    var _return = [];

		if (!user){
			console.log("MAN USER IS NULL");
			return
		}
    user.characters.forEach(function(err, i){
      Character.findOne({ "_id" :user.characters[i] }).exec(function(err2, dude){
        _return.push(dude);

        /* Can't think of a smarter way to return :( */
        if ( i == user.characters.length-1)
          cb(_return);
      });
    });
  });
};

UserSchema.methods.usersCharacters('hassan.shaikley@gmail.com', function(characters){
  //console.log("list of characters: " + characters);
  return characters;
});

module.exports = mongoose.model('User', UserSchema);
