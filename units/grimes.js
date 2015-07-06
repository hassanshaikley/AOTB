/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
Player = require("./player").Player;
var util = require("util");

var Grimes = function(name, team){
	var skeleton = new Player(100, name, team,  100/2);

	skeleton.getCharacterType = function(){
		return "Grimes";
	};
	skeleton.getDamage = function(){
		return 15;
	};
	var speed = 8;
	skeleton.moveUp = function(){
	};
	skeleton.moveDown = function(){
	};
	skeleton.moveLeft = function(){
		skeleton.move(speed, "left");
	};
	skeleton.moveRight = function(){
		skeleton.move(speed, "right");
	};
        skeleton.getWidth = function(){
            return 40;
            };
	skeleton.getHeight = function(){
	 	return 100;
	};
	return skeleton;
};

exports.Grimes = Grimes;
