var floorHeight = 474;
var Player = function Player(startX, startY, startHp, _name) { //ignore startX variable
  if (startX == undefined) startX = -1000;
  if (startY == undefined) startY = -1000;

	this.coordinateList = []; //array of all the positions the server says the unit is at
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
    var meelee_attack_component = new MeeleeAttackComponent(this);

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
      var oldHp = hp;
      hp = newHp;
      if (oldHp >0 && newHp <= 0){
          notify( "<strong>" + that.getName() + "</strong> has died");
          }
      oldHp = null; //fuck closures
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

    //have keys override move direction for local player

      //console.log(this.id);
    if ( that.id === localPlayer.id){
        if (keys["68"]){
            last_move_direction = "right";
            current_action = CONFIG.ACTION.MOVING_RIGHT;
            return "right";
        }

        if (keys["65"]){
            last_move_direction = "left";
            current_action = CONFIG.ACTION.MOVING_LEFT;
            return "left";
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
      if (Math.abs(drawAtY - y) >= 500 ||Math.abs(drawAtX -x) > 500 ){
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

	drawAtY -= (drawAtY -_y)/4; //
	drawAtX -= (drawAtX - _x)/4;
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

    this.getWidth = function(){
        return 100;
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

	if (Math.abs(drawAtX - x) > 10){ // idk what this was for
            //console.log( Math.abs(x - drawAtX));
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

    var that = this;



    /* Sets the current action to meeleee attack(For animation)
     * And then checks for Collision
     **/
    this.setMeeleeAttack = function(_atk, attack_id, direction){
        if(_atk){
            if (direction == "left"){
                current_action = CONFIG.ACTION.ATTACK_LEFT;
                last_move_direction = "left";
            } else {
  	        current_action = CONFIG.ACTION.ATTACK_RIGHT;
                last_move_direction = "right";
            }
        } else { // If meeelee attack is set to false, return
            console.log("MEELEE ATTACK FALSE NOW");
            meelee_attack = _atk;
            return;
        }
        meelee_attack = _atk; //alwayst true
        //only hapens if meelee attack ist rue
        //Anonymous function for determining if someone is hit
        setTimeout(function(){
            // build an array of every player in the game
            var allPlayers = remotePlayers.slice();
            allPlayers.push(localPlayer);
            //remove this player from the array because a player obv cant attack itself lol
            var index = allPlayers.indexOf(that);

            if (index > -1 ){
                console.log("SPLICING " + index);
                allPlayers.splice(index, 1);
            } else {


            }
            //draws hit box
            if (CONFIG.SHOW_HITBOXES){


                var bb = that.getMeeleeAttackBoundingBox();
                var box = new PIXI.Graphics();
                box.beginFill(0x00FF00);
                box.drawRect(0, 0, bb.getWidth(), bb.getHeight());
                box.endFill();
                box.alpha  = .4;

	        box.x = bb.getX() - localPlayer.getX() + CONFIG.SCREEN_WIDTH/2 - bb.getWidth()/2;
	        box.y = bb.getY() - bb.getWidth()/2;
                MAIN.stage.addChild(box);

                helpers.highlightPlayerHitboxes();

	        setTimeout( function(){
	            MAIN.stage.removeChild(box);
	        }, 400);
            }


            for (var i = 0; i < allPlayers.length; i++){
                if (helpers.collision(allPlayers[i], that.getMeeleeAttackBoundingBox())){
                    //let the server know the attack landed
                    socket.emit("meelee hits", { "meelee hits": allPlayers[i].id, "hit_by":that.id, "attack_id" : attack_id});
                    console.log("Meelee Hits");
                }

            }
        }, 200);

    };

  this.rightClick = function(clientX, clientY){
    var t_x = clientX ;
    socket.emit("spell one", { x: t_x , y: clientY});
  };

    this.castSpellTwo = function(){
        socket.emit("spell two", { x: localPlayer.getX(), y: localPlayer.getY(), direction :localPlayer.getMoveDirection()});
    };


  /* */

  this.leftClick = function(){
    if (Date.now()  - now >= 1000 ){
     // meelee_attack = 0;
      socket.emit("meelee attack", { direction: localPlayer.getMoveDirection()} );
      now = Date.now();
    }
  };

  this.localX = function(){
    return localPlayer.getDrawAtX();
  };

  this.displayCooldown = function(spellNumber, cooldownTime){
    var casted_spell = MAIN.BOTACTIONBAR.getChildAt(spellNumber+2);
    filter = new PIXI.filters.PixelateFilter();

    casted_spell.filters = [filter];
    CONFIG.COOLDOWNS.push( { filter: filter, parent: casted_spell, duration: cooldownTime });
  };

};
