/*
 * In order for things to be collidable they need this!
 */
var new_id = 1;
var IDComponent = function(that) {
    var id = new_id++;
    that.getID = function() {
        return id;
    };

};

IDComponent.generateID = function(){
	new_id++;
	return new_id;
};

exports.IDComponent = IDComponent;
