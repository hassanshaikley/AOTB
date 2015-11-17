var GameID = 0; // Every Game should have a unique ID
var util = require("util");
//TO-DO: each game should probably have its own socket.io room...
var Game = function() {
    var state = 1; //game state 0 means a game is won, make these constants
    var gameID = GameID++;
    //should remove this
    var winner = -1;
    var that = this;
    var active_spells = {};
    var spell_id = 0;
    /* Socket ID, Player Object */
    var active_players = {};
    /* Spell ID, Spell Object */
    var active_spells = {};
    var GEN_ID = 0;
    /*
     * Array of all of the Game Objects
     * Currently a game object is a spell
     * Also in the spells and projectiles array
     */
    this.gameObjects = [];

    this.setWinner = function(w) {
        winner = w; //0 or 1 depending on the winning team
        //After winner is ser
        setTimeout(function() {
            //reset game after a winner is set
            var players = that.getPlayers();
            for (var i = 0; i < players.length; i++) {
                players[i].resetHp();
                players[i].setX(players[i].getRespawnX());
                winner = -1; //why the fuck do i do this?
                game1.setState(1);
            }
        }, 5000);
    };
    this.getWinner = function() {
        return winner;
    };
    this.setState = function(s) { //0 means game is over
        if (state === 1 && s === 0) { // game finished
            state = s;
            return "GAME OVER";
        }
        state = s;
    };
    this.getState = function() {
        return state;
    };

    var stupid_variable = 0;
    this.addPlayer = function(newPlayer) {      
        if(! (newPlayer.id)){
            newPlayer.id = GEN_ID++;
        }          
        if (stupid_variable % 2 == 0) {
            newPlayer.setTeam(0);
        } else {
            newPlayer.setTeam(1);
        }
        active_players[newPlayer.id] = newPlayer;
        stupid_variable++;
    };
    this.removePlayer = function(thePlayer) {
        delete active_players[thePlayer.id];
    };
    this.getPlayers = function() {
        return active_players;
    };
    this.getNumPlayers = function(){
        var size = 0;
        for (player in active_players) {
            console.log("players " + active_players[player].id + " is a player(type), so incrementing");
            size++;
        }
        console.log("num players of game is " + size);
        return size;
    };
    var attacks = {};
    /*
     * This is useful for when the server thinks an attack happened but this was largely
     * moved to the clinet
     * One strategy is have an object with spell or attack_id
     * hit, according to
     * attacks = { 1 : [
     *   {                          attacks[1][0]
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
    this.attackHits = function(hit, attack_id, according_to) {
        //let attack = {};
        util.log("Attack hits");
        if (!(attacks[attack_id])) {
            attacks[attack_id] = [{
                "hit": hit,
                "according_to": [according_to]
            }]
            return;
        };
        var hits_array = attacks[attack_id];
        for (hits in hits_array) { //if the hit exists, if not then add it -- iterate through array
            util.log("Hits is " + hits + " attack is " + JSON.stringify(hits_array[hits]));
            if (hits_array[hits][hit] == hit) {
                if (hits_array[hits]["according_to"].indexOf(according_to) == -1) {
                    //not in array so put it in array
                    hits_array[hits]["according_to"].push(according_to);
                } else { //already 
                    console.log("\t\t\t\tALREADY IN LE SERVER BRO");
                }
            } else {
                util.log("OMG OMG");
                //THIS SHOULD ONLY HAPPEN
                if (hits_array[hits]["according_to"].indexOf(according_to) == -1) {
                    //not in array so put it in array
                    hits_array[hits] = {
                        "hit": hit,
                        "according_to": [according_to]
                    }
                } else { //already 
                    console.log("\t\t\t\tALREADY IN LE SERVER BRO");
                }
            }
            //if 60% of people say attack happene
            util.log(hits_array[hits]["according_to"].length +"---++---"+ that.getNumPlayers());
            if (hits_array[hits]["according_to"].length == that.getNumPlayers()){
                console.log(">>>\t\t>>\t\t\t\tenough players say so fam");
                //how much damage
                console.log("Getting Player " + JSON.stringify(hits_array[hits].hit) + " yay");
                that.getPlayer(hits_array[hits].hit).doDamage(25);
                //mark the hit as already done
            }
        }
        util.log("Making it happen ok" + JSON.stringify(hits_array));

    };
    /* Requires that every spell has an ID*/
    this.addSpell = function(spell) {
        if (!spell) {
            return 0;
        } else {
            util.log("ADDING SPELL " + spell + " ID " + spell.getID());
            active_spells[spell.getID()] = spell;
            return 1;
        };
    };
    this.addMeeleeAttack = function(attack) {
        if (!attack) {
            return 0;
        } else {};
    };
    this.getID = function() {
        return gameID;
    };
    this.update = function() {
        // util.log("UPDATING OK : D" + JSON.stringify(active_spells));
        for (spell in active_spells) {
            //   util.log("UPDATING SPELL " + spell);
            if (active_spells[spell].getActive()) {
                active_spells[spell].update()
            } else {
                delete active_spells[spell];
            }
        }
    };
    this.getPlayer = function(id){
        for(player in active_players){
            if (active_players[player].id == id){
                return active_players[player];
            }
        }
        return -1;
    };
};
exports.Game = Game;