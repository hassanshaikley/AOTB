var util = require("util");
var Config = require("../config.js");

// On update moves a player : D
exports.MovementComponent = function(){

    function gravity(that){
        util.log("- " + that.y + " -- " + Config.FLOOR_HEIGHT + "-"+ that.height/2);
        if (that.y  > Config.FLOOR_HEIGHT - that.height/2) { //if its greater than the ground (V great)!
            util.log("OK");
            that.y = Config.FLOOR_HEIGHT - that.height/2; 
        } else if (that.y < 0){ //trying to fly way too high rn
            that.y = 0;
            util.log("Ee");
        } else if (!that.jumping && ! (that.y === Config.FLOOR_HEIGHT - that.height/2)){
            util.log("HEEEEE")
            that.y = that.y+25;
        }

    }

    function jump(that){
        if (that.jumping){ //jumping
            util.log("JAAMPINGg");
            util.log(that.jumping)
            that.y = (that.y - 25);
        }
    }

    this.update = function(that, speed){
        if (that == null || speed == null){
            throw new Error("Yo, speed and that need to exist for movement component to update");
        }


        //Don't allow player to descend further than the floor
//      util.log(players[_i].getY() + " " + players[_i].getHeight() + " " + (Config.FLOOR_HEIGHT+20));
        jump(that);

        if(that.left){
            that.x = that.x - speed;
        }
        if (that.right){
            that.x = that.x + speed
        }
        if (that.up){
            that.y = that.y - speed;
        }
        if (that.down){
           that.y = that.y+speed;
        }

        if (that.x <= 1000){
            that.x = 1000;
        }
        else if (that.x >= Config.ARENA_WIDTH + 1000){
            that.x = Config.ARENA_WIDTH + 1000;
        }

        gravity(that);
    }

};
