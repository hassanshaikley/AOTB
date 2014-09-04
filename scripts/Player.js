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
      var prevX =x;
      var postX = x;
    var moveDifference;

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

  var getMoveDifference = function(){
    return moveDifference;
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


  var walkAnimationTimer = Date.now();
  /* Function is only called when the window is focused */
  var updateVariables = function(){
    newerX = x;
    if (id== undefined || Math.abs(Date.now() - walkAnimationTimer > 500)){
      moveDifference =(newerX - postX);
      walkAnimationTimer = Date.now();
    }

    if (moveDifference){
      if (moveDifference < 0){
       console.log('moving left');
      }
      else {
       console.log('moving right');

      }
      postX = x;
    }
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
      getMoveDifference : getMoveDifference,
      setName : setName,
      getName : getName,
      updateVariables : updateVariables
  };
};

