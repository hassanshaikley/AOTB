/**************************************************
 ** GAME PLAYER CLASS in SERVER
 **************************************************/
var Player = function(startX, startY, startHp) {
  var x = startX,
      y = startY,
      id,
      descendAttack = false,
      hp = 100;

  // Getters and setters
  var getX = function() {
    return x;
  };
  
  var getHp = function(){
    return hp;
  };

  var setHp = function(newHp){
    hp = newHp;
  };

  var getY = function() {
    return y;
  };

  var setX = function(newX) {
    x = newX;
  };

  var setY = function(newY) {
    y = newY;
  };
  var setDescendAttack = function(boolean_thing){
    descendAttack = boolean_thing;
  };
  var getDescendAttack = function(){
    return descendAttack;
  };
  // Define which variables and methods can be accessed
  return {
    getX: getX,
      getY: getY,
      getX : getX,
      setX: setX,
      setY: setY,
      getHp : getHp,
      setHp : setHp,
      id: id,
      getDescendAttack : getDescendAttack,
      setDescendAttack : setDescendAttack
  }
};

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;
