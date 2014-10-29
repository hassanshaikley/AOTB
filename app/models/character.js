var mongoose = require('mongoose');

// define the schema for our user model
var CharacterSchema = mongoose.Schema({
 	name          : { type: String, default: "Stillname"},
    race     	  : { type: String, default: "Fly" },
    experience  : { type: Number, default: 0},
    gold 		    : { type: Number, default: 0}
});

module.exports = mongoose.model('Character', CharacterSchema);
