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
  /*{
         getX : skeleton.getX,
         getY : skeleton.getY,
         setX : skeleton.setX,
         setY : skeleton.setY,
         getCharacterType : getCharacterType,
         getHp : skeleton.getHp,
         setHp : skeleton.setHp,
         setName : skeleton.setName,
         getName : skeleton.getName,
         setZone : skeleton.setZone,
          getZone : skeleton.getZone,
         id: skeleton.id
  };
          */
};

exports.Redhatter = Redhatter;
