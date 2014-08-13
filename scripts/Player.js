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

var Player = function(startX, startY) {
  var x = startX,
      y = startY,
      id,
      moveAmount = 3,
      wobble = 0;

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

    // Up key takes priority over down
    if (keys.up) {
      y -= moveAmount;
    } else if (keys.down) {
      y += moveAmount;
    };
    if(wobble > 0){
      y+=1;
    } else  {
      y-=.5;
    }
    if (wobble <=-20){
      wobble = 20;
    }
    // Left key takes priority over right
    if (keys.left) {
      x -= moveAmount;
      localX -= moveAmount;
    } else if (keys.right) {
      x += moveAmount;
      localX += moveAmount;
    };

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
          ctx.drawImage(silverSword, bugX+ 60, y-40);
    flyAnimate++; 
  };

  // Define which variables and methods can be accessed
  return {
    getX: getX,
      getY: getY,
      setX: setX,
      setY: setY,
      update: update,
      draw: draw
  }
};
