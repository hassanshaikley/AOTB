var floorHeight = 474;
var Player = function Player(startX, startY, startHp, _name) { //ignore startX variable
  if (startX == undefined) startX = -1000;
  if (startY == undefined) startY = -1000;

	this.coordinateList = [];
  var 	x =               startX,
	y =               startY,
	name =            _name,
	hp =              startHp,
	id,
	alive =           true,
	drawAtX =         x,
	drawAtY =         y,
	postX =           x,
	postY = 	  y,
	moveDifferenceX = 0,
	moveDifferenceY = 0,
	animate =         0,
	lastsaid = {},
	gold = 0,
	maxHp = startHp,
	team,
	frames; //list of every image used in this guys animation

  	var current_action = CONFIG.ACTION.MOVING_RIGHT;

  var that = this;
    var invis = false;

   this.setInvis = function(_invis){
       invis = _invis;
    };

  var meelee_attack = false;
  this.id;



  this.getMeeleeAttack = function(){
      return meelee_attack;
  };



  /* This should draw the player and not the method that they inherit
  this.update_player = function(){
  	//console.log(meelee_attack+" <-- ");

  	if (meelee_attack){
  		(this.imageContainer)
	  if (this.getMoveDirection() === "left"){
    	  this.imageContainer.addChild(redhatter_r_attack);
  	}
    } else if (this.getMoveDirection() === "right" ){
    	  this.imageContainer.addChild(redhatter_r_attack);
    }
  }
  */



  this.setUpActionbar = function(){
    console.log("IMPLEMENT THIS");
  };
  // Getters and setters
  this.setTeam = function(_team){
	if (_team === team){
	return;
	}
      if (_team == 1) {
          teamOneFilter(that.imageContainer);
          that.imageContainer.removeChild(health);
          health = new PIXI.Graphics();
          health.beginFill(0xFF0000);
  health.drawRect(0, 0, 1, 6);
  health.endFill();
          that.imageContainer.addChild(health);
       } else {
          teamOneFilter(that.imageContainer);
          that.imageContainer.removeChild(health);
          health = new PIXI.Graphics();
          health.beginFill(0x00FF00);
  health.drawRect(0, 0, 1, 6);
  health.endFill();
          that.imageContainer.addChild(health);
	  noFilter();
    }
    team = _team;
  };

  this.getTeam = function(){
    return team;
  };

  this.getGold = function(){
    return gold;
  };
  this.setGold = function(newGold){
    gold = newGold;
  };
  this.getHp = function(){
    return hp;
  };
  this.respawn = function(){ /* Function that is called for local player*/
    alive = true;
  };
  this.getAnimate = function(){
    return animate;
  };

  /* Returns the inverse of a fly times black hole divided by zero */
  this.getAlive= function() {
    return alive;
  };

  /* Changes object state to dead! */
  this.getName = function(){
    return name;
  };
  this.setName = function(newName){
    name = newName;
  };
  this.bleed = function(){
    var v = new Blood(x-38, y-30);
    bloods.push(v);
  };

  this.setHp = function(newHp){
    hp = newHp;
  };

  /* Used to determine the direction that a character is facing */
  this.getCurrentAction = function (){
  	return current_action;
  };
  this.setCurrentAction = function(action){
  	current_action = action;
  };
  var last_move_direction;
  this.getMoveDirection = function(){
  	if (this.getMeeleeAttack()){
  		if (last_move_direction === "left"){
  			current_action = CONFIG.ACTION.ATTACK_LEFT;
  			return "left";
  		} else {
  			current_action = CONFIG.ACTION.ATTACK_RIGHT;
  			return "right";
  		}
  	}
    if (moveDifferenceX < 0){
      last_move_direction = "left";
      current_action = CONFIG.ACTION.MOVING_LEFT;
      return "left";
    } else if (moveDifferenceX > 0){
   	  last_move_direction = "right";
      current_action = CONFIG.ACTION.MOVING_RIGHT;
      return "right";
    } else {
      current_action = CONFIG.ACTION.IDLE;
      return last_move_direction;
    }
  };

  /* Gets the X specified by server - as opposed to X to be drawed at, since this X
   * jumps around a lot! (server refreshes few times a second)
   */
  this.getY = function() {
    return y;
  };

  /* Gets the Y specified by server - as opposed to X to be drawed at, since this X
   * jumps around a lot! (server refreshes few times a second)
   */
  this.getX = function() {
    return x;
  };

  /* Mutator for server x variable! */
  this.setX = function(newX) {
    x = newX;
  };

  /* Mutator for server y variable! */
  this.setY = function(newY) {
    y = newY;
  };


  /* UpdateVariables function is only called when the window is focused - at rate
   * of FPS
   */
  var xSpeed;
  var ySpeed;
    var xDiff;
var moveTimer = 0;


  this.updateVariables = function(){
      if (Math.abs(drawAtY - y) >= 100){
          drawAtY = y;
          drawAtX =x;
          }


    moveDifferenceX = (drawAtX - postX);
    moveDifferenceY = (drawAtY - postY);
    if (moveDifferenceX){ // USED TO TELL IF GOING LEFT OR RIGHT
      postX = drawAtX;
    }
    if (moveDifferenceY){
	postY = drawAtY;
    }



      var _y;
      var _x;

      if (that.coordinateList.length > 10){
          var temp = that.coordinateList[that.coordinateList.length-1];
          var _x = temp.x;
          var _y = temp.y;
          that.coordinateList = [];
         }
      if (that.coordinateList.length > 1){
	    //_x = that.coordinateList[that.coordinateList.length - 1].x;
           // _y = that.coordinateList[that.coordinateList.length - 1].y;
          var coords = that.coordinateList.shift();
          _x = coords.x;
          _y = coords.y;
      }
      else{
          _x = x;
          _y = y;

      }



    // console.log ( (x-_x) + ", " + (y-_y));
	drawAtY -= (drawAtY -_y)/4; //
	drawAtX -= (drawAtX - _x)/4;

    //used to calculate direction
    //var newerX = x;

/*
    if (this.getMoveDirection() !== "none"){
      animate++;
      if (animate >= 60){
		animate = 0;
      }
    }


    // this.id == undefined means if this is referring to the current player
    // Checks the difference between
     //

    //if y is 5 and drawAtY is 10

    // Basically if super far from your actual location, just teleport there
     // Especially useful in the case of a respawn
     //
    yDiff = Math.abs(drawAtY - y);
    xDiff = Math.abs(drawAtX - x);

      if (moveDifferenceY == 0){
          moveTimer ++;
          } else {
              moveTimer = 0;
              }

    if (yDiff >= 500 || xDiff >= 500){ // teleports bc distance is too far man
      drawAtX = x;
      drawAtY = y;
    }//else if (moveDifferenceY == 0){
//	drawAtY = y;
     //}


    xSpeed = (xDiff/10) ;
    xSpeed = Math.floor(xSpeed);

      if(xSpeed == 0 ){
          xSpeed = 1;
          }

    if (x - drawAtX > xSpeed*2){
      drawAtX+= xSpeed;
    } else if ( x-drawAtX < - (xSpeed*2) ) {
      drawAtX-= xSpeed;

    } else {
      drawAtX = x;
    }

    ySpeed = (yDiff/10) ;
    ySpeed = Math.floor(ySpeed);

    	//	if (ySpeed==0){ //fixes stupd bug where health is a little higher
	//	drawAtY = y;
		//}
    if (ySpeed == 0 ) { ySpeed = 1;};
    if (y - drawAtY > (ySpeed *2)){
      drawAtY+= ySpeed;
    } else if ( y-drawAtY < - (ySpeed*2)) {
      drawAtY-= ySpeed;
    } else {
     drawAtY = y;

    }

*/
  };

  /* The X that we want to draw at to give the illusion of smooth movement
   * (if only the server X was used then it would skip to locations)
   */
  this.getDrawAtX = function(){
    return drawAtX;
  };
  /* The Y that we want to draw at to give the illusion of smooth movement
   * (if only the server Y was used then it would skip to locations)
   */
  this.getDrawAtY = function(){
    return drawAtY;
  };

    this.getHeight = function(){
	return 100;
	};
  this.speaks = function(words){
      chat_text.text = words;
      var old_text = chat_text.text;
      setTimeout( function() {

          if (chat_text.text == old_text){
              chat_text.text = "";
          }

      }, 3000 );

  };

  var health_shadow = new PIXI.Graphics();
  health_shadow.beginFill(0x000000);
  health_shadow.drawRect(0, 0, 40, 6);
  health_shadow.endFill();


  var health = new PIXI.Graphics();


  health.beginFill(0x00FF00);

  health.drawRect(0, 0, 1, 6);
  health.endFill();
  this.imageContainer = new PIXI.Container();

    var noFilter = function() {

		that.imageContainer.filters = null;

    }
  this.imageContainer.addChild(health_shadow);
  this.imageContainer.addChild(health);
// name = "i";
   var name_text = new PIXI.Text(name);
   name_text.style.font = "bold 10px arial";
    name_text.style.align = "center";
    this.imageContainer.addChild(name_text);

   var chat_text = new PIXI.Text("");
   chat_text.style.font = "bold 10px arial";
    chat_text.style.align = "center";
    this.imageContainer.addChild(chat_text);
  MAIN.stage.addChild(this.imageContainer);

  var structure = new PIXI.Sprite(PIXI.Texture.fromImage("spire.png"));
  structure.x = 1350 - Math.abs(PIXI.Texture.fromImage("spire_0.png").width/2);
  structure.y = -116;

  this.imageContainer.addChild(structure);

  var text_x;

  this.drawText = function(){

	if (Math.abs(drawAtX - x) > 10){
      console.log( Math.abs(x - drawAtX));
	}

     text_x = CONFIG.SCREEN_WIDTH/2 - localPlayer.localX() + drawAtX;
     name_text.x = text_x - name_text.width/2;
      name_text.y= drawAtY - 80;
      chat_text.y = drawAtY - 90;
      chat_text.x = text_x - chat_text.width/2;
      chat_text.y -=10;

   //	\le.log(" x - . "+text_x);
    health_shadow.position.x = text_x-20;
    health_shadow.position.y = drawAtY-60;

    health.position.x = text_x-20;
    health.position.y = drawAtY-60;
    health.scale.x = Math.ceil((hp/maxHp)*40);
	//hp is 100 : 100
	//	x   : 40

    //ol
    /*
       ctx.save();
       ctx.textAlign = 'center';
       if (alive){
       ctx.fillStyle="#000000";
       ctx.fillRect(text_x-20,drawAtY-50,100/2.2,6);
       ctx.fillStyle="#FF0000";
       ctx.fillRect(text_x-20,drawAtY-50,((hp/2.2)),6);
       } else {
       ctx.fillText("| | | | | |", text_x-20, drawAtY-40);
       }
       ctx.fillStyle = "black";
       ctx.font = "bold 13px sans-serif";
       ctx.fillText(name, text_x, drawAtY-60);

       if (Date.now() - lastsaid.time  <= 3000){
       ctx.fillStyle = "black";
       ctx.font = "bold 13px sans-serif";
       ctx.fillText(lastsaid.text, text_x, drawAtY-80);
       }
       ctx.restore();
     */
  };
  var now = Date.now()- 1000;

  //useful for animating
  this.setMeeleeAttack = function(_atk){
  	if(_atk){
  	current_action = CONFIG.ACTION.MEELEE_ATTACK;
    }
    meelee_attack = _atk;
  }

  this.rightClick = function(clientX, clientY){
    var t_x = clientX ;
    socket.emit("spell one", { x: t_x , y: clientY});
  };

  this.leftClick = function(){
    if (Date.now()  - now >= 1000 ){
     // meelee_attack = 0;
      socket.emit("meelee attack", { direction: localPlayer.getMoveDirection()} );
      now = Date.now();
    }
  };

  this.localX = function(){
    return localPlayer.getDrawAtX();
  }

  this.displayCooldown = function(spellNumber, cooldownTime){
    var casted_spell = MAIN.BOTACTIONBAR.getChildAt(spellNumber);
    filter = new PIXI.filters.PixelateFilter();

    casted_spell.filters = [filter];
    CONFIG.COOLDOWNS.push( { filter: filter, parent: casted_spell, duration: cooldownTime });
  }

  // Define which variables and methods can be accessed
};
