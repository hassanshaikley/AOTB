/**************************************************
 ** GAME PLAYER CLASS IN CLIENT
 **************************************************/
var floorHeight = 474;
var Player = function(startX, startY, startHp, _name) { //ignore startX variable
  
var x =               startX || 1100,
      y =               startY || -20,
      name =            _name,
      hp =              100, 
      id,
      alive =           true,
      drawAtX =         x,
      drawAtY =         y,
      prevX =           x,
      postX =           x,
      moveDifferenceX = 0,
      animate =         0,
      lastsaid = {},
      gold = 0,
      maxHp = hp,
      team;
  // Getters and setters
  var setTeam = function(_team){
      team = _team;
  };
  var getTeam = function(){
      return team;
  };

  var getGold = function(){
    return gold;
  };
  var setGold = function(newGold){
    gold = newGold;
  }
  var getHp = function(){
    return hp;
  };
  var respawn = function(){ /* Function that is called for local player*/
    alive = true;
 //   drawAtX = newX;
 //   drawAtY = newY;
  };
  var getAnimate = function(){
    return animate;
  };

  /* Returns the inverse of a fly times black hole divided by zero */
  var getAlive= function() {
    return alive;
  };

  /* Changes object state to dead! */
  var getName = function(){
    return name;
  };
  var setName = function(newName){
    name = newName;
  };
  var setHp = function(newHp){
    if (newHp < hp){ //has taken damage
      var v = new Blood(x, y-30);
      bloods.push(v);
    }
    hp = newHp;
    if (hp > maxHp){
      hp = maxHp;
    }

    if (hp <= 0 && getAlive()){
      respawn();
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
  //  if (newY > floorHeight){
  //    newY = floorHeight;
  //  }
    y = newY;
  };


  /* UpdateVariables function is only called when the window is focused - at rate 
   * of FPS
   */
 
  var yDelta = 1;
  var updateVariables = function(){
    //used to calculate direction
    var newerX = x;
    
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
  
    /* Basically if super far from your actual location, just teleport there 
     * Especially useful in the case of a respawn 
     */ 
    if (drawAtX - x <= 2){
      drawAtX+=2*yDelta;
    }
    if (drawAtX -x >= -2){
      drawAtX-=2*yDelta;
    }
    drawAtX = x;
    //var yDelta = 2.2; //2.2 for descend attack - 1 otherwise
    if (drawAtY - y <= 2){
      drawAtY+=2*yDelta;
    }
    if (drawAtY -y >= -2){
      drawAtY-=2*yDelta;
    }
    if (Math.abs(drawAtY - y) >100){
   drawAtY = y;
   }
    if (Math.abs(drawAtX - x) >100){
   drawAtX = x;
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
  var text_x;
  var drawText = function(){
    ctx.save();
    ctx.textAlign = 'center';
    text_x = canvas.width/2 + drawAtX - localX;
    if (alive){
      ctx.fillStyle="#000000";
      ctx.fillRect(text_x-20,drawAtY-50,100/2.2,6);
      ctx.fillStyle="#FF0000";
      ctx.fillRect(text_x-20,drawAtY-50,((hp/2.2)),6);
    } else {
      ctx.fillText("| | | | | |", text_x-20, drawAtY-40);
    };
    ctx.fillStyle = "black";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText(name, text_x, drawAtY-60);
    
    if (Date.now() - lastsaid.time  <= 3000){
      ctx.fillStyle = "black";
      ctx.font = "bold 13px sans-serif";
      ctx.fillText(lastsaid.text, text_x, drawAtY-80); 
    }
    ctx.restore();
  };
  var leftClick = function(){
    if(_alert){
      if (_alert.type == "arena"){
        enterQueue();
        socket.emit("ready for arena");
      }
      _alert = undefined;
    };
  };
  // Define which variables and methods can be accessed
  return {
      drawText : drawText,
      getX: getX,
      getY: getY,
      setX: setX,
      setY: setY,
      getAlive : getAlive,
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
      speaks : speaks,
      leftClick : leftClick,
      respawn : respawn,
     setGold : setGold,
     getTeam : getTeam,
     setTeam : setTeam,
    getGold : getGold 
  };
};
