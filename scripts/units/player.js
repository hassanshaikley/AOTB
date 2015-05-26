var floorHeight = 474;
var Player = function Player(startX, startY, startHp, _name) { //ignore startX variable
	if (startX == undefined) startX = -1000;
	if (startY == undefined) startY = -1000;


	var x =               startX,
			y =               startY,
			name =            _name,
			hp =              100, 
			id,
			alive =           true,
			drawAtX =         x,
			drawAtY =         y,
			postX =           x,
			moveDifferenceX = 0,
			animate =         0,
			lastsaid = {},
			gold = 0,
			maxHp = hp,
			team,
			frames; //list of every image used in this guys animation

	this.id;

	this.setUpActionbar = function(){
		console.log("IMPLEMENT THIS");
	}
	// Getters and setters
	this.setTeam = function(_team){
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
	}

	this.setHp = function(newHp){
		hp = newHp;
		if (hp > maxHp){
			hp = maxHp;
		}

		if (hp <= 0 && getAlive()){
			respawn();
		}
	};

	/* Used to determine the direction that a character is facing */
	this.getMoveDirection = function(){

		if (moveDifferenceX < 0){
			return "left";
		} else if (moveDifferenceX > 0){
			return "right";
		} else {
			return "none";
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
	var yDiff
	var xDiff;


	this.updateVariables = function(){
		//used to calculate direction
		var newerX = x;

		if (this.getMoveDirection() !== "none"){
			animate++;
			if (animate >= 60){
				animate = 0;
			}
		}
		/* this.id == undefined means if this is referring to the current player 
		 * Checks the difference between 
		 */
		moveDifferenceX =(newerX - postX);
		if (moveDifferenceX){ /* USED TO TELL IF GOING LEFT OR RIGHT */
			postX = x; 
		} 

		//if y is 5 and drawAtY is 10

			/* Basically if super far from your actual location, just teleport there 
			 * Especially useful in the case of a respawn 
			 */ 
		yDiff = Math.abs(drawAtY - y);
		xDiff = Math.abs(drawAtX - x);

	

		if (yDiff >= 500 || xDiff >= 500){ // teleports bc distance is too far man
			drawAtX = x;
			drawAtY = y;
		}

		xSpeed = (xDiff/10) ; 
		xSpeed = Math.floor(xSpeed);


		if (x - drawAtX > xSpeed*2){
			drawAtX+= xSpeed;
		} else if ( x-drawAtX < - (xSpeed*2) ) {
			drawAtX-= xSpeed;

		} else {
			drawAtX = x;
		}

		ySpeed = (yDiff/10) ; 
		ySpeed = Math.floor(ySpeed);

/*		if (ySpeed==0){ //fixes stupd bug where health is a little higher
			drawAtY = y;
		}*/

		if (y - drawAtY > (ySpeed *2)){
			drawAtY+= ySpeed;
		} else if ( y-drawAtY < - (ySpeed*2)) {
			drawAtY-= ySpeed;
		} else {
			drawAtY = y;
		}


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

	this.speaks = function(words){
		lastsaid.time = Date.now();
		lastsaid.text = words;
	};
	
	var health_shadow = new PIXI.Graphics();
	health_shadow.beginFill(0x000000);
	health_shadow.drawRect(0, 0, 100/2.2, 6);
	health_shadow.endFill();	
	

	var health = new PIXI.Graphics();
	
	health.beginFill(0x00FF00);
	health.drawRect(0, 0, 100/2.2, 6);
	health.endFill();	
	
	this.imageContainer = new PIXI.Container();
	
	this.imageContainer.addChild(health_shadow);
	this.imageContainer.addChild(health);

	MAIN.stage.addChild(this.imageContainer);

	var text_x;
	this.drawText = function(){

		text_x = Math.abs(768/2) - localPlayer.localX() + drawAtX;
	//	\le.log(" x - . "+text_x);
		health_shadow.position.x = text_x-25;
		health_shadow.position.y = drawAtY-100;

		health.position.x = text_x-25;
		health.position.y = drawAtY-100;

		health.scale.x = Math.abs(hp/100);

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
	  var now = Date.now();

	this.leftClick = function(){
 
    	if (Date.now()  - now >= 1000 ){
    		meelee_attack = 0;
    		socket.emit("meelee attack");
    		now = Date.now();
    	}
	};

	this.localX = function(){
		return localPlayer.getDrawAtX();
	}

	this.displayCooldown = function(spellNumber){
            var casted_spell = MAIN.BOTACTIONBAR.getChildAt(spellNumber);
            filter = new PIXI.filters.PixelateFilter();
            casted_spell.filters = [filter];
            CONFIG.COOLDOWNS.push( { filter: filter, parent: casted_spell });
        }

	// Define which variables and methods can be accessed
};
