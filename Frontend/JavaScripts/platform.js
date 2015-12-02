var Platform = function(x, y){

    var img = new PIXI.Sprite(PIXI.Texture.fromFrame("mini_platform.png"));

    MAIN.stage.addChild(img);

    img.y = y;
    
    this.img = img;
    var that = this;

    this.getX = function(){
    	return x;
    }
    this.getY = function(){
    	return y;
    }
    this.getWidth = function(){
    	return PIXI.Texture.fromFrame("mini_platform.png").width-24;
    };
    this.getHeight = function(){
    	return PIXI.Texture.fromFrame("mini_platform.png").height;
    };
    //if collide notify server
    this.update = function(){
        var drawAtX = CONFIG.SCREEN_WIDTH / 2 + x - PIXI.Texture.fromFrame("mini_platform.png").width/2 - localPlayer.getDrawAtX();
        img.x = drawAtX;
        //gonna have to make sure that its y value is high enough to actually land on the platform
		if ( helpers.collision(localPlayer, that)){
			if (localPlayer.isFalling()){
    			socket.emit("landed", { y: (img.y +30)}); 
    		}
    		return "grounded";
		}else {
		//	console.log("Not really on this s")

		};
	}
};