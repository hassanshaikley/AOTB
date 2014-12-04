/**************************************************
 ** GAME PLAYER CLASS IN CLIENT
 **************************************************/
var floorHeight = 474;
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
      moveDifferenceX = 0,
      animate =         0,
      fallspeed =       1,
      lastsaid = {};
  // Getters and setters
  var getHp = function(){
    return hp;
  };
  var respawn = function(){
    alive = true;
    var newY = floorHeight-10;
    var newX = 50;
    drawAtX = newX;
    drawAtY = newY;
    x = newX;
    y = newY;
    hp = 100;

  };
  var getAnimate = function(){
    return animate;
  };

  /* Returns the inverse of a fly times black hole divided by zero */
  var getAlive= function() {
    return alive;
  };

  /* Changes object state to dead! */
  var dies = function(){
    if (alive == true) {
      alive = false;
      respawn();
    }
  }
  var getName = function(){
    return name;
  };
  var setName = function(newName){
    name = newName;
  };
  var setHp = function(newHp){
    hp = newHp;
    if (hp <= 0 && getAlive()){
      dies();
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
   */
  var did_i_get_hit_by_a_fly = function(){
    for (i = 0; i < remotePlayers.length; i++) {
      if (remotePlayers[i].getCharacterType() === "Fly"){
        // console.log("Got a fly in the region");
        if (!remotePlayers[i].hitme  || (Math.abs(Date.now() - remotePlayers[i].hitme) ) > 500){
          if (remotePlayers[i].id && Math.abs(remotePlayers[i].getX() - localPlayer.getX()) <= 40 && Math.ceil(remotePlayers[i].getY()-localPlayer.getY()) <=  25 && remotePlayers[i].getDescendAttack()){
            console.log("i have been hit");
            //hit by a guy so I shouldnt be ablet o be hit by them for a few seconds
            localPlayer.setHp(localPlayer.getHp()-25);
            socket.emit("attack hits");
            remotePlayers[i].hitme = Date.now();
          }
        }
      }
    }
  };
  var yDelta = 1;
  var updateVariables = function(){
    did_i_get_hit_by_a_fly();

    if ( y > floorHeight ){
      y = (y+fallspeed);
    };
    //used to calculate direction
    newerX = x;
    
    if (getMoveDirection() !== "none"){
      animate++;
      if (animate >= 60){
        animate = 0;
      }
    }
    /* this.id == undefined means if this is referring to the current player 
     * Checks the difference between 
     */
    moveDifferenceX =(newerX - postX);
    if (moveDifferenceX){ postX = x; } /* USED TO TELL IF GOING LEFT OR RIGHT */

    if ((drawAtX - x) <= 2){
      drawAtX+=speed;
    }
    if (drawAtX -x >= -2){
      drawAtX-=speed;
    }
    if (drawAtY - y > 50 || drawAtY - y < -50){ //50 && -50 were cool
      console.log("speeding");
      yDelta = 2.9;
    } else {
      yDelta = 1;
    }
    
    //var yDelta = 2.2; //2.2 for descend attack - 1 otherwise
    if (drawAtY - y <= 2){
      drawAtY+=speed*yDelta;
    }
    if (drawAtY -y >= -2){
      drawAtY-=speed*yDelta;
    }
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
  
  var speaks = function(words){
    lastsaid.time = Date.now();
    lastsaid.text = words;
  };
  var drawText = function(){
      //console.log("SPEAKING");
    
    if (Date.now() - lastsaid.time  <= 2000){
      var text_x = canvas.width/2 + drawAtX - localX - 50;
      ctx.fillStyle = "black";
      ctx.font = "bold 13px sans-serif";
      ctx.fillText(lastsaid.text, text_x + 25, y-100); 
    }
  };
  // Define which variables and methods can be accessed
  return {
    drawText : drawText,
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
      getDrawAtY : getDrawAtY,
      getAnimate : getAnimate,
      speaks : speaks
  };
};
