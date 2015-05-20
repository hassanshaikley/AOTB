function Main() {
  this.stage = new PIXI.Stage(0x66FF99);
  this.renderer = new PIXI.autoDetectRenderer(
    768,
    480
  );
   document.body.appendChild(this.renderer.view);
  this.loadSpriteSheet();

};

Main.SCROLL_SPEED = 5;

var _q= 0;

Main.prototype.update = function() {
 // this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
  this.renderer.render(this.stage);
  requestAnimFrame(this.update.bind(this));
  _q++;
   if ( _q === 10) {
    var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame("blood.png"));
    this.stage.addChild(sprite);
	}

};

Main.prototype.loadSpriteSheet = function() {
var assetsToLoad = ["localAssets/spritesheet.json", "localAssets/spritesheet.png"];
  loader = new PIXI.AssetLoader(assetsToLoad);
  loader.onComplete = this.spriteSheetLoaded.bind(this);
  loader.load();

};

Main.prototype.spriteSheetLoaded = function() {
 // this.scroller = new Scroller(this.stage);
  requestAnimFrame(this.update.bind(this));
};