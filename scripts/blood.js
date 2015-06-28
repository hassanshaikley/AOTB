/**************************************************
 ** GAME PLAYER CLASS IN CLIENT
 **************************************************/
var Blood = function(startX, startY) {
  var x =               startX,
      y =               startY,
      animate = 0;

 var blood0 = new PIXI.Sprite(PIXI.Texture.fromImage("blood0.png")); 
 var blood1 = new PIXI.Sprite(PIXI.Texture.fromImage("blood1.png")); 
 var blood2 = new PIXI.Sprite(PIXI.Texture.fromImage("blood2.png")); 
 var blood3 = new PIXI.Sprite(PIXI.Texture.fromImage("blood3.png")); 
blood0.y = blood1.y = blood2.y = blood3.y = y;
  var draw = function(){
    var   drawAtX = CONFIG.SCREEN_WIDTH/2 + x - localPlayer.getDrawAtX() ;
   blood0.x = blood1.x = blood2.x = blood3.x = drawAtX;
	console.log("GOING " + animate);
    if (animate  === 0 ){
	console.log("1");
	MAIN.stage.addChild(blood0);
    } else if (animate == 5){
	console.log("2");
	MAIN.stage.removeChild(blood0);
	MAIN.stage.addChild(blood1);
    } else if (animate ==10){
	console.log("3");
	MAIN.stage.removeChild(blood1);
	MAIN.stage.addChild(blood2);
    } else if ( animate ==15) {
	console.log("4");
	MAIN.stage.removeChild(blood2);
	MAIN.stage.addChild(blood3);
    } else if ( animate == 20) {
	console.log("5");
	MAIN.stage.removeChild(blood3);
      bloods.shift();
    }
    animate+= 1;
  };

  return {
      draw: draw,
        x : x
  };
};
