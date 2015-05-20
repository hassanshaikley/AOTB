function Background() {
  var texture = PIXI.Texture.fromImage("cobblestone_ground.png");
  PIXI.TilingSprite.call(this, texture, 4000, 100);
  this.position.x = 0;
  this.position.y = 370;
  this.tilePosition.x = 50;
  this.tilePosition.y = 0 ;
  this.viewportX = 1000;

};


Background.constructor = Background;

Background.prototype = Object.create(PIXI.TilingSprite.prototype);

Background.prototype.setViewportX = function(newViewportX) {
  var distanceTravelled = newViewportX - this.viewportX;
  this.viewportX = newViewportX;
  this.tilePosition.x -= distanceTravelled;
};