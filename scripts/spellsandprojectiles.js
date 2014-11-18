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
  var did_i_get_hit_by_a_fly = function(){
    for (i = 0; i < remotePlayers.length; i++) {
      // console.log(remotePlayers[i].getCharacterType() + " can hit me");
      if (remotePlayers[i].getCharacterType() === "Fly"){
        // console.log("Got a fly in the region");
        if (!remotePlayers[i].hitme  || (Math.abs(Date.now() - remotePlayers[i].hitme) ) > 500){
          if (remotePlayers[i].id && Math.abs(remotePlayers[i].getX() - localPlayer.getX()) <= 40 && Math.ceil(remotePlayers[i].getY()-localPlayer.getY()) <=  25 && remotePlayers[i].getDescendAttack()){
            console.log("i have been hit");
            //hit by a guy so I shouldnt be ablet o be hit by them for a few seconds
            localPlayer.setHp(localPlayer.getHp()-25);
            socket.emit("attack hits");
            remotePlayers[i].hitme = Date.now();
          }
        }
      }
      //only works if I HIT SOMEONE
    }
  };
  var draw = function(ctx){
    did_i_get_hit_by_a_fly();
    /* Check if a spell hits - going to need to be refactored*/
    for (var i = 0; i < Spells.spellsarray.length; i++){
      var yDist = Math.abs(Spells.spellsarray[i].getY() - localPlayer.getY());
      //if (yDist <= 100)
      //console.log(yDist);
      var xDist = (Spells.spellsarray[i].getX() - localPlayer.getX()-canvas.width/2 + 155);
      console.log("hit by " +hitby[i]);
      if (xDist <= 85 && xDist >= 25 && yDist <= 100 && yDist >= 50 && (hitby[i] === undefined || (Date.now() -hitby[i] >= 600)) ) {
        console.log("HIT");
        /* TELL LE SERVER I GOT HIT */
        localPlayer.setHp(localPlayer.getHp()-25);
        socket.emit("attack hits");
        hitby[i] = Date.now();
      }
    }
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
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
