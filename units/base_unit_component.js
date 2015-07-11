/* Units include towers, NPCs, and players
 * A Base unit has health, a position
 */
var Point = require("../point.js").Point;
exports.BaseUnitComponent = function(_health, _point){
	if (_health == null){
		throw("Dude come on, you need health to create a base unit");
	}

	this.health = _health;
	// |||         * would be the center position of the unit
	// |*|      
	// |||
	this.center_position;


	if (_point == null){
		center_position = new Point(0, 0); 	
	} else {
		// May need to check to make sure that _position is an instance of Point
		if (_point instanceof Point){
			center_position = _poit; 
		} else {
			throw new Error("Dude. Seriously that's not a point.")
		}
	}
	this.x = center_position.x;
	this.y = center_position.y;
};