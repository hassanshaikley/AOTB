var util = require("util");
var Config = require("../config.js");

// On update moves a player : D
exports.MovementComponent = function(){

    function gravity(that){
        if (that.getY()  > Config.FLOOR_HEIGHT - that.height/2) { //if its greater than the ground (V great)!
            that.setY(Config.FLOOR_HEIGHT - that.height/2); 
        } else if (that.getY() < 0){ //trying to fly way too high rn
            that.setY(0);
        } else if (!that.jumping && ! (that.getY() === Config.FLOOR_HEIGHT - that.height/2)){
            that.setY( that.getY()+25);
        }

    }

    function jump(that){
        if (that.jumping){ //jumping
            util.log(that.jumping)
            that.setY(that.getY() - 25);
        }
    }

    this.update = function(that, speed){

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
            that.setY(that.getY() - speed);
        }
        if (that.down){
           that.setY( that.getY()+speed);
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
