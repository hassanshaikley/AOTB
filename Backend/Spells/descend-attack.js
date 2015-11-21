var IDComponent = require("../Components/id-component.js").IDComponent;

var DescendAttack = function(){
    IDComponent(this);
    this.getDamage = function(){
    	return 10;
    };

};
DescendAttack.getCooldown = function() {
    return 10000;
};
exports.DescendAttack = DescendAttack;