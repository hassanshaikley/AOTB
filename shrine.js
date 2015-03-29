/**************************************************
 ** PLAYER CLASS IN SERVER
 **************************************************/
var Shrine = function(_team) {
  var maxHp = 3000,
      hp = maxHp,
      zone = "The Borough",
      team = _team; //team random unless assigned

  var x, y = 350; //aa
  var hitby =[]; // object holding who hit you and when  (really useful for a fly who u only want to damage u once)

  if (_team == 0){
    x = 150;
  } else {
    x = 2850;
  }
  var getTeam= function(){
    return team;
  };

  var getHp = function(){
    return hp;
  };

  /* Returns "dies" or "lives"*/
  var setHp = function(newHp){
    //
    if (newHp >= maxHp){
      hp = maxHp;
    } else if ( newHp <= 0){
      hp = 0;
	game1.setState(0);
	if (team == 1){
	game1.setWinner(0);
	    }else {
		game1.setWinner(1);
	    }
      return;

    } else {
      hp = newHp;
    }
    return;
  };

  var getX = function() {
    return x;
  };

  var getY = function() {
    return y;
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
      getHp : getHp,
      setHp : setHp,
      setZone : setZone,
      getZone : getZone,
      getTeam : getTeam,
      hitby : hitby,
  };
};

exports.Shrine = Shrine;
