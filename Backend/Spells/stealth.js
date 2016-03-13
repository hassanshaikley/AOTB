/* There should be spells and projectiles... */
var Spell = require("./spell").Spell; // so it can inherits :D
var IDComponent = require("./Components/id-component.js").IDComponent;
var CONFIG = require('../config.js');

var Stealth = function(_x, _y, _team) {
    _y = 510;
    var spell = new Spell(_x, _y, _team, 10);
    IDComponent(this);
    this.getDamage = function(){
    	return 10;
    };
};

Stealth.cooldown = CONFIG.SHANKER_1_CD;

exports.Stealth = Stealth;
