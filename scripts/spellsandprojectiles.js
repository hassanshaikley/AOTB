/**************************************************
 ** Spells, Projectile and Attacks all messed with here
 **************************************************/
m_cd = 1000;
h_cd = 1000;
var Spells = {
  spellsarray: [],

  meteor: function(clientX, clientY) {
    if (!localPlayer.meteor  || Date.now()-localPlayer.meteor > m_cd){
      var x = clientX;
      var m = new Meteor(x);
      socket.emit("meteor cast", { meteor_x : m.getX()});
      localPlayer.meteor = Date.now();
    }
  },
  healingSpike: function(clientX, clientY) {
    if (!localPlayer.healingcross || Date.now()-localPlayer.healingcross > h_cd){
      var x = clientX;
      var m = new HealingSpike(x);
      socket.emit("healing spike cast", { _x : m.getX()});
      localPlayer.healingcross = Date.now();
    }
  },
  yoloswag: function() {
              console.log("Yolo Swag");
  }, 
  didAnyHit :function() {

    for (var i = 0; i < Spells.spellsarray.length; i++){
      var yDist = Math.abs(Spells.spellsarray[i].getY() - localPlayer.getY());
      
      var xDist = (Spells.spellsarray[i].getX() - localPlayer.getX()-canvas.width/2 + 155);
      if (xDist <= 85 && xDist >= 25 && yDist <= 100 && yDist >= 50 && Spells.spellsarray[i].active) {
//        Spells.spellsarray.splice(i, 1);
        console.log(Spells.spellsarray[i].constructor);
        localPlayer.setHp(localPlayer.getHp()-Spells.spellsarray[i].getDamage());
        Spells.spellsarray[i].active = false;
        socket.emit("attack hits", {hit_by: Spells.spellsarray[i].caster, damage: Spells.spellsarray[i].getDamage() });
      }
    }
             }
};

var HealingSpike = function(startX, caster){
  var x  = startX, active = true, y = -100;
  y_t = 1;
  var caster = caster;
  var draw = function(ctx){
    var trueX = x  - localPlayer.getX() + 50;
    ctx.drawImage(healingcross, trueX,y); 
  };
  var ticker = 0;
  var update = function(){
    y += y_t;
    y_t+=y_t;
    //x += 2;
    var index = Spells.spellsarray.indexOf(this);
    if (y >= 410){
      y = 410;
      ticker++;
      if (ticker == 100){
      Spells.spellsarray.splice(index, 1);
      }

    };
  };

  var getX = function(){
    return x;
  };

  var getY = function(){
    return y;
  };
  var getDamage = function(){
  return -10;
  }
  return {
    draw : draw,
    getX : getX,
    getY : getY,
    update : update,
    active : active,
    caster : caster,
    getDamage : getDamage
  }
};
/* startY isn't necessary, but neither is swag */
var Meteor = function(meteorX, mCaster){
  var caster = mCaster;
  var x =meteorX, 
      y = -100,
      active = true; //active spells can hurt this specific client 
  var update = function(){
    y += 15;
    //x += 2;
    var index = Spells.spellsarray.indexOf(this);
    if (y >= 500){
      Spells.spellsarray.splice(index, 1);
    };
  };

  var getX = function(){
    return x;
  };

  var getY = function(){
    return y;
  };
  var draw = function(ctx){
    /* Check if a spell hits - going to need to be refactored*/
    ctx.save();
    var fireballX = x  - localPlayer.getX() + 50;
    ctx.drawImage(fireballSprite,0,0, 100, 100, fireballX, y, 100, 100);
    ctx.restore();
  };
  var getDamage = function(){
    return 25;
  };
  return {

    getX : getX,
          getY : getY,
          draw : draw,
          update : update,
          active : active,
          caster : caster,
          getDamage: getDamage
  }
};
