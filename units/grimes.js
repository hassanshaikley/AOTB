/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
var MovementComponent = require("./movement_component.js").MovementComponent;
var BaseUnitComponent = require("./base_unit_component.js").BaseUnitComponent;
var BaseTeamComponent = require("./base_team_component.js").BaseTeamComponent;


var Grimes = function(team){
	var speed = 8;
	var health = 100;
	var width = 40;
	var height = 60;

    var myMovementComponent = new MovementComponent(speed, this); // handles key input
    var myBaseUnitComponent = new BaseUnitComponent(health, width, height, this); 
    var myBaseTeamComponent = new BaseTeamComponent(this);


	this.getCharacterType = function(){
		return "Grimes";
	};
	this.getDamage = function(){
		return 15;
	};
	
    this.getAlive = function(){
        return true;
    };

    var that = this;

    this.update = function(){
        myMovementComponent.update(that);
        myBaseUnitComponent.update();
        myBaseTeamComponent.update();
    };

};

exports.Grimes = Grimes;
