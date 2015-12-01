/**************************************************
 ** FLY CLASS IN SERVER
 **************************************************/
var MovementComponent = require("./movement_component.js").MovementComponent;
var BaseUnitComponent = require("./base_unit_component.js").BaseUnitComponent;
var BaseTeamComponent = require("./base_team_component.js").BaseTeamComponent;
var Fly = function(team) {
    var speed = 14;
    var health = 50;
    var width = 50;
    var height = 84;
    var ySpeed = speed;
    var myMovementComponent = new MovementComponent(speed, this, ySpeed); // handles key input
    var myBaseUnitComponent = new BaseUnitComponent(health, width, height, this);
    var myBaseTeamComponent = new BaseTeamComponent(this);
    this.setTeam();
    var descendAttack = false;
    this.setDescendAttack = function(boolean_thing) {
        descendAttack = boolean_thing;
    };
    this.getDescendAttack = function() {
        return descendAttack;
    };
    this.getCharacterType = function() {
        return "Fly";
    };
    this.getDamage = function() {
        return 15;
    };
    this.drop = function() {
        that.setY(that.getY() + 100);
    };
    var that = this;
    this.update = function() {
        myMovementComponent.update(that);
        myBaseUnitComponent.update();
        myBaseTeamComponent.update();
    };
    this.attackEffect = function(obj) {

    };
};
exports.Fly = Fly;