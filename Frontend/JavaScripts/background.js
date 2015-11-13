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
      this.addChild(castle);*/
};
Background.constructor = Background;
Background.prototype = Object.create(PIXI.extras.TilingSprite.prototype);
Background.prototype.updateX = function() {
    //  var distanceTravelled = newViewportX - this.viewportX;
    //  var displacement = -localPlayer.getDrawAtX() + Math.abs(768/2);
    var displacement = CONFIG.SCREEN_WIDTH / 2 - localPlayer.getDrawAtX();
    this.position.x = displacement;
};