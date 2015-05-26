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


  this.BOTACTIONBAR = new PIXI.Container();


  /* Add the action bar*/
  var botactionbar = new PIXI.Graphics();
  botactionbar.beginFill(0x333333);
  botactionbar.drawRect(0, 0, 768, 50); //470 to 530
  botactionbar.endFill();
  this.BOTACTIONBAR.y = 470;

  this.BOTACTIONBAR.addChild(botactionbar);
 
  this.stage.addChild(this.BOTACTIONBAR);


  document.body.appendChild(this.renderer.view);

  this.stage.interactive = true;

  /*
     filter = new PIXI.filters.DotScreenFilter();


     this.stage.filters = [filter];*/

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
  requestAnimationFrame(this.update.bind(this));
};

Main.prototype.spriteSheetLoaded = function() {
  init();
  requestAnimationFrame(this.update.bind(this));
};
