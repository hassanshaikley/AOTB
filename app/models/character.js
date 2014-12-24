var mongoose = require('mongoose');

// define the schema for our user model
var CharacterSchema = mongoose.Schema({
  /* Some places use Schema.types.objectidi
   * http://mongoosejs.com/docs/populate.html
   */
    _user: { type: mongoose.Schema.ObjectId, ref: 'User' },
 	  name          : { type: String, default: "Stillname"},
    loc_x       : { type: Number, default: 0 },
    race     	  : { type: String, default: "Fly" },
    honor  : { type: Number, default: 0},
    gold 		    : { type: Number, default: 0}
});

module.exports = mongoose.model('Character', CharacterSchema);
