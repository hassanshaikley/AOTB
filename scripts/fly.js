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

  var fly =  Player(x, y, hp, name, 3);


  var setDescendAttack = function(boolean_thing){
    descendAttack = boolean_thing;
  };
  var getDescendAttack = function(){
    return descendAttack;
  };
  var draw = function(ctx) {

    if (flyAnimate >= 30){
      flyAnimate = 0;
    }
    var bugX = canvas.width/2 + fly.getDrawAtX() - localX - 50;

    if (fly.getAlive()){
      ctx.fillStyle="#FF0000";
      ctx.fillRect(bugX+30,fly.getDrawAtY()-50,((fly.getHp()/2.2)),6);
    } else {
      ctx.fillText("DEAD", bugX + 37, fly.getDrawAtY()-40);
    }

    if (flyAnimate <= 10){
      ctx.drawImage(flySprite,0,0, 100, 100, bugX,fly.getDrawAtY()-50, 100, 100);
    }
    else if (flyAnimate <= 20){
      ctx.drawImage(flySprite,100,0, 100, 100, bugX,fly.getDrawAtY()-50, 100, 100);
    }
    else if (flyAnimate <= 30){
      ctx.drawImage(flySprite,200,0, 100, 100, bugX,fly.getDrawAtY()-50, 100, 100);
    }
    ctx.drawImage(silverShield, bugX+ 20, fly.getDrawAtY()-3);

    if (descendAttack || rightMouseActionHappening){
      if (!rightMouseActionHappening){
        rightMouseActionHappening = true;
      }
      //200 is pretty badass
    } 

    if (descendAttack) {
      ctx.save();
      ctx.translate(bugX+60, fly.getDrawAtY()-40 + 90);
      ctx.rotate(Math.PI);
      ctx.drawImage(silverSword, 0, -10);
      ctx.restore();
    } else {
      ctx.drawImage(silverSword, bugX+ 60, fly.getDrawAtY()-40);
    }
    flyAnimate++; 

    ctx.fillStyle = "black";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText(name, bugX + 22, fly.getDrawAtY()-60);


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
    localX = fly.getX();
    // Previous position
    var prevX = fly.getX(),
        prevY = fly.getY();

    //if (Math.floor(Math.random()*50) == 1)

    if (descendAttack == false){
      // Up key takes priority over down
      if (keys.up && fly.getY() >-16) {
        fly.setY(fly.getY()- moveAmount);
      } else if (keys.down) {
        fly.setY(fly.getY()+ moveAmount);
      };
      if(wobble > 0 && fly.getY() <= floorHeight){
        fly.setY(fly.getY()+1);
      } else if (fly.getY() <= floorHeight) {
        fly.setY(fly.getY()-.5);
      };
      if (wobble <=-20){
        wobble = 20;
      };
      if (fly.getY() >=floorHeight+1){
        fly.setY(floorHeight+1);
      };
      // Left key takes priority over right
      if (keys.left) {

        fly.setX(fly.getX() - moveAmount);
        localX -= moveAmount;
      } else if (keys.right) {

        fly.setX(fly.getX()+ moveAmount);
        localX += moveAmount;
      };
    }
    else {
      if ( fly.getY() >= floorHeight-1){
        descendAttack = false;
        fly.setY( floorHeight+1);
        rightMouseActionHappening = false;
      } else {
        fly.setY(fly.getY()+descendAttackSpeed);
      }
    }
    return (prevX != x || prevY != y) ? true : false;
  };

  var rightClick = function(){
    //rightMouseAction = true;
    setDescendAttack(true);
  }
  var leftClick = function(){
    lefttMouseAction = true;
  }
  var getCharacterType = function(){
    return "Fly";
  };

  return {
    getX : fly.getX,
         getY : fly.getY,
         setX : fly.setX,
         setY : fly.setY,
         getHp : fly.getHp,
         setHp : fly.setHp,
         getAlive : fly.getAlive,
         dies : fly.dies,
         setName : fly.setName,
         getName : fly.getName,
         setDescendAttack : setDescendAttack,
         getDescendAttack : getDescendAttack,
         getCharacterType : getCharacterType,
         update: update,
         updateVariables : fly.updateVariables,
         draw: draw,
         rightClick: rightClick,
         leftClick: leftClick
  };
};
