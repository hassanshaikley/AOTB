/**************************************************
 ** FLY CLASS IN SERVER
 **************************************************/
Player = require("./player").Player;
var util = require("util");
var Fly = function(x, y, hp, name){
  var skeleton =  Player(x, y, hp, name);
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

  var speed = 7;
  /* */

  skeleton.moveUp = function(){
      skeleton.setY(skeleton.getY()-speed);
  };
  skeleton.moveDown = function(){
      skeleton.setY(skeleton.getY()+speed);
  };
  skeleton.moveLeft = function(){
      skeleton.setX(skeleton.getX()-speed);
  };
  skeleton.moveRight = function(){
      skeleton.setX(skeleton.getX()+speed);
  };

  return skeleton;
};

exports.Fly = Fly;
