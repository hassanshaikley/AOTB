/*
 * In order for things to be collidable they need this!
 */
var new_id = 0;
exports.IDComponent = function(that) {
    console.log("HII MADE A ID COMP OK LOL ID IS " + new_id);
    var id = new_id++;
    that.getID = function() {
        return id;
    };
};