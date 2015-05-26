var Grimes = function(name, x, y, hp){
  var skeleton = new Player(x, (y-20), hp, name),
      facing_left;

  var spells_thumb_array = [];

  skeleton.rightClick = function(clientX, clientY){
		var t_x = clientX ;
		console.log("-->"+t_x);
		socket.emit("spell one", { x: t_x });
  };

  function setUpActionbar(){

      var sword_thumb = new PIXI.Sprite(PIXI.Texture.fromFrame("sword_thumb.png"));
      MAIN.BOTACTIONBAR.addChild(sword_thumb);
      var tort_stun =new PIXI.Sprite(PIXI.Texture.fromFrame("tortstunthumb.png"));
      MAIN.BOTACTIONBAR.addChild(tort_stun);
      spells_thumb_array.push(tort_stun); 
      spells_thumb_array.push(sword_thumb); 

      for (var _i = 0; _i < spells_thumb_array.length; _i++){
              MAIN.BOTACTIONBAR.addChild(spells_thumb_array[_i]);
              spells_thumb_array.x = 50*_i;
      }

     /* sword_thumb.interactive = true;

      sword_thumb.mouseover = function(mouseData){
        console.log("MOUSE OVER!");
      }*/
      tort_stun.x = 50;
  }
  setUpActionbar();

  var grimes_l =new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("grimes_l.png")]);
  var grimes_r =new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("grimes_r.png")]);


  skeleton.imageContainer.addChild(grimes_l);


  skeleton.getCharacterType = function(){
    return "Grimes";
  };

  skeleton.draw = function(ctx) {
    skeleton.drawText();

  	  var drawAtX  = CONFIG.SCREEN_WIDTH/2 + skeleton.getDrawAtX() - skeleton.localX() -50;

  	grimes_r.position.y = 380;
  	grimes_l.position.y = 380;

  	grimes_l.position.x = drawAtX;
  	grimes_r.position.x = drawAtX;

  	if (this.getMoveDirection() === "left"){
      skeleton.imageContainer.removeChild(grimes_r);
      skeleton.imageContainer.removeChild(grimes_l);
      skeleton.imageContainer.addChild(grimes_l);
    } else if (this.getMoveDirection() === "right" ){
      skeleton.imageContainer.removeChild(grimes_r);
      skeleton.imageContainer.removeChild(grimes_l);
      skeleton.imageContainer.addChild(grimes_r);
  	}
  };
  
  /* Constantly called for the localPlayer, updates the actual 
   * Position held by the server
   */
  skeleton.update = function(keys) {

  };
  return skeleton;
};
