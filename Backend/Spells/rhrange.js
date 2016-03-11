var IDComponent = require("./Components/id-component.js").IDComponent;
var RHRange = function(_x, _y, _direction, _team) {
    var speed = 10;
    IDComponent(this);
    if (_direction == "left") {
        speed = -speed;
    }
    var startX = _x;
    var active = true;
    this.getTeam = function() {
        return _team;
    }
    this.getActive = function(){
        return active;
    };
    this.getX = function(){
        return _x;
    };
    this.getY = function(){
        return y;
    };
    this.getDamage = function() {
        return 5;
    };
    this.hit = []
    this.getHalfWidth = function() {
        return 10;
    };
    this.getHeight = function() {
        return 20;
    };
    this.doEffect = function(obj) {};
    /* Returns the cooldown for this spell*/
    this.update = function() {
//        var index = Spells.spellsarray.indexOf(this);
        //look for everyone in range and do damage to them + stun them
        _x = _x + speed;
        if (Math.abs(startX - _x) > 200) {
                                        //Spells.spellsarray.splice(index, 1);
        }
    };
    this.name = "rhrange";
};

exports.RHRange = RHRange;
