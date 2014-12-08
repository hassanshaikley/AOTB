/**************************************************
   ** FLY CLASS IN CLIENT
    **************************************************/

var flyAnimate = 0;
var localX;
var floorHeight = 474;
var toggle = 1;


var Fly = function(x, y, hp, name){

  var descendAttack = false,
      moveAmount = 3,
      wobble = 0 ,
      leftMouseAction = false,
      rightMouseActionHappening = false,
      descendAttack = false,
      descendAttackSpeed = 10;

  var skeleton =  Player(x, y, hp, name, 3);


  var setDescendAttack = function(boolean_thing, local){
//    console.log("descend attack changes");
    descendAttack = boolean_thing;
    if (local) {
      socket.emit("descend attack change", { descendAttack: boolean_thing });
    }
  };
  var getDescendAttack = function(){
    return descendAttack;
  };
  var draw = function(ctx) {
    skeleton.drawText();
    if (flyAnimate >= 30){
      flyAnimate = 0;
    }
    var bugX = canvas.width/2 + skeleton.getDrawAtX() - localX - 50;

    if (skeleton.getAlive()){
      ctx.fillStyle="#FF0000";
      ctx.fillRect(bugX+30,skeleton.getDrawAtY()-50,((skeleton.getHp()/2.2)),6);
    } else {
      ctx.fillText("DEAD", bugX + 37, skeleton.getDrawAtY()-40);
    }

    if (flyAnimate <= 10){
      ctx.drawImage(flySprite,0,0, 100, 100, bugX,skeleton.getDrawAtY()-50, 100, 100);
    }
    else if (flyAnimate <= 20){
      ctx.drawImage(flySprite,100,0, 100, 100, bugX,skeleton.getDrawAtY()-50, 100, 100);
    }
    else if (flyAnimate <= 30){
      ctx.drawImage(flySprite,200,0, 100, 100, bugX,skeleton.getDrawAtY()-50, 100, 100);
    }
    ctx.drawImage(silverShield, bugX+ 20, skeleton.getDrawAtY()-3);

    if (descendAttack || rightMouseActionHappening){
      if (!rightMouseActionHappening){
        rightMouseActionHappening = true;
      }
      //200 is pretty badass
    } 

    if (descendAttack) {
      ctx.save();
      ctx.translate(bugX+60, skeleton.getDrawAtY()-40 + 90);
      ctx.rotate(Math.PI);
      ctx.drawImage(silverSword, 0, -10);
      ctx.restore();
    } else {
      ctx.drawImage(silverSword, bugX+ 60, skeleton.getDrawAtY()-40);
    }
    flyAnimate++; 

    ctx.fillStyle = "black";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText(name, bugX + 22, skeleton.getDrawAtY()-60);
  };

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

  // Update player position
  var update = function(keys) {
    //did_i_get_hit_by_a_fly();
    wobble--;
    localX = skeleton.getX();
    // Previous position
    var prevX = skeleton.getX(),
        prevY = skeleton.getY();

    //if (Math.floor(Math.random()*50) == 1)

    if (descendAttack == false){
      // Up key takes priority over down
      if (keys.up && skeleton.getY() >-16) {
        skeleton.setY(skeleton.getY()- moveAmount);
      } else if (keys.down) {
        skeleton.setY(skeleton.getY()+ moveAmount);
      };
      if(wobble > 0 && skeleton.getY() <= floorHeight){
        skeleton.setY(skeleton.getY()+1);
      } else if (skeleton.getY() <= floorHeight) {
        skeleton.setY(skeleton.getY()-.5);
      };
      if (wobble <=-20){
        wobble = 20;
      };
      if (skeleton.getY() >=floorHeight+1){
        skeleton.setY(floorHeight+1);
      };
      // Left key takes priority over right
      if (keys.left) {

        skeleton.setX(skeleton.getX() - moveAmount);
        localX -= moveAmount;
      } else if (keys.right) {

        skeleton.setX(skeleton.getX()+ moveAmount);
        localX += moveAmount;
      };
    }
    else {
      if ( skeleton.getY() >= floorHeight-1){
        setDescendAttack(false, true);
        skeleton.setY( floorHeight+1);
        rightMouseActionHappening = false;
      } else {
        skeleton.setY(skeleton.getY()+descendAttackSpeed);
      }
    }
    return (prevX != x || prevY != y) ? true : false;
  };

  var rightClick = function(){
    //rightMouseAction = true;
    setDescendAttack(true, true);
  }
  var leftClick = function(){
    lefttMouseAction = true;
  }
  var getCharacterType = function(){
    return "Fly";
  };

  return {
    getX : skeleton.getX,
         getY : skeleton.getY,
         setX : skeleton.setX,
         setY : skeleton.setY,
         getHp : skeleton.getHp,
         setHp : skeleton.setHp,
         getAlive : skeleton.getAlive,
         dies : skeleton.dies,
         setName : skeleton.setName,
         getName : skeleton.getName,
         setDescendAttack : setDescendAttack,
         getDescendAttack : getDescendAttack,
         getCharacterType : getCharacterType,
         update: update,
         updateVariables : skeleton.updateVariables,
         draw: draw,
         rightClick: rightClick,
         leftClick: leftClick,
         speaks: skeleton.speaks,
         respawn : skeleton.respawn
  };
};
