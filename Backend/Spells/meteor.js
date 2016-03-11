var IDComponent = require("./Components/id-component.js").IDComponent;
var util = require("util");
/* */
var Meteor = function(meteorX, mCaster, _team) {
    var caster = mCaster;
    var caster_team;
    this.hit = [];
    var team = _team;
    var x = meteorX,
        y = -100,
        active = true; //active spells can hurt this specific client  - this makes absolutely no sense. lol
    IDComponent(this);
    /*
     * Array of who this has hit and according to whom
     * Key Value pair is the order of WhoSaid, WhoItHit
     */
    var collisions = [];
    this.hasHit = function(id) {
        "ok lol";
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
        y += 50;
        /* Instead of this mark itself as inactive */
        if (y >= 500) {
            //      Spells.spellsarray.splice(index, 1);
            active = false;
        };
    };
    this.getActive = function() {
        return active;
    };
    this.doEffect = function(obj) {
        //do nothing
    };
    this.getX = function() {
        return x;
    };
    this.getY = function() {
        return y;
    };
    this.getDamage = function() {
        return 25;
    };
    return this;
};

Meteor.getHalfWidth = function() {
    return 18;
};
exports.Meteor = Meteor;
