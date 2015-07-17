/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/


var MovementComponent = require("./movement_component.js").MovementComponent;
var BaseUnitComponent = require("./base_unit_component.js").BaseUnitComponent;
var BaseTeamComponent = require("./base_team_component.js").BaseTeamComponent;
//var util = require("util");
//var Point = require("../point.js").Point;
var Redhatter = function(name, team){
    var health = 70;
    var speed = 9;

    var myMovementComponent = new MovementComponent(); // handles key input
    var myBaseUnitComponent = new BaseUnitComponent(health, this); //handles hp & movement
    var myBaseTeamComponent = new BaseTeamComponent(this);

    this.height = 68;

    this.getAlive = function(){
        return true;
    }

    this.getName = function(){
        return "idk man";
    }


    this.getHp = function(){
        return 50;
    }

   // var skeleton = new Player(70, name, team, 80/2);

    this.emptyYSpace = 10;
    
    this.getDamage = function(){
	   return 15;
    };

    this.getCharacterType = function(){
        return "Redhatter";
    };
    

    this.getWidth = function(){
        return 50;
    };
    var that = this;
    this.update = function(){
        myMovementComponent.update(that, speed);
        myBaseUnitComponent.update();
        myBaseTeamComponent.update();
    };
};

exports.Redhatter = Redhatter;
