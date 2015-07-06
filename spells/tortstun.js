var Spell = require("./spell").Spell; // so it can inherits :D
var Spells = require("../spellsandprojectiles").Spells;

var TortStun = function(_x, _y, _team) {
	_y = 490;
	var spell = new Spell(_x, _y, _team, 10);
	var speed = 10;
	var width = 50;
    spell.getDamage = function(){
        return 15;
}
	var age = 0; //timer for damage
	spell.hit = []
	spell.getHalfWidth = function(){
			return 40;
	};
	spell.getHeight = function(){
			return 57;
	};

	spell.doEffect = function(player){
		player.stun(400);
	};

	  /* Returns the cooldown for this spell*/

	spell.update = function(){
		age++;
		var index = Spells.spellsarray.indexOf(this);
		if (age == 15){ //do damage and disappear
			//look for everyone in range and do damage to them + stun them
			Spells.spellsarray.splice(index, 1);
		};
	};
        spell.name ="tortstun";
	return spell;
};
TortStun.getCooldown = function(){
   	 	return 2000;
  	};


exports.TortStun = TortStun;
