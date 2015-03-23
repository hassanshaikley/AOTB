/**************************************************
 ** GAME KEYBOARD CLASS
 **************************************************/

var Keys = function(up, left, right, down) {

    this.keys = {};

    //65 left, 87 up, 68 right, 83 down
    $(window).keydown(function(e){
        if ( this.keys[e.keyCode] === undefined || this.keys[e.keyCode] === false  ){
            console.log(e.keyCode + " pressed");
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
    var that = this,
        c = e.keyCode;
    switch (c) {
      // Controls
      case 65: // Left
        that.left = true;
        break;
      case 87: // Up
        that.up = true;
        break;
      case 68: // Right
        that.right = true; // Will take priority over the left key
        break;
      case 83: // Down
        that.down = true;
        break;
    };
  };

  var onKeyUp = function(e) {
    var that = this,
        c = e.keyCode;
    switch (c) {
      case 65: // Left
        that.left = false;
        break;
      case 87: // Up
        that.up = false;
        break;
      case 68: // Right
        that.right = false;
        break;
      case 83: // Down
        that.down = false;
        break;
    };
  };

  return {
    up: up,
      left: left,
      right: right,
      down: down,
      onKeyDown: onKeyDown,
      onKeyUp: onKeyUp,
  };
};
