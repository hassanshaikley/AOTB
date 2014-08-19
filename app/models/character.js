var mongoose = require('mongoose');

// define the schema for our user model
var characterSchema = mongoose.Schema({

    local            : {
        name         : String,
        race     	 : String,
        experience 	 : int,
    }
});

module.exports = mongoose.model('Character', characterSchema);
