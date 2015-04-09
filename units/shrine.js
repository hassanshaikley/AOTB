/**************************************************
 ** PLAYER CLASS IN SERVER
 **************************************************/
var Shrine = function(_team) {
    var maxHp = 3000,
        hp = maxHp,
        team = _team; //team random unless assigned

    var x, y = 350; //aa
    this.hitby =[]; // object holding who hit you and when  (really useful for a fly who u only want to damage u once)

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
            game1.setState(0);
            if (team == 1){
                game1.setWinner(0);
            } else {
                game1.setWinner(1);
            }
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

    // Define which variables and methods can be accessed by the world outside
    return this;
};

exports.Shrine = Shrine;
