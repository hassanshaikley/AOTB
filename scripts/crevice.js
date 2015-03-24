/**************************************************
   ** CREVICE CLASS IN CLIENT
    **************************************************/
var Animate = 0,
    floorHeight = 474,
    localX = 0;

var Crevice = function(x, y, hp, name){
  var moveSpeed = 3.0;
  var skeleton = new Player(x, y, hp, name, moveSpeed),
      facing_left;
  var spritesheet_offset_y = 0;

  /* Maybe make this heal?? */ 
  skeleton.leftClick = function(){
  };
  /* CASTS A sPIKE :D */
  skeleton.rightClick = function(clientX, clientY){
    // console.log("meteor right click - x is " + clientX + " y is "+ clientY);

    Spells.healingSpike(clientX, clientY);
  };

  /* Lolswagz */
  skeleton.getCharacterType = function(){
    return "Crevice";
  };
  skeleton.animate = 0;
  skeleton.draw = function(ctx) {
    //var drawAtX = skeleton.getX()-50;
    this.drawText();
    if (this.getMoveDirection() === "left"){
      facing_left = true;
    } else if (this.getMoveDirection() === "right"){
      facing_left = false;
    }
    skeleton.animate = skeleton.animate+1;
   var drawAtX = canvas.width/2 + this.getDrawAtX() - localX - 50;
    /* Decides what sprite to draw*/
    if (skeleton.animate%40 <= 10){ 
    ctx.drawImage(crevice, 0, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-70,100,100);
    }
    else if (skeleton.animate%40 <= 20){
    ctx.drawImage(crevice, 100, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-70,100,100);
    }
    else if (skeleton.animate%40 <= 30){
    ctx.drawImage(crevice, 0, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-70,100,100);
    } else{
    ctx.drawImage(crevice, 200, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-70,100,100);
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
