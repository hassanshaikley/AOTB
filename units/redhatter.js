/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/

Player = require("./player").Player; // so it can inherits :D 
var util = require("util");

var Redhatter = function(name, team){
    var skeleton = new Player(100, name, team);
    var speed = 70;
    /* */

    skeleton.moveUp = function(){
        //   skeleton.move(speed, "up");
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

    return skeleton; 
};

exports.Redhatter = Redhatter;
