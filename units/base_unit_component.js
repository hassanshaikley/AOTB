/* Units include towers, NPCs, and players
 * A Base unit has health, a position
 */
var Point = require("../point.js").Point;
exports.BaseUnitComponent = function(_health,that){

	if (_health == null){
		throw("Dude come on, you need health to create a base unit");
	}

    that.spellOneCastTime = 0;
    that.spellTwoCastTime = 0;

	this.health = _health;
	// |||         * would be the center position of the unit
	// |*|      
	// |||
	this.center_position;


	center_position = new Point(0, 0); 	

	that.x = center_position.x;
    that.y = center_position.y;

    this.update = function(){
    	//perhaps apply damage that has been given to this unit?
    }
};