// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Character = require('./character');
var character = mongoose.model('Character');

var UserSchema = mongoose.Schema({
  local: {
    email: String,
    password: String 
  },
  characters: [{type: mongoose.Schema.ObjectId, ref: 'Characters'}] 
              
});

// define the schema for our user model

/*var userSchema = mongoose.Schema({

  local : {
  email        : String,
  password     : String
  },
  characters	 : [ {type: mongoose.Schema.Types.ObjectId, ref: 'Character' }]
  });*/
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
module.exports = mongoose.model('User', UserSchema);

var User = mongoose.model('User', UserSchema);
UserSchema.methods.createCharacter = function(name, race, cb){
  var newCharacter = new Character();
  newCharacter.name = name;
  newCharacter.race = race;
  newCharacter.save(function (err) {
    if (err) return cb(err);
    util.log(this.local.email);
    util.log(this.characters[0].name);

    this.characters.append(newCharacter._id);
    this.save(function (err) { cb(err, newCharacter) });
  });
};

/*

   userSchema.methods.createCharacter = function(name, race, cb){
   var newCharacter = new Character();
   newCharacter.name = name;
   newCharacter.race = race;
   newCharacter.save(function (err) {
   if (err) return cb(err);
   util.log(user.local.email);
   util.log(user.characters);
   user.characters.append(newCharacter);
   user.save(function (err) { cb(err, newCharacter) });
   });
   };
 */
var User = mongoose.model('User', UserSchema);

/*
User.find(function (err, users) {
  if (err) return console.error(err);
  var user = users[0];
  console.log(user);
  console.log("users char is " + user.characters);
  user.createCharacter("lol", "Fly", function (err, character) {
    console.log("CHARACTER IS " + character);

    User.findOne({ email: user.email }).populate('characters').exec(function(err, updatedUser) {
      console.log(err, updatedUser);
    });
  });
});
*/

/*
User.findOne(function(err, chara){
console.log("the swags " + chara); 
});*/


/* WORKS WORKS WORK
User.findOne(function(err, __user){
__user.save(
 function(err){
  if (err) console.log(err);
  var _char = new Character();
  _char.name = 'HKS';
  _char.race = "Fly";
  _char.save(function(err, dude){
    if (err) console.log("aah " + err);
    console.log("SAVED " + dude.name); 
    __user.characters.push(dude);
    __user.save();
  });
});
});*/
User.findOne().populate('Characters').exec(function(err, user){
  if (err) { return console.log(err); }
  console.log("chars are " + user.characters); 
});

