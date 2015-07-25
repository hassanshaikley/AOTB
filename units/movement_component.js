var util = require("util");
var Config = require("../config.js");

// On update moves a player : D
exports.MovementComponent = function(speed, that, ySpeed){
    var fallSpeed = typeof ySpeed !== 'undefined' ? 1 : 25;
    ySpeed = typeof ySpeed !== 'undefined' ? ySpeed : 0;
    var baseSpeed = speed;

    console.log("ys"+ ySpeed);

    console.log("fs"+ fallSpeed);

    function gravity(that){
        if (that.getY()  > Config.FLOOR_HEIGHT - that.getHeight()/2) { //if its greater than the ground (V great)!
            that.setY(Config.FLOOR_HEIGHT - that.getHeight()/2); 
        } else if (that.getY() < 0){ //trying to fly way too high rn
            that.setY(0);
        } else if (!that.jumping && ! (that.getY() === Config.FLOOR_HEIGHT - that.getHeight()/2)){
            that.setY( that.getY()+fallSpeed);
        }

    }

    that.getBaseSpeed = function(){
        return baseSpeed;
    };

    that.getSpeed = function(){
        return speed;
    }

    that.setSpeed = function(newSpeed){
        speed = newSpeed;
    }

    function jump(that){
        if (that.jumping){ //jumping
            util.log(that.jumping)
            that.setY(that.getY() - 25);
        }
    }

    this.update = function(that){

        if (that == null || speed == null){
            throw new Error("Yo, speed and that need to exist for movement component to update");
        }

        jump(that);

        if(that.left){
            that.setX(that.getX() - speed);
        }
        if (that.right){
            that.setX(that.getX() + speed);
        }
        if (that.up){
            that.setY(that.getY() - ySpeed);
        }
        if (that.down){
           that.setY( that.getY()+ySpeed);
        }

        if (that.getX() <= 1000){
            that.setX (1000);
        }
        else if (that.getX() >= Config.ARENA_WIDTH + 1000){
            that.setX( Config.ARENA_WIDTH + 1000);
        }

        gravity(that);
    }

};
