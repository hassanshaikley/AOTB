/**************************************************
 ** PLAYER CLASS IN SERVER
 **************************************************/
var Player = function(startX, startY, startHp, _name) {
    this.id;
    var //id of the socket
        name = _name,
             hp = startHp,
             y = startY,
             maxHp = 100, //ehh w.e lol
             character_type = "Unknown", 
             zone = "The Borough",
             gold = 0,
             respawnX,
             x;
    //team is determined randomly
    //    team = Math.round(Math.random() * (1)); //team random unless assigned
    var team;
    /* */
    if (team1.length  < team0.length ){ //if team 1 is smaller than team zero
        util.log ("t1\t" +team1.length + "\tt0\t" +team0.length);
        team = 1;
        team1.push(this);
    } else {
        util.log ("--x--t1\t" +team1.length + "\tt0\t" +team0.length);
        team = 0;
        team0.push(this);
    }

    if (team==1){
        respawnX = 2900;
    } else {
        respawnX =100; 
    }
    x = respawnX;
    this.hitby =[]; // object holding who hit you and when  (really useful for a fly who u only want to damage u once)

    this.getRespawnX = function(){
        return respawnX;
    };
    this.setTeam = function(newTeam){
        team = newTeam;
    };
    this.getTeam= function(){
        return team;
    };

    /* Every character has a type - this is sent from the client */
    this.setCharacterType = function(newType){
        this.character_type = newType;
    };

    this.setGold = function(amount){
        gold = amount;
    };

    this.getGold = function(){
        return gold
    };

    this.getCharacterType = function(){
        return this.character_type;
    };

    this.getName = function(){
        return name;
    };
    this.setName = function(newName){
        name = newName;
    };

    this.getHp = function(){
        return hp;
    };

    /* Returns "dies" or "lives"*/
    this.setHp = function(newHp){

        //send a message to this player

        //
        if (newHp >= maxHp){
            hp = maxHp;
        } else if ( newHp <= 0){ //hp is zero noo
            //hp = 0;
            //respawn!
            hp = 100;
            x = respawnX;
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

    this.setX = function(newX) {
        if (newX < 0){
            x = 0;
        }else if (newX > 3000){
            x = 3000;
        } else {
            x = newX;
        }
    };

    this.setY = function(newY) {
        if (y > -20 && y < 475){
            y = newY;
        } else {
            if ( y<250){
                y =-19;
            } else {
                y =474;
            }
        }
    };
    this.setId = function(newId){
        id = newId;
    };
    this.setZone = function(newZone){
        zone = newZone;
    };
    this.getZone = function(){
        return zone;
    };
    this.move = function(speed, direction){
        if (direction === "left" ){
            this.setX(this.getX()-speed);
        } else if (direction === "right"){
            this.setX(this.getX()+speed);
        }
        if (direction === "up"){
            this.setY(this.getY()-speed);
        } else if (direction === "down"){
            this.setY(this.getY()+speed);

        }
    };
    // Define which variables and methods can be accessed by the world outside
    return this;
};

exports.Player = Player;
