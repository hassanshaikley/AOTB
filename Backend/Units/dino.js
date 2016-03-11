/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
var MovementComponent = require("./Components/movement-component.js").MovementComponent;
var BaseUnitComponent = require("./Components/unit-component.js").BaseUnitComponent;
var BaseTeamComponent = require("./Components/team-component.js").BaseTeamComponent;

var Dino = function(team) {

    var speed = 13;
    var health = 140;
    var width = 40;
    var height = 60;
    var myMovementComponent = new MovementComponent(speed, this); // handles key input
    var myBaseUnitComponent = new BaseUnitComponent(health, width, height, this);
    var myBaseTeamComponent = new BaseTeamComponent(this);
    this.setTeam();
    this.getCharacterType = function() {
        return "Dino";
    };
    this.getDamage = function() {
        return 18;
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
exports.Dino = Dino;
