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
    x = -250;
  } else {
    x = 3000;
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
    } else {
      hp = newHp;
    }
    return "lives";
  };

  var draw= function(){
    //draw HP
    //draw structure, depending on team
    var displacement = -localPlayer.getX();
    if (_team == 0){
      ctx.drawImage(spire0, displacement+x, 293);
    } else {
      ctx.drawImage(spire1, displacement+x, 293); //-10 is a hack to make it sync with life
    }
    ctx.fillStyle="#000000";
    ctx.fillRect(x + 60+ displacement,y-50,3000/50,6);
    ctx.fillStyle="#FF0000";
    ctx.fillRect(x + 60+ displacement,y-50,((hp/50)),6);
    ctx.fillText("SPIRE", x + displacement, y);
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
      draw : draw,
  };
};

