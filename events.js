/**************************************************
 ** GAME EVENT HANDLERS
 **************************************************/ 
var  Fly           = require("./fly").Fly,
     Redhatter     = require("./redhatter").Redhatter,
     Bowman        = require("./bowman").Bowman,
     Skelly        = require("./skelly").Skelly,
     Shanker       = require("./shanker").Shanker,
     Crevice       = require("./crevice").Crevice;


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
    // Listen for move player message
    client.on("move player", onMovePlayer);
    client.on("update health", onUpdateHealth);
    client.on("attack hits", onHitByAttack);
    client.on("meteor cast", onMeteorCast);
    client.on("healing spike cast", onHealingSpikeCast);
    client.on("respawn player", onRespawn);
    client.on("descend attack change", onDescendAttackChange);
  };

  var setEventHandlers = function() {
    // Socket.IO
    io.set("transports", ["websocket"]);
    io.set("polling duration", 10);
    io.sockets.on("connection", onSocketConnection);
  };

  function onDescendAttackChange(data){
    var dAP = playerById(this.id);
    dAP.setDescendAttack(data.descendAttack);
    //this.emit("descend attack changes", data.descendAttack);
    this.broadcast.emit("descend attack changes", {id: this.id, descendAttack: data.descendAttack});
  }
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
    util.log("A " + (data.characterType || "unknown") + " has joined the game.");
    if (data.characterType === "Fly"){
      var newPlayer = new Fly(data.x, data.y, data.hp, data.name);
    }
    else if (data.characterType === "Redhatter"){
      var newPlayer = new Redhatter(data.x, data.y, data.hp, data.name);
    }
    else if (data.characterType === "Bowman"){
      var newPlayer = new Bowman(data.x, data.y, data.hp, data.name);
    } else if (data.characterType === "Shanker"){
      var newPlayer = new Shanker(data.x, data.y, data.hp, data.name);
    }
    else if (data.characterType === "Crevice"){
      var newPlayer = new Crevice(data.x, data.y, data.hp, data.name);
    }
    newPlayer.id = this.id;
    util.log("CReating a " + newPlayer.getCharacterType());

    // Broadcast new player to connected socket clients
    this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY(), name: newPlayer.getName(), characterType : newPlayer.getCharacterType(), zone: newPlayer.getZone()});

    // Send existing players to the new player
    var i, existingPlayer;
    for (i = 0; i < players.length; i++) {
      existingPlayer = players[i];
      this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY(), hp: existingPlayer.getHp(), name: existingPlayer.getName(), characterType : existingPlayer.getCharacterType(), zone: existingPlayer.getZone()});
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
  };
  function onHealingSpikeCast(data){
    //util.log("A Meteor has been cast " + JSON.stringify(data.meteor_x));
    this.emit('healing spike cast', {_x: data._x, caster: this.id });
    this.broadcast.emit('healing spike cast', {_x: data._x, caster: this.id});
  };

  function onHitByAttack(data){
    var hitPlayer = playerById(this.id);
    if (!hitPlayer){
      return;
    };
    hitPlayer.setHp(hitPlayer.getHp() - data.damage);
    util.log("Was hit by " + data.hit_by);
    //if DIES
    if (hitPlayer.getHp() <= 0){
      var hitBy = playerById(data.hit_by);
      console.log(" is a playa " + hitBy.getName());
      if (this.id != data.hit_by){
        io.sockets.connected[data.hit_by].emit('set gold', { gold: hitBy.getGold()+1 });
        hitBy.setGold(hitBy.getGold()+1);
      } 
      hitPlayer.setHp(100);
    }
    this.broadcast.emit('set health', { id: hitPlayer.id, hp: hitPlayer.getHp()});
    //emit that health to every1
  };
  function onUpdateHealth(data){

  };
  // Player has moved
  function onMovePlayer(data) {
    var movePlayer = playerById(this.id);

    // Player not found
    if (!movePlayer) {
      return;
    };

    // Update player position
    movePlayer.setX(data.x);
    movePlayer.setY(data.y);
    this.broadcast.emit("move player", { id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY(), hp: movePlayer.getHp(), zone: movePlayer.getZone()});
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
    setEventHandlers : setEventHandlers
  };
};




exports.Events = Events;
