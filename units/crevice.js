/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
Player = require("./player").Player;
var util = require("util");

var Crevice = function(name, team){
  var skeleton = new Player(100, name, team);

  skeleton.getCharacterType = function(){
    return "Crevice";
  };

  return skeleton;
};

exports.Crevice = Crevice;
