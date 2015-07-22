/* Units include towers, NPCs, and players
 * A Base unit has health, a position
 */
exports.BaseUnitComponent = function(maxHp, width, height, that){
    
    var x = 1500;
    var y = 250;

    var name = "unknown";
	
	if (maxHp == null){
		throw("Dude come on, you need health to create a base unit");
	}

    that.spellOneCastTime = 0;
    that.spellTwoCastTime = 0;
    that.hitby = [];

    var currHp = maxHp;

	that.getHp = function(){
		return currHp;
	};

	that.doDamage = function(damage){
		currHp = currHp -damage;
	};

	that.getWidth = function(){
		return width;
	};

	that.getHeight = function(){
		return height;
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

    that.getName = function(){
    	return name;
    };
    that.setName = function(newName){
    	name = newName;
    };

    this.update = function(){
    	//perhaps apply damage that has been given to this unit?
    }
};