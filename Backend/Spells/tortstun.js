var Spell = require("./spell").Spell; // so it can inherits :D
//var Spells = require("../spellsandprojectiles").Spells;
var IDComponent = require("../Components/id-component.js").IDComponent;
var PositionComponent = require("./Components/position-component.js").PositionComponent;

var TortStun = function(_x, _y, _team) {
    _y = 490;
   // var spell = new Spell(_x, _y, _team, 10);

    //it needs a position (so an x and y, getX and getY)
    //it needs damage
    //it needs a team
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
    }
    var age = 0; //timer for damage
    this.hit = []
    this.getHalfWidth = function() {
        return 40;
    };
    this.getHeight = function() {
        return 57;
    };
    this.doEffect = function(obj) {
        console.log("\n\nABOUT TO IMMOBILIZE" + JSON.stringify(player));
        obj.player.immobilize(400);
    };
    /* Returns the cooldown for this spell*/
    this.update = function() {
        age++;
    //    var index = Spells.spellsarray.indexOf(this);
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
TortStun.getCooldown = function() {
    return 3000;
};
exports.TortStun = TortStun;