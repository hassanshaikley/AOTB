/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/

Player = require("./player").Player; // so it can inherits :D 
var util = require("util");

var Redhatter = function(x, y, hp, name){
  var skeleton = new Player(x, y, hp, name);
    var speed = 5;
  /* */

  skeleton.moveUp = function(){
    
  };
  skeleton.moveDown = function(){

  };
  skeleton.moveLeft = function(){
    skeleton.setX(skeleton.getX()-speed);
  };
  skeleton.moveRight= function(){
    skeleton.setX(skeleton.getX()+speed);
  };

  skeleton.getCharacterType = function(){
    return "Redhatter";
  };

  return skeleton; 
};

exports.Redhatter = Redhatter;
