/**************************************************
 ** PLAYER CLASS IN SERVER
 **************************************************/
var Player = function(startX, startY, startHp, _name) {
  var  id, //id of the socket
      name = _name,
      hp = startHp,
      y = startY,
      maxHp = hp,
      character_type = "Unknown", 
      zone = "The Borough",
      gold = 0,
      respawnX;
      //team is determined randomly
  //    team = Math.round(Math.random() * (1)); //team random unless assigned
  var team;
  /* */
  if (team1.length  < team0.length ){ //if team 1 is smaller than team zero
    util.log ("t1\t" +team1.length + "\tt0\t" +team0.length);
    team = 1;
    team1.push(this);
  } else {
    util.log ("--x--t1\t" +team1.length + "\tt0\t" +team0.length);
    team = 0;
    team0.push(this);
  }

  if (team==1){
    respawnX = 3100;
  } else {
    respawnX =-250; 
  }
  x = respawnX;
  var hitby =[]; // object holding who hit you and when  (really useful for a fly who u only want to damage u once)

  var getRespawnX = function(){
    return respawnX;
  };
  var setTeam = function(newTeam){
    team = newTeam;
  };
  var getTeam= function(){
    return team;
  };

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
  };

  var getName = function(){
    return name;
  };
  var setName = function(newName){
    name = newName;
  };

  var getHp = function(){
    return hp;
  };

  /* Returns "dies" or "lives"*/
  var setHp = function(newHp){

    //send a message to this player

    //
    if (newHp >= maxHp){
      hp = maxHp;
    } else if ( newHp <= 0){
/**      if (team==0){
       setX(-250); //sets X to zero,  
      } else {
        setX(3100);
      }*/
      hp = 0;
      return "dies";
    } else {
      hp = newHp;
    }
    return "lives";
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
      setTeam : setTeam,
      getTeam : getTeam,
      getRespawnX : getRespawnX,
      hitby : hitby,
      id: id
  };
};

exports.Player = Player;
