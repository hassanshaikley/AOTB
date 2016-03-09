/**************************************************
 ** events.js
 ** GAME EVENT HANDLERS
 **************************************************/
var Fly = require("./Units/fly").Fly,
    Redhatter = require("./Units/redhatter").Redhatter,
    Grimes = require("./Units/grimes").Grimes,
    Dino = require("./Units/dino").Dino,
    Huntress = require("./Units/huntress").Huntress,
    //   Bowman = require("./Units/bowman").Bowman,
    //  Skelly = require("./Units/skelly").Skelly,
    Shanker = require("./Units/shanker").Shanker,
    //  Crevice = require("./Units/crevice").Crevice,
    FlyGrab = require("./Spells/fly-grab").FlyGrab,
    ShankerBomb = require("./Spells/shanker-bomb").ShankerBomb,
    Stealth = require("./Spells/stealth.js").Stealth,
    TortStun = require("./Spells/tortstun.js").TortStun,
    RHRange = require("./Spells/rhrange.js").RHRange,
    DescendAttack = require("./Spells/descend-attack.js").DescendAttack,
    Meteor = require("./Spells/meteor.js").Meteor,
    IDComponent = require("./Components/id-component").IDComponent,
    Attack = require('./Units/Attacks/attack.js').Attack;

var DataBlob = require('./App/models/data-blob');

//var colors = require("colors");

var CONFIG = require("./config");

var util = require("util");
/* Used to store attack objects
 */
var attacks = {};

var Events = function() {

    var that = this;

    function onSocketConnection(client) {
        // Listen for client disconnected
        client.on("disconnect", onClientDisconnect);
        client.on('sendMessage', function(data) {
            this.broadcast.emit('message', {
                text: data.text,
                id: this.id
            });
            // util.log(colors.teal(playerById(this.id).getName() + ": \t" + data.text));
            this.emit('message', {
                text: data.text,
                id: this.id
            });
        });
        // Listen for new player message
        client.on("new player", onNewPlayer);
        client.on("spell one", onSpellOne);
        client.on("spell two", onSpellTwo);
        client.on("respawn player", onRespawn);
        client.on("meelee attack", onMeeleeAttack);
        client.on("init me", initClient);
        client.on("key press", onKeyPress);
        client.on("meelee hits", onMeeleeHits);
        client.on("spell hits", onSpellHits);
//        client.on("landed", that.onLanded);
        client.on("switch team", that.onSwitchTeam);
    };

    /* Function for switching team event
     * Reason it uses this. is to be testable
     */
    this.onSwitchTeam = function(){
        player = playerById(this.id);
        if (player){
            player.switchTeam();
        }
    };
    /*
    this.onLanded = function(data){
        console.log("\nsettling land y " +data.y);
        player = playerById(this.id);
        player.setLandY(data.y);
    };*/
    spell_hits = [];
    /*
     * Player is hit
     * Ignore request from other player
     * Spell hits is an array of a spell and how many people say it hit them
     * One design is an array [attack_1, attack_2]
     * Only increment if this id has not submitted as message about this specific
     * Attack or spellss
     * If
     * Design options : Array of attacks, each attack is an object with an ID associated with it,
     * Beacause we need to be able to remember
     * PROS: Look up attack is instant (each has an id. indexed by ID)
     *   Then iterate through the array member that contains the ID's, if the ID doesn't exist
     *   add it, otherwise skip
     * Perhaps make an attack entity object that is a gameobject
     * That handles this

     * Or every spell can have a member variable that is an array of
     * The ID's that say the spell has landed!
     *
     */
    function onSpellHits(data) {
        util.log("HITS>>" + data.attack_id + " -- " + data.hit);
        // get the id of the person that hit
        var hit;
        if (!attacks[data.attack_id]){
            console.log("ATTACK DOESNT EXIST");
            return;
        };

        if (!(data.hit == undefined)) {
            hit = playerById(data.hit);
        } else {
            hit = playerById(this.id);
        }
        if (!(data.hit_by == undefined)) {
            hit_by = playerById(data.hit_by);
        } else {
            util.log("YEP");
            hit_by = playerById(this.id);
        }
        var according_to = playerById(this.id);
        util.log("hit \t\t" + hit.id + " according to \t\t" + according_to.id + " attack id \t\t" + data.attack_id);
        util.log(JSON.stringify(attacks[data.attack_id]) +" hmm");
        if (attacks[data.attack_id].getTeam() == hit.getTeam()) {
            console.log("\t\t\tYou on same team tho");
            return;
        }
        if (!hit.getAlive()) {
            return;
        }
        var has_been_hit = game1.attackHits(hit.id, data.attack_id, according_to.id, attacks[data.attack_id]);
        if (!hit.getAlive()) {
            this.emit('update team killcount', {
                team_one_kills: game1.getTeamOneKills(),
                team_zero_kills: game1.getTeamZeroKills()
            });
            this.broadcast.emit('update team killcount', {
                team_one_kills: game1.getTeamOneKills(),
                team_zero_kills: game1.getTeamZeroKills()
            });
        };
    };
    /* Function that is called whenever a player is said to be hit
     * If 80% of clients say it happened within .1 seconds of it happening
     * Then we will say that it has really happened.
     */

    function onMeeleeHits(data) {
        var hit;
        var hit_by;

        if (!attacks[data.attack_id]){
            console.log("ATTACK DOESNT EXIST");
            return;
        };

        if (!(data.hit == undefined)) {
            console.log("hit is not undefined");
            hit = playerById(data.hit);
        } else {
            console.log("hit is undefined");
            hit = playerById(this.id);
        }
        //   var hit_by = playerById(data.hit_by);
        if (!(data.hit_by == undefined)) {
            console.log("yep works ");
            hit_by = playerById(data.hit_by);
        } else {
            console.log("YEPPERS");
            hit_by = playerById(this.id);
        }
        if (attacks[data.attack_id].getTeam() == hit.getTeam()) {
            console.log("\t\t\tYou on same team tho");
            return;
        }
        if (!hit.getAlive()) {
            return;
        }
        var according_to = playerById(this.id);
        util.log("hit \t\t" + hit.id + " according to \t\t" + according_to.id + " attack id \t\t" + data.attack_id);
        //should only happen if they are on differnt teams
        //        util.log("MEELEE HITS----->>" + data.attack_id + " -- " + hit);
        //this function returns true if they die...
        var has_been_hit = game1.attackHits(hit.id, data.attack_id, according_to.id, attacks[data.attack_id]);
        if (has_been_hit) {


        }
        if (!hit.getAlive()) {
            this.emit('update team killcount', {
                team_one_kills: game1.getTeamOneKills(),
                team_zero_kills: game1.getTeamZeroKills()
            });
            this.broadcast.emit('update team killcount', {
                team_one_kills: game1.getTeamOneKills(),
                team_zero_kills: game1.getTeamZeroKills()
            });
        };
    };
    this.setEventHandlers = function(io) {
        // Socket.IO
        io.set("transports", ["websocket"]);
        io.set("polling duration", 10);
        io.sockets.on("connection", onSocketConnection);
    };

    function onKeyPress(data) {
        var player = playerById(this.id);
        if (data.key === "jump" && data.down) { // only when u press down
            util.log("JUMPINGG AAA " + player.getY() + " -- " + player.getHeight() / 2 + " -- " + CONFIG.FLOOR_HEIGHT);
            if (!player.jumping && player.getY() + player.getHeight() / 2 === player.getLandY()) {
                player.jumping = true;
                setTimeout(function() {
                    player.jumping = false;
                }, 1000);
            }
        }
        if (data.key === "left") {
            player.left = data.down;
        }
        if (data.key === "right") {
            player.right = data.down;
        }
        if (data.key === "up") {
            player.up = data.down;
        }
        if (data.key === "down") {
            player.down = data.down;
        }
    }
    /* Every meelee attack has an ID
     *
     */
    function onMeeleeAttack(data) { //when a player left clicks
        var attacker = playerById(this.id);
        var attack_id = IDComponent.generateID();
        if (!attacker.getAlive()) {
            return;
        }

        var atk = new Attack({damage: attacker.getDamage(), team: attacker.getTeam(), effect: attacker.attackEffect, direction: data.direction});
        attacks[attack_id] = atk;

        if (attacker.getInvis()){
            attacker.setInvis(false, this);
            attacker.setSpeed(attacker.getDefaultSpeed());

        };

        setTimeout(function() { //remove this
            if (attacks[attack_id]) {
                delete attacks[attack_id];
                console.log("Deleting");
            }
        }, 4000);

        //  util.log("meelee attack " + data.direction);
        //Now get all the characters to animate the meelee attack = )
        this.emit('meelee attack', {
            attacker: this.id,
            attack_id: attack_id,
            direction: data.direction
        });
        this.broadcast.emit('meelee attack', {
            attacker: this.id,
            attack_id: attack_id,
            direction: data.direction
        });
    }

    function onRespawn() {
        var respawnPlayer = playerById(this.id);
        respawnPlayer.alive = true;
        respawnPlayer.hp = 100;
        this.emit("respawn player", {
            id: this.id
        });
        this.broadcast.emit("respawn player", {
            id: this.id
        });
    };

    function onClientDisconnect() {
        var removePlayer = playerById(this.id);
        // Player not found
        util.log(removePlayer.id + " has left");
        if (!removePlayer) {
            return;
        };
        // Remove player from players array
        players.splice(players.indexOf(removePlayer), 1);
        game1.removePlayer(removePlayer);
        // Broadcast removed player to connected socket clients
        this.broadcast.emit("remove player", {
            id: this.id
        });
    };
    // New player has joined
    function onNewPlayer(data) {
        // Create a new player
        util.log("A " + (data.characterType || "unknown") + " has joined the game.");
        var newPlayer;
        if (data.characterType === CONFIG.Fly) {
            newPlayer = new Fly();
        } else if (data.characterType === CONFIG.Redhatter) {
            newPlayer = new Redhatter();
        } else if (data.characterType === CONFIG.Grimes) {
            newPlayer = new Grimes();
        } else if (data.characterType === CONFIG.Dino) {
            newPlayer = new Dino();
        } else if (data.characterType === CONFIG.Bowman) {
            newPlayer = new Bowman();
        } else if (data.characterType === CONFIG.Shanker) {
            util.log("MAKING ASHANKARR");
            newPlayer = new Shanker();
        } else if (data.characterType === Config.Huntress) {
            newPlayer = new Huntress();
        } else if (data.characterType === "Crevice") {
            util.log("made ac revice broo");
            newPlayer = new Crevice();
        } else {
            util.log("GOT SOME PROBLEMS ");
        }
        newPlayer.setName(data.name);
        newPlayer.id = this.id;
        newPlayer.setX(newPlayer.getRespawnX());
        game1.addPlayer(newPlayer);
        this.broadcast.emit("new player", {
            id: newPlayer.id,
            x: newPlayer.getX(),
            y: newPlayer.getY(),
            name: newPlayer.getName(),
            characterType: newPlayer.getCharacterType(),
        });
        // Send existing players to the new player
        var i, existingPlayer;
        for (i = 0; i < players.length; i++) {
            existingPlayer = players[i];
            this.emit("new player", {
                id: existingPlayer.id,
                x: existingPlayer.getX(),
                y: existingPlayer.getY(),
                hp: existingPlayer.getHp(),
                name: existingPlayer.getName(),
                characterType: existingPlayer.getCharacterType(),
                team: newPlayer.getTeam()
            });
        };
        util.log("Total # of players is " + (players.length + 1));
        // Add new player to the players array
        players.push(newPlayer);
    };

    function onSpellTwo(data) {
        //util.log("Spell two");
        //should handle cooldowns up here

        var player = playerById(this.id);
        if (!(player.getAlive())) {
            return;
        };
        var v;
        switch (player.getCharacterType()) {
        case "Shanker":
            util.log("I AM SO SEXY");
            v = new ShankerBomb(data.x, data.y, data.direction, player.getTeam());
            if (!(player.spellTwoCastTime + ShankerBomb.getCooldown() <= Date.now())) {
                util.log("DONE");
                return;
            }
            var y = player.getY() - 10;
            game1.addSpell(v);
            this.emit('spell two', {
                x: data.x,
                y: y,
                spell: "shanker bomb",
                direction: data.direction,
                attack_id: v.getID(),
                caster: "you"
            });
            this.broadcast.emit('spell two', {
                x: data.x,
                y: y,
                attack_id: v.getID(),
                spell: "shanker bomb",
                direction: data.direction
            });
            break;
        case "Redhatter":
            v = new RHRange(data.x, data.y, data.direction, player.getTeam());
            if (!(player.spellTwoCastTime + RHRange.getCooldown() <= Date.now())) {
                util.log("DONE");
                return;
            }
            game1.addSpell(v);
            //               Spells.spellsarray.push(v);
            this.emit('spell two', {
                x: data.x,
                y: data.y,
                spell: "rhrange",
                direction: data.direction,
                attack_id: v.getID(),
                caster: "you"
            });
            this.broadcast.emit('spell two', {
                x: data.x,
                y: data.y,
                attack_id: v.getID(),
                spell: "rhrange",
                direction: data.direction
            });
            util.log("SWAGGER");
            break;
        case "Fly":
            //Carry other unit lmfao
            util.log("Fly carry tigger" + (player.spellTwoCastTime + FlyGrab.getCooldown()) + " NOW : " + Date.now());
            if (!(player.spellTwoCastTime + FlyGrab.getCooldown() <= Date.now())) {
                util.log("DONE CUS COOLDOWN");
                return;
            }

            if (player.getGrabbed()) {
                util.log("Fly is grabbed tho");
                return;
            }
            this.emit("spell two", { spell : "fly grab"});
            //k do fly carry method
            for (var _i = 0; _i < players.length; _i++) {
                if (players[_i].id != player.id) {
                    if (distance(players[_i].getX(), player.getX()) < 60) {
                        if (distance(players[_i].getY(), player.getY()) < 100) {
                            //so stun the player and lock his location to the flys : D
                            if (players[_i].getAlive()) {
                                players[_i].birdStun(player);
                            }
                        }
                    }
                }
            }
            break;
        case "Grimes":
            console.log("GRIMES!!");
            break;
        }
        player.spellTwoCastTime = Date.now();

        //ehh this is a patchy / buggy fix should do it for every spell
        if (player.getCharacterType() == CONFIG.Redhatter || player.getCharacterType() == CONFIG.Shanker){
            console.log("MADE MADE MADE");
            attacks[v.getID()] = v;//new Attack({damage: v.getDamage(), team: player.getTeam(), effect: v.doEffect});
            setTimeout(function() { //remove this
                if (attacks[v.getID()]) {
                    delete attacks[v.getID()];
                    console.log("Deleting");
                }
            }, 9000);
        }
    }

    function onSpellOne(data) {
        var player = playerById(this.id);
        var v;
        if (!player.getAlive()) {
            return;
        };
        // util.log("SPELL ONING");
        //1000 should be repalced with the spells cooldown!
        if (player.getCharacterType() === "Grimes") {
            if (!(player.spellOneCastTime + TortStun.getCooldown() <= Date.now())) {
                util.log("DONE");
                return;
            }
            v = new TortStun(data.x, data.y, player.getTeam());
            //            Spells.spellsarray.push(v);
            game1.addSpell(v);
            this.emit('spell one', {
                x: data.x,
                spell: "tort stun",
                casted_by_me: true,
                attack_id: v.getID()
            });
            this.broadcast.emit('spell one', {
                x: data.x,
                spell: "tort stun",
                attack_id: v.getID()
            });
        }
        if (player.getCharacterType() === "Fly") {
            if (!(player.spellOneCastTime + DescendAttack.getCooldown() <= Date.now())) {
                util.log("DONE");
                return;
            }
            util.log("descend attacks");
            player.setDescendAttack(true);
            v = new DescendAttack(player.getX(), player.getY());
            this.emit("descend attack changes", {
                id: "self",
                descendAttack: true,
                casted_by_me: true,
                attack_id: v.getID()
            });
            this.broadcast.emit("descend attack changes", {
                id: this.id,
                descendAttack: true,
                attack_id: v.getID()
            });
        }
        if (player.getCharacterType() === "Redhatter") {
            if (!(player.spellOneCastTime + Meteor.getCooldown() <= Date.now())) {
                util.log("DONE");
                return;
            }
            util.log("Created Meteor");
            v = new Meteor(data.x, data.y, player.getTeam());
            //commented out that old line lol
            game1.addSpell(v);
            this.emit('spell one', {
                x: data.x,
                spell: "meteor",
                team: player.getTeam(),
                casted_by_me: true,
                attack_id: v.getID()
            });
            this.broadcast.emit('spell one', {
                x: data.x,
                spell: "meteor",
                team: player.getTeam(),
                attack_id: v.getID()
            });
        }
        if (player.getCharacterType() === "Shanker") {
            if (!(player.spellOneCastTime + Stealth.getCooldown() <= Date.now())) {
                util.log("DONE");
                return;
            }
            v = new Stealth();

            player.windWalk(3000, this);
            var that = this;
            util.log("WINDWALK");
            this.emit('spell one', {
                id: "you",
                spell: "windwalk",
                attack_id: v.getID()
            });
            this.broadcast.emit('spell one', {
                id: player.id,
                spell: "windwalk",
                attack_id: v.getID()
            });
        };
        player.spellOneCastTime = Date.now();

        attacks[v.getID()] = v;
        setTimeout(function() { //remove this
            if (attacks[v.getID()]) {
                delete attacks[v.getID()];
                console.log("Deleting");
            }
        }, 9000);
        //if spell is a projectile do something idk lol
    };
    //io.sockets.connected[data.hit_by].emit('set gold', { gold: hitBy.getGold()+1 });
    //hitBy.setGold(hitBy.getGold()+1);
    function setHp(hitPlayer, damage) { //where hitplayer is like players[i]
        var wasAlive = hitPlayer.getAlive();
        hitPlayer.doDamage(damage);
        if (!hitPlayer.getAlive() && wasAlive) {
            //increment number of kills dude got
        }
        //    io.sockets.connected[data.hit_by].emit('set gold', { gold: hitBy.getGold()+1 });
        //    io.sockets.connected[hitPlayer.id].emit('set hp', { hp: hitPlayer.getHp() });
    }
    /* sends a message to one player and responds with it's team*/
    var initClient = function(data) {
        var initPlayer = playerById(this.id);
        console.log("INIT WITH " + JSON.stringify(data));
        this.emit("init me", {
            team: initPlayer.getTeam(),
            x: initPlayer.getRespawnX(),
            team_one_kills: game1.getTeamOneKills(),
            team_zero_kills: game1.getTeamZeroKills(),
            id : initPlayer.id,
            CONFIG : CONFIG
        });

        var date = new Date();
        var year    = date.getFullYear();
        var month   = date.getMonth();
        var day     = date.getDate();
        var hour    = date.getHours();
        var minute  = date.getMinutes();

        /*    function helpNarine(){

         User.findOne( { "local.email" : "sejad.a@gmail.com"}, function(err, doc){
         doc.local.nickname = "sejoody";
         doc.save(function(err){

         });

         });

         };*/

        var data_blob = new DataBlob({
            name: initPlayer.getName(),
            referrer: data.referrer,
            ip: data.ip,
            date: ((month+1) + "/" + day+ "/"+year),
            time: ( hour + ":" +minute)
        });
        data_blob.save(function(err, dblob) {
            if (err) return console.error(err);
            else return 1;
        });

    };
    /**************************************************
     ** GAME HELPER FUNCTIONS
     **************************************************/
    function playerById(id) {
        var i;
        //var players = game1.getPlayers();
        for (i in players) {
            if (players[i].id == id) return players[i];
        };
        return false;
    };

    function distance(pos1, pos2) {
        var distance = Math.abs(pos1 - pos2);
        util.log("dst is " + distance);
        return distance;
    }

};
exports.Events = Events;
