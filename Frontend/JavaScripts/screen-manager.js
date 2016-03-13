var ScreenManager = function() {
    this.stage = new PIXI.Container();
    this.renderer = new PIXI.autoDetectRenderer(768, 520, {
        antialiasing: false,
        transparent: false,
        resolution: 1
    });
    var bgcolor = new PIXI.Graphics();
    bgcolor.beginFill(0x394e7f);
    bgcolor.drawRect(0, 0, CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT);
    bgcolor.endFill();
    this.stage.addChild(bgcolor);
    this.stage.zIndex = -1;
    this.BOTACTIONBAR = new PIXI.Container();
    /* Add the action bar*/
    var botactionbar = new PIXI.Graphics();
    botactionbar.beginFill(0x000000);
    botactionbar.drawRect(0, 0, CONFIG.SCREEN_WIDTH, 50); //470 to 530
    botactionbar.endFill();
    this.BOTACTIONBAR.y = 470;
    this.BOTACTIONBAR.addChild(botactionbar);
    this.stage.addChild(this.BOTACTIONBAR);
    this.BOTACTIONBAR.zIndex = 100;
    var node = document.getElementById("canvas_and_chat");
    node.appendChild(this.renderer.view);
    this.stage.interactive = true;
    this.loadSpriteSheet();
};

ScreenManager.prototype.loadSpriteSheet = function() {
    var loader = new PIXI.loaders.Loader();
    var url = "localAssets/";
    loader.add(url + "spritesheet.json", "localAssets/spritesheet.json");
    loader.add(url + "spritesheet.png", "localAssets/spritesheet.png");
    loader.once('complete', this.spriteSheetLoaded.bind(this));
    loader.load();
};

ScreenManager.prototype.update = function() {
    this.renderer.render(this.stage);
    update();
    draw();
    setTimeout(this.update.bind(this), 1000/60);
};

ScreenManager.prototype.spriteSheetLoaded = function() {
    localGame.init();
    setTimeout(this.update.bind(this), 1000/60);
};
