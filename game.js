var Game = function(){
    var state  = 1; //game state 0 means a game is won
    this.team1 = [];
    this.team2 = [];
    var winner = -1;
    this.setWinner = function(w){
        winner = w; //0 or 1 depending on the winning team
    };
    this.getWinner = function(){
        if (winner =-1){
          return "the fuck, error";
        } else {
         return winner;
        }
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
        if (this.team1 > this.team2){
            this.team2.push(newPlayer);
            newPlayer.setTeam(team2);
        } else {
            this.team1.push(newPlayer);
            newPlayer.setTeam(team1);
        }
        //then choose the team depending on teams
    };
    this.removePlayer = function(){
     
    };
    this.getPlayers = function(){
     return this.team1.concat(this.team2);
     };
    return this; 
}

exports.Game = Game;
