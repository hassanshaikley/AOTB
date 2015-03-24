var Skelly = function(x, y, id){
  var x, y, moveSpeed = 1, hp= 100;
  var skeleton =  new Player(x, y, hp, "Skelly", moveSpeed);
  var spritesheet_offset_y = 0, spritesheet_offset_x;
  var facing_left = true;
  var attacking = 0;
  var draw = function(ctx){
    skeleton.drawText();
    if (skeleton.getMoveDirection() === "left"){
      facing_left = true;
    } else if (skeleton.getMoveDirection() === "right"){
      facing_left = false;
    }
    if (facing_left){
      spritesheet_offset_y = 0;
    }
    else {
      spritesheet_offset_y = 102;
    }
    var   drawAtX = canvas.width/2 + skeleton.getDrawAtX() - localX - 50;
    if (attacking){
      if (attacking %30 < 10){
      ctx.drawImage(skelly, 300,spritesheet_offset_y, 100, 100, drawAtX, skeleton.getDrawAtY(), 100, 100);
      } else if (attacking % 30 < 20){
      ctx.drawImage(skelly, 400,spritesheet_offset_y, 100, 100, drawAtX, skeleton.getDrawAtY(), 100, 100);
      } else if (attacking % 30 < 30) {
      ctx.drawImage(skelly, 500,spritesheet_offset_y, 100, 100, drawAtX, skeleton.getDrawAtY(), 100, 100);
      } else {
      attacking = 0;
      }

    }
    else {
      ctx.drawImage(skelly, 0,spritesheet_offset_y, 100, 100, drawAtX, skeleton.getDrawAtY(), 100, 100);
    }
  };
  return {
    getX : skeleton.getX,
         getY : skeleton.getY,
         setX : skeleton.setX,
         setY : skeleton.setY,
         getHp : skeleton.getHp,
         setHp : skeleton.setHp,
         getAlive : skeleton.getAlive,
         updateVariables : skeleton.updateVariables,
         draw : draw,
  }
}
