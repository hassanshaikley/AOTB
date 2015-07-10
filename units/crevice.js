/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
Player = require("./player").Player;

var Crevice = function(name, team){
  var skeleton = new Player(100, name, team, 30);

  skeleton.getCharacterType = function(){
    return "Crevice";
  };
	skeleton.getDamage = function(){
		return 10;
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
         return 30;
         };
        skeleton.getWidth = function(){
            return 40;
            };


  return skeleton;
};

exports.Crevice = Crevice;
