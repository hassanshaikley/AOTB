/**************************************************
 ** GAME KEYBOARD CLASS
 **************************************************/
mouseData = 5;

var Keys = function(up, left, right, down) {


  MAIN.stage.click = function(mousedata){
    mouseData = mousedata.data.getLocalPosition(MAIN.stage);
    x = mouseData.x + localPlayer.getDrawAtX() - Math.abs(768/2);
    
  }


  //old



    this.keys = {};
    //65 left, 87 up, 68 right, 83 down
    $(window).keydown(function(e){
		
			/* Prevent Backspace from going to the previous page */
      if (e.keyCode  ===8 ){
			e.preventDefault();
			}
			if ( this.keys[e.keyCode] === undefined || this.keys[e.keyCode] === false  ){
            this.keys[e.keyCode] = true;
            if(e.keyCode === 65){//left
                socket.emit('key press', { key: "left", down: true}); 
            } else if(e.keyCode === 87){//up
                socket.emit('key press', { key: "up", down: true}); 
            } else if(e.keyCode === 68){//right
                socket.emit('key press', { key: "right", down: true}); 
            }  else if(e.keyCode === 83){//down
                socket.emit('key press', { key: "down", down: true}); 
            } 
        }
    });
    $(window).keyup(function(e){
        if ( this.keys[e.keyCode] === undefined||this.keys[e.keyCode] === true  ){
            this.keys[e.keyCode] = false;
            if(e.keyCode === 65){//left
                socket.emit('key press', { key: "left", down: false}); 
            } else if(e.keyCode === 87){//up
                socket.emit('key press', { key: "up", down: false}); 
            } else if(e.keyCode === 68){//right
                socket.emit('key press', { key: "right", down: false}); 
            }  else if(e.keyCode === 83){//down
                socket.emit('key press', { key: "down", down: false}); 
            } 
        }
    });


  //if just switched to this page make them all false
  var up = up || false,
      left = left || false,
      right = right || false,
      down = down || false;

  var onKeyDown = function(e) {
    if ($("#text").is(":focus")){
      return;
    }
  };
  var onKeyUp = function(e){
  //
  };

  return {
      onKeyDown: onKeyDown,
          onKeyUp: onKeyUp
  };
};
