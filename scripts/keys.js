/**************************************************
 ** GAME KEYBOARD CLASS
 **************************************************/

var Keys = function(up, left, right, down) {

    this.keys = {};
    $(window).keydown(function(e){
        if ( this.keys[e.keyCode] === undefined ||this.keys[e.keyCode] === false  ){
            console.log(e.keyCode + " down");
            this.keys[e.keyCode] = true;
        }

    });
    $(window).keyup(function(e){
        if ( this.keys[e.keyCode] === undefined||this.keys[e.keyCode] === true  ){
            console.log(e.keyCode + " up");
        }
        this.keys[e.keyCode] = false;
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
