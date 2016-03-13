/* There should be spells and projectiles... */
var Spell = require("./spell").Spell; // so it can inherits :D
var Config = require("./../config.js");
var IDComponent = require("./Components/id-component.js").IDComponent;
var CONFIG = require('../config.js');

var Charge = function(_x, _y, _team) {
    _y = 510;
    var spell = new Spell(_x, _y, _team, 10);
    IDComponent(this);
    this.getDamage = function(){
    	return 0;
    };
};

Charge.cooldown = CONFIG.GRIMES_2_CD;

exports.Charge = Charge;
