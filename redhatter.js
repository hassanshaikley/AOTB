/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
Player = require("./player").Player;
var util = require("util");

var Redhatter = function(x, y, hp, name){
  var skeleton = Player(x, y, hp, name);

  skeleton.getCharacterType = function(){
    return "Redhatter";
  };

  return skeleton; 
};

exports.Redhatter = Redhatter;
