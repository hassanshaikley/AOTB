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
    	return PIXI.Texture.fromFrame("mini_platform.png").height+20;
    };
    //if collide notify server

    //lol ths means it's not callable again for ALL players HAHA
    var callable_again = true;
    this.update = function(){
        var drawAtX = CONFIG.SCREEN_WIDTH / 2 + x - PIXI.Texture.fromFrame("mini_platform.png").width/2 - localPlayer.getDrawAtX();
        img.x = drawAtX;
        //gonna have to make sure that its y value is high enough to actually land on the platform
	if ( helpers.collision(localPlayer, that)){
	    if (localPlayer.isFalling()){
		if (callable_again){
    		    socket.emit("landed", { y: (img.y +30)});
    		    callable_again = false;
    		    setTimeout(function(){
    			callable_again = true;
    		    }, 400);
    		}

    	    }
    	    return "grounded";
	} else {


	};
    };
};
