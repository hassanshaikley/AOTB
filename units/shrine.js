/**************************************************
 ** PLAYER CLASS IN SERVER
 **************************************************/
var Config = require("../config.js");

var Shrine = function(_team) {
    var maxHp = 1000,
        hp = maxHp,
        team = _team; //team random unless assigned

    var x, y = 350; //aa
    this.hitby =[]; // object holding who hit you and when  (really useful for a fly who u only want to damage u once)
    this.game;
    if (_team == 0){
        x = 1350;
    } else {
        x = 1000 + Config.ARENA_WIDTH -350;
    }
    this.getHalfWidth = function(){
        return 88;
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
        if (newHp >= maxHp){
            hp = maxHp;
        } else if ( newHp <= 0){
            console.log(game1.getWinner() +" < -- ");
            if (game1.getWinner() != -1){
                console.log("Already A WINNER SON " + game1.getWinner());
                return;
                }
            if (team == 0){
                game1.setWinner(1);
            } else {
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
