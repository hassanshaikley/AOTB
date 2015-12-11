var Dino = function(name, x, y, hp) {
    var skeleton = new Player(x, y, 130, name),
        facing_left;
    var spells_thumb_array = [];
    skeleton.setUpActionbar = function() {
        var sword_thumb = new PIXI.Sprite(PIXI.Texture.fromFrame("attack1_icon_v3.fw.png"));
        MAIN.BOTACTIONBAR.addChild(sword_thumb);
        var tort_stun = new PIXI.Sprite(PIXI.Texture.fromFrame("tortstunthumb.png"));
        MAIN.BOTACTIONBAR.addChild(tort_stun);
        spells_thumb_array.push(sword_thumb);
        spells_thumb_array.push(tort_stun);
        for (var _i = 0; _i < spells_thumb_array.length; _i++) {
            helpers.addThumbToActionBar(spells_thumb_array[_i], "description");
        }
        /* sword_thumb.interactive = true;

         sword_thumb.mouseover = function(mouseData){
           console.log("MOUSE OVER!");
         }*/
    }
    var grimes_l = new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("Walk_F1_l.png"),
                                              PIXI.Texture.fromFrame("Walk_F2_l.png"),
                                              PIXI.Texture.fromFrame("Walk_F3_l.png"),
                                              PIXI.Texture.fromFrame("Walk_F4_l.png") ]);
    var grimes_r = new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("Walk_F1_r.png"),
                                              PIXI.Texture.fromFrame("Walk_F2_r.png"),
                                              PIXI.Texture.fromFrame("Walk_F3_r.png"),
                                              PIXI.Texture.fromFrame("Walk_F4_r.png")]);
    grimes_l.gotoAndPlay(0);
    grimes_r.gotoAndPlay(0);
    grimes_l.animationSpeed = .15;
    grimes_r.animationSpeed = .15;
    skeleton.imageContainer.addChild(grimes_l);
    skeleton.getCharacterType = function() {
        return "Dino";
    };
    skeleton.draw = function(ctx) {
        skeleton.drawText();
        var drawAtY = skeleton.getDrawAtY() - 50;
        var drawAtX = CONFIG.SCREEN_WIDTH / 2 + skeleton.getDrawAtX() - skeleton.localX() - 50 + 20;
        grimes_r.position.y = drawAtY;
        grimes_l.position.y = drawAtY;
        grimes_l.position.x = drawAtX;
        grimes_r.position.x = drawAtX;
        skeleton.setMeeleeAttack(false); //idk y i do this lol
        if (this.getMoveDirection() === "left") {
            skeleton.imageContainer.removeChild(grimes_r);
            skeleton.imageContainer.removeChild(grimes_l);
            skeleton.imageContainer.addChild(grimes_l);
        } else if (this.getMoveDirection() === "right") {
            skeleton.imageContainer.removeChild(grimes_r);
            skeleton.imageContainer.removeChild(grimes_l);
            skeleton.imageContainer.addChild(grimes_r);
        }
    };
    /* Constantly called for the localPlayer, updates the actual
     * Position held by the server
     */
    skeleton.update = function(keys) {};
    return skeleton;
};
