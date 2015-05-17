
/**************************************************
 ** PLAYER CLASS IN SERVER
 **************************************************/
var Player = function(startHp, _name, _team) {
    this.id = 1;
    var name = _name,
        hp = 100,
        y = 465,
        maxHp = 100, //ehh w.e lol
        character_type = "Unknown", 
        gold = 0,
        respawnX,
        x = 2000, //whack I know
        team;

    this.hitby =[]; // object holding who hit you and when  (really useful for a fly who u only want to damage u once)

    this.getRespawnX = function(){
        return respawnX;
    };
    this.getHalfWidth = function(){
        return 30;
    }
    this.setTeam = function(newTeam){
        if (newTeam===1){
            x = respawnX = 3900;
        } else {
            x = respawnX =1100; 
        }
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
        if (newX < 1000){
            x = 1000;
        }else if (newX > 4000){
            x = 4000;
        } else {
            x = newX;
        }
    };

    this.setY = function(newY) {
        if (newY > -20 && newY <= 474){
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
		this.stuncounter = {};	
        
        this.stun = function(duration){
            this.stuncounter.duration = duration;
            this.stuncounter.when = Date.now();
        }

		this.isStunned = function(){
            if (Date.now() < this.stuncounter.when + this.stuncounter.duration){ //if stun is over
                util.log("yep is stunned");
                return true;
            } else {
                return false;
            }
        }
		this.checkIfStillStunned = function(){
			if (Date.now() >= this.stuncounter.when + this.stuncounter.duration){ //if stun is over
				this.stuncounter.duration = null;
			} //else do nothing
		}
    // Define which variables and methods can be accessed by the world outside
    return this;
};

exports.Player = Player;
