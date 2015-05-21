function Main() {
  this.stage = new PIXI.Container();
  this.renderer = new PIXI.autoDetectRenderer(
    768,
    520,
    {antialiasing: false, transparent: false, resolution: 1}
  );

var bgcolor = new PIXI.Graphics();
bgcolor.beginFill(0x394e7f);
bgcolor.drawRect(0, 0, 768, 520);
bgcolor.endFill();
this.stage.addChild(bgcolor);

  
  document.body.appendChild(this.renderer.view);

  this.stage.interactive = true;
/*
  var filter = new PIXI.filters.BlurFilter();
  filter.blur = 32;
  filter.passes = 11;


 this.stage.filters = [filter];
 */

  this.loadSpriteSheet();
  return this;

};

Main.prototype.loadSpriteSheet = function() {

  var loader = new PIXI.loaders.Loader(); 

    loader.add("localAssets/spritesheet.json", "localAssets/spritesheet.json");
    loader.add("localAssets/spritesheet.png", "localAssets/spritesheet.png");

  loader.once('complete',this.spriteSheetLoaded.bind(this));

loader.load();


};

var _q= 0;

Main.prototype.update = function() {
  this.renderer.render(this.stage);
  requestAnimFrame(this.update.bind(this));
};

ANIMATIONS = {};

Main.prototype.spriteSheetLoaded = function() {
 // this.scroller = new Scroller(this.stage);


  console.log(ANIMATIONS);

  init();
  requestAnimFrame(this.update.bind(this));

};