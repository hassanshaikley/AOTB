/**************************************************
 ** REDHATTER CLASS IN SERVER
 **************************************************/
Player = require("./player").Player;
var util = require("util");

var Shanker = function(x, y, hp, name){
  var skeleton = Player(x, y, hp, name);

  var getCharacterType = function(){
    return "Shanker";
  };

  return {
    getX : skeleton.getX,
         getY : skeleton.getY,
         setX : skeleton.setX,
         setY : skeleton.setY,
         getCharacterType : getCharacterType,
         getHp : skeleton.getHp,
         setHp : skeleton.setHp,
         setName : skeleton.setName,
         getName : skeleton.getName,
         id: skeleton.id
  };
};

exports.Shanker = Shanker;
