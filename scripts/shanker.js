/**************************************************
   ** REDHATTER CLASS IN CLIENT
    **************************************************/
var Animate = 0,
    floorHeight = 474,
    localX = 0;

var Shanker = function(x, y, hp, name){
  var moveSpeed = 4.0;
  var skeleton = Player(x, y, hp, name, moveSpeed),
      facing_left;
  var spritesheet_offset_y = 0;
  var rightClick = function(clientX, clientY){
    console.log("sh clicks");
  };

  /* Maybe make this heal?? */ 
  var leftClick = function(){
  };

  /* Lolswagz */
  var getCharacterType = function(){
    return "Shanker";
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
      spritesheet_offset_y = 0;
    }
    else {
      spritesheet_offset_y = 100;
    }
   var drawAtX = canvas.width/2 + this.getDrawAtX() - localX - 50;

    /* Decides what sprite to draw*/
    if (this.getAnimate()%40 <= 10){ 
    ctx.drawImage(shanker, 0, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-18,100,100);
    }
    else if (this.getAnimate()%40 <= 20){
    ctx.drawImage(shanker, 100, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-18,100,100);
    }
    else if (this.getAnimate()%40 <= 30){
    ctx.drawImage(shanker, 0, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-18,100,100);
    } else{
    ctx.drawImage(shanker, 200, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-18,100,100);
    }
  };
  
  /* Constantly called for the localPlayer, updates the actual 
   * Position held by the server
   */
  skeleton.update = function(keys) {
    localX = this.getX();
    if (keys.left) {
      this.setX(skeleton.getX()-moveSpeed);
      localX -= moveSpeed;
    }
    if (keys.right) {
      this.setX(skeleton.getX()+moveSpeed);
      localX += moveSpeed;
    }
    if (keys.up) { }
    if (keys.down) { }
  };
  return skeleton;
};
