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
      skeleton.setX(skeleton.getX()-speed);
  };
  skeleton.moveRight = function(){
      skeleton.setX(skeleton.getX()+speed);
  };
  return skeleton;
};

exports.Shanker = Shanker;
