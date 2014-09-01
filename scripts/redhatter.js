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

  var draw = function(ctx) {
  	//var drawAtX = skeleton.getX()-50;
    var drawAtX = canvas.width/2 + skeleton.getX() - localX - 50;

    if (Animate <= 20){
      ctx.drawImage(RedhatterSprite,0,0, 100, 100, drawAtX,skeleton.getY()-50, 100, 100);
    }
    else if (Animate <= 40){
      ctx.drawImage(RedhatterSprite,100,0, 100, 100, drawAtX,skeleton.getY()-50, 100, 100);
    }
    else if (Animate <= 60){
      ctx.drawImage(RedhatterSprite,200,0, 100, 100, drawAtX,skeleton.getY()-50, 100, 100);
    } 
    Animate++;
    if(Animate >= 60){
    	Animate=0;
    }
};
  var update = function(keys) {
  	localX = skeleton.getX();
      if (keys.left) {
      	skeleton.setX(skeleton.getX()-moveSpeed);
      	localX -= moveSpeed;

	  }
	  if (keys.right) {
	  	skeleton.setX(skeleton.getX()+moveSpeed);
	    localX -= moveSpeed;

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
         dies : skeleton.dies,
         setName : skeleton.setName,
         getName : skeleton.getName,
         update: update,
         draw: draw,
         rightClick: rightClick,
         leftClick: leftClick
  };
};