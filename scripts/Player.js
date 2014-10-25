/**************************************************
 ** GAME PLAYER CLASS
 **************************************************/

var Player = function(startX, startY, startHp, _name, _moveSpeed) {
  var x =               startX,
      y =               startY,
      name =            _name,
      hp =              100, 
      id,
      alive =           true,
      drawAtX =         x,
      drawAtY =         y,
      speed =           _moveSpeed,
      prevX =           x,
      postX =           x,
      moveDifferenceX = 0 ;

  // Getters and setters
  var getHp = function(){
    return hp;
  };

  /* Returns the inverse of a fly times black hole divided by zero */
  var getAlive= function() {
    return alive;
  };

  /* Changes object state to dead! */
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

  /* Used to determine the direction that a character is facing */
  var getMoveDirection = function(){
    if (moveDifferenceX < 0){
      return "left";
    } else if (moveDifferenceX > 0){
      return "right";
    } else {
      return "none";
    }
  };

  /* Gets the X specified by server - as opposed to X to be drawed at, since this X
   * jumps around a lot! (server refreshes few times a second) 
   */
  var getY = function() {
    return y;
  };

  /* Gets the Y specified by server - as opposed to X to be drawed at, since this X
   * jumps around a lot! (server refreshes few times a second) 
   */
  var getX = function() {
    return x;
  };

  /* Mutator for server x variable! */
  var setX = function(newX) {
    x = newX;
  };

  /* Mutator for server y variable! */
  var setY = function(newY) {
    y = newY;
  };



  var walkAnimationTimer = Date.now();
  /* UpdateVariables function is only called when the window is focused - at rate 
   * of FPS
   *
   *
   *
   */
  var updateVariables = function(){
    //used to calculate direction
    newerX = x;

    /* this.id == undefined means if this is referring to the current player 
     * Checks the difference between 
     * FUCK I have no idea
     */
    if (this.id == undefined || Math.abs(Date.now() - walkAnimationTimer > 50)){
      moveDifferenceX =(newerX - postX);
      walkAnimationTimer = Date.now();
    }
    if (moveDifferenceX){ postX = x; } /* USED TO TELL IF GOING LEFT OR RIGHT */
    if (drawAtX - x <= 3){
      drawAtX+=speed;
    }
    else if (drawAtX -x >= -3){
      drawAtX-=speed;
    }
    var yDelta = Math.abs((drawAtY - y)/5);
    if (drawAtY - y <= 3){
      drawAtY+=speed*yDelta;
    }
    else if (drawAtY -y >= -3){
      drawAtY-=speed*yDelta;
    }

    /* Can and should come up with a much better function for this */
  };

  /* The X that we want to draw at to give the illusion of smooth movement
   * (if only the server X was used then it would skip to locations)
   */
  var getDrawAtX = function(){
    return drawAtX;
  };
  /* The Y that we want to draw at to give the illusion of smooth movement
   * (if only the server Y was used then it would skip to locations)
   */
  var getDrawAtY = function(){
    return drawAtY;
  };
  // var rightClick = function(){
  // }
  // var leftClick = function(){
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
      getMoveDirection : getMoveDirection,
      setName : setName,
      getName : getName,
      updateVariables : updateVariables,
      getDrawAtX : getDrawAtX,
      getDrawAtY : getDrawAtY
  };
};
