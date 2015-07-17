/* Units include towers, NPCs, and players
 * A Base unit has health, a position
 */
exports.BaseUnitComponent = function(maxHp,that){
    
    var x = 1500;
    var y = 250;
	
	if (maxHp == null){
		throw("Dude come on, you need health to create a base unit");
	}

    that.spellOneCastTime = 0;
    that.spellTwoCastTime = 0;

    var currHp = maxHp;


	that.getHp = function(){
		return currHp;
	};
	that.doDamage = function(damage){
		currHp = currHp -damage;
	};

    that.isStunned = function(){
        return 0;
    };

    that.getX = function(){
    	return x;
    };
    
    that.getY = function(){
    	return y;
    };
    
    that.setX = function(_x){
    	x = _x;
    };
    that.setY = function(_y){
    	y = _y;
    };

    this.update = function(){
    	//perhaps apply damage that has been given to this unit?
    }
};