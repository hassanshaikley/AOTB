/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
var MovementComponent = require("./movement_component.js").MovementComponent;
var BaseUnitComponent = require("./base_unit_component.js").BaseUnitComponent;
var BaseTeamComponent = require("./base_team_component.js").BaseTeamComponent;
var Shanker = function(team) {
    var speed = 14;
    var health = 80;
    var width = 40;
    var height = 60;
    var myMovementComponent = new MovementComponent(speed, this); // handles key input
    var myBaseUnitComponent = new BaseUnitComponent(health, width, height, this);
    var myBaseTeamComponent = new BaseTeamComponent(this);
    this.setTeam();
    this.getCharacterType = function() {
        return "Shanker";
    };
    this.getDamage = function() {
        return 20;
    };
    this.windWalk = function(length) {
        skeleton.invis = true;
        var util = require("util");
        util.log("GONE");
        var oldSpeed = that.getSpeed()
        this.setSpeed(oldSpeed * 1.20)
        setTimeout(function() {
            that.invis = false;
            that.setSpeed(oldSpeed);
        }, length);
    };
    var that = this;
    this.update = function() {
        myMovementComponent.update(that);
        myBaseUnitComponent.update();
        myBaseTeamComponent.update();
    };

    //does nothing
    this.attackEffect = function(obj) {

    };
};
exports.Shanker = Shanker;