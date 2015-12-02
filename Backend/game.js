var GameID = 0; // Every Game should have a unique ID
var util = require("util");
//TO-DO: each game should probably have its own socket.io room...
var Game = function() {
    var gameID = GameID++;
    //should remove this
    var winner = -1;
    var that = this;
    /* Socket ID, Player Object */
    var active_players = {};
    /* Spell ID, Spell Object */
    var active_spells = {};
    var team_zero_kills = 0;
    var team_one_kills = 0;
    var KILL_CAP = 20;

    this.resetGame = function() {
        team_zero_kills = 0;
        team_one_kills = 0
        winner = -1;
        //maybe set active_spells to {}??
    };

    function incrementTeamZeroKills() {
        team_zero_kills++;
        if (team_zero_kills == KILL_CAP) {
            winner = 0;
            that.setWinner(0);
        }
    };

    function incrementTeamOneKills() {
        team_one_kills++;
        if (team_one_kills == KILL_CAP) {
            that.setWinner(1);
        }
    };
    this.getTeamZeroKills = function() {
        return team_zero_kills;
    };
    this.getTeamOneKills = function() {
        return team_one_kills;
    };
    var GEN_ID = 0; //for players
    /*
     * Array of all of the Game Objects
     * Currently a game object is a spell
     * Also in the spells and projectiles array
     */
    this.gameObjects = [];
    this.setWinner = function(w) {
        winner = w; //0 or 1 depending on the winning team

        setTimeout(function() {
            //reset game after a winner is set
            for (player in active_players) {
                active_players[player].resetHp();
                active_players[player].setX(active_players[player].getRespawnX());
                active_players[player].setY(300);

            }
            that.resetGame();
        }, 5000);
    };
    this.getWinner = function() {
        return winner;
    };
    var stupid_variable = 0;
    this.addPlayer = function(newPlayer) {
        if (!(newPlayer.id)) {
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
    this.getNumPlayers = function() {
        var size = 0;
        for (player in active_players) {
            size++;
        }
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
     *      according_to : ["hassan", "friend", "melonface" ],
     *      confirmed: false
     *   },
     *   {
     *       hit : "lime_by",
     *       according_to :["hassan"]
     *       confirmed: true
     *   }],
     * 2  :
     *  [{...}]
     * }
     * created_at: Date.now() # Used to expire this
     */
    this.attackHits = function(hit, attack_id, according_to, attack, id) {
        var ret = []; // array returns who has been hit

        if (hit == undefined) {
            console.log("|||||||||HIT IS NOT DEFINED");
        }
        if (attack_id == undefined) {
            console.log("|||||||||ATTACK ID IS NOT DEFINED");
        }
        if (according_to == undefined) {
            console.log("|||||||||ACCORDING TO IS NOT DEFINED");
        }
        console.log("\t\tAttack id is " + attack_id + " hit is " + hit + " according to is " + according_to);
        util.log("\t\t\t\tAttack hits : [Previosly Attack ]\t\t " + JSON.stringify(attacks));
        if (!(attacks[attack_id])) {
            console.log("Attack being inserted for the first time.");
            attacks[attack_id] = [{
                "hit": hit,
                "according_to": [according_to],
                "confirmed": false
            }]
            setInterval(function(){
                if (attacks[attack_id]){
                    delete attacks[attack_id];
                }
            }, 6000);
            return;
        };
        var hits_array = attacks[attack_id];
        for (hits in hits_array) { //if the hit exists, if not then add it -- iterate through array
            console.log("Does " + hits_array[hits].hit + " == " + hit);
            if (hits_array[hits].hit == hit) {
                if (hits_array[hits]["according_to"].indexOf(according_to) == -1) {
                    //not in array so put it in array
                    hits_array[hits]["according_to"].push(according_to);
                } else { //already
                }
            } else {
                //THIS SHOULD ONLY HAPPEN
                if (hits_array[hits]["according_to"].indexOf(according_to) == -1) {
                    console.log("According to doesn't exist ok.");
                    //not in array so put it in array
                    hits_array[hits] = {
                        "hit": hit,
                        "according_to": [according_to],
                        "confirmed": false
                    }
                } else { //already
                    console.log("\t\t\t\tALREADY IN LE SERVER BRO");
                }
            }
            util.log("\t\t\t\tAttack hits : [Current Attack ]\t\t " + JSON.stringify(attacks));
            //if 100% of people say attack happene
            if (hits_array[hits]["according_to"].length == that.getNumPlayers() && !(hits_array[hits]["confirmed"])) {
                //how much damage
                console.log("\nok hes hurt\n\n");
                var hit_player = that.getPlayer(hits_array[hits].hit)
                var dies = hit_player.doDamage(attack.getDamage());
                ret.push(hit_player);
                hits_array[hits]["confirmed"] = true;
                console.log("DAMAGE HAS BEEN DONE FRIEND " + active_spells[id] + " ");
                if (id) { // does this trip out when the player is dead?
                    active_spells[id].doEffect(hit_player);
                } else {
                    console.log("hit player "+hit_player);
                    attack.doEffect({hits: hit_player, direction: attack.getDirection()});
                }
                if (dies.dies) {
                    //player is dead increment death counter
                    if (hit_player.getTeam() == 0) {
                        console.log("Team 1 got a kill");
                        incrementTeamOneKills();
                    } else {
                        console.log("Team zero got a kill");
                        incrementTeamZeroKills();
                    }
                }
            }
            return ret;
        }
    };
    /* Requires that every spell has an ID*/
    this.addSpell = function(spell) {
        if (!spell) {
            return 0;
        } else {
            util.log("ADDING SPELL " + spell + " ID " + spell.getID());
            active_spells[spell.getID()] = spell;

            setInterval(function(){
                delete active_spells[spell.getID()];
            }, 5000);

            return 1;
        };
    };
    this.getSpell = function(id) {
        if (active_spells[id]) {
            return active_spells[id];
        }
    }
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
    this.getPlayer = function(id) {
        for (player in active_players) {
            if (active_players[player].id == id) {
                return active_players[player];
            }
        }
        return -1;
    };
};
exports.Game = Game;
