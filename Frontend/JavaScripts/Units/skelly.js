var Skelly = function(x, y, id) {
    Player.call(this, x, y, 100, "Skelly");
    var spritesheet_offset_y = 0,
        spritesheet_offset_x;
    var facing_left = true;
    var attacking = 0;
    this.draw = function(ctx) {
        skeleton.drawText();
        if (skeleton.getMoveDirection() === "left") {
            facing_left = true;
        } else if (skeleton.getMoveDirection() === "right") {
            facing_left = false;
        }
        /*
        if (facing_left){
          spritesheet_offset_y = 0;
        }
        else {
          spritesheet_offset_y = 102;
        }
        var   drawAtX = CONFIG.SCREEN_WIDTH/2 + skeleton.getDrawAtX() - localX - 50;
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
        */
    };
}