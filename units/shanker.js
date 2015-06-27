/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
Player = require("./player").Player;
var util = require("util");

var Shanker = function(name, team){
	var skeleton = new Player(100, name, team, 60/2);

	skeleton.getCharacterType = function(){
		return "Shanker";
	};
	skeleton.getDamage = function(){
		return 20;
	};
	var speed = 12;
	/* */
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
     skeleton.getHeight = function(){
         return 60;
         };
        skeleton.getWidth = function(){
            return 40;
            };
	return skeleton;
};

exports.Shanker = Shanker;
