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
  var animation;


  var grimes_l =new PIXI.MovieClip([PIXI.Texture.fromFrame("grimes_l.png")]);
  var grimes_r =new PIXI.MovieClip([PIXI.Texture.fromFrame("grimes_r.png")]);

 // grimes_l.scale.x = grimes_r.scale.x = grimes_l.scale.y = grimes_r.scale.y= 1.3;

  //grimes_r.position.y = 380;
  //grimes_l.position.y = 380;

 // grimes_l.position.x = Math.abs(768/2) -50;
 // grimes_r.position.x = Math.abs(768/2) -50;


MAIN.stage.addChild(grimes_l);

  skeleton.getCharacterType = function(){
    return "Grimes";
  };

  skeleton.draw = function(ctx) {
  	  var drawAtX  = canvas.width/2 + skeleton.getDrawAtX() - skeleton.localX() -50;

  	grimes_r.position.y = 380;
  	grimes_l.position.y = 380;

  	grimes_l.position.x = drawAtX;
  	grimes_r.position.x = drawAtX;

  	if (this.getMoveDirection() === "left"){
  		MAIN.stage.removeChild(grimes_r);
  		 MAIN.stage.removeChild(grimes_l);
  		MAIN.stage.addChild(grimes_l);
  		console.log("le");
  	} else if (this.getMoveDirection() === "right" ){
  		MAIN.stage.removeChild(grimes_r);
  		 MAIN.stage.removeChild(grimes_l);
  		 MAIN.stage.addChild(grimes_r);
  	}

  //old

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

  };
  return skeleton;
};
