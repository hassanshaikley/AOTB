var Grimes = function(name, x, y, hp) {
    var skeleton = new Player(x, y, 100, name),
        facing_left;
    var grimes_l = new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("grimes_l.png")]);
    var grimes_r = new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("grimes_r.png")]);
    skeleton.imageContainer.addChild(grimes_l);
    skeleton.getCharacterType = function() {
        return "Grimes";
    };
//    var actionbar_component = new ActionbarComponent(skeleton);

    skeleton.setAnimations(grimes_l, grimes_r, grimes_l, grimes_r);

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
