/**************************************************
 ** GAME PLAYER CLASS in SERVER
 **************************************************/
var Player = function(startX, startY, startHp, _name) {
  var x = startX,
      y = startY,
      id,
      name = _name,
      hp = 100,
      character_type = "Unknown";



  var setCharacterType = function(newType){
    this.character_type = newType;
  };
  var getCharacterType = function(){
    return this.character_type;
  }

  var getName = function(){
    return name;
  };
  var setName = function(newName){
    name = newName;
  };

  var getHp = function(){
    return hp;
  };

  var setHp = function(newHp){
    hp = newHp;
  };
  
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

  // Define which variables and methods can be accessed
  return {
    getX: getX,
      getY: getY,
      getX : getX,
      setX: setX,
      setY: setY,
      getHp : getHp,
      setHp : setHp,
      setName : setName,
      getName : getName,
      getCharacterType : getCharacterType,
      setCharacterType : setCharacterType,
      id: id
  };
};

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;
