var IDComponent = require("../Components/id-component.js").IDComponent;
    var PositionComponent = require("./Components/position-component.js").PositionComponent;

var util = require("util");
/* */
var ShankerBomb = function(meteorX, mCaster, _team) {
    var caster = mCaster;
    var caster_team;
    var team = _team;
    var x = meteorX,
        y = -1000,
        active = true; //active spells can hurt this specific client  - this makes absolutely no sense. lol
    IDComponent(this);
    PositionComponent(this, x, y);

    /*
     * Array of who this has hit and according to whom
     * Key Value pair is the order of WhoSaid, WhoItHit
     */
    var collisions = [];
    this.hasHit = function(id) {
        // If Array already contains this ID, ignore
        for (var i = 0; i < collisions.length; i++) {
            if (collisions[i] == id) {
                return;
            };
        };
        collisions.push(id);
        return;
    };
    this.getHalfWidth = function() {
        return 30;
    };
    this.getHalfHeight = function() {
        return 50;
    };
    this.getTeam = function() {
        return team;
    };
    this.getDamage = function() {
        return 15;
    };
    this.getHeight = function() {
        return 20;
    };
    this.update = function() {

    };
    this.getActive = function() {
        return active;
    };
    this.doEffect = function(obj) {
        //do nothing
    };

    this.getDamage = function() {
        return 25;
    };
    return this;
};

ShankerBomb.getHalfWidth = function() {
    return 18;
};
exports.ShankerBomb = ShankerBomb;
