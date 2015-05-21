function Background() {
  var texture = PIXI.Texture.fromImage("cobblestone_ground.png");
  	//left bound = 1000 - 768 /2
  	// length
  	//right bound = 4000 + 768/2

  PIXI.TilingSprite.call(this, texture, 4000 + Math.abs(768/2), 100); //repeats for 400 x
  this.position.x = 1000-Math.abs(768/2); 
  this.position.y = 370;
  this.tilePosition.x = 50;
  this.tilePosition.y = 0 ;
 

  var structure = new PIXI.Sprite(PIXI.Texture.fromImage("spire.png"));
  structure.x = 1350 - Math.abs(PIXI.Texture.fromImage("spire_0.png").width/2);
  structure.y = -100;

  var structure2 = new PIXI.Sprite(PIXI.Texture.fromImage("spire_0.png"));
  structure2.x = 3650 - Math.abs(PIXI.Texture.fromImage("spire_0.png").width/2);
   structure2.y = -100;

  this.addChild(structure);
  this.addChild(structure2);

};


Background.constructor = Background;

Background.prototype = Object.create(PIXI.TilingSprite.prototype);

Background.prototype.updateX = function() {
//  var distanceTravelled = newViewportX - this.viewportX;
  //  var displacement = -localPlayer.getDrawAtX() + Math.abs(768/2);
  var displacement = canvas.width/2- localPlayer.getDrawAtX();

  this.position.x = displacement;
};