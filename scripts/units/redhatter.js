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

  /* Maybe make this heal?? */ 
  skeleton.leftClick = function(){
  };

  /* Lolswagz */
  skeleton.getCharacterType = function(){
    return "Redhatter";
  };


    var redhatter_l =new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("l_redhatter1.png"),PIXI.Texture.fromFrame("l_redhatter2.png"),PIXI.Texture.fromFrame("l_redhatter3.png"),PIXI.Texture.fromFrame("l_redhatter4.png")]);
    var redhatter_r =new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("r_redhatter1.png"),PIXI.Texture.fromFrame("r_redhatter2.png"),PIXI.Texture.fromFrame("r_redhatter3.png"),PIXI.Texture.fromFrame("r_redhatter4.png")]);


    redhatter_l.gotoAndPlay(0);
    redhatter_r.gotoAndPlay(0);
    redhatter_l.animationSpeed = .15;
    redhatter_r.animationSpeed = .15;
    skeleton.redhatter_l = redhatter_l;

  skeleton.imageContainer.addChild(redhatter_l);

  skeleton.draw = function(ctx) {

    var drawAtX  = canvas.width/2 + skeleton.getDrawAtX() - skeleton.localX() -50;

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

    //old
    this.drawText();
    ctx.save();
    if (skeleton.getTeam()===0){
      ctx.shadowBlur=20;
      ctx.shadowColor="blue";
    }
    else {
      ctx.shadowBlur=20;
      ctx.shadowColor="green";
    }
    if (this.getMoveDirection() === "left"){
      facing_left = true;
    } else if (this.getMoveDirection() === "right"){
      facing_left = false;
    }
    if (facing_left){
      spritesheet_offset_y = 100;
    }
    else {
      spritesheet_offset_y = 0;
    }
   var drawAtX  = canvas.width/2 + skeleton.getDrawAtX() - skeleton.localX() -50;
    

    /* Decides what sprite to draw*/
    if (this.getAnimate() <= 15){ 
      ctx.drawImage(RedhatterSprite,0,spritesheet_offset_y, 75, 100, drawAtX+20,this.getY()-70, 75, 100);
    }
    else if (this.getAnimate() <= 30){
      ctx.drawImage(RedhatterSprite,75,spritesheet_offset_y, 75, 100, drawAtX+20,this.getY()-70, 75, 100);
    }
    else if (this.getAnimate() <= 45){
      ctx.drawImage(RedhatterSprite,150,spritesheet_offset_y, 75, 100, drawAtX+20,this.getY()-70, 75, 100);
    } else{
      ctx.drawImage(RedhatterSprite,225,spritesheet_offset_y, 75, 100, drawAtX+20,this.getY()-70, 75, 100);
    }
    ctx.restore();
  };
  
  /* Constantly called for the localPlayer, updates the actual 
   * Position held by the server
   */
  skeleton.update = function(keys) {

  };
  return skeleton;
};
