var Shanker = function(name, x, y){
  var skeleton = new Player(x, y, 80, name),
      facing_left;
  var meelee_attack = 50;
  var spritesheet_offset_y = 0;

  skeleton.getCharacterType = function(){
    return "Shanker";
  };

  var spells_thumb_array = [];

  skeleton.setUpActionbar = function(){
      var sword_thumb = new PIXI.Sprite(PIXI.Texture.fromFrame("sword_thumb.png"));
      MAIN.BOTACTIONBAR.addChild(sword_thumb);
      var tort_stun =new PIXI.Sprite(PIXI.Texture.fromFrame("stealth_thumb.png"));
      MAIN.BOTACTIONBAR.addChild(tort_stun);
      spells_thumb_array.push(sword_thumb);
spells_thumb_array.push(tort_stun);


      for (var _i = 0; _i < spells_thumb_array.length; _i++){
          console.log("HI teee");
          helpers.addThumbToActionBar(spells_thumb_array[_i], "description" );
      }

     /* sword_thumb.interactive = true;

      sword_thumb.mouseover = function(mouseData){
        console.log("MOUSE OVER!");
      }*/
  }


    skeleton.windWalk = function(){

        seleton.setInvis(true);

    };

  var clipnames = [];

  for (var _i = 1; _i <= 6; _i ++){
    clipnames.push(PIXI.Texture.fromImage("r_shanker_walk_v3_state"+_i+".png"));
  }
  var shanker_r = new PIXI.extras.MovieClip(clipnames);
  clipnames =[];

  for (var _i = 1; _i <= 6; _i ++){
    clipnames.push(PIXI.Texture.fromImage("l_shanker_walk_v3_state"+_i+".png"));
  }
  var shanker_l = new PIXI.extras.MovieClip(clipnames);

  clipnames =[];

  for (var _i = 1; _i <= 8; _i ++){
    clipnames.push(PIXI.Texture.fromImage("r_shanker_attack_v2_state"+_i+".png"));
  }
  var shanker_r_attack = new PIXI.extras.MovieClip(clipnames);
  clipnames =[];

  for (var _i = 1; _i <= 8; _i ++){
    clipnames.push(PIXI.Texture.fromImage("l_shanker_attack_v2_state"+_i+".png"));
  }
  var shanker_l_attack = new PIXI.extras.MovieClip(clipnames);


  shanker_l.gotoAndPlay(0);
  shanker_r.gotoAndPlay(0);


  shanker_r.animationSpeed = .15;
  shanker_l.animationSpeed = .15;

  shanker_r_attack.animationSpeed = .30;
  shanker_l_attack.animationSpeed = .30;

  skeleton.shanker_l = shanker_l;

  skeleton.imageContainer.addChild(shanker_r);
  var first = false,
      loop = false;

  skeleton.draw = function() {
   // this.update_player();

    var drawAtX  = CONFIG.SCREEN_WIDTH/2 + skeleton.getDrawAtX() - skeleton.localX() -50;
    var drawAtY = skeleton.getDrawAtY() -50;


    shanker_l.position.y = drawAtY;
    shanker_r.position.y = drawAtY;
    shanker_r_attack.position.y = drawAtY;
    shanker_l_attack.position.y = drawAtY;
   //use to make drawing shanker mroe accurate lol
   if (this.getMoveDirection() === "right" ){
	drawAtX += 20;
	} else {
	drawAtX += 5;
}

    shanker_l.position.x = drawAtX;
    shanker_r.position.x = drawAtX;
    shanker_r_attack.position.x = drawAtX;
    shanker_l_attack.position.x = drawAtX;

    skeleton.imageContainer.removeChild(shanker_r);
    skeleton.imageContainer.removeChild(shanker_l);
    skeleton.imageContainer.removeChild(shanker_l_attack);
    skeleton.imageContainer.removeChild(shanker_r_attack);


    this.drawText();




    if (this.getCurrentAction() === CONFIG.ACTION.ATTACK_RIGHT){
      if (first === false){
        shanker_r_attack.gotoAndPlay(0);
        first = true; //at the very end set first to true
      }
      skeleton.imageContainer.addChild(shanker_r_attack);
      if (shanker_r_attack.currentFrame === 1){
        loop = true;
      }
      if (shanker_r_attack.currentFrame === 0 && loop){
        first = false;
        //this.setCurrentAction(CONFIG.ACTION.MOVING_RIGHT);
        this.setMeeleeAttack(false);
        loop = false;
      }
    } else if (this.getCurrentAction() === CONFIG.ACTION.ATTACK_LEFT){
      if (first === false){
        shanker_l_attack.gotoAndPlay(0);
        first = true; //at the very end set first to true
      }
      skeleton.imageContainer.addChild(shanker_l_attack);
      if (shanker_l_attack.currentFrame === 1){
        loop = true;
      }
      if (shanker_l_attack.currentFrame === 0 && loop){
        first = false;
        //this.setCurrentAction(CONFIG.ACTION.MOVING_RIGHT);
        this.setMeeleeAttack(false);
        loop = false;
      }

    } else if (this.getCurrentAction() === CONFIG.ACTION.MOVING_RIGHT){
      skeleton.imageContainer.addChild(shanker_r);
    } else if (this.getCurrentAction() === CONFIG.ACTION.MOVING_LEFT){
      skeleton.imageContainer.addChild(shanker_l);
    }  else { //is idling
      if (this.getMoveDirection() === "left"){
        skeleton.imageContainer.addChild(shanker_l);
      } else {
        skeleton.imageContainer.addChild(shanker_r);
      }
    }

        shanker_r.animationSpeed = .2;
      shanker_l.animationSpeed = .2;
    if (this.getCurrentAction() === CONFIG.ACTION.IDLE) {
        shanker_l.animationSpeed = 0;
      shanker_r.animationSpeed = 0;
        shanker_l.gotoAndPlay(0);
        shanker_r.gotoAndPlay(0);
       }

  };

  var now = Date.now();

  skeleton.setInvis = function(_invis){
      if (_invis){
    MAIN.stage.removeChild(skeleton.imageContainer);
    } else {
   MAIN.stage.addChild(skeleton.imageContainer);
        }

  };
  skeleton.update = function(keys) {
  };
  return skeleton;
};
