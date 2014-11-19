/**************************************************
 ** Spells, Projectile and Attacks all messed with here
 **************************************************/
var Spells = {
  spellsarray: [],

  meteor: function(clientX, clientY) {
    var x = clientX;
    var m = new Meteor(x);
    socket.emit("meteor cast", { meteor_x : m.getX()});
  },
  yoloswag: function() {
              console.log("Yolo Swag");
  }
};

/* startY isn't necessary, but neither is swag */
var Meteor = function(meteorX){
  var x =meteorX, 
      y = -100;  
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
  var hitby = [];
  var draw = function(ctx){
    /* Check if a spell hits - going to need to be refactored*/
    for (var i = 0; i < Spells.spellsarray.length; i++){
      var yDist = Math.abs(Spells.spellsarray[i].getY() - localPlayer.getY());
      //if (yDist <= 100)
      //console.log(yDist);
      

      var xDist = (Spells.spellsarray[i].getX() - localPlayer.getX()-canvas.width/2 + 155);
      if (xDist <= 85 && xDist >= 25 && yDist <= 100 && yDist >= 50 ) {
        Spells.spellsarray.splice(i, 1);
        localPlayer.setHp(localPlayer.getHp()-25);
        socket.emit("attack hits");
        console.log("aah");
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
          update : update
  }
};
