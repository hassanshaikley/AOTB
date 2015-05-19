Spell = require("./spell").Spell; // so it can inherits :D 
Spells = require("../spellsandprojectiles").Spells;

var TortStun = function(_x, _y, _team) {
	var spell = new Spell(_x, _y, _team, 10);
	var speed = 10;
	var width = 50;
	util.log(" -->"+_x);
	var age = 0; //timer for damage
	spell.hit = []
	spell.getHalfWidth = function(){
			return 50;
	};
	spell.doEffect = function(player){
		player.stun(1000);
	};

	spell.update = function(){
		age++;
		var index = Spells.spellsarray.indexOf(this);
		if (age == 15){ //do damage and disappear
			//look for everyone in range and do damage to them + stun them
			for (var _i = 0; _i < players.length; _i++){
				var dist = players[_i].getX() - spell.getX()  -110;
				if (Math.abs(dist) <= 50 ){ //also make sure the player is near to the ground
					//stun this dude --
					players[_i].setHp(players[_i].getHp() - spell.getDamage());	
					players[_i].stun(1000); //stuns for 1 second
				}
			}
			Spells.spellsarray.splice(index, 1);
		};
	};
	return spell; 
};

exports.TortStun = TortStun;
