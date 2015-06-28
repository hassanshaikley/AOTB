/**************************************************
 ** Spells, Projectile and Attacks all messed with here
 **************************************************/
m_cd = 1000;
h_cd = 1000;
var Spells = {
  spellsarray: [],

  healingSpike: function(clientX, clientY) {
    if (!localPlayer.healingcross || Date.now()-localPlayer.healingcross > h_cd){
      var m = new HealingSpike(clientX);
      socket.emit("healing spike cast", { _x : m.getX()});
      localPlayer.healingcross = Date.now();
    }
  },
    arrow: function(clientX, clientY){
	//var a = new Arrow(clientX, clientY);
	socket.emit("arrow created", {x : clientX, y: clientY });
  },
  yoloswag: function() {
  }

};

var BowmanArrow = function(startX, startY, _caster){
    var x = startX, y = startY;
    var caster = _caster;
    var update = function(){
	x = x + 2;
    };
    var draw = function(){
	 //ctx.drawImage(arrow, x, y);
	};
    var getX = function(){
	return x;
	};
    var setX = function(newX){
	var x = newX;
	};
    var getY = function(){
	   return 400;
	 };
    var setY = function(newY){

	};
    return {
	update : update,
	draw:  draw, 
	getX: getX,
	setX: setX
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
    y_t+=y_t*.5;
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
      MAIN.stage.removeChild(meteorClip);
    };
  };

  var getX = function(){
    return x;
  };

  var getY = function(){
    return y;
  };

  var meteorClip =new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("fireball.png")]);
  MAIN.stage.addChild(meteorClip);


  var draw = function(ctx){
    var fireballX = x  -localPlayer.getX()+CONFIG.SCREEN_WIDTH/2-50;

    meteorClip.x = fireballX;
    meteorClip.y = y;

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
