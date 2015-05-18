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
  skeleton.draw = function(ctx) {
    this.drawText();
   var drawAtX  = canvas.width/2 + skeleton.getDrawAtX() - skeleton.localX() -50;
    ctx.save();
    if (skeleton.getTeam()==0){
      ctx.shadowBlur=20;
      ctx.shadowColor="blue";
    }
    else {
      ctx.shadowBlur=20;
      ctx.shadowColor="green";
    }
    if (this.getAnimate()%30 <= 10){
      ctx.drawImage(flySprite,0,0, 100, 100, drawAtX,this.getDrawAtY()-50, 100, 100);
    }
    else if (this.getAnimate()%30  <= 20){
      ctx.drawImage(flySprite,100,0, 100, 100, drawAtX,this.getDrawAtY()-50, 100, 100);
    }
    else if (this.getAnimate()%30  <= 30){
      ctx.drawImage(flySprite,200,0, 100, 100, drawAtX, this.getDrawAtY()-50, 100, 100);
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
      ctx.translate(bugX+60, this.getDrawAtY()-40 + 90);
      ctx.rotate(Math.PI);
      ctx.drawImage(silverSword, 0, -10);
      ctx.restore();
    } else {
      ctx.drawImage(silverSword, bugX+ 60, this.getDrawAtY()-40);
    }
    ctx.restore();

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
