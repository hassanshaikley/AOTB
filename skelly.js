/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
Player = require("./player").Player;
var util = require("util");

var Skelly = function(x,y,  hp, name){
  var skeleton = Player(x, y, hp, name);
  skeleton.setId(1);
  skeleton.getCharacterType = function(){
    return "Skelly";
  };

  return skeleton;
};

exports.Skelly = Skelly;
