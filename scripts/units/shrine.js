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
  health_shadow.endFill();  


  var health = new PIXI.Graphics();

  health.beginFill(0x00FF00);
  health.drawRect(0, 0, 300/2.2, 6);
  health.endFill(); 

  //health.x =this.x -25;
  //health_shadow.x = this.x-25;
  this.health = health;

  health_shadow.y = this.y -80;
  health.y = this.y -80;

  MAIN.stage.addChild(health_shadow);
  MAIN.stage.addChild(health);


  this.draw= function(){
    health.scale.x = Math.abs(this.hp/this.maxHp);
    this.drawAtX = CONFIG.SCREEN_WIDTH/2 + this.x - localPlayer.getDrawAtX();
    health.x = this.drawAtX-50 -30;
    health_shadow.x = this.drawAtX-50 -30;

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

