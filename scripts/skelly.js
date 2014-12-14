var Skelly = function(x, y, id){
  var x, y, moveSpeed = 1, hp= 100;
  var skeleton =  Player(x, y, hp, "Skelly", moveSpeed);
  var spritesheet_offset_y = 0;
  var draw = function(ctx){
    var   drawAtX = canvas.width/2 + skeleton.getDrawAtX() - localX - 50;
    ctx.drawImage(skelly, 0,spritesheet_offset_y, 100, 100, drawAtX, skeleton.getDrawAtY(), 100, 100);
  };
  var update = function(){ //update vars

  };
  return {
    getX : skeleton.getX,
         getY : skeleton.getY,
         setX : skeleton.setX,
         setY : skeleton.setY,
         getHp : skeleton.getHp,
         setHp : skeleton.setHp,
         getAlive : skeleton.getAlive,
         draw : draw,
         update : update
  }
}
