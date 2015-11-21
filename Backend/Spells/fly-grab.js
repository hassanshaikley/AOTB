var IDComponent = require("../Components/id-component.js").IDComponent;

var FlyGrab = function(){
    IDComponent(this);
    this.getDamage = function(){
    	return 0;
    };

};
FlyGrab.getCooldown = function() {
    return 6000;
};
exports.FlyGrab = FlyGrab;