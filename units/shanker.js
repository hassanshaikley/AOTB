/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
var MovementComponent = require("./movement_component.js").MovementComponent;
var BaseUnitComponent = require("./base_unit_component.js").BaseUnitComponent;
var BaseTeamComponent = require("./base_team_component.js").BaseTeamComponent;

var Shanker = function(team){
	var speed = 12;
	var health = 80;
	var width = 50;
	var height = 50;

    var myMovementComponent = new MovementComponent(speed, this); // handles key input
    var myBaseUnitComponent = new BaseUnitComponent(health, width, height, this); 
    var myBaseTeamComponent = new BaseTeamComponent(this);


    myBaseTeamComponent.setTeam(0);

	this.getCharacterType = function(){
		return "Shanker";
	};
	this.getDamage = function(){
		return 20;
	};

	this.getAlive = function(){
		return "the fuck okee";
	};

	
	this.windWalk = function(length){
		skeleton.invis = true;
		setTimeout(function(){ skeleton.invis = false }, length);
	};
    this.height =   60;
    this.width = 40;
    var that = this;
    this.update = function(){
        myMovementComponent.update(that);
        myBaseUnitComponent.update();
        myBaseTeamComponent.update();
    };

};

exports.Shanker = Shanker;
