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
  }
};

var HealingSpike = function(startX, caster){
  var x  = startX, active = true, y = 0;
  var caster = caster;
  var draw = function(ctx){
    var trueX = x  - localPlayer.getX() + 50;
    ctx.drawImage(healingcross, trueX,y); 
  };
  var ticker = 0;
  var update = function(){
    y += 30;
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

  return {
    draw : draw,
    getX : getX,
    getY : getY,
    update : update,
    active : active,
    caster : caster
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
    for (var i = 0; i < Spells.spellsarray.length; i++){
      var yDist = Math.abs(Spells.spellsarray[i].getY() - localPlayer.getY());
      //if (yDist <= 100)
      
      var xDist = (Spells.spellsarray[i].getX() - localPlayer.getX()-canvas.width/2 + 155);
      if (xDist <= 85 && xDist >= 25 && yDist <= 100 && yDist >= 50 && Spells.spellsarray[i].active) {
//        Spells.spellsarray.splice(i, 1);
        localPlayer.setHp(localPlayer.getHp()-25);
        Spells.spellsarray[i].active = false;
        socket.emit("attack hits", {hit_by: Spells.spellsarray[i].caster });
      }
    }
    ctx.save();
    var fireballX = x  - localPlayer.getX() + 50;
    ctx.drawImage(fireballSprite,0,0, 100, 100, fireballX, y, 100, 100);
    ctx.restore();
  };

  return {
          getX : getX,
          getY : getY,
          draw : draw,
          update : update,
          active : active,
          caster : caster
  }
};
