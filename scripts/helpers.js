var helpers = {};
helpers.xAdd = 210;
helpers.addThumbToActionBar = function(image, description){
    console.log("HI");
    MAIN.BOTACTIONBAR.addChild(image);
    image.position.x = this.xAdd;

    this.xAdd+=50;

};

helpers.collision = function(thing1, thing2){
    var xDist = Math.abs(thing1.getX() - thing2.getX());
    var yDist = Math.abs(thing1.getY() - thing2.getY());

    if (xDist <= thing1.getWidth()/2  + thing2.getWidth()/2){
        if (yDist <= thing1.getHeight()/2 + thing2.getHeight()/2){
            return true;
        }
    };
    return false;
};

helpers.highlightPlayerHitboxes = function(){
    var allPlayers = remotePlayers.slice();
    allPlayers.push(localPlayer);
    console.log(allPlayers.length +"<");
    for (var _i =0; _i < allPlayers.length; _i++){
        console.log("SON");
        var box = new PIXI.Graphics();

        box.beginFill(0x00FF00);
        box.drawRect(0, 0, allPlayers[_i].getWidth(), allPlayers[_i].getHeight());
        box.endFill();
        box.alpha  = .4;

	box.x = allPlayers[_i].getX() - localPlayer.getX() + CONFIG.SCREEN_WIDTH/2 - allPlayers[_i].getWidth()/2;
	box.y = allPlayers[_i].getY() - allPlayers[_i].getHeight()/2;
        MAIN.stage.addChild(box);


	setTimeout( function(){
	    MAIN.stage.removeChild(box);
	}, 400);

    }
};
