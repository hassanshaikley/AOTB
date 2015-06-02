var Shanker = function(name, x, y, hp){
  var skeleton = new Player(x, y, hp, name),
      facing_left;
  var meelee_attack = 50;
  var spritesheet_offset_y = 0;

  skeleton.getCharacterType = function(){
    return "Shanker";
  };


  var clipnames = [];

  for (var _i = 1; _i <= 6; _i ++){
    clipnames.push(PIXI.Texture.fromImage("r_shanker_walk_v3_state"+_i+".png"));
  }
  var shanker_r = new PIXI.extras.MovieClip(clipnames);
  clipnames =[];
  
  for (var _i = 1; _i <= 8; _i ++){
    clipnames.push(PIXI.Texture.fromImage("l_shanker_walk_v3_state"+_i+".png"));
  }

  var shanker_l = new PIXI.extras.MovieClip(clipnames);

  shanker_l.gotoAndPlay(0);
  shanker_r.gotoAndPlay(0);

  
  shanker_r.animationSpeed = .15;
  shanker_l.animationSpeed = .15;

  //shanker_r.animationSpeed = .15;
  //shanker_l.animationSpeed = .15;

  skeleton.shanker_l = shanker_l;

  skeleton.imageContainer.addChild(shanker_r);
  var first = false,
      loop = false;


  skeleton.draw = function() {
    this.drawText();
   // this.update_player();

    var drawAtX  = CONFIG.SCREEN_WIDTH/2 + skeleton.getDrawAtX() - skeleton.localX() -50;



    shanker_l.position.y = 400;
    shanker_r.position.y = 400;
   // redhatter_r_attack.position.y = 380+10;
   // redhatter_l_attack.position.y = 380+10;

    shanker_l.position.x = drawAtX;
    shanker_r.position.x = drawAtX;
  //  redhatter_r_attack.position.x = drawAtX;
  //  redhatter_l_attack.position.x = drawAtX-50;

/*
   if (skeleton.getMoveDirection() === "left"){
     facing_left = true;
   } else {
     facing_left = false;
   }
   if (facing_left){
     spritesheet_offset_y = 0;
   }
   else {
     spritesheet_offset_y = 100;
   }
   
   var drawAtX  = canvas.width/2 + skeleton.getDrawAtX() - skeleton.localX() -50;
   if (meelee_attack >= 50){
     if (skeleton.getAnimate()%40 <= 10){ 
       ctx.drawImage(shanker, 0, spritesheet_offset_y, 100, 100, drawAtX,skeleton.getY()-18,100,100);
     }
     else if (skeleton.getAnimate()%40 <= 20){
       ctx.drawImage(shanker, 100, spritesheet_offset_y, 100, 100, drawAtX,skeleton.getY()-18,100,100);
     }
     else if (skeleton.getAnimate()%40 <= 30){
       ctx.drawImage(shanker, 0, spritesheet_offset_y, 100, 100, drawAtX,skeleton.getY()-18,100,100);
     } else{
       ctx.drawImage(shanker, 200, spritesheet_offset_y, 100, 100, drawAtX,skeleton.getY()-18,100,100);
     }
   } else {
     meelee_attack++;
     if (meelee_attack < 5){
       ctx.drawImage(shanker, 0, 200, 100, 100, drawAtX,skeleton.getY()-18,100,100);
     } else {
       ctx.drawImage(shanker, 100, 200, 100, 100, drawAtX,skeleton.getY()-18,100,100);
     }
   }
   ctx.restore();
   */
  };
  var now = Date.now();
 
  skeleton.leftClick = function(x, y){
    if (Date.now()  - now >= 1000 ){
    meelee_attack = 0;
    socket.emit("meelee attack");
    now = Date.now();
    }
  };  

  skeleton.update = function(keys) {
  };
  return skeleton;
};
