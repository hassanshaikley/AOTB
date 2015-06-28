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
	var speed = 11;
	/* */
	skeleton.moveUp = function(){
	};
	skeleton.moveDown = function(){
	};
	skeleton.moveLeft = function(){
	console.log(skeleton.invis);
            var bonus = 0;
            if (skeleton.invis) {
                bonus = 5;
                }
		skeleton.move(speed + bonus, "left");
	};
	skeleton.moveRight = function(){
            var bonus = 0;
            if (skeleton.invis){
                bonus = 5;
                }
		skeleton.move(speed+bonus, "right");
	};
	skeleton.windWalk = function(length){
		skeleton.invis = true;
		setTimeout(function(){ skeleton.invis = false }, length);
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
