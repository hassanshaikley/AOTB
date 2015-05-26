var Redhatter = function(name, x, y, hp){


  var skeleton =  new Player(-100, -100, hp, name);
  var facing_left;

	//used for animation
  var spritesheet_offset_y = 0;

  /* CASTS A METEOR :D */

  skeleton.rightClick = function(clientX, clientY){
    var t_x = clientX ;
    console.log("-->"+t_x);
    socket.emit("spell one", { x: t_x });
  };

  /* Lolswagz */
  skeleton.getCharacterType = function(){
    return "Redhatter";
  };


  var redhatter_l =new PIXI.extras.MovieClip([PIXI.Texture.fromImage("l_redhatter1.png"),PIXI.Texture.fromImage("l_redhatter2.png"),PIXI.Texture.fromImage("l_redhatter3.png"),PIXI.Texture.fromImage("l_redhatter4.png")]);
  var redhatter_r =new PIXI.extras.MovieClip([PIXI.Texture.fromImage("r_redhatter1.png"),PIXI.Texture.fromImage("r_redhatter2.png"),PIXI.Texture.fromImage("r_redhatter3.png"),PIXI.Texture.fromImage("r_redhatter4.png")]);


  redhatter_l.gotoAndPlay(0);
  redhatter_r.gotoAndPlay(0);
  redhatter_l.animationSpeed = .15;
  redhatter_r.animationSpeed = .15;
  skeleton.redhatter_l = redhatter_l;

  skeleton.imageContainer.addChild(redhatter_l);

  skeleton.draw = function() {
    this.drawText();

    var drawAtX  = CONFIG.SCREEN_WIDTH/2 + skeleton.getDrawAtX() - skeleton.localX() -50;

    redhatter_l.position.y = 380;
    redhatter_r.position.y = 380;

    redhatter_l.position.x = drawAtX;
    redhatter_r.position.x = drawAtX;


    if (this.getMoveDirection() === "left"){

      skeleton.imageContainer.removeChild(redhatter_r);
      skeleton.imageContainer.removeChild(redhatter_l);
      redhatter_l.animationSpeed = .2;
      redhatter_r.animationSpeed = .2;
      skeleton.imageContainer.addChild(redhatter_l);
    
    } else if (this.getMoveDirection() === "right" ){
      skeleton.imageContainer.removeChild(redhatter_r);
      skeleton.imageContainer.removeChild(redhatter_l);
      redhatter_l.animationSpeed = .2;
      redhatter_r.animationSpeed = .2;
      skeleton.imageContainer.addChild(redhatter_r);

    } else {
      redhatter_l.animationSpeed = .0;
      redhatter_r.animationSpeed = .0;
    }
  };
  
  /* Constantly called for the localPlayer
   */
  skeleton.update = function(keys) {

  };
  return skeleton;
};
