//try to explain what this class does..
//it loads the sprite sheet
//it it creates a game container for pixi, and
//initializes a lot of pixi stuff

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
    var url;
    // if (location.origin === "http://localhost:5000" &&
    //UrlExists("/localAssets/spritesheet.png")){
    url = "localAssets/";
    /*} else {
    		url = "https://s3-us-west-2.amazonaws.com/amara-assets/";
    }*/
    loader.add(url + "spritesheet.json", "localAssets/spritesheet.json");
    loader.add(url + "spritesheet.png", "localAssets/spritesheet.png");
    loader.once('complete', this.spriteSheetLoaded.bind(this));
    loader.load();
};

ScreenManager.prototype.update = function() {
    this.renderer.render(this.stage);
    console.log("REQUESTING : D ");
    requestAnimationFrame(this.update.bind(this));
    update();
    draw();
};

ScreenManager.prototype.spriteSheetLoaded = function() {
    console.log("LOADED LE SPRITE SHEET");
    localGame.init();
    requestAnimationFrame(this.update.bind(this));
};

// helper
function teamOneFilter(imageContainer) {
    var filter = new PIXI.filters.ColorStepFilter();
    var filter2 = new PIXI.filters.GrayFilter();
    filter2.gray = .6;
    filter.invert = .3;
    imageContainer.filters = [filter, filter2];
};

/* call this function whenever you added a new layer/container */
ScreenManager.prototype.updateLayersOrder = function() {
    this.stage.children.sort(function(a, b) {
        a.zIndex = a.zIndex || 0;
        b.zIndex = b.zIndex || 0;
        return a.zIndex - b.zIndex;
    });
};
