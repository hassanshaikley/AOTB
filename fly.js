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

  return skeleton;
};

exports.Fly = Fly;
