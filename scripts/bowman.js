/**************************************************
   ** REDHATTER CLASS IN CLIENT
    **************************************************/
var Animate = 0,
    floorHeight = 474,
    localX = 0;

var Bowman = function(x, y, hp, name){
  var moveSpeed = 2.3;
  var skeleton =  Player(x, y, hp, name, moveSpeed),
      facing_left;

  var spritesheet_offset_y = 0;

  skeleton.rightClick = function(clientX, clientY){
    console.log("bowman clicks");

  };

  /* Maybe make this heal?? */ 
  skeleton.leftClick = function(){
  };

  /* Lolswagz */
  skeleton.getCharacterType = function(){
    return "Bowman";
  };

  skeleton.draw = function(ctx) {
    //var drawAtX = skeleton.getX()-50;
    this.drawText();
    if (this.getMoveDirection() === "left"){
      facing_left = true;
    } else if (this.getMoveDirection() === "right"){
      facing_left = false;
    }
    if (facing_left){
      spritesheet_offset_y = 102;
    }
    else {
      spritesheet_offset_y = 0;
    }
   var drawAtX = canvas.width/2 + this.getDrawAtX() - localX - 50;
    ctx.rect(drawAtX,20,150,100);
    ctx.stroke();
    /* Decides what sprite to draw*/
    if (this.getAnimate() <= 20){ 
    }
    else if (this.getAnimate() <= 40){
    }
    else if (this.getAnimate() <= 60){
    } else{
    }
  };
  
  /* Constantly called for the localPlayer, updates the actual 
   * Position held by the server
   */
  skeleton.update = function(keys) {
    localX = this.getX();
    if (keys.left) {
      this.setX(this.getX()-moveSpeed);
      localX -= moveSpeed;
    }
    if (keys.right) {
      this.setX(ths.getX()+moveSpeed);
      localX += moveSpeed;
    }
    if (keys.up) { }
    if (keys.down) { }
  };
  return skeleton;
};
