// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

var DataBlobSchema = mongoose.Schema({
    name: String,
    referrer: String,
    ip: String,
    date: String,
    time: String
});


module.exports = mongoose.model('DataBlob', DataBlobSchema);
