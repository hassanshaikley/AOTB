function Background() {
  var texture = PIXI.Texture.fromImage("cobblestone_ground.png");
  
  PIXI.TilingSprite.call(this, texture, 4000 + Math.abs(768/2), 100); //repeats for 400 x
  this.position.x = 100-Math.abs(768/2); 
  this.position.y = 370;
  this.tilePosition.x = 50;
  this.tilePosition.y = 0 ;
 

  var structure = new PIXI.Sprite(PIXI.Texture.fromImage("spire.png"));
  structure.x = 1250;
  structure.y = -100;

    var structure2 = new PIXI.Sprite(PIXI.Texture.fromImage("spire_0.png"));
  structure.x = 3750;
    structure2.y = -100;

  this.addChild(structure);
  this.addChild(structure2);

};


Background.constructor = Background;

Background.prototype = Object.create(PIXI.TilingSprite.prototype);

Background.prototype.setX = function(newX) {
//  var distanceTravelled = newViewportX - this.viewportX;
    var displacement = -localPlayer.getDrawAtX() + Math.abs(768/2);

  this.position.x = displacement;


  //  console.log("Dispalcement : " +displacement);
  var _i;


  for (var i = 0; i < this.children.length; i++){
 // 	this.children[i].viewportX = newViewportX;
  //	this.tilePosition.x -= distanceTravelled;
  //	console.log(this.children[i].x);
  }
};