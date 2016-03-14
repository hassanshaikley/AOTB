var MovementComponent = function(that){
    var x = 0,
        y = -100,
        drawAtX = x,
        drawAtY = y,
        postX = x,
        postY = y,
        moveDifferenceX = 0,
        moveDifferenceY = 0;
    var xSpeed = 1;
    var ySpeed = 1;
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

    //initial direction character is facing
    var last_move_direction = "right";

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
        if (moveDifferenceX < -.5) {
            last_move_direction = "left";
            that.current_action = CONFIG.ACTION.MOVING_LEFT;
            return "left";
        } else if (moveDifferenceX > .5) {
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


    var targetX = null;
    var targetY = null;
    var targetLatency = null; //Moving between points should happen over the duration between updates
    //like Server says user is at 5, then 7, then move 2 blocks over however long it took
    //server to tell u that, ideally like 50 ms or whatever
    var last_update_time = Date.now();

    that.init_position = function(){
        drawAtX = x;
        postX = drawAtX;
        drawAtY = y;
        postY = drawAtY;
        targetX = x;
        targetY = y;
    };
    function calculateMovementData(){

        var oldDrawAtY = drawAtY;
        /*        if (Math.abs(drawAtY - y) >= 500 || Math.abs(drawAtX - x) > 2500) {
            drawAtY = y;
            drawAtX = x;
        }*/

        //move direction
        moveDifferenceX = (drawAtX - postX);
        moveDifferenceY = (drawAtY - postY);
        if (moveDifferenceX) { // USED TO TELL IF GOING LEFT OR RIGHT
            postX = drawAtX;
        }
        if (moveDifferenceY) {
            postY = drawAtY;
        }


        //falling
        if (Math.ceil(oldDrawAtY) < Math.ceil(drawAtY)){
            falling = true;
        } else {
            falling = false;
        }


    }
    /* Updates the variables for drawing*/
    this.update = function(){
        calculateMovementData();





        if (( Math.abs(drawAtX - targetX) < 10  || Math.abs(drawAtY - targetY) < 10 ) || Math.abs(drawAtX - targetX) > 500){
            getNextTargetCoords();
            generateSpeedFromCoords();
        }

        if (xSpeed){
            drawAtX -= xSpeed;
        }

        if (ySpeed){
            drawAtY -= ySpeed;
        }



    };

    function getNextTargetCoords(){
        if (that.coordinateList.length  == 0){
            //            console.log("No target coordinates available");
            return;
        }
        var coords = that.coordinateList.shift();
        targetY = coords.y;
        targetX = coords.x;
        targetLatency = coords.latency;
        //        console.log("Target coordinates selected ("+targetX + ", "+targetY+")" );

        last_update_time = Date.now();
    }
    function generateSpeedFromCoords(){
        xSpeed = (drawAtX - targetX)/(LATENCY);
        ySpeed = (drawAtY - targetY)/(LATENCY);

    };
    that.isFalling = function(){
        return falling;
    };
};
