/**************************************************
 ** PLAYER CLASS IN SERVER
 **************************************************/
var Player = function(startX, startY, startHp, _name) {
  var x = startX,
      y = startY,
      id, //id of the socket
      name = _name,
      hp = 100,
      character_type = "Unknown", 
      zone = "The Borough";
      gold = 0;
  /* Every character has a type - this is sent from the client */
  var setCharacterType = function(newType){
    this.character_type = newType;
  };
  
  var setGold = function(amount){
    gold = amount;
  };
  
  var getGold = function(){
    return gold
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
  var setId = function(newId){
    id = newId;
  };
  var setZone = function(newZone){
    zone = newZone;
  };
  var getZone = function(){
    return zone;
  };
  // Define which variables and methods can be accessed by the world outside
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
      setId : setId,
      setZone : setZone,
      getZone : getZone,
      getGold : getGold,
      setGold : setGold,
      id: id
  };
};

exports.Player = Player;
