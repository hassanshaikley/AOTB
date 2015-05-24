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
    var flySprite =new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("flysheet1.png"),PIXI.Texture.fromFrame("flysheet2.png"),PIXI.Texture.fromFrame("flysheet3.png")]);

  skeleton.imageContainer.addChild(flySprite);
    flySprite.gotoAndPlay(0);
    flySprite.animationSpeed = .15;

  var flyAnimate= 0;
  skeleton.draw = function() {
        this.drawText();

   var drawAtX  = CONFIG.SCREEN_WIDTH/2 + skeleton.getDrawAtX() - skeleton.localX() -50;
   flySprite.x = drawAtX;
   flySprite.y = this.getDrawAtY()-75; // hacky I know wtf I know wtff


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
