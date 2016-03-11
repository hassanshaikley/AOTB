function OptionMenu(){
    var state = 0;

    options_img = new PIXI.Sprite(PIXI.Texture.fromFrame("options.png"));
    MAIN.stage.addChild(options_img);
    options_img.y = CONFIG.SCREEN_HEIGHT-55;
    options_img.x = CONFIG.SCREEN_WIDTH-55;
    options_img.interactive = true;

    options_img.click = function(mouseData){
        toggle();
    };

    var container = new PIXI.Container();
    var options_background = new PIXI.Graphics();
    options_background.beginFill(0x00FF00);
    options_background.drawRect(0, 0, 200, 200);
    options_background.endFill();
    container.addChild(options_background);
    this.options_background = options_background;

    options_background.x = CONFIG.SCREEN_WIDTH - options_background.width -5;
    options_background.y = CONFIG.SCREEN_HEIGHT - options_background.height - 57;
    options_background.alpha = .3;
    function toggle (){
        if (state == 0){
            state = 1;
            OpenMenu();
        } else {
            state = 0;
            CloseMenu();
        };

    };

    function OpenMenu(){
        MAIN.stage.addChild(options_background);
    };

    function CloseMenu(){
        MAIN.stage.removeChild(options_background);
    };
};
