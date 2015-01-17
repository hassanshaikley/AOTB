/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
Player = require("./player").Player;
var util = require("util");

var Bowman = function(x, y, hp, name){
  var skeleton = Player(x, y, hp, name);

  skeleton.getCharacterType = function(){
    return "Bowman";
  };

  return skeleton;
};

exports.Bowman = Bowman;
