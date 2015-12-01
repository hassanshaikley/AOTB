/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
var MovementComponent = require("./movement_component.js").MovementComponent;
var BaseUnitComponent = require("./base_unit_component.js").BaseUnitComponent;
var BaseTeamComponent = require("./base_team_component.js").BaseTeamComponent;
//var util = require("util");
//var Point = require("../point.js").Point;
var Redhatter = function(team) {
    var health = 70;
    var speed = 9;
    var width = 50;
    var height = 68;
    var myMovementComponent = new MovementComponent(speed, this);
    var myBaseUnitComponent = new BaseUnitComponent(health, width, height, this);
    var myBaseTeamComponent = new BaseTeamComponent(this);
    this.setTeam();
    // var skeleton = new Player(70, name, team, 80/2);
    this.emptyYSpace = 10;
    this.getDamage = function() {
        return 15;
    };
    this.getCharacterType = function() {
        return "Redhatter";
    };
    var that = this;
    this.update = function() {
        myMovementComponent.update(that);
        myBaseUnitComponent.update();
        myBaseTeamComponent.update();
    };
    this.attackEffect = function(obj) {
        console.log("OBJ DIR" + obj.direction);
        console.log("OBJ THO " + JSON.stringify(obj));
        if (obj.direction == "right"){
            obj.hits.setX(obj.hits.getX()+100)
        } else {
            obj.hits.setX(obj.hits.getX()-100)
        }
    };
};
exports.Redhatter = Redhatter;
