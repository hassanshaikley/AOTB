/**************************************************
 ** GAME PLAYER CLASS
 **************************************************/

var Player = function(startX, startY, startHp, _name) {
  var x = startX,
      y = startY,
      name = _name,
      hp = 100, 
      id,
      alive = true,
      drawAtX = x,
      drawAtY = y,
      speed = 3,
      xDelta = 0,
      yDelta = 0; //1.7 for redhatters tho //if wrong will be buggy AF
  var prevX =x;
  var postX = x;
  var moveDifference = 0 ;

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

  /* Function is only called when the window is focused - at rate of FPS*/
  var updateVariables = function(){
    newerX = x;
    if (this.id== undefined || Math.abs(Date.now() - walkAnimationTimer > 100)){
      moveDifference =(newerX - postX);
      walkAnimationTimer = Date.now();
    }

    if (moveDifference.x){
      postX = x;
    }
    if (drawAtX - x <= 2){
      drawAtX+=speed;
    }
     if (drawAtX -x >= -2){
      drawAtX-=speed;
    }

     /* Can and should come up with a much better function for this */
     yDelta = Math.floor((drawAtY - y)/2);
      console.log("yd is" + yDelta + " y is " + y + " drawAtY is" +drawAtY);
      if (Math.abs(y - drawAtY) >= 2){
        console.log("AAA");
        drawAtY -= yDelta;
 
      }
    
  };


  var getDrawAtX = function(){
    return drawAtX;
  };
    var getDrawAtY = function(){
    return drawAtY;
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
      updateVariables : updateVariables,
      getDrawAtX : getDrawAtX,
      getDrawAtY : getDrawAtY
  };
};

