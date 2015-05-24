var Shrine = function(_team) {
  this.maxHp = 3000;
  this.hp = this.maxHp;
  this.team = _team; //team random unless assigned

  this.x;
  this.y = 340; //aa
  this.hitby =[]; // object holding who hit you and when  (really useful for a fly who u only want to damage u once)

  if (_team == 0){
    this.x = 1350;
  } else {
    this.x = 3650;
  }
  this.getTeam= function(){
    return team;
  };

  this.getHp = function(){
    return this.hp;
  };

  /* Returns "dies" or "lives"*/
  this.setHp = function(newHp){
    //
    if (newHp >= this.maxHp){
      this.hp = this.maxHp;
    } else if ( newHp <= 0){
      this.hp = 0;
    } else {
      this.hp = newHp;
    }
    return "lives";
  };

    var health_shadow = new PIXI.Graphics();
  health_shadow.beginFill(0x000000);
  health_shadow.drawRect(0, 0, 300/2.2, 6);
  health_shadow.endFill();  //console.log("MAN STAGE "+MAIN.stage);
  

  var health = new PIXI.Graphics();
  
  health.beginFill(0x00FF00);
  health.drawRect(0, 0, 300/2.2, 6);
  health.endFill(); //console.log("MAN STAGE "+MAIN.stage);

  health.x =this.x;
  health_shadow.x = this.x;
  this.health = health;
  
  health_shadow.y = this.y -150;
  health.y = this.y -150;

  MAIN.stage.addChild(health_shadow);
  MAIN.stage.addChild(health);




  this.draw= function(){

    health.scale.x = Math.abs(this.hp/3000);

    this.drawAtX = CONFIG.SCREEN_WIDTH/2 + this.x - localPlayer.getDrawAtX();
    health.x = this.drawAtX-50;
    health_shadow.x = this.drawAtX-50;



    //old
   /* ctx.save();
    //draw HP
    //draw structure, depending on team
    this.displacement = -localPlayer.getX();

    this.drawAtX = this.drawAtX - spire0.width/2;
    if (this.team ==0 ){
      ctx.shadowBlur=20;
      ctx.shadowColor="blue";
    }
    else {
      ctx.shadowBlur=20;
      ctx.shadowColor="green";
    }
    if (this.team === 0){
      ctx.drawImage(spire0, this.drawAtX, 288);
    } else {
      ctx.drawImage(spire1, this.drawAtX, 288); 
    }

    ctx.fillStyle="#000000";
    ctx.fillRect(this.drawAtX + 60,this.y-50,3000/50,6);
    ctx.fillStyle="#FF0000";
    ctx.fillRect(this.drawAtX + 60,this.y-50,((this.hp/50)),6);
    ctx.fillText("SPIRE", this.drawAtX,this.y);
    ctx.restore();*/
  };
  this.getX = function() {
    return this.x;
  };

  this.getY = function() {
    return this.y;
  };
  // Define which variables and methods can be accessed by the world outside
  return this;
};

