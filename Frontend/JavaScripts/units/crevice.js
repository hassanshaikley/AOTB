var Crevice = function(name, x, y, hp) {
    var moveSpeed = 3.0;
    var skeleton = new Player(x, y, hp, name, moveSpeed);
    var facing_left;
    var spritesheet_offset_y = 0;
    /* Maybe make this heal??
    skeleton.leftClick = function(){
    };*/
    /* Lolswagz */
    skeleton.getCharacterType = function() {
        return "Crevice";
    };
    var crevice_l = new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("crevice_l.png")]);
    var crevice_r = new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("crevice_r.png")]);
    skeleton.imageContainer.addChild(crevice_l);
    skeleton.draw = function() {
        this.drawText();
        var drawAtX = CONFIG.SCREEN_WIDTH / 2 + skeleton.getDrawAtX() - skeleton.localX() - 50; // do + 20 for grimes idk yy
        var drawAtY = skeleton.getDrawAtY() - 50;
        crevice_r.position.y = drawAtY;
        crevice_l.position.y = drawAtY;
        crevice_l.position.x = drawAtX;
        crevice_r.position.x = drawAtX;
        skeleton.setMeeleeAttack(false);
        if (this.getMoveDirection() === "left") {
            skeleton.imageContainer.removeChild(crevice_r);
            skeleton.imageContainer.removeChild(crevice_l);
            skeleton.imageContainer.addChild(crevice_l);
        } else if (this.getMoveDirection() === "right") {
            skeleton.imageContainer.removeChild(crevice_r);
            skeleton.imageContainer.removeChild(crevice_l);
            skeleton.imageContainer.addChild(crevice_r);
        }
        /* Decides what sprite to draw

        //var drawAtX = skeleton.getX()-50;
        this.drawText();
        if (this.getMoveDirection() === "left"){
          facing_left = true;
        } else if (this.getMoveDirection() === "right"){
          facing_left = false;
        }
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
        }*/
    };
    skeleton.update = function(keys) {};
    return skeleton;
};