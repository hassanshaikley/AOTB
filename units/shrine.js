/**************************************************
 ** PLAYER CLASS IN SERVER
 **************************************************/
var Config = require("../config.js");

var Shrine = function(_team) {
    var maxHp = 3000,
        hp = maxHp,
        team = _team; //team random unless assigned

    var x, y = 350; //aa
    this.hitby =[]; // object holding who hit you and when  (really useful for a fly who u only want to damage u once)
    this.game;
    if (_team == 0){
        x = 1350;
    } else {
        x = Config.ARENA_WIDTH -350;
    }
    this.getHalfWidth = function(){
        return 68;
    };
    this.getHeight = function(){
        return 200;
    };
    this.getTeam= function(){
        return team;
    };

    this.getHp = function(){
        return hp;
    };

    this.setHp = function(newHp){
	util.log("TEAM IS " + team);
        if (newHp >= maxHp){
            hp = maxHp;
        } else if ( newHp <= 0){
            if (team == 0){
		util.log("SETTING WINNER TO 1");
                game1.setWinner(1);
            } else {
		util.log("SETTING WINNER TO 0");
                game1.setWinner(0);
            }

            hp = 0;
        } else {
            hp = newHp;
        }
    };

    this.getX = function() {
        return x;
    };

    this.getY = function() {
        return y;
    };
    this.setGame = function(newGame){
        this.game = newGame;
    };
};

exports.Shrine = Shrine;
