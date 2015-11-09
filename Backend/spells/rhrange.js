var Spell = require("./spell").Spell; // so it can inherits :D
var Spells = require("../spellsandprojectiles").Spells;

var RHRange = function(_x, _y, _direction, _team) {
    var spell = new Spell(_x, _y, _team, 10);
    var speed = 10;
    if (_direction == "left"){
        speed = -speed;
    }

    var startX = _x;
    spell.getDamage = function(){
        return 5;
    };

    spell.hit = []

    spell.getHalfWidth = function(){
	return 10;
    };

    spell.getHeight = function(){
	return 20;
    };

    spell.doEffect = function(player){

    };

    /* Returns the cooldown for this spell*/

    spell.update = function(){
	var index = Spells.spellsarray.indexOf(this);
	//look for everyone in range and do damage to them + stun them

        spell.setX(spell.getX() + speed);
        if (Math.abs(startX-spell.getX()) > 200){
            Spells.spellsarray.splice(index, 1);
        }

    };
    spell.name ="rhrange";
    return spell;
};
RHRange.getCooldown = function(){
    return 700;
};


exports.RHRange = RHRange;
