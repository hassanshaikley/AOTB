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
	this.doEffect = function(player){
		//nothing
	};

	this.getHalfWidth = function(){
		return 50;
	};

	this.getHeight = function(){
		return 50;
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
            x= newX;
	};

	//old n buggy
	this.setY = function(newY) {
	    y = newY;
	};
	return this;
};

exports.Spell = Spell;
