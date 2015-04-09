/**************************************************
 ** PLAYER CLASS IN SERVER
 **************************************************/
var Shrine = function(_team) {
    var maxHp = 3000,
        hp = maxHp,
        team = _team; //team random unless assigned
    
    var x, y = 350; //aa
    this.hitby =[]; // object holding who hit you and when  (really useful for a fly who u only want to damage u once)
    this.game;
    if (_team == 0){
        x = 1150;
    } else {
        x = 3850;
    }

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
    // Define which variables and methods can be accessed by the world outside
};

exports.Shrine = Shrine;
