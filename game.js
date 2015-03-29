var Game = function(){
    var state  = 1; //game state 0 means a game is won

    var players = []; // the players in a game, currently unused
    var winner = -1;
    var setWinner = function(w){
        winner = w; //0 or 1 depending on the winning team
    }
    var getWinner = function(){
        return winner;
    }
    var setState = function(s){
        if (state == 1 && s == 0){ // game finished
            state = s;
            return "GAME OVER";
        }
        state = s;
    }
    var getState = function(){
        return state;
    }
    return { 
        players : players,
                setState : setState,
                getState : getState,
                getWinner : getWinner,
                setWinner : setWinner
    };
}

exports.Game = Game;
