var Bowman = function(name, x, y, hp){
  var skeleton =  Player(x, y, hp, name),
      facing_left;

  var spritesheet_offset_y = 0;

  skeleton.rightClick = function(clientX, clientY){
    //Spells.arrow(clientX, clientY);
  };

  /* Maybe make this heal?? */ 
  skeleton.leftClick = function(clientX, clientY){
  };

  /* Lolswagz */
  skeleton.getCharacterType = function(){
    return "Bowman";
  };

  skeleton.draw = function() {
        this.drawText();

    //var drawAtX = skeleton.getX()-50;
    /*
    this.drawText();
      var canvas_offset_y = 0;
    if (this.getMoveDirection() === "left"){
      facing_left = true;
    } else if (this.getMoveDirection() === "right"){
      facing_left = false;
    }
    if (facing_left){
      spritesheet_offset_y = 100;
    }
    else {
      spritesheet_offset_y = 0;
    }
    var drawAtX = canvas.width/2 + this.getDrawAtX()-localX - 50;
 
    var spritesheet_offset_x = Math.floor(this.getAnimate() /15) * 100;
    if (this.getAnimate() <= 15){ 
     ctx.drawImage(bowman, spritesheet_offset_x, spritesheet_offset_y, 100,100, drawAtX, this.getDrawAtY()-70,100,100); 
   }
    else if (this.getAnimate() <= 30){
     ctx.drawImage(bowman, spritesheet_offset_x, spritesheet_offset_y, 100,100, drawAtX, this.getDrawAtY()-70,100,100);
    }
    else if (this.getAnimate() <= 45){
     ctx.drawImage(bowman, spritesheet_offset_x, spritesheet_offset_y, 100,100, drawAtX, this.getDrawAtY()-70,100,100);
    } else{
     ctx.drawImage(bowman, spritesheet_offset_x, spritesheet_offset_y, 100,100, drawAtX, this.getDrawAtY()-70,100,100);
    }
    */

  };
  
  /* Constantly called for the localPlayer, updates the actual 
   * Position held by the server
   */
  skeleton.update = function(keys) {
    localX = this.getX();
   /* if (keys.left) {
      this.setX(this.getX()-moveSpeed);
      localX -= moveSpeed;
    }
    if (keys.right) {
      this.setX(this.getX()+moveSpeed);
      localX += moveSpeed;
    }
    if (keys.up) { }
    if (keys.down) { }*/
  };
  return skeleton;
};
