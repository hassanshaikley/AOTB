var Fly = function(name, x, y, hp){
  var descendAttack = false,
      rightMouseActionHappening = false,
      descendAttack = false,
      descendAttackSpeed = 10;

  var skeleton =  new Player(x, y, hp, name);


  skeleton.setDescendAttack = function(boolean_thing, local){
    descendAttack = boolean_thing;
    if (local) {
      socket.emit("descend attack change", { descendAttack: boolean_thing });
    }
  };
  

  skeleton.getDescendAttack = function(){
    return descendAttack;
  };
  

  var clipnames = [];

  for (var _i = 1; _i <= 12; _i ++){
    clipnames.push(PIXI.Texture.fromImage("r_flysheet_walk_v2_state"+_i+".png"));
  }
  var fly_r = new PIXI.extras.MovieClip(clipnames);
  clipnames =[];
  
  for (var _i = 1; _i <= 12; _i ++){
    clipnames.push(PIXI.Texture.fromImage("l_flysheet_walk_v2_state"+_i+".png"));
  }
  var fly_l = new PIXI.extras.MovieClip(clipnames);

  clipnames =[];

  for (var _i = 1; _i <= 8; _i ++){
    clipnames.push(PIXI.Texture.fromImage("r_flysheet_attack_v1_state"+_i+".png"));
  }
  var fly_r_attack = new PIXI.extras.MovieClip(clipnames);
  clipnames =[];
  
  for (var _i = 1; _i <= 8; _i ++){
    clipnames.push(PIXI.Texture.fromImage("l_flysheet_attack_v1_state"+_i+".png"));
  }
  var fly_l_attack = new PIXI.extras.MovieClip(clipnames);


  fly_l.gotoAndPlay(0);
  fly_r.gotoAndPlay(0);

  
  fly_r.animationSpeed = .15;
  fly_l.animationSpeed = .15;

  fly_r_attack.animationSpeed = .15;
  fly_l_attack.animationSpeed = .15;

  skeleton.fly_l = fly_l;



 // var flySprite =new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("flysheet1.png"),PIXI.Texture.fromFrame("flysheet2.png"),PIXI.Texture.fromFrame("flysheet3.png")]);

  skeleton.imageContainer.addChild(fly_r);
    fly_r.gotoAndPlay(0);

  var flyAnimate= 0;
  var first = false,
      loop = false;
  
  skeleton.draw = function() {
        this.drawText();

  var drawAtX  = CONFIG.SCREEN_WIDTH/2 + skeleton.getDrawAtX() - skeleton.localX() -50;
 fly_l.position.y = skeleton.getDrawAtY();
    fly_r.position.y = skeleton.getDrawAtY();
    fly_r_attack.position.y = skeleton.getDrawAtY();
    fly_l_attack.position.y = skeleton.getDrawAtY();

    fly_l.position.x = drawAtX;
    fly_r.position.x = drawAtX;
    fly_r_attack.position.x = drawAtX;
    fly_l_attack.position.x = drawAtX;

    skeleton.imageContainer.removeChild(fly_r);
    skeleton.imageContainer.removeChild(fly_l);
    skeleton.imageContainer.removeChild(fly_l_attack);
    skeleton.imageContainer.removeChild(fly_r_attack);





    if (this.getCurrentAction() === CONFIG.ACTION.ATTACK_RIGHT){
      if (first === false){
        fly_r_attack.gotoAndPlay(0);
        first = true; //at the very end set first to true
      }
      skeleton.imageContainer.addChild(fly_r_attack);
      if (fly_r_attack.currentFrame === 1){
        loop = true;
      }
      if (fly_r_attack.currentFrame === 0 && loop){
        first = false;
        //this.setCurrentAction(CONFIG.ACTION.MOVING_RIGHT);
        this.setMeeleeAttack(false);
        loop = false;
      }
    } else if (this.getCurrentAction() === CONFIG.ACTION.ATTACK_LEFT){
      if (first === false){
        fly_l_attack.gotoAndPlay(0);
        first = true; //at the very end set first to true
      }
      skeleton.imageContainer.addChild(fly_l_attack);
      if (fly_l_attack.currentFrame === 1){
        loop = true;
      }
      if (fly_l_attack.currentFrame === 0 && loop){
        first = false;
        //this.setCurrentAction(CONFIG.ACTION.MOVING_RIGHT);
        this.setMeeleeAttack(false);
        loop = false;
      }

    } else if (this.getCurrentAction() === CONFIG.ACTION.MOVING_RIGHT){
      skeleton.imageContainer.addChild(fly_r);
    } else if (this.getCurrentAction() === CONFIG.ACTION.MOVING_LEFT){
      skeleton.imageContainer.addChild(fly_l);
    }  else { //is idling
      if (this.getMoveDirection() === "left"){
        skeleton.imageContainer.addChild(fly_l);
      } else {
        skeleton.imageContainer.addChild(fly_r);
      }
    }


        fly_r.animationSpeed = .2;
      fly_r.animationSpeed = .2;





/*  fly_r.x = drawAtX;
   fly_r.y = this.getDrawAtY()-75; // hacky I know wtf I know wtff
*/

/*
    this.drawText();
    ctx.save();
    if (skeleton.getTeam()==0){
      ctx.shadowBlur=20;
      ctx.shadowColor="blue";
    }
    else {
      ctx.shadowBlur=20;
      ctx.shadowColor="green";
    }


    ctx.drawImage(silverShield, drawAtX+ 20, this.getDrawAtY()-3);

    if (descendAttack || rightMouseActionHappening){
      if (!rightMouseActionHappening){
        rightMouseActionHappening = true;
      }
      //200 is pretty badass
    } 
    if (descendAttack) {
      ctx.save();
      ctx.translate(drawAtX+60, this.getDrawAtY()-40 + 90);
      ctx.rotate(Math.PI);
      ctx.drawImage(silverSword, 0, -10);
      ctx.restore();
    } else {
      ctx.drawImage(silverSword, drawAtX+ 60, this.getDrawAtY()-40);
    }
    ctx.restore(); */

  };

  /*
        if (!remotePlayers[i].hitme  || (Math.abs(Date.now() - remotePlayers[i].hitme) ) > 500){
          if (remotePlayers[i].id && Math.abs(remotePlayers[i].getX() - localPlayer.getX()) <= 40 && Math.ceil(remotePlayers[i].getY()-localPlayer.getY()) <=  25 && remotePlayers[i].getDescendAttack()){

            remotePlayers[i].hitme = Date.now();
*/
  // Update player position
  skeleton.update = function(keys) {
     
    localX = this.getX();
    return; 
  };
  var f_cd = 1000;
  var f_t = Date.now();
  skeleton.rightClick = function(){
    //lol terrible design
    if (Date.now() - f_t > f_cd){
      skeleton.setDescendAttack(true, true);
      f_t = Date.now();
    }
  }
  skeleton.getCharacterType = function(){
    return "Fly";
  };

  return skeleton; 
};
