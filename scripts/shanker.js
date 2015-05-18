/**************************************************
   ** REDHATTER CLASS IN CLIENT
    **************************************************/
var Animate = 0,
    floorHeight = 474,
    localX = 0;

var Shanker = function(name, x, y, hp){
  var moveSpeed = 0;
  var skeleton = new Player(x, y, hp, name, moveSpeed),
      facing_left;
  var meelee_attack = 50;
  var spritesheet_offset_y = 0;
  skeleton.rightClick = function(clientX, clientY){
  };

  /* Maybe make this heal?? */ 

  /* Lolswagz */
  skeleton.getCharacterType = function(){
    return "Shanker";
  };

  skeleton.draw = function(ctx) {
    //var drawAtX = skeleton.getX()-50;
    this.drawText();
    ctx.save();
   if (skeleton.getTeam()==0){
     ctx.shadowBlur=20;
     ctx.shadowColor="blue";
   }
   else {
     ctx.shadowBlur=20;
     ctx.shadowColor="green";
   }
   if (this.getMoveDirection() === "left"){
     facing_left = true;
   } else if (this.getMoveDirection() === "right"){
     facing_left = false;
   }
   if (facing_left){
     spritesheet_offset_y = 0;
   }
   else {
     spritesheet_offset_y = 100;
   }
   var drawAtX = canvas.width/2 + this.getDrawAtX() - localX - 50;
   if (meelee_attack >= 50){
     /* Decides what sprite to draw*/
     if (this.getAnimate()%40 <= 10){ 
       ctx.drawImage(shanker, 0, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-18,100,100);
     }
     else if (this.getAnimate()%40 <= 20){
       ctx.drawImage(shanker, 100, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-18,100,100);
     }
     else if (this.getAnimate()%40 <= 30){
       ctx.drawImage(shanker, 0, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-18,100,100);
     } else{
       ctx.drawImage(shanker, 200, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-18,100,100);
     }
   } else { //is meelee attacking
     meelee_attack++;
     if (meelee_attack < 5){
       ctx.drawImage(shanker, 0, 200, 100, 100, drawAtX,this.getY()-18,100,100);
     } else {
       ctx.drawImage(shanker, 100, 200, 100, 100, drawAtX,this.getY()-18,100,100);

     }
   }
   ctx.restore();
  };
  var now = Date.now();
  skeleton.leftClick = function(x, y){
    if (Date.now()  - now >= 1000 ){
    meelee_attack = 0;
    socket.emit("meelee attack");
    now = Date.now();
    }
    //tell the server I am meelee attacking 
  };  

  /* Constantly called for the localPlayer, updates the actual 
   * Position held by the server
   */
  skeleton.update = function(keys) {
    localX = this.getX();
  };
  return skeleton;
};
