var Grimes = function(name, x, y, hp){
  var skeleton = new Player(x, (y-20), hp, name),
      facing_left;
  var meelee_attack = 50;
  var spritesheet_offset_y = 0;
  skeleton.rightClick = function(clientX, clientY){
		var t_x = clientX ;
		console.log("-->"+t_x);
		socket.emit("tort stun", { x: t_x });
  };

  /* Maybe make this heal?? */ 

  /* Lolswagz */
  skeleton.getCharacterType = function(){
    return "Grimes";
  };

  skeleton.draw = function(ctx) {
		//var drawAtX = skeleton.getX()-50;
		this.drawText();
		ctx.save();
		if (skeleton.getTeam()===0){
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
		ctx.drawImage(grimesSprite, 0, spritesheet_offset_y, 100, 100, drawAtX,this.getY()-45,100,100);
		ctx.restore();
  };
  var now = Date.now();
  skeleton.leftClick = function(x, y){
    if (Date.now()  - now >= 1000 ){
			console.log("GRIMES CLICK at "+ x);
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
