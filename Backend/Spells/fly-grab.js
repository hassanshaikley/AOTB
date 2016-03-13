var IDComponent = require("./Components/id-component.js").IDComponent;

var CONFIG = require('../config.js');

var FlyGrab = function(){
    IDComponent(this);
    this.getDamage = function(){
    	return 0;
    };


};

FlyGrab.cooldown = CONFIG.FLY_2_CD;


exports.FlyGrab = FlyGrab;
