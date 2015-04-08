/**************************************************
 ** GAME EVENT HANDLERS
 **************************************************/ 
var  Fly            = require("./units/fly").Fly,
     Redhatter      = require("./units/redhatter").Redhatter,
     Bowman         = require("./units/bowman").Bowman,
     Skelly         = require("./units/skelly").Skelly,
     Shanker        = require("./units/shanker").Shanker,
     Crevice        = require("./units/crevice").Crevice,
     Spells         = require("./spellsandprojectiles.js").Spells,
     Meteor         = require("./spellsandprojectiles.js").Meteor,
     BowmanArrow    = require("./spellsandprojectiles.js").BowmanArrow;

canvas_width = 800;

var Events = function(){

    function onSocketConnection(client) {
        //player connected
        // Listen for client disconnected
        client.on("disconnect", onClientDisconnect);
        client.on('sendMessage', function (data) {
            this.broadcast.emit('message', { text: data.text, id: this.id});
            util.log("chat"+this.id);
            this.emit('message', { text: data.text, id: this.id});   
        });   
        // Listen for new player message
        client.on("new player", onNewPlayer);
        client.on("update health", onUpdateHealth);
        client.on("meteor cast", onMeteorCast);
        client.on("healing spike cast", onHealingSpikeCast);
        client.on("respawn player", onRespawn);
        client.on("descend attack change", onDescendAttackChange);
        client.on("meelee attack", onMeeleeAttack);
        client.on("arrow created", onArrowCreated);
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
        //util.log(data.key);
        //util.log(data.down);
        var player = playerById(this.id);
        if(data.key === "left"){
            if (data.down){
                player.left = true; 
            }else {
                player.left = false;    
            }
        }
        if(data.key === "right"){
            if (data.down){
                player.right = true; 
            } else {
                player.right = false;
            }
        }
        if(data.key === "up"){
            if (data.down){
                player.up = true;
            } else {
                player.up = false;
            }
        }
        if(data.key === "down"){
            if (data.down){
                player.down = true;
            } else {
                player.down = false;
            }
        }
    }
    function onArrowCreated(data){
        //util.log("arrow created son");
        //get the arrow and validate that this move was allowed
        this.emit('arrow fired', {x: data.x, y :data.y, caster: this.id });
        this.broadcast.emit('arrow fired', {x: data.x, y: data.y, caster: this.id});

        // spell is maintained on the server :D
        v = new BowmanArrow(data.x, data.y, this.id);
        v.caster_team =playerById(this.id).getTeam();
        Spells.spellsarray.push(v);
        //create it on the sever

        //send information of this arrow to everybody 

        //arrow can appear visually on other peoples machines, but have their machiens render it independently, I think ? IDK. lol swag
    };

    function onMeeleeAttack(data){ //when a player left clicks
        var attacker = playerById(this.id);
        var i;
        for (i = 0; i< players.length; i++){
            if ( players[i].id != this.id){
                if  (Math.abs(players[i].getX()- attacker.getX()) <= 50 ){
                    //util.log("made x");
                    if (Math.abs(players[i].getY() - attacker.getY()) <= 100){
                        //util.log("made y");
                        setHp(players[i],25);
                    }
                }
            }
        }
        //now to see if it hit a tower
        var tower;
        //util.log("tower 1\tx:\t" +shrine_1.getX()+"\ty:\t"+shrine_1.getY()+"\t\tx:\t" + attacker.getX() + "\ty:\t"+ attacker.getY());
        //util.log("tower\t"+shrine_1.getTeam() +"\tx:\t" +shrine_1.getX()+"\ty:\t"+shrine_1.getY());
        //util.log("player\t"+attacker.getTeam() + "\tx:\t" + (attacker.getX() +canvas_width/2)+ "\ty:\t"+ attacker.getY());
        util.log(" " + (attacker.getX()+ canvas_width/2) - shrine_1.getX() +" " ); //between 60 and 150 is perfect
        if (attacker.getTeam() == 0){ //proper if statemetn
            util.log("ok " + (attacker.getX() + canvas_width/2 - shrine_1.getX()));
            if  (attacker.getX() +canvas_width/2 - shrine_1.getX() <= 150 && attacker.getX() + canvas_width/2 - shrine_1.getX() >= 30){
                util.log("made x");
                if (Math.abs(shrine_1.getY() - attacker.getY()) <=150 ){
                    util.log("made y");
                    shrine_1.setHp(shrine_1.getHp() -25 );
                }
            }

        } else { //attacker team is 1
            if  (attacker.getX() +canvas_width/2 - shrine_0.getX() <= 150 && attacker.getX() + canvas_width/2 - shrine_0.getX() >= 30){
                //util.log("made x");
                if (Math.abs(shrine_0.getY() - attacker.getY()) <= 150){ // shanker made contact at 114
                    shrine_0.setHp(shrine_0.getHp() -25 );
                }
            }

        }
    }
    function onDescendAttackChange(data){
        var dAP = playerById(this.id);
        dAP.setDescendAttack(data.descendAttack);
        this.emit("descend attack changes", data.descendAttack);
        this.broadcast.emit("descend attack changes", {id: this.id, descendAttack: data.descendAttack});
    };
    function onRespawn(){
        var respawnPlayer = playerById(this.id);
        util.log("a player has respawned (id:" + this.id + ")");
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
        util.log("A " + (data.characterType || "unknown") + " has joined the game. at " +data.x);
        if (data.characterType === "Fly"){
            var newPlayer = new Fly(data.name);
        }
        else if (data.characterType === "Redhatter"){
            var newPlayer = new Redhatter(data.name);
        }
        else if (data.characterType === "Bowman"){
            var newPlayer = new Bowman(data.name);
        } else if (data.characterType === "Shanker"){
            var newPlayer = new Shanker(data.name);
        }
        else if (data.characterType === "Crevice"){
            var newPlayer = new Crevice(data.name);
        }
        newPlayer.id = this.id;
        util.log("Creating a " + newPlayer.getCharacterType());
        game1.addPlayer(newPlayer);
        // Broadcast new player to connected socket clients
        this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY(), name: newPlayer.getName(), characterType : newPlayer.getCharacterType(), team: newPlayer.getTeam()});

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

    /* Sends message to all players except one that casted */
    function onMeteorCast(data){
        //util.log("A Meteor has been cast " + JSON.stringify(data.meteor_x));
        this.emit('meteor cast', {meteor_x: data.meteor_x, caster: this.id });
        this.broadcast.emit('meteor cast', {meteor_x: data.meteor_x, caster: this.id});

        // spell is maintained on the server :D
        v = new Meteor(data.meteor_x, this.id);
        v.caster_team =playerById(this.id).getTeam();
        Spells.spellsarray.push(v);
    };
    function onHealingSpikeCast(data){
        //util.log("A Meteor has been cast " + JSON.stringify(data.meteor_x));
        this.emit('healing spike cast', {_x: data._x, caster: this.id });
        this.broadcast.emit('healing spike cast', {_x: data._x, caster: this.id});
    };

    //io.sockets.connected[data.hit_by].emit('set gold', { gold: hitBy.getGold()+1 });
    //hitBy.setGold(hitBy.getGold()+1);
    function setHp(hitPlayer, damage){ //where hitplayer is like players[i]
        hitPlayer.setHp(hitPlayer.getHp() -damage);
        //    io.sockets.connected[data.hit_by].emit('set gold', { gold: hitBy.getGold()+1 });
        //    io.sockets.connected[hitPlayer.id].emit('set hp', { hp: hitPlayer.getHp() });
    }
    function onUpdateHealth(data){

    };

    /* sends a message to one player and responds with it's team*/
    var initClient = function(){
        var initPlayer = playerById(this.id);
        this.emit("init me", { team: initPlayer.getTeam(), x: initPlayer.getRespawnX()});

        //send team
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

    return {
        setEventHandlers : setEventHandlers,
    };
};

exports.Events = Events;
