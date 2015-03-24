/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
Player = require("./player").Player;
var util = require("util");

var Shanker = function(x, y, hp, name){
  var skeleton = Player(x, y, hp, name);

  skeleton.getCharacterType = function(){
    return "Shanker";
  };
  var speed = 10;
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
  return skeleton;
};

exports.Shanker = Shanker;
