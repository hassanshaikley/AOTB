/* All the server needs to know is the spawn point of the meteor 
 * Then the clients will calculate if they are hit, and if they are
 * then it sends who hit them, as well as how much damage has been done 
 * to them to the server!
 * 
 */
var Spells = {
  spellsarray: [],

  meteor: function(clientX) {
    var m = new Meteor(clientX);
    //console.log(m.getX());
    console.log(clientX);
    socket.emit("meteor cast", { meteor_x : m.getX()});
  },

  yoloswag: function() {
              console.log("Yolo Swag");
            }
};

/* startY isn't necessary, but neither is swag */
var Meteor = function(startX){
	console.log(startX);
  var x = startX-25, y = -100;

  var update = function(){
  	y += 15;
  	x += 2;
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

  /* Should return what first y should be */
  var calculateStartY = function(){
    return 50;
  };

  


  var draw = function(ctx){
    ctx.save();

    ctx.globalCompositeOperation = "source-over";
    ctx.globalCompositeOperation = "lighter";
    var gradient = ctx.createRadialGradient(5, 5, 5, 5, 5, 5);

      gradient.addColorStop(0, "rgba("+5+", "+5+", "+5+", "+5+")");
      gradient.addColorStop(0.5, "rgba("+5+", "+5+", "+5+", "+5+")");
      gradient.addColorStop(1, "rgba("+5+", "+5+", "+5+", 0)");
      ctx.fillStyle = gradient;
	ctx.drawImage(fireballSprite,0,0, 100, 100, x,y, 100, 100);
      //regenerate particles

    
    ctx.restore();
  };

  return {
      getX : getX,
      getY : getY,
      draw : draw,
      update : update
  }
};
