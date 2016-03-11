var Redhatter = function(name, x, y) {
    var skeleton = new Player(x, y, 70, name);
    var facing_left;
    var CC = new CollisionComponent(skeleton, 50, 50);
    /*skeleton.rightClick = function(clientX, clientY){
    var t_x = clientX ;
    socket.emit("spell one", { x: t_x });
  };*/
    /* Lolswagz */
    skeleton.getCharacterType = function() {
        return "Redhatter";
    };

    var spells_thumb_array = [];
//    var actionbar_component = new ActionbarComponent(skeleton);

    var redhatter_l = new PIXI.extras.MovieClip([PIXI.Texture.fromImage("l_redhatter1.png"),
                                                 PIXI.Texture.fromImage("l_redhatter2.png"),
                                                 PIXI.Texture.fromImage("l_redhatter3.png"),
                                                 PIXI.Texture.fromImage("l_redhatter4.png")]);

    var redhatter_r = new PIXI.extras.MovieClip([PIXI.Texture.fromImage("r_redhatter1.png"),
                                                 PIXI.Texture.fromImage("r_redhatter2.png"),
                                                 PIXI.Texture.fromImage("r_redhatter3.png"),
                                                 PIXI.Texture.fromImage("r_redhatter4.png")]);
    var clipnames = [];
    for (var _i = 1; _i <= 8; _i++) {
        clipnames.push(PIXI.Texture.fromImage("hatter_attack_v2_state" + _i + ".png"));
    }

    var redhatter_r_attack = new PIXI.extras.MovieClip(clipnames);
    clipnames = [];
    for (_i = 1; _i <= 8; _i++) {
        clipnames.push(PIXI.Texture.fromImage("l_hatter_attack_v2_state" + _i + ".png"));
    }
    var redhatter_l_attack = new PIXI.extras.MovieClip(clipnames);

    skeleton.setAnimations(redhatter_l, redhatter_r, redhatter_l_attack, redhatter_r_attack);
    skeleton.update = function(keys) {};

    return skeleton;
};
