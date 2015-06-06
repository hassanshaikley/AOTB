
/* There should be spells and projectiles... */
var Spell = require("./spell").Spell; // so it can inherits :D 
var Spells = require("../spellsandprojectiles").Spells;


var Stealth = function(_x, _y, _team) {
	_y = 510;
	var spell = new Spell(_x, _y, _team, 10);


};

Stealth.getCooldown = function(){
	return 5000;
};

exports.Stealth = Stealth;
