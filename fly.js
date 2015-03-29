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
      skeleton.move(speed, "up");
  };
      skeleton.moveDown = function(){
          skeleton.move(speed, "down");
          if (descendAttack === true && skeleton.getY() <= 475){
            descendAttack = false;
          }
      };
      skeleton.moveLeft = function(){
          skeleton.move(speed, "left");
      };
      skeleton.moveRight = function(){
          skeleton.move(speed, "right");
      };

  return skeleton;
};

exports.Fly = Fly;
