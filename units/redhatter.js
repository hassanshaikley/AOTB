/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/

Player = require("./player").Player; // so it can inherits :D
var util = require("util");

var Redhatter = function(name, team){
    var skeleton = new Player(70, name, team, 80/2);
    var speed = 9;
    /* */

    skeleton.emptyYSpace = 10;

    skeleton.moveUp = function(){
        //   skeleton.move(speed, "up");
    };
    skeleton.getDamage = function(){
	return 15;
    };
    skeleton.moveDown = function(){
        //    skeleton.move(speed, "down");
    };
    skeleton.moveLeft = function(){
        skeleton.move(speed, "left");
    };
    skeleton.moveRight = function(){
        skeleton.move(speed, "right");
    };

    skeleton.getCharacterType = function(){
        return "Redhatter";
    };
    skeleton.getHeight = function(){
      return 80;
    };
    skeleton.getWidth = function(){
        return 50;
    };
    return skeleton;
};

exports.Redhatter = Redhatter;
