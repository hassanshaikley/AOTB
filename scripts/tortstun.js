var TortStun = function(_x,_y, _team ){
  this.team = _team;
	var cooldown = 1000;
  var x = _x, //center x
      y = 480;
 	var timer = 0; 
	this.update = function(){
		timer = timer+1;
    if (y >= 390){
			y = y-2;
    } else if (timer >= 200 ){
			var index = Spells.spellsarray.indexOf(this);
			Spells.spellsarray.splice(index, 1);
		}
  };

  this.getX = function(){
    return x;
  };

  this.getY = function(){
    return y;
  };

  this.draw = function(ctx){
    /* Check if a spell hits - going to need to be refactored*/
    ctx.save();
    var newX = x  -localPlayer.getDrawAtX()- 50+canvas.width/2;
    ctx.drawImage(tortStun,0,0, 100, 100, newX, y, 100, 100);
    ctx.restore();
  };
  return this;
};
