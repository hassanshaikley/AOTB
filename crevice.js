/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
Player = require("./player").Player;
var util = require("util");

var Crevice = function(x, y, hp, name){
  var skeleton = new Player(x, y, hp, name);

  skeleton.getCharacterType = function(){
    return "Crevice";
  };

  return skeleton;
};

exports.Crevice = Crevice;
