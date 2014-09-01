/**************************************************
 ** GAME PLAYER CLASS
 **************************************************/

var Player = function(startX, startY, startHp, _name) {
  var x = startX,
      y = startY,
      name = _name,
      hp = 100, 
      id,
      alive = true;
  // Getters and setters
  var getX = function() {
    return x;
  };
  var getHp = function(){
    return hp;
  };

  var getAlive= function() {
    return alive;
  };

  var dies = function(){
    this.alive = false;
  }
  var getName = function(){
    return name;
  };
  var setName = function(newName){
    name = newName;
  };

  var setHp = function(newHp){
    hp = newHp;
    if (hp <= 0){
      alive = false;
    }
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


  // var rightClick = function(){
  //   //rightMouseAction = true;
  //   setDescendAttack(true);
  // }
  // var leftClick = function(){
  //   lefttMouseAction = true;
  // }

  // Define which variables and methods can be accessed
  return {
      getX: getX,
      getY: getY,
      setX: setX,
      setY: setY,
      getAlive : getAlive,
      dies : dies,
      update: update,
      getHp : getHp,
      setHp : setHp,
      setName : setName,
      getName : getName
  };
};

