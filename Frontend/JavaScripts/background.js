function Background() {

    var texture = PIXI.Texture.fromImage("cobblestone_ground_v2.fw.png");
    PIXI.extras.TilingSprite.call(this, texture, 4000 + Math.abs(768 / 2), 100); //repeats for 400 x
    this.position.x = 1000 - Math.abs(768 / 2);
    this.position.y = 370;
    this.tilePosition.x = 50;
    this.tilePosition.y = 0;

    /*
      var structure = new PIXI.Sprite(PIXI.Texture.fromImage("spire.png"));
      structure.x = 1350 - Math.abs(PIXI.Texture.fromImage("spire_0.png").width/2);
      structure.y = -116;
    */

    //  structure2.scale.x = structure.scale.x = structure2.scale.y = structure.scale.y = 1.3;
    /* var castle = new PIXI.Sprite(PIXI.Texture.fromImage("castleofone2.png"));
    castle.x = 0;
    castle.y= 0;
     this.addChild(castle); */

    left_blackwall = new PIXI.Graphics();
    left_blackwall.beginFill(0xAAAAAA);
    left_blackwall.drawRect(0, 0, 500, CONFIG.SCREEN_HEIGHT-22);
    left_blackwall.endFill();
    left_blackwall.x = 480;
    left_blackwall.y = -400;
    left_blackwall.alpha = .5;
    this.addChild(left_blackwall);
    right_blackwall = new PIXI.Graphics();
    right_blackwall.beginFill(0xAAAAAA);
    right_blackwall.drawRect(0, 0, 500, CONFIG.SCREEN_HEIGHT-22);
    right_blackwall.endFill();
    right_blackwall.x = 2856;
    right_blackwall.y = -400;
    right_blackwall.alpha = .5;
    this.addChild(right_blackwall);

    for (var i = 0; i < 8; i++){
        var z = new PIXI.Sprite(PIXI.Texture.fromImage("cloud.png"));
        z.y = -350 + Math.random()*100;
        z.x = 500 + i*400 + Math.random()*200;
        this.addChild(z);
        z = undefined;
    }
};
Background.constructor = Background;
Background.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Background.prototype.updateX = function() {
    //  var distanceTravelled = newViewportX - this.viewportX;
    //  var displacement = -localPlayer.getDrawAtX() + Math.abs(768/2);
    var displacement = CONFIG.SCREEN_WIDTH / 2 - localPlayer.getDrawAtX();
    this.position.x = displacement;
};
