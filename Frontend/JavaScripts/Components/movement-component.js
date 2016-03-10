var MovementComponent = function(that){
    var x = 0,
        y = -100,
        drawAtX = x,
        drawAtY = y,
        postX = x,
        postY = y,
        moveDifferenceX = 0,
        moveDifferenceY = 0;
    var xSpeed;
    var ySpeed;
    var xDiff;
    var moveTimer = 0;
    var falling = false;

        /* Used to determine the direction that a character is facing */
    that.getCurrentAction = function() {
        return that.current_action;
    };
    that.setCurrentAction = function(action) {
        that.current_action = action;
    };

    var last_move_direction;
    that.getMoveDirection = function() {
        if (that.getMeeleeAttack()) {
            if (last_move_direction === "left") {
                that.current_action = CONFIG.ACTION.ATTACK_LEFT;
                return "left";
            } else {
                that.current_action = CONFIG.ACTION.ATTACK_RIGHT;
                return "right";
            }
        }
        //have keys override move direction for local player
        //console.log(this.id);
        if (that.id === localPlayer.id) {
            if (keys["68"]) {
                last_move_direction = "right";
                that.current_action = CONFIG.ACTION.MOVING_RIGHT;
                return "right";
            }
            if (keys["65"]) {
                last_move_direction = "left";
                that.current_action = CONFIG.ACTION.MOVING_LEFT;
                return "left";
            }
        }
        if (moveDifferenceX < 0) {
            last_move_direction = "left";
            that.current_action = CONFIG.ACTION.MOVING_LEFT;
            return "left";
        } else if (moveDifferenceX > 0) {
            last_move_direction = "right";
            that.current_action = CONFIG.ACTION.MOVING_RIGHT;
            return "right";
        } else {
            that.current_action = CONFIG.ACTION.IDLE;
            return last_move_direction;
        }
    };


    that.getDrawAtY = function() {
        return drawAtY;
    };

    that.getDrawAtX = function() {
        return drawAtX;
    };


    that.getY = function() {
        return y;
    };
    /* Gets the Y specified by server - as opposed to X to be drawed at, since this X
     * jumps around a lot! (server refreshes few times a second)
     */
    that.getX = function() {
        return x;
    };
    /* Mutator for server x variable! */
    that.setX = function(newX) {
        x = newX;
    };
    /* Mutator for server y variable! */
    that.setY = function(newY) {
        y = newY;
    };



        /* Updates the variables for drawing*/
    this.update = function(){

        var oldDrawAtY = drawAtY;
        if (Math.abs(drawAtY - y) >= 500 || Math.abs(drawAtX - x) > 500) {
            drawAtY = y;
            drawAtX = x;
        }

        moveDifferenceX = (drawAtX - postX);
        moveDifferenceY = (drawAtY - postY);
        if (moveDifferenceX) { // USED TO TELL IF GOING LEFT OR RIGHT
            postX = drawAtX;
        }
        if (moveDifferenceY) {
            postY = drawAtY;
        }
        var _y;
        var _x;
        if (that.coordinateList.length > 10) {
            var temp = that.coordinateList[that.coordinateList.length - 1];
            _x = temp.x;
            _y = temp.y;
            that.coordinateList = [];
        }
        if (that.coordinateList.length > 1) {
            //_x = that.coordinateList[that.coordinateList.length - 1].x;
            // _y = that.coordinateList[that.coordinateList.length - 1].y;
            var coords = that.coordinateList.shift();
            _x = coords.x;
            _y = coords.y;
        } else {
            _x = x;
            _y = y;
        }
        if (FPS){
            var xSpeed = (drawAtX - _x)  * (FPS);
            console.log("xSPEED -> " + xSpeed);
            drawAtY -= (drawAtY - _y)  * (FPS / LATENCY); //
            drawAtX -= (drawAtX - _x)   * (FPS );
        } else {
            console.log("IN THIS BITCH");
            drawAtY -= (drawAtY - _y) / 4; //
            drawAtX -= (drawAtX - _x)  /4;
        }
        _x = null;
        _y = null;
        if (Math.ceil(oldDrawAtY) < Math.ceil(drawAtY)){
            falling = true;
        } else {
            falling = false;
        }


        };

    that.isFalling = function(){
        return falling;
    };
};
