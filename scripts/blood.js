/**************************************************
 ** GAME PLAYER CLASS IN CLIENT
 **************************************************/
var Blood = function(startX, startY) {
  var x =               startX,
      y =               startY,
      animate = 0;

 
  var draw = function(){
    animate++;
    var   drawAtX = CONFIG.SCREEN_WIDTH/2 + x - localPlayer.getDrawAtX() ;
    console.log("DRAWLE BLOOD -- " +drawAtX) ;
    if (animate  < 10 ){
      ctx.drawImage(blood,0,0, 100, 100,  drawAtX, y, 100, 100);
    } else if (animate < 20){
      ctx.drawImage(blood,100,0, 100, 100,  drawAtX, y, 100, 100);
    } else if (animate < 30){
      ctx.drawImage(blood,200,0, 100, 100,  drawAtX, y, 100, 100);
    } else if ( animate < 40) {
      ctx.drawImage(blood,300,0, 100, 100,  drawAtX, y, 100, 100);
    } else {
      bloods.shift();
    }
  };

  return {
      draw: draw,
        x : x
  };
};