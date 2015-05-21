var floorHeight = 474;
var Player = function Player(startX, startY, startHp, _name) { //ignore startX variable
	if (startX == undefined) startX = -100;
	if (startY == undefined) startY = -100;


	console.log("START X " + startX);
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
		//console.log(moveDifferenceX + " <--")
		//console.log(newerX + " -- " +postX);
		if (moveDifferenceX){ /* USED TO TELL IF GOING LEFT OR RIGHT */
			postX = x; 
		} 

		//if y is 5 and drawAtY is 10

			/* Basically if super far from your actual location, just teleport there 
			 * Especially useful in the case of a respawn 
			 */ 
		yDiff = Math.abs(drawAtY - y);
		xDiff = Math.abs(drawAtX - x);
	

		if (yDiff >= 1000 || xDiff >= 1000){ // teleports bc distance is too far man
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


		if (y - drawAtY > (ySpeed *2)){
			drawAtY+= ySpeed;
		} else if ( y-drawAtY < (-ySpeed*2)) {
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
	var text_x;
	this.drawText = function(){
		ctx.save();
		ctx.textAlign = 'center';
		text_x = canvas.width/2 + drawAtX - this.localX();
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
	};
	this.leftClick = function(){
		if(_alert){
			if (_alert.type == "arena"){
				enterQueue();
				socket.emit("ready for arena");
			}
			_alert = undefined;
		}
	};

	this.localX = function(){
		return localPlayer.getDrawAtX();
	}
	// Define which variables and methods can be accessed
};
