var Redhatter = function(name, x, y){
  var skeleton =  new Player(x, y, 70, name);
  var facing_left;

    var CC = new CollisionComponent(skeleton, 50, 50);
  skeleton.rightClick = function(clientX, clientY){
    var t_x = clientX ;
    socket.emit("spell one", { x: t_x });
  };

  /* Lolswagz */
  skeleton.getCharacterType = function(){
    return "Redhatter";
  };

    var spells_thumb_array = [];
    skeleton.setUpActionbar = function(){
        var sword_thumb = new PIXI.Sprite(PIXI.Texture.fromFrame("attack1_icon_v3.fw.png"));
        MAIN.BOTACTIONBAR.addChild(sword_thumb);
        var tort_stun =new PIXI.Sprite(PIXI.Texture.fromFrame("fireball.png"));
      MAIN.BOTACTIONBAR.addChild(tort_stun);
      spells_thumb_array.push(sword_thumb)
      spells_thumb_array.push(tort_stun);


      var rhrangethumb = new PIXI.Sprite(PIXI.Texture.fromFrame("rh_range.png"));
      spells_thumb_array.push(rhrangethumb);
      rhrangethumb.x =15;
      rhrangethumb.y = 15;

      for (var _i = 0; _i < spells_thumb_array.length; _i++){

          helpers.addThumbToActionBar(spells_thumb_array[_i], "description" );
      }

     /* sword_thumb.interactive = true;

      sword_thumb.mouseover = function(mouseData){
        console.log("MOUSE OVER!");
      }*/
  }


  var redhatter_l = new PIXI.extras.MovieClip([PIXI.Texture.fromImage("l_redhatter1.png"),PIXI.Texture.fromImage("l_redhatter2.png"),PIXI.Texture.fromImage("l_redhatter3.png"),PIXI.Texture.fromImage("l_redhatter4.png")]);
  var redhatter_r = new PIXI.extras.MovieClip([PIXI.Texture.fromImage("r_redhatter1.png"),PIXI.Texture.fromImage("r_redhatter2.png"),PIXI.Texture.fromImage("r_redhatter3.png"),PIXI.Texture.fromImage("r_redhatter4.png")]);



  var clipnames = [];

  for (var _i = 1; _i <= 8; _i ++){
    clipnames.push(PIXI.Texture.fromImage("hatter_attack_v2_state"+_i+".png"));
  }
  var redhatter_r_attack = new PIXI.extras.MovieClip(clipnames);
  clipnames =[];
  for (var _i = 1; _i <= 8; _i ++){
    clipnames.push(PIXI.Texture.fromImage("l_hatter_attack_v2_state"+_i+".png"));
  }
  var redhatter_l_attack = new PIXI.extras.MovieClip(clipnames);


  redhatter_l.gotoAndPlay(0);
  redhatter_r.gotoAndPlay(0);


  redhatter_r_attack.animationSpeed = .30;
  redhatter_l_attack.animationSpeed = .30;

  redhatter_l.animationSpeed = .15;
  redhatter_r.animationSpeed = .15;

  skeleton.redhatter_l = redhatter_l;

  skeleton.imageContainer.addChild(redhatter_l);
  var first = false,
      loop = false;
  skeleton.draw = function() {
    this.drawText();
   // this.update_player();
      var drawAtY = skeleton.getDrawAtY()- 60;
    var drawAtX  = CONFIG.SCREEN_WIDTH/2 + skeleton.getDrawAtX() - skeleton.localX() -50;

   if (this.getMoveDirection() === "right" ){
        drawAtX += 32;
        } else {
        drawAtX += 20;
            }



    redhatter_l.position.y = drawAtY;
    redhatter_r.position.y = drawAtY;
    redhatter_r_attack.position.y = drawAtY+10;
    redhatter_l_attack.position.y = drawAtY+10;

    redhatter_l.position.x = drawAtX;
    redhatter_r.position.x = drawAtX;
    redhatter_r_attack.position.x = drawAtX;
    redhatter_l_attack.position.x = drawAtX-50;


    skeleton.imageContainer.removeChild(redhatter_l);
    skeleton.imageContainer.removeChild(redhatter_r);
    skeleton.imageContainer.removeChild(redhatter_l_attack);
    skeleton.imageContainer.removeChild(redhatter_r_attack);

    if (this.getCurrentAction() === CONFIG.ACTION.ATTACK_RIGHT){
      if (first === false){
        redhatter_r_attack.gotoAndPlay(0);
        first = true; //at the very end set first to true
      }
      skeleton.imageContainer.addChild(redhatter_r_attack);
      if (redhatter_r_attack.currentFrame === 1){
        loop = true;
      }
      if (redhatter_r_attack.currentFrame === 0 && loop){
        first = false;
        //this.setCurrentAction(CONFIG.ACTION.MOVING_RIGHT);
        this.setMeeleeAttack(false);
        loop = false;
      }
    } else if (this.getCurrentAction() === CONFIG.ACTION.ATTACK_LEFT){
      if (first === false){
        redhatter_l_attack.gotoAndPlay(0);
        first = true; //at the very end set first to true
      }
      skeleton.imageContainer.addChild(redhatter_l_attack);
      if (redhatter_l_attack.currentFrame === 1){
        loop = true;
      }
      if (redhatter_l_attack.currentFrame === 0 && loop){
        first = false;
        //this.setCurrentAction(CONFIG.ACTION.MOVING_RIGHT);
        this.setMeeleeAttack(false);
        loop = false;
      }

    } else if (this.getCurrentAction() === CONFIG.ACTION.MOVING_RIGHT){
      skeleton.imageContainer.addChild(redhatter_r);
    } else if (this.getCurrentAction() === CONFIG.ACTION.MOVING_LEFT){
      skeleton.imageContainer.addChild(redhatter_l);
    }  else { //is idling
      if (this.getMoveDirection() === "left"){
        skeleton.imageContainer.addChild(redhatter_l);
      } else {
        skeleton.imageContainer.addChild(redhatter_r);
      }
    }


        redhatter_l.animationSpeed = .2;
      redhatter_r.animationSpeed = .2;

    if (this.getCurrentAction() == CONFIG.ACTION.IDLE) {

        redhatter_l.animationSpeed = 0;
      redhatter_r.animationSpeed = 0;
  redhatter_l.gotoAndPlay(0);
  redhatter_r.gotoAndPlay(0);
       }



  };

  /* Constantly called for the localPlayer
   */
  skeleton.update = function(keys) {

  };
  return skeleton;
};
