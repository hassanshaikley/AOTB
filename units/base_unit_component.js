/* Units include towers, NPCs, and players
 * A Base unit has health, a position
 */
export.BaseUnitComponent = function(_health){
	if (_health == null){
		throw("Dude come on, you need health to create a base unit");
	}
	var health = _health;
	var position = new Position(0, 0);
};