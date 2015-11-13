var GameID = 0; // Every Game should have a unique ID

var util = require("util");

//TO-DO: each game should probably have its own socket.io room...

var Game = function(){

    var state  = 1; //game state 0 means a game is won, make these constants

    var gameID = GameID++;
    //should remove this
    this.team0 = [];
    this.team1 = [];

    var winner = -1;
    var that = this;

    var active_spells = {};

    var spell_id = 0;


    /* Socket ID, Player Object */
    var active_players = {};
    /* Spell ID, Spell Object */
    var active_spells = {};

    /*
     * Array of all of the Game Objects
     * Currently a game object is a spell
     * Also in the spells and projectiles array
     */
    this.gameObjects = [];



    this.setWinner = function(w){
        winner = w; //0 or 1 depending on the winning team

        //After winner is ser
        setTimeout(function(){
            //reset game after a winner is set
            var players = that.getPlayers();
            for (var i = 0; i < players.length; i++){
                players[i].resetHp();
		        players[i].setX(players[i].getRespawnX());
                winner = -1; //why the fuck do i do this?

                game1.setState(1);
            }
        }, 5000);
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
            this.team0.push(newPlayer);
            newPlayer.team = 0
        } else {
            this.team1.push(newPlayer);
            newPlayer.team = 1;
        }
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

    var attacks ={};
    /*
     * This is useful for when the server thinks an attack happened but this was largely
     * moved to the clinet
     * One strategy is have an object with spell or attack_id
     * hit, according to
     * attacks = { 1 : [
     *   {
     *      hit: "jerry",
     *      according_to : ["hassan", "friend", "melonface" ]  
     *   }], 
     *   [{
     *       hit : "lime_by",
     *       according_to :["hassan"]
     *   }]
     *  },
     * 2  : 
     *  {...}
     * }
     * created_at: Date.now() # Used to expire this 
     */

    this.attackHits = function(hit, attack_id, according_to){
        //let attack = {};
        util.log("Attack hits");

        if (attacks[attack_id]){ //object
            for (hits in attacks[attack_id]){ //if the hit exists, if not then add it -- iterate through array
                util.log("Hits is " + hits + " attack is " + JSON.stringify(attacks[attack_id][hits]) ); 
                if (attacks[attack_id][hits][hit] == hit){
                    if ( attacks[attack_id][hits]["according_to"].indexof(according_to) == -1 ){
                        //not in array so put it in array
                        attacks[attack_id][hits]["according_to"].push(according_to);
                    } else { //already 
                        console.log("ALREADY IN LE SERVER BRO");
                
                    }
                } else {
                    util.log ("OMG OMG")
                    attacks[attack_id][hits] = {
                        "hit": hit,
                        "according_to": [according_to]
                    }
                }
            }
        } else { //if empty insert this
            //afaik dis works
            attacks[attack_id] = [{
                "hit": hit,
                "according_to": [according_to]
            }]
            util.log("adding attack son "  + JSON.stringify(attacks[attack_id]));

        }
         util.log("Making it happen ok" + JSON.stringify(attacks[attack_id]));

        //For a hit to be real at least 50% of the players need to recognize it. Lol.
	// var attacks = {hit_by : hit_by};

	//After 300 millisec assume he wasn't hit
        setTimeout(function(){
            //attack.
        }, 300);
    };



    /* Requires that every spell has an ID*/
    this.addSpell = function(spell){ 
        if (!spell){
            return 0;
        } else {
            util.log("ADDING SPELL " + spell + " ID " + spell.getID());
            active_spells[spell.getID()] = spell;
            return 1;
        };
    };

    this.addMeeleeAttack = function(attack){
        if (!attack){
            return 0;
        } else {

        };
    };

    this.getID = function(){
        return gameID;
    };

    this.update = function(){
       // util.log("UPDATING OK : D" + JSON.stringify(active_spells));
        for (spell in active_spells){
         //   util.log("UPDATING SPELL " + spell);
            if(active_spells[spell].getActive()){
                active_spells[spell].update()
            } else {
                delete active_spells[spell];
            }
        }

    };
};

exports.Game = Game;
