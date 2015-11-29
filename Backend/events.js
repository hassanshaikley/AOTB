/**************************************************
 ** events.js
 ** GAME EVENT HANDLERS
 **************************************************/
var Fly = require("./Units/fly").Fly,
    Redhatter = require("./Units/redhatter").Redhatter,
    Grimes = require("./Units/grimes").Grimes,
    //   Bowman = require("./Units/bowman").Bowman,
    //  Skelly = require("./Units/skelly").Skelly,
    Shanker = require("./Units/shanker").Shanker,
    //  Crevice = require("./Units/crevice").Crevice,
    Stealth = require("./Spells/stealth.js").Stealth,
    TortStun = require("./Spells/tortstun.js").TortStun,
    RHRange = require("./Spells/rhrange.js").RHRange,
    DescendAttack = require("./Spells/descend-attack.js").DescendAttack,
    CollidingObject = require("./gameObjects/CollidingObject.js").CollidingObject,
    Meteor = require("./Spells/meteor.js").Meteor,
    IDComponent = require("./Components/id-component").IDComponent;
var CONFIG = require("./config");
var util = require("util");
var attacks_teams = {};
var attacks_damages = {};
var Events = function() {
    function onSocketConnection(client) {
        // Listen for client disconnected
        client.on("disconnect", onClientDisconnect);
        client.on('sendMessage', function(data) {
            this.broadcast.emit('message', {
                text: data.text,
                id: this.id
            });
            util.log(playerById(this.id).getName() + ": \t" + data.text);
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
    };
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
        if (attacks_teams[data.attack_id] == hit.getTeam()) {
            console.log("\t\t\tYou on same team tho");
            return;
        }
        if (!hit.getAlive()) {
            return;
        }
        var has_been_hit = game1.attackHits(hit.id, data.attack_id, according_to.id, attacks_damages[data.attack_id], data.attack_id);
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
    meelee_hits = [];

    function onMeeleeHits(data) {
        var hit;
        var hit_by;
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
        if (attacks_teams[data.attack_id] == hit.getTeam()) {
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
        var has_been_hit = game1.attackHits(hit.id, data.attack_id, according_to.id, attacks_damages[data.attack_id]);
        if (has_been_hit) {
            for (var i = 0; i < has_been_hit.length; i++) {
                if (hit_by.getCharacterType() == CONFIG.Redhatter) {
                    // has_been_hit
                };
            };
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
    var setEventHandlers = function(io) {
        // Socket.IO
        io.set("transports", ["websocket"]);
        io.set("polling duration", 10);
        io.sockets.on("connection", onSocketConnection);
    };

    function onKeyPress(data) {
        var player = playerById(this.id);
        if (data.key === "jump" && data.down) { // only when u press down
            util.log("JUMPINGG AAA " + player.getY() + " -- " + player.getHeight() / 2 + " -- " + CONFIG.FLOOR_HEIGHT);
            if (!player.jumping && player.getY() + player.getHeight() / 2 === CONFIG.FLOOR_HEIGHT) {
                player.jumping = true;
                if (player.left && !player.right) {
                    player.jump_direction = "left";
                }
                if (!player.left && player.right) {
                    player.jump_direction = "right";
                }
                if (!player.left && !player.right || player.left && player.right) {
                    player.jump_direction = "none";
                }
                setTimeout(function() {
                    player.jumping = false;
                    setTimeout(function() {
                        player.jump_direction = undefined;
                    }, 400);
                }, 400);
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
        /*
        var attacker = playerById(this.id);
        var damageBonus = 0;
        if (! attacker.getAlive()){
           return;
        };

       // Make sure Meelee Attack isn't on CoolDown
        if (attacker.meeleeAttackTime == null || attacker.meeleeAttackTime + 1000 <= Date.now()){
            attacker.meeleeAttackTime = Date.now();
        } else {    //meelee attack is on CD
            return;
        }

        if (attacker.invis){
            becomeVisible(attacker, this);
            damageBonus = 20;
        };

        var i;
       var that = this;
       setTimeout( function(){
           var _x = attacker.getX() - 20;
           var _y = attacker.getY()-15;
               switch (attacker.getCharacterType()) {
               case "Shanker":
            if (data.direction === "right"){
        _x += 50;
        } else {
        _x -=25;
         }
              break;
              case "Redhatter":
                if (data.direction === "right"){
                    _x +=50;
                    } else {
                     _x -=28;
                }
                _y +=10;
                break;
              case "Fly":
                if (data.direction === "right"){
                    _x+=63;
                    } else {
                        _x-= 28;
                        }
                  _y+=55;
                break;
              case "Grimes":
              if (data.direction === "right"){
                  _x+=45;
                  } else {
                      _x-=30;
                      }
              _y+=10;
              break;
          }
            //now iterate through all players see if it hits!


        var playersHit = didAttackHitPlayer(_x, _y, attacker.getTeam(), attacker.getDamage() +damageBonus, that);
        didAttackHitTower(_x, _y, attacker.getTeam(), attacker.getDamage() + damageBonus);
        if (attacker.getCharacterType() === "Redhatter"){
          //knockback
        var distance = 0;
        if (data.direction == "right"){
            distance = 300;
        } else {
            distance = -300;
        }
          for (var i = 0; i < playersHit.length ; i++){
        playersHit[i].setX(playersHit[i].getX() + distance);
        }
      }
      that.broadcast.emit("draw hitmarker",  {x: _x, y: _y });
      that.emit("draw hitmarker",  {x: _x, y: _y });
    }, 250);

        //hitbox should depend on direction, so should create a hitbox then tell if the two hitboxes overlap!
        //a helped function would ideally take two rectangles and tell you if overlaps

         */
        var attacker = playerById(this.id);
        var attack_id = IDComponent.generateID();
        if (!attacker.getAlive()) {
            return;
        }
        attacks_teams[attack_id] = attacker.getTeam();
        attacks_damages[attack_id] = attacker.getDamage();
        if (attacker.invis) {
            becomeVisible(attacker, this);
            //            attacker.meeleeBonus();
        };
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

    function didAttackHitPlayer(attackX, attackY, team, damage, that, socketthing) {
        var playersHit = [];
        for (i = 0; i < players.length; i++) {
            //     util.log("LELELE");
            if (players[i].getTeam() === team) {
                continue;
            };
            util.log((players[i].getX() - attackX) + " " + (players[i].getWidth() / 2 + 20));
            if (Math.abs(players[i].getX() - attackX) <= players[i].getWidth() / 2 + 20) { // +20 just to make it a little easier lmao
                util.log("CHECK !");
                if (Math.abs(players[i].getY() - attackY) <= players[i].getHeight() / 2) {
                    util.log("CHEEEK");
                    setHp(players[i], damage);
                    playersHit.push(players[i]);
                    if (that != undefined) {
                        that.broadcast.emit('bleed', {
                            id: players[i].id
                        });
                        that.emit('bleed', {
                            id: players[i].id
                        });
                    } else {
                        socketthing.emit('bleed', {
                            id: players[i].id
                        });
                    }
                }
            }
        }
        return playersHit;
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
        if (data.characterType === CONFIG.Fly) {
            var newPlayer = new Fly();
        } else if (data.characterType === CONFIG.Redhatter) {
            var newPlayer = new Redhatter();
        } else if (data.characterType === CONFIG.Grimes) {
            var newPlayer = new Grimes();
        } else if (data.characterType === CONFIG.Bowman) {
            var newPlayer = new Bowman();
        } else if (data.characterType === CONFIG.Shanker) {
            util.log("MAKING ASHANKARR");
            var newPlayer = new Shanker();
        } else if (data.characterType === "Crevice") {
            util.log("made ac revice broo");
            var newPlayer = new Crevice();
        } else {
            util.log("GOT SOME PROBLEMS ");
        }
        newPlayer.setName(data.name)
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
        var player = playerById(this.id);
        if (!(player.getAlive)) {
            return;
        };
        var v;
        switch (player.getCharacterType()) {
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
                util.log("Fly carry tigger" + (player.spellTwoCastTime + DescendAttack.getCooldown()) + " NOW : " + Date.now());
                if (!(player.spellTwoCastTime + DescendAttack.getCooldown() <= Date.now())) {
                    util.log("DONE");
                    return;
                }
                if (player.getGrabbed()) {
                    util.log("Fly is grabbed tho");
                    return;
                }
                //k do fly carry method
                for (var _i = 0; _i < players.length; _i++) {
                    if (players[_i].id != player.id) {
                        util.log("AN EMENY");
                        if (distance(players[_i].getX(), player.getX()) < 100) {
                            util.log("Made x");
                            if (distance(players[_i].getY(), player.getY()) < 100) {
                                util.log("Made y");
                                //so stun the player and lock his location to the flys : D
                                if (players[_i].getAlive()) {
                                    players[_i].birdStun(player);
                                }
                            }
                        }
                    }
                }
                break;
        }
        player.spellTwoCastTime = Date.now();

        //ehh this is a patchy / buggy fix should do it for every spell
        if (player.getCharacterType() == CONFIG.Redhatter){
            attacks_teams[v.getID()] = player.getTeam();
            attacks_damages[v.getID()] = v.getDamage();
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
            util.log("SHE");
            player.invis = true;
            var that = this;
            player.setSpeed(player.getBaseSpeed() * 1.40);
            setTimeout(function() {
                if (player.invis) {
                    becomeVisible(player, that);
                }
            }, 3000);
            util.log("SINDWALK");
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
        attacks_teams[v.getID()] = player.getTeam();
        attacks_damages[v.getID()] = v.getDamage();
        //if spell is a projectile do something idk lol
    };
    //io.sockets.connected[data.hit_by].emit('set gold', { gold: hitBy.getGold()+1 });
    function becomeVisible(player, that) {
        player.invis = false;
        player.setSpeed(player.getBaseSpeed());
        that.emit("visible again", {
            id: "you"
        });
        that.broadcast.emit("visible again", {
            id: player.id
        });
    };
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
    var initClient = function() {
        var initPlayer = playerById(this.id);
        this.emit("init me", {
            team: initPlayer.getTeam(),
            x: initPlayer.getRespawnX(),
            team_one_kills: game1.getTeamOneKills(),
            team_zero_kills: game1.getTeamZeroKills(),
            id : initPlayer.id
        });
    };
    /**************************************************
     ** GAME HELPER FUNCTIONS
     **************************************************/
    function playerById(id) {
        var i;
        for (i = 0; i < players.length; i++) {
            if (players[i].id == id) return players[i];
        };
        return false;
    };

    function distance(pos1, pos2) {
        var distance = Math.abs(pos1 - pos2);
        util.log("dst is " + distance);
        return distance;
    }
    return {
        didAttackHitPlayer: didAttackHitPlayer,
        setEventHandlers: setEventHandlers,
    };
};
exports.Events = Events;
