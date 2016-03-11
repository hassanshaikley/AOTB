var Spell = require("./spell").Spell; // so it can inherits :D
var IDComponent = require("./Components/id-component.js").IDComponent;
var PositionComponent = require("./Components/position-component.js").PositionComponent;

var TortStun = function(_x, _y, _team) {
    _y = 490;

    this.getTeam = function(){
        return _team;
    };


    var speed = 10;
    var width = 50;
    var active = true;
    IDComponent(this);
    PositionComponent(this, _x, _y);

    this.getDamage = function() {
        return 15;
    };
    var age = 0; //timer for damage

    this.getHalfWidth = function() {
        return 40;
    };
    this.getHeight = function() {
        return 57;
    };
    this.doEffect = function(obj) {
        console.log("\n\nABOUT TO IMMOBILIZE" + JSON.stringify(obj) + " -- " + obj.hits);
        obj.hits.immobilize(400);
    };

    this.update = function() {
        age++;
        if (age == 15) { //do damage and disappear
            //look for everyone in range and do damage to them + stun them
            active = false;
        };
    };
    this.getActive = function() {
        return active;
    };
    this.name = "tortstun";
    return this;
};

exports.TortStun = TortStun;
