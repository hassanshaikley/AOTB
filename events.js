/**************************************************
 ** GAME EVENT HANDLERS
 **************************************************/
var  Fly = require("./units/fly").Fly,
     Redhatter = require("./units/redhatter").Redhatter,
     Grimes = require("./units/grimes").Grimes,
  //   Bowman = require("./units/bowman").Bowman,
   //  Skelly = require("./units/skelly").Skelly,
     Shanker = require("./units/shanker").Shanker,
   //  Crevice = require("./units/crevice").Crevice,
     Spells = require("./spellsandprojectiles.js").Spells,
     Meteor = require("./spellsandprojectiles.js").Meteor,
     Stealth = require("./spells/stealth.js").Stealth,
     TortStun = require("./spells/tortstun.js").TortStun,
     RHRange =  require("./spells/rhrange.js").RHRange;
     BowmanArrow    = require("./spellsandprojectiles.js").BowmanArrow,
     DescendAttack = require("./spellsandprojectiles.js").DescendAttack;

    var CONFIG = require("./config");

var util = require("util");

var Events = function(){
    function onSocketConnection(client) {
        // Listen for client disconnected
        client.on("disconnect", onClientDisconnect);
        client.on('sendMessage', function (data) {
            this.broadcast.emit('message', { text: data.text, id: this.id});
            util.log( playerById(this.id).getName() +": \t"+data.text);
            this.emit('message', { text: data.text, id: this.id});
        });
        // Listen for new player message
        client.on("new player", onNewPlayer);
	client.on("spell one", onSpellOne);
        client.on("spell two", onSpellTwo);
        client.on("respawn player", onRespawn);
        client.on("meelee attack", onMeeleeAttack);
        client.on("init me", initClient);
        client.on("key press", onKeyPress);
    };

    var setEventHandlers = function(io) {
        // Socket.IO
        io.set("transports", ["websocket"]);
        io.set("polling duration", 10);
        io.sockets.on("connection", onSocketConnection);
    };

    function onKeyPress(data){
        var player = playerById(this.id);
        if(data.key === "left"){
                player.left = data.down;
        }
        if(data.key === "right"){
                player.right = data.down;
        }
        if(data.key === "up"){
                player.up = data.down;
        }
        if(data.key === "down"){
                player.down = data.down;
        }
        if (data.key === "jump" && data.down){ // only when u press down
            util.log("JUMPINGG AAA " + player.getY() + " -- " + player.getHeight()/2 + " -- " + CONFIG.FLOOR_HEIGHT);
            if (!player.jumping  && player.getY() + player.getHeight()/2 === CONFIG.FLOOR_HEIGHT) {
                   player.jumping = true;
                   setTimeout(function() {
                        player.jumping = false
                    },
                250);
            }
        }
    }


    function onMeeleeAttack(data){ //when a player left clicks
        var attacker = playerById(this.id);
        var damageBonus = 0;
	    if (! attacker.getAlive()){
	       return;
	    };

	   /* Make sure Meelee Attack isn't on CoolDown */
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


        //Now get all the characters to animate the meelee attack = )
        this.emit('meelee attack', {attacker: "you" });
        this.broadcast.emit('meelee attack', {attacker: this.id});
    }

    function didAttackHitTower(attackX, attackY, team, damage){
        var shrine;
        if (team == 0){
            shrine = game1.shrine_1;
        } else {
            shrine = game1.shrine_0;
        }
        if  (Math.abs(attackX - shrine.getX()) <= shrine.getHalfWidth() ){
            if (Math.abs(shrine.getY() - attackY) <= shrine.getHeight()/2 ){
                  shrine.setHp(shrine.getHp() - damage );
            }
        }
    }
    function didAttackHitPlayer(attackX, attackY, team, damage, that, socketthing){
	var playersHit = [];
        for (i = 0; i< players.length; i++){
            if (players[i].getTeam() === team){
                continue;
            };
            util.log((players[i].getX() - attackX ) + " " + (players[i].getWidth()/2 + 20 ));
            if  (Math.abs(players[i].getX() - attackX) <= players[i].getWidth()/2 +20 ){ // +20 just to make it a little easier lmao
                util.log("CHECK !");
                if (Math.abs(players[i].getY() - attackY) <= players[i].getHeight()/2){
                    util.log("CHEEEK");
                    setHp(players[i], damage);
	  	    playersHit.push(players[i]);
                    if (that != undefined) {
		        that.broadcast.emit('bleed', { id: players[i].id });
		        that.emit('bleed', { id: players[i].id });
                    } else {
                        socketthing.emit('bleed', {id : players[i].id } );
                    }
                }
            }
        }
	return playersHit;
    }


    function onRespawn(){
        var respawnPlayer = playerById(this.id);
        respawnPlayer.alive = true;
        respawnPlayer.hp = 100;
        this.emit("respawn player", {id: this.id});
        this.broadcast.emit("respawn player", {id: this.id});
    };
    function onClientDisconnect() {
        var removePlayer = playerById(this.id);

        // Player not found
        util.log(removePlayer.id +" has left");
        if (!removePlayer) {
            return;
        };
        // Remove player from players array
        players.splice(players.indexOf(removePlayer), 1);
        // Broadcast removed player to connected socket clients
        this.broadcast.emit("remove player", {id: this.id});
    };

    // New player has joined
    function onNewPlayer(data) {
        // Create a new player
        util.log("A " + (data.characterType || "unknown") + " has joined the game.");
        if (data.characterType === CONFIG.Fly){
            var newPlayer = new Fly();
        }
        else if (data.characterType === CONFIG.Redhatter){
            var newPlayer = new Redhatter();
		}
        else if (data.characterType === CONFIG.Grimes){
            var newPlayer = new Grimes();
        }
        else if (data.characterType === CONFIG.Bowman){
            var newPlayer = new Bowman();
        } else if (data.characterType === CONFIG.Shanker){
            util.log("MAKING ASHANKARR");
            var newPlayer = new Shanker();
        }
        else if (data.characterType === "Crevice"){
            util.log("made ac revice broo");
            var newPlayer = new Crevice();
        } else {
           util.log("GOT SOME PROBLEMS ");
        }
        newPlayer.setName(data.name)
        newPlayer.id = this.id;
        newPlayer.setX(newPlayer.getRespawnX());
        game1.addPlayer(newPlayer);
        this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY(), name: newPlayer.getName(), characterType : newPlayer.getCharacterType() });
        // Send existing players to the new player
        var i, existingPlayer;
        for (i = 0; i < players.length; i++) {
            existingPlayer = players[i];
            this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY(), hp: existingPlayer.getHp(), name: existingPlayer.getName(), characterType : existingPlayer.getCharacterType(), team: newPlayer.getTeam()});
        };
        util.log("Total # of players is " + (players.length+1));
        // Add new player to the players array
        players.push(newPlayer);

    };
    function onSpellTwo(data){
        util.log("Spell two");
        var player =playerById(this.id);
        if (! (player.getAlive)){
        return;
        };
        switch (player.getCharacterType()){
            case "Redhatter":
               var v = new RHRange(data.x, data.y, data.direction, player.getTeam());
               if (!player.spellTwoCastTime || player.spellTwoCastTime + RHRange.getCooldown() <= Date.now()){
               player.spellTwoCastTime = Date.now();
               Spells.spellsarray.push(v);
               this.emit('spell two', { x : data.x, y: data.y, spell: "rhrange", direction: data.direction, caster: "you" });
               this.broadcast.emit('spell two', {x : data.x, y: data.y, spell: "rhrange", direction: data.direction});
               }
               break;
            case "Fly":
              //Carry other unit lmfao
              util.log("Fly carry tigger");
                 //k do fly carry method
                for (var _i =0 ; _i < players.length; _i++){
                    //if (players[_i].getTeam() != player.getTeam()){
                        util.log("AN EMENY");
                        if (distance(players[_i].getX(), player.getX()) < 100){
                            util.log("Made x");
                            if (distance(players[_i].getY(), player.getY()) < 100){
                                     util.log("Made y");
                                 //so stun the player and lock his location to the flys : D
                                players[_i].birdStun(player);
                            }
                        }
                    //}
                }

              break;

            }

        }

	function onSpellOne(data){
		var player = playerById(this.id);
        if (! player.getAlive()){
        return;
        };
        util.log("O " + player.getCharacterType() + " - " + player.spellOneCastTime);

        if (player.getCharacterType() === "Grimes" && player.spellOneCastTime + TortStun.getCooldown()  <=  Date.now() ) {
            player.spellOneCastTime = Date.now();
		    var v = new TortStun(data.x, data.y, player.getTeam());
            Spells.spellsarray.push(v);
            this.emit('spell one', {x: data.x, spell: "tort stun", casted_by_me: true});
            this.broadcast.emit('spell one', {x: data.x, spell: "tort stun" });
        }
        if (player.getCharacterType() === "Fly" && player.spellOneCastTime + DescendAttack.getCooldown() <= Date.now() ){
        util.log( "descend attacks");
            player.spellOneCastTime = Date.now();
        player.setDescendAttack(true);
        this.emit("descend attack changes", { id: "self", descendAttack: true, casted_by_me: true });
        this.broadcast.emit("descend attack changes", {id: this.id, descendAttack: true});
            }
        if (player.getCharacterType() === "Redhatter" && player.spellOneCastTime + Meteor.getCooldown()  <=  Date.now() ){
            player.spellOneCastTime = Date.now();
            util.log("YEP");
                //var v = new TortStun(data.x, data.y, team);
                var v = new Meteor(data.x, data.y, player.getTeam());
                Spells.spellsarray.push(v);
                this.emit('spell one', {x: data.x, spell: "meteor", team: player.getTeam(), casted_by_me: true });
                this.broadcast.emit('spell one', {x: data.x, spell: "meteor", team: player.getTeam() });
        }
        if (player.getCharacterType() === "Shanker" && player.spellOneCastTime + Stealth.getCooldown() <= Date.now() ){
            player.spellOneCastTime = Date.now();
	        player.invis = true;
            var that = this;
            player.setSpeed(player.getBaseSpeed()*1.40);
                setTimeout(function(){
                    if (player.invis){
                        becomeVisible(player, that);
                    }
                }, 3000);

                this.emit('spell one', {id: "you", spell: "windwalk"});
                this.broadcast.emit('spell one', {id: player.id, spell: "windwalk"});

        };

    };

    //io.sockets.connected[data.hit_by].emit('set gold', { gold: hitBy.getGold()+1 });
    function becomeVisible(player, that){
        player.invis = false;
        player.setSpeed(player.getBaseSpeed());
        that.emit("visible again", {id : "you"});
        that.broadcast.emit("visible again", {id :player.id});
    };
    //hitBy.setGold(hitBy.getGold()+1);
    function setHp(hitPlayer, damage){ //where hitplayer is like players[i]
        var wasAlive = hitPlayer.getAlive();
        hitPlayer.doDamage(damage);
        if (!hitPlayer.getAlive() && wasAlive){
            //increment number of kills dude got
        }
        //    io.sockets.connected[data.hit_by].emit('set gold', { gold: hitBy.getGold()+1 });
        //    io.sockets.connected[hitPlayer.id].emit('set hp', { hp: hitPlayer.getHp() });
    }

    /* sends a message to one player and responds with it's team*/
    var initClient = function(){
        var initPlayer = playerById(this.id);
        this.emit("init me", { team: initPlayer.getTeam(), x: initPlayer.getRespawnX()});
    };
    /**************************************************
     ** GAME HELPER FUNCTIONS
     **************************************************/
    function playerById(id) {
        var i;
        for (i = 0; i < players.length; i++) {
            if (players[i].id == id)
                return players[i];
        };
        return false;
    };

   function distance(pos1, pos2){
       var distance = Math.abs(pos1 - pos2);
       util.log("dst is " + distance);
       return distance;
   }

    return {
        didAttackHitPlayer : didAttackHitPlayer,
        setEventHandlers : setEventHandlers,
    };
};

exports.Events = Events;
