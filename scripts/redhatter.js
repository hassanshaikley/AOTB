var Animate = 0;
var floorHeight = 474;
var localX = 0;

var Redhatter = function(x, y, hp, name){
  var skeleton =  Player(x, y, hp, name);
  var leftMouseAction = false,
      rightMouseAction = false,
      moveSpeed=1.7;

  var rightClick = function(clientX, clientY){
    //rightMouseAction = true;
    //var spell = new Spell();
    //  Spell.castMeteor();
    Spells.meteor(clientX, clientY);
  };
  var leftClick = function(){
    leftMouseAction = true;
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

      ctx.globalCompositeOperation = "lighter";

      if (facing_left){
        ctx.save();
        var drawAtX = canvas.width/2 - skeleton.getX() + localX - 50;
        ctx.translate(canvas.width , 0);
        ctx.scale(-1, 1);
      }
      else {
        ctx.save();

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
      Animate++;
      if(Animate >= 60){
        Animate=0;
      };


      if (skeleton.getAlive()){
        ctx.fillStyle="#FF0000";
        ctx.fillRect(drawAtX+30,skeleton.getY()-50,((skeleton.getHp()/2.2)),6);
      } else {
        ctx.fillText("DEAD", drawAtX + 37, skeleton.getY()-40);
      }

      ctx.fillStyle = "#5ab039";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText(name, drawAtX + 22, skeleton.getY()-60);
      ctx.fillStyle = "black";
      ctx.font = "bold 13px sans-serif";
      ctx.fillText(name, drawAtX + 25, skeleton.getY()-60);
      ctx.restore();


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
