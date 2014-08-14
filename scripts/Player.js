/**************************************************
 ** GAME PLAYER CLASS
 **************************************************/

var fly = new Image();
var silverShield = new Image();
silverShield.src = 'https://s3-us-west-2.amazonaws.com/amara-assets/silverShield.png';
fly.src = 'https://s3-us-west-2.amazonaws.com/amara-assets/flysheet.png';
var silverSword = new Image();
silverSword.src = 'https://s3-us-west-2.amazonaws.com/amara-assets/silverSword.png';
var flyAnimate = 0;
var localX;

var floorHeight = 474;
var Player = function(startX, startY) {
  var x = startX,
      y = startY,
      hp = 100,
      id,
      moveAmount = 3,
      wobble = 0,
      leftMouseAction = false,
      rightMouseAction = false,
      rightMouseActionHappening = false,
      descendAttack = false;
  // Getters and setters
  var getX = function() {
    return x;
  };

  var getY = function() {
    return y;
  };

  var setX = function(newX) {
    x = newX;
  };

  var setY = function(newY) {
    y = newY;
  };

  // Update player position
  var update = function(keys) {
    wobble--;
    localX = x;
    // Previous position
    var prevX = x,
        prevY = y;

//if (Math.floor(Math.random()*50) == 1)

    if (descendAttack == false){
      // Up key takes priority over down
      if (keys.up) {
        y -= moveAmount;
      } else if (keys.down) {
        y += moveAmount;
      };
      if(wobble > 0 && y <= floorHeight){
        y+=1;
      } else if (y <= floorHeight) {
        y-=.5;
      }
      if (wobble <=-20){
        wobble = 20;
      }
      if (y >=floorHeight+1){
        y=floorHeight+1;
      }
      // Left key takes priority over right
      if (keys.left) {
        x -= moveAmount;
        localX -= moveAmount;
      } else if (keys.right) {
        x += moveAmount;
        localX += moveAmount;
      };
    }
    else {
      if ( y >= floorHeight){
        descendAttack = false;
        y = floorHeight+1;
        rightMouseActionHappening = false;
      } else {
        y+=7;
      }
    }
    console.log(y);
    console.log(descendAttack);
    return (prevX != x || prevY != y) ? true : false;
  };

  // Draw player
  var draw = function(ctx) {
    if (flyAnimate >= 30){
      flyAnimate = 0;
    }
    var bugX = canvas.width/2 + x - localX - 50;
    if (flyAnimate <= 10){
      ctx.drawImage(fly,0,0, 100, 100, bugX,y-50, 100, 100);
    }
    else if (flyAnimate <= 20){
      ctx.drawImage(fly,100,0, 100, 100, bugX,y-50, 100, 100);
    }
    else if (flyAnimate <= 30){
      ctx.drawImage(fly,200,0, 100, 100, bugX,y-50, 100, 100);
    }
    ctx.drawImage(silverShield, bugX+ 20, y-3);


    if (rightMouseAction || rightMouseActionHappening){
        rightMouseAction = false;
        if (!rightMouseActionHappening){
          swordRotation = 1;
          rightMouseActionHappening = true;
        }
        swordRotation++;
      ctx.save();
      ctx.translate(bugX+60+swordRotation/30, y-50 +swordRotation/2);
      ctx.rotate(swordRotation*Math.PI/180);
      ctx.drawImage(silverSword, 0, -10);
      ctx.restore();
      //200 is pretty badass
      if (swordRotation >= 180){
        swordRotation = 180;
        descendAttack = true;
      }
    } else {
      ctx.drawImage(silverSword, bugX+ 60, y-40);
    }
    flyAnimate++; 
    ctx.fillStyle = "black";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText(hp, bugX + 40, y-40);
  };
  var rightClick = function(){
    console.log("RIGHT CLICK");
    rightMouseAction = true;
  }
  var leftClick = function(){
    console.log("LEFT CLICK");
    lefttMouseAction = true;
  }

  // Define which variables and methods can be accessed
  return {
    getX: getX,
      getY: getY,
      setX: setX,
      setY: setY,
      update: update,
      draw: draw,
      rightClick: rightClick,
      leftClick: leftClick
  }
};

