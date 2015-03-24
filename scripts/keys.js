/**************************************************
 ** GAME KEYBOARD CLASS
 **************************************************/

var Keys = function(up, left, right, down) {

    this.keys = {};

    //65 left, 87 up, 68 right, 83 down
    $(window).keydown(function(e){
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
            console.log(e.keyCode + " pressed");
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

  return {
      onKeyDown: onKeyDown,
  };
};
