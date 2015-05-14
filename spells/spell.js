/* Parent class for spells in server */
var Spell = function(startX, startY, _team, _damage) {
	var x = startX,
			y = startY,
			team = _team,
			damage = _damage || 25; // damage is default 25
	
	this.hit = [];

	this.update = function(){
		util.log("Yo every spell needs this THIS SHOULDNT BE CALLED MAN");
		y += 50;
		//x += 2;
		var index = Spells.spellsarray.indexOf(this);
		if (y >= 500){
			Spells.spellsarray.splice(index, 1);
		};
	};

	this.getDamage = function(){
		return damage;
	};

	this.getTeam= function(){
		return team;
	};

	this.getX = function() {
		return x;
	};

	this.getY = function() {
		return y;
	};

	//also old and buggy
	this.setX = function(newX) {
		if (newX < 1000){
			x = 1000;
		} else if (newX > 4000){
			x = 4000;
		} else {
			x = newX;
		}
	};

	//old n buggy
	this.setY = function(newY) {
		if (newY > -20 && newY <= 474){
			y = newY;
		} else {
			if ( y<250){
				y =-19;
			} else {
				y =474;
			}
		};
	};
	return this;
};

exports.Spell = Spell;
