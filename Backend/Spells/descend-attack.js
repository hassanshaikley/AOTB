var IDComponent = require("../Components/id-component.js").IDComponent;

var DescendAttack = function(){
    IDComponent(this);

};
DescendAttack.getCooldown = function() {
    return 6000;
};
exports.DescendAttack = DescendAttack;