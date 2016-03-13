var IDComponent = require("./Components/id-component.js").IDComponent;
var CONFIG = require('../config.js');

var DescendAttack = function(){
    IDComponent(this);
    this.getDamage = function(){
    	return 10;
    };

};


DescendAttack.cooldown = CONFIG.FLY_1_CD;


exports.DescendAttack = DescendAttack;
