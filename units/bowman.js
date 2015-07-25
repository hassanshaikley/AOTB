/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
Player = require("./player").Player;

var Bowman = function(team){
  var skeleton = new Player(100, name, team);

  skeleton.getCharacterType = function(){
    return "Bowman";
  };

  return skeleton;
};

exports.Bowman = Bowman;
