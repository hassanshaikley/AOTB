/**************************************************
 ** GAME PLAYER CLASS
 **************************************************/
var Player = function(startX, startY) {
  var x = startX,
      y = startY,
      id,
      descendAttack = false;

  // Getters and setters
  var getX = function() {
    return x;
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
      setX: setX,
      setY: setY,
      id: id,
      getDescendAttack : getDescendAttack,
      setDescendAttack : setDescendAttack
  }
};

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;
