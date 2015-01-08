/**************************************************
   ** REDHATTER CLASS IN CLIENT
    **************************************************/
var Animate = 0,
    floorHeight = 474,
    localX = 0;

var Redhatter = function(x, y, hp, name){
  var moveSpeed = 2.3;
  var skeleton =  Player(x, y, hp, name, moveSpeed),
      facing_left;

  var spritesheet_offset_y = 0;

  /* CASTS A METEOR :D */
  var rightClick = function(clientX, clientY){
   // console.log("meteor right click - x is " + clientX + " y is "+ clientY);

    Spells.meteor(clientX, clientY);
  };

  /* Maybe make this heal?? */ 
  var leftClick = function(){
  };

  /* Lolswagz */
  var getCharacterType = function(){
    return "Redhatter";
  };

  var draw = function(ctx) {
    //var drawAtX = skeleton.getX()-50;
    skeleton.drawText();
    if (skeleton.getMoveDirection() === "left"){
      facing_left = true;
    } else if (skeleton.getMoveDirection() === "right"){
      facing_left = false;
    }
    if (facing_left){
      spritesheet_offset_y = 100;
    }
    else {
      spritesheet_offset_y = 0;
    }
   var   drawAtX = canvas.width/2 + skeleton.getDrawAtX() - localX - 50;
    

    /* Decides what sprite to draw*/
    if (skeleton.getAnimate() <= 15){ 
      ctx.drawImage(RedhatterSprite,0,spritesheet_offset_y, 75, 100, drawAtX+20,skeleton.getY()-70, 75, 100);
    }
    else if (skeleton.getAnimate() <= 30){
      ctx.drawImage(RedhatterSprite,75,spritesheet_offset_y, 75, 100, drawAtX+20,skeleton.getY()-70, 75, 100);
    }
    else if (skeleton.getAnimate() <= 45){
      ctx.drawImage(RedhatterSprite,150,spritesheet_offset_y, 75, 100, drawAtX+20,skeleton.getY()-70, 75, 100);
    } else{
      ctx.drawImage(RedhatterSprite,225,spritesheet_offset_y, 75, 100, drawAtX+20,skeleton.getY()-70, 75, 100);
    }
  };
  
  /* Constantly called for the localPlayer, updates the actual 
   * Position held by the server
   */
  var update = function(keys) {
    localX = skeleton.getX();
    if (keys.left) {
      skeleton.setX(skeleton.getX()-moveSpeed);
      localX -= moveSpeed;
    }
    if (keys.right) {
      skeleton.setX(skeleton.getX()+moveSpeed);
      localX += moveSpeed;
    }
    if (keys.up) { }
    if (keys.down) { }
  };
  return {
    getX : skeleton.getX,
         getY : skeleton.getY,
         setX : skeleton.setX,
         setY : skeleton.setY,
         getCharacterType : getCharacterType,
         getHp : skeleton.getHp,
         setHp : skeleton.setHp,
         getAlive : skeleton.getAlive,
         updateVariables : skeleton.updateVariables,
         dies : skeleton.dies,
         getMoveDirection : skeleton.getMoveDirection,
         setName : skeleton.setName,
         getName : skeleton.getName,
         update: update,
         draw: draw,
         rightClick: rightClick,
         leftClick: skeleton.leftClick,
         speaks: skeleton.speaks,
         respawn : skeleton.respawn,
         leftClick : skeleton.leftClick,
  };
};
