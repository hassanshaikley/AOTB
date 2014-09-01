Player = require("./player").Player;
var util = require("util");
var Fly = function(x, y, hp, name){
  var fly =  Player(x, y, hp, name);
  var descendAttack = false;

  var setDescendAttack = function(boolean_thing){
    descendAttack = boolean_thing;
  };
  var getDescendAttack = function(){
    return descendAttack;
  };

  var getCharacterType = function(){
  	return "Fly";
  };

  return {
    getX : fly.getX,
         getY : fly.getY,
         setX : fly.setX,
         setY : fly.setY,
         getHp : fly.getHp,
         setHp : fly.setHp,
         setName : fly.setName,
         getName : fly.getName,
         getCharacterType : getCharacterType,
         id: fly.id,
         setDescendAttack : setDescendAttack,
         getDescendAttack : getDescendAttack
  };

};





exports.Fly = Fly;