var GameID = 0; // Every Game should have a unique ID
var util = require("util");
var colors = require("colors");
var Game = function() {
    var gameID = GameID++;
    var winner = -1;
    var that = this;
    /* Socket ID, Player Object */
    var active_players = {};
    /* Spell ID, Spell Object */
    var active_spells = {};
    var team_zero_kills = 0;
    var team_one_kills = 0;
    var KILL_CAP = 20;
    var GEN_ID = 0; // genertates id for players that don't have one--used for testing
    this.resetGame = function() {
        team_zero_kills = 0;
        team_one_kills = 0;
        winner = -1;
    };

    this.incrementTeamZeroKills = function() {
        team_zero_kills++;
        if (team_zero_kills == KILL_CAP) {
            winner = 0;
            that.setWinner(0);
        }
    };

    this.incrementTeamOneKills = function() {
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
    var meelee_attacks = {};
    var spell_attacks = {};
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
    this.attackHits = function(hit, attack_id, according_to, attack, is_spell) {
        //how to tell if it is a spell or a melee attack?
        var ret = []; // array returns who has been hit

    /*    if (hit == undefined) {
            console.log(colors.red("HIT IS NOT DEFINED"));
        }
        if (attack_id == undefined) {
            console.log(colors.red("ATTACK ID IS NOT DEFINED"));
        }
        if (according_to == undefined) {
            console.log(colors.red("ACCORDING TO IS NOT DEFINED"));
        }*/

//        console.log(colors.blue("Attack id is " + attack_id +
//                                " hit is " + hit +
//                                " according to is " + according_to));
        //        util.log(colors.blue("Attack hits : [Previosly Attack ]\t\t//
        //" + JSON.stringify(attacks)));
        //this is bad if it uses the same array since it can be
        //like for a spell or for a
        var hits_array;

        if (!is_spell){ //meelee attacks
            console.log (colors.bgCyan("Attack id is : " + attack_id));
            if (!(meelee_attacks[attack_id])) {
                hits_array = [meelee_attacks[attack_id]];
                console.log("MeleeAttack being inserted for the first time.");
                meelee_attacks[attack_id] = [{
                    "hit": hit,
                    "according_to": [according_to],
                    "confirmed": false
                }];
                setInterval(function(){
                    if (meelee_attacks[attack_id]){
                        delete meelee_attacks[attack_id];
                    }
                }, 20000);
                return ret;
            } else {
                hits_array = meelee_attacks[attack_id];

                console.log("ELSE HITS DUDE " + hits_array + " " + JSON.stringify(meelee_attacks[attack_id]));

            }
        } else {  //spells
            if (!(spell_attacks[attack_id])) {
                hits_array = [spell_attacks[attack_id]];

                console.log("SpellAttack being inserted for the first time.");
                spell_attacks[attack_id] = [{
                    "hit": hit,
                    "according_to": [according_to],
                    "confirmed": false
                }];
                setInterval(function(){
                    if (spell_attacks[attack_id]){
                        delete spell_attacks[attack_id];
                    }
                }, 20000);
                return ret;
            } else {
                hits_array = spell_attacks[attack_id];                console.log("ELSE H " + hits_array + " " + JSON.stringify(spell_attacks[attack_id]));

            }
        }

        console.log(colors.yellow("Iterating through: " + hits_array));

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
                    };
                } else { //already
                    console.log("\t\t\t\tALREADY IN LE SERVER BRO");
                }
            }
//            util.log("\t\t\t\tAttack hits : [Current Attack ]\t\t " + JSON.stringify(attacks));
            //if 100% of people say attack happene
            if (hits_array[hits]["according_to"].length >= (that.getNumPlayers()*.49) && !(hits_array[hits]["confirmed"])) {
                //how much damage
                console.log("\nok hes hurt\n\n");
                var hit_player = that.getPlayer(hits_array[hits].hit);
                var dies = hit_player.doDamage(attack.getDamage());
                ret.push(hit_player);
                hits_array[hits]["confirmed"] = true;
                //                console.log("DAMAGE HAS BEEN DONE FRIEND " + active_spells[attack_id] + " -  " + attacks[attack_id]);
//                if (attack_id) { // does this trip out when the player is dead?

                //active_spells[attack_id].doEffect({hits: hit_player});
                //                } else {
//                if (is_spell){
                    if (attack.getDirection){
                        attack.doEffect({hits: hit_player, direction: attack.getDirection()});
                    } else {
                        attack.doEffect({hits: hit_player });

                    }
  //              }
  //              }
                if (dies.dies) {
                    //player is dead increment death counter
                    if (hit_player.getTeam() == 0) {
                        that.incrementTeamOneKills();
                    } else {
                        that.incrementTeamZeroKills();
                    }
                }
            }
        }
        return ret;
    };
    /* Requires that every spell has an ID*/
    this.addSpell = function(spell) {
        if (!spell) {
            return 0;
        } else {
//            util.log("ADDING SPELL " + spell + " ID " + spell.getID());
            active_spells[spell.getID()] = spell;

            setInterval(function(){
                delete active_spells[spell.getID()];
            }, 20000);

            return 1;
        };
    };
    this.getSpell = function(id) {
        if (active_spells[id]) {
            return active_spells[id];
        }
        return -1;
    };

    this.getID = function() {
        return gameID;
    };
    this.update = function() {
        // util.log("UPDATING OK : D" + JSON.stringify(active_spells));
        for (spell in active_spells) {
            //   util.log("UPDATING SPELL " + spell);
            if (active_spells[spell].getActive()) {
                active_spells[spell].update();
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
