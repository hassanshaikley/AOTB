var Crevice = function(name, x, y, hp){
  var moveSpeed = 3.0;
  var skeleton = new Player(x, y, hp, name, moveSpeed);
  var facing_left;
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
  skeleton.draw = function(ctx) {
    //var drawAtX = skeleton.getX()-50;
    this.drawText();
    if (this.getMoveDirection() === "left"){
      facing_left = true;
    } else if (this.getMoveDirection() === "right"){
      facing_left = false;
    }
   var drawAtX  = canvas.width/2 + skeleton.getDrawAtX() - skeleton.localX() -50;
    /* Decides what sprite to draw*/
    if (skeleton.getAnimate() %40 <= 10){ 
    ctx.drawImage(crevice, 0, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-70,100,100);
    }
    else if (skeleton.getAnimate() <= 20){
    ctx.drawImage(crevice, 100, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-70,100,100);
    }
    else if (skeleton.getAnimate()%40 <= 30){
    ctx.drawImage(crevice, 0, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-70,100,100);
    } else{
    ctx.drawImage(crevice, 200, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-70,100,100);
    }
  };

  skeleton.update = function(keys) {
    
  };
  return skeleton;
};
