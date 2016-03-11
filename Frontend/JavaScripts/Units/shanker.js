var Shanker = function(name, x, y) {
    var skeleton = new Player(x, y, 80, name),
        facing_left;
    var meelee_attack = 50;

    skeleton.getCharacterType = function() {
        return "Shanker";
    };
//    var actionbar_component = new ActionbarComponent(skeleton);

    //this, width, height
    var CC = new CollisionComponent(skeleton, PIXI.Texture.fromImage("r_shanker_walk_v3_state1.png").width - 30, PIXI.Texture.fromImage("r_shanker_walk_v3_state1.png").height - 20);
    skeleton.windWalk = function() {
        skeleton.setInvis(true);
    };
    var clipnames = [];
    for (var _i = 1; _i <= 6; _i++) {
        clipnames.push(PIXI.Texture.fromImage("r_shanker_walk_v3_state" + _i + ".png"));
    }
    var shanker_r = new PIXI.extras.MovieClip(clipnames);
    clipnames = [];
    for (var _i = 1; _i <= 6; _i++) {
        clipnames.push(PIXI.Texture.fromImage("l_shanker_walk_v3_state" + _i + ".png"));
    }
    var shanker_l = new PIXI.extras.MovieClip(clipnames);
    clipnames = [];
    for (var _i = 1; _i <= 8; _i++) {
        clipnames.push(PIXI.Texture.fromImage("r_shanker_attack_v2_state" + _i + ".png"));
    }
    var shanker_r_attack = new PIXI.extras.MovieClip(clipnames);
    clipnames = [];
    for (var _i = 1; _i <= 8; _i++) {
        clipnames.push(PIXI.Texture.fromImage("l_shanker_attack_v2_state" + _i + ".png"));
    }
    var shanker_l_attack = new PIXI.extras.MovieClip(clipnames);

    skeleton.setAnimations(shanker_l, shanker_r, shanker_l_attack, shanker_r_attack);
    var now = Date.now();
    skeleton.setInvis = function(_invis) {
        if (_invis) {
            MAIN.stage.removeChild(skeleton.imageContainer);
        } else {
            MAIN.stage.addChild(skeleton.imageContainer);
        }
    };
    skeleton.update = function(keys) {};
    return skeleton;
};
