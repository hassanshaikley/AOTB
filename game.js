var Shrine = require("./units/shrine.js").Shrine;

var Game = function(){
    var state  = 1; //game state 0 means a game is won
    this.team0 = [];
    this.team1 = [];

    var winner = -1;
    this.shrine_0 = new Shrine(0);
    this.shrine_1 = new Shrine(1);

    this.setShrineHp = function(newHp, team){
        if ( team === 0){
            this.shrine_0.setHp(newHp);
            if (this.shrine_0.getHp() === 0){
               this.setWinner(1);
            }
        } else {
            this.shrine_1.setHp(newHp);
            if (this.shrine_1.getHp() === 0){
               this.setWinner(0);
            }
        }
    }
    this.setWinner = function(w){
        winner = w; //0 or 1 depending on the winning team
    };
    this.getWinner = function(){
          return winner;
    };
    this.setState = function(s){ //0 means game is over
        if (state === 1 && s === 0){ // game finished
            state = s;
            return "GAME OVER";
        } 
        state = s;
    };
    this.getState = function(){
        return state;
    };
    this.addPlayer = function(newPlayer){
        if (this.team1 > this.team0){
        util.log("ADDING PLAYER to team 0");
            this.team0.push(newPlayer);
            newPlayer.setTeam(0);
        } else {
        util.log("ADDING PLAYER to team 1");
            this.team1.push(newPlayer);
            newPlayer.setTeam(1);
        }
        //then choose the team depending on teams
    };
    this.removePlayer = function(thePlayer){
        for (var _i = 0; _i < this.team1.length; _i++){
          if (this.team1[_i].id === thePlayer.id){
           this.team1.splice(_i, 1);
         }
        } 
        for (var _i = 0; _i < this.team0.length; _i++){
          if (this.team0[_i].id === thePlayer.id){
           this.team0.splice(_i, 1);
         }
        }
    };
    this.getPlayers = function(){
        return this.team1.concat(this.team0);
    };
};

exports.Game = Game;
