/**************************************************
 ** GAME PLAYER CLASS
 **************************************************/

var fly = new Image();
fly.src = 'https://s3-us-west-2.amazonaws.com/amara-assets/flysheet.png';
var flyAnimate = 0;
var Player = function(startX, startY) {
  var x = startX,
      y = startY,
      id,
      moveAmount = 2;

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
    // Previous position
    var prevX = x,
        prevY = y;

    // Up key takes priority over down
    if (keys.up) {
      y -= moveAmount;
    } else if (keys.down) {
      y += moveAmount;
    };

    // Left key takes priority over right
    if (keys.left) {
      x -= moveAmount;
    } else if (keys.right) {
      x += moveAmount;
    };

    return (prevX != x || prevY != y) ? true : false;
  };

  // Draw player
  var draw = function(ctx) {
    if (flyAnimate >= 15){
      flyAnimate = 0;
    }
    ctx.fillRect(x-5, y-5, 10, 10);
    if (flyAnimate <= 4){
      ctx.drawImage(fly,0,0, 100, 100, x-50,y-50, 100, 100);
    }
    else if (flyAnimate <= 9){
      ctx.drawImage(fly,100,0, 100, 100, x-50,y-50, 100, 100);
    }
    else if (flyAnimate <= 14){
      ctx.drawImage(fly,200,0, 100, 100, x-50,y-50, 100, 100);
    }
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
