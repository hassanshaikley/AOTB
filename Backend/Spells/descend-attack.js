var IDComponent = require("../Components/id-component.js").IDComponent;

var DescendAttack = function(){
    IDComponent(this);
    this.getDamage = function(){
    	return 10;
    };

};

exports.DescendAttack = DescendAttack;
