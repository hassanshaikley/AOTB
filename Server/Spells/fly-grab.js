var IDComponent = require("../Components/id-component.js").IDComponent;

var FlyGrab = function(){
    IDComponent(this);
    this.getDamage = function(){
    	return 0;
    };


};
exports.FlyGrab = FlyGrab;
