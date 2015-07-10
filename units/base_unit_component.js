/* Units include towers, NPCs, and players
 * A Base unit has health, a position
 */
exports.BaseUnitComponent = function(_health, _position){
	if (_health == null){
		throw("Dude come on, you need health to create a base unit");
	}
	var health = _health;
	
	// |||    * would be the center position of the unit
	// |*|      
	// |||
	if (_position == null){
		var center_position = new Point(0, 0); 	
	} else {
		// May need to check to make sure that _position is an instance of Point
		if (_position instanceof Point){
			center_position = _position; 
		} else {
			throw("Dude. Seriously that's not a point.")
		}
	}
};