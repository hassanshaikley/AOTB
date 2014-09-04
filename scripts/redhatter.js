var Animate = 0;
var floorHeight = 474;
var localX = 0;

var Redhatter = function(x, y, hp, name){
	var skeleton =  Player(x, y, hp, name);
  	var leftMouseAction = false,
  	rightMouseAction = false,
  	moveSpeed=1.7;

	 var rightClick = function(){
    //rightMouseAction = true;
    	rightMouseAction = true;
	  };
 	 var leftClick = function(){
 	   lefttMouseAction = true;
  	};
  	  var getCharacterType = function(){
    return "Redhatter";
  };
  var facing_left 
  var draw = function(ctx) {
  	//var drawAtX = skeleton.getX()-50;
    if (skeleton.getMoveDifference() <0){
     facing_left = true;
    } else if (skeleton.getMoveDifference() > 0){
      facing_left = false;
    }

    if (facing_left){
    	ctx.save();
    	var drawAtX = canvas.width/2 - skeleton.getX() + localX - 50;
      	ctx.translate(canvas.width , 0);
      	ctx.scale(-1, 1);
  	}
  	else {
  		var drawAtX = canvas.width/2 + skeleton.getX() - localX - 50;
  	}
    if (Animate <= 20 && skeleton.getMoveDifference() !=0){
      ctx.drawImage(RedhatterSprite,0,0, 100, 100, drawAtX,skeleton.getY()-50, 100, 100);
    }
    else if (Animate <= 40 && skeleton.getMoveDifference() !=0){
      ctx.drawImage(RedhatterSprite,100,0, 100, 100, drawAtX,skeleton.getY()-50, 100, 100);
    }
    else if (Animate <= 60 && skeleton.getMoveDifference() !=0){
      ctx.drawImage(RedhatterSprite,200,0, 100, 100, drawAtX,skeleton.getY()-50, 100, 100);
    } else{
    	ctx.drawImage(RedhatterSprite,200,0, 100, 100, drawAtX,skeleton.getY()-50, 100, 100);
    }
    ctx.restore();
    Animate++;
    if(Animate >= 60){
    	Animate=0;
    }
};
/* Constantly called for the localPlayer */
  var update = function(keys) {

  	localX = skeleton.getX();
      if (keys.left) {
      	skeleton.setX(skeleton.getX()-moveSpeed);
      	localX -= moveSpeed;

	  }
	  if (keys.right) {
	  	skeleton.setX(skeleton.getX()+moveSpeed);
	    localX += moveSpeed;

	  }
	  if (keys.up) { }
	  if (keys.down) { }

  };
	  return {
    	 getX : skeleton.getX,
         getY : skeleton.getY,
         setX : skeleton.setX,
         setY : skeleton.setY,
         getCharacterType : getCharacterType,
         getHp : skeleton.getHp,
         setHp : skeleton.setHp,
         getAlive : skeleton.getAlive,
         updateVariables : skeleton.updateVariables,
         dies : skeleton.dies,
         getMoveDifference : skeleton.getMoveDifference,
         setName : skeleton.setName,
         getName : skeleton.getName,
         update: update,
         draw: draw,
         rightClick: rightClick,
         leftClick: leftClick
  };
};