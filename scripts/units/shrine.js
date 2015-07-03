var Shrine = function(_team) {
	this.maxHp = 1000;
	this.hp = this.maxHp;
	this.team = _team; //team random unless assigneda

	this.y = 8; //aa
	this.hitby =[]; // object holding who hit you and when  (really useful for a fly who u only want to damage u once)

	if (_team == 0){
		this.x = 1350;
	} else {
		this.x =1000 + CONFIG.ARENA_WIDTH - 350;
	}

	this.getTeam= function(){
		return team;
	};

	this.getHp = function(){
		return this.hp;
	};

	/* Returns "dies" or "lives"*/
	this.setHp = function(newHp){
		//
		if (newHp >= this.maxHp){
			this.hp = this.maxHp;
		} else if ( newHp <= 0){
			this.hp = 0;
		} else {
			this.hp = newHp;
		}
		return "lives";
	};

	var health_shadow = new PIXI.Graphics();
	health_shadow.beginFill(0x000000);
	health_shadow.drawRect(0, 0, 300/2.2, 6);
	health_shadow.endFill();


	var health = new PIXI.Graphics();
        if (_team == 0){
	health.beginFill(0x00FF00);
            } else {
                health.beginFill(0xFF0000);
                }
	health.drawRect(0, 0, 300/2.2, 6);
	health.endFill();

	//health.x =this.x -25;
	//health_shadow.x = this.x-25;
	this.health = health;

	health_shadow.y = 30;
	health.y = 30;

	health.x  = health_shadow.x = -67;




	this.imageContainer = new PIXI.Container();
	this.imageContainer.addChild(health_shadow);
	this.imageContainer.addChild(health);

	if (this.team == 0 ){
		var structure2 = new PIXI.Sprite(PIXI.Texture.fromImage("r_CastleOfOne_v2.fw.png"));
		structure2.x =  - Math.abs(PIXI.Texture.fromImage("_CastleOfOne_v2.fw.png").width/2) - 215;

	} else {
		structure2 = new PIXI.Sprite(PIXI.Texture.fromImage("_CastleOfOne_v2.fw.png"));
		structure2.x =  - Math.abs(PIXI.Texture.fromImage("_CastleOfOne_v2.fw.png").width/2) + 215;

	}

	structure2.y = -10;

	this.imageContainer.addChild(structure2);

	MAIN.stage.addChild(this.imageContainer);

	var that = this;


	var noFilter = function() {
		that.imageContainer.filters = null;
	}
	if (_team == 1) {
		teamOneFilter(that.imageContainer);
	} else {
		noFilter();
	}


	this.draw= function(){
		health.scale.x = Math.abs(this.hp/this.maxHp);
		var drawAtX = CONFIG.SCREEN_WIDTH/2 + this.x - localPlayer.getDrawAtX();

		this.imageContainer.y = this.y;
		this.imageContainer.x = drawAtX;

	};
	this.getX = function() {
		return this.x;
	};

	this.getY = function() {
		return this.y;
	};
	// Define which variables and methods can be accessed by the world outside
	return this;
};
