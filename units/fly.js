/**************************************************
 ** FLY CLASS IN SERVER
 **************************************************/
Player = require("./player").Player;
var Fly = function(team){
	var skeleton =  new Player(50, name, team, 84/2);
	var descendAttack = false;

	skeleton.setDescendAttack = function(boolean_thing){
		descendAttack = boolean_thing;
	};

	skeleton.getDescendAttack = function(){
		return descendAttack;
	};

	skeleton.getCharacterType = function(){
		return "Fly";
	};
	skeleton.getDamage = function(){
	  return 15;
	};

	var speed = 14;
	/* */

	skeleton.moveUp = function(){
		skeleton.move(speed, "up");
	};
	skeleton.moveDown = function(){
		skeleton.move(speed, "down");
		if (descendAttack === true && skeleton.getY() >= 475){
			descendAttack = false; //now should notify all players
		}
	};
	skeleton.moveLeft = function(){
		skeleton.move(speed, "left");
	};
	skeleton.moveRight = function(){
		skeleton.move(speed, "right");
	};

    skeleton.getHeight = function(){
        return 84;
        };
   skeleton.getWidth = function(){
        return 50;
    };
    return skeleton;
};

exports.Fly = Fly;
