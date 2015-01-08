/**************************************************
 ** SERVER CLASS FOR THE GAME
 **************************************************/
var express = require("express"), // Express JS
    logfmt = require("logfmt"), // Heroku key-value logger
    mongoose = require('mongoose'), // DB simplifier
    passport = require('passport'), // Authentication
    flash    = require('connect-flash'), // Flash Messages
    port = Number(process.env.PORT || 5000); // Locally uses port 5000, else uses port of server

var app = express(); //Express for server

var util = require("util"),
    server = require('http').createServer(app)
    io = require("socket.io").listen(server),
    Fly = require("./fly").Fly,
    Redhatter = require("./redhatter").Redhatter,
    Bowman = require("./bowman").Bowman,
    Skelly = require("./skelly").Skelly,
    Shanker = require("./shanker").Shanker,
    configDB = require('./config/database.js'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    session      = require('express-session');

mongoose.connect(configDB.url); // connect to our database
var MongoStore   = require('connect-mongo')(session);

require('./config/passport')(passport); // pass passport for configuration
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(flash()); 
app.use(session({
  secret:'secret',
  maxAge: new Date(Date.now() + 3600000),
  store: new MongoStore(
    {url: configDB.url },
    function(err){
      console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.set('views', __dirname + '/views');
require('./app/routes.js')(app, passport); 

var socket,   // Socket controller
    players;  // Array of connected players

function init() {
  // Create an empty array to store players
  players = [];
  hostiles = [];

  /* Add Neutrals to Server */
  var sk = new Skelly( 800, 400,100, "Skelly");
  hostiles.push(sk); 

  io.set("transports", ["websocket"]);
  io.set("polling duration", 10);
  setEventHandlers();
  setInterval(function(){
    updateGameVariables();
  }, 1000 /2);
};

app.engine('html', require('ejs').renderFile);
app.use(logfmt.requestLogger());
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/localAssets", express.static(__dirname + '/localAssets'));
app.use("/scripts", express.static(__dirname + '/scripts'));

server.listen(port, function() {
  console.log("Listening on " + port);
});

/**************************************************
 ** GAME EVENT HANDLERS
 **************************************************/
var setEventHandlers = function() {
  // Socket.IO
  io.sockets.on("connection", onSocketConnection);
};

// New socket connection
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
  client.on("respawn player", onRespawn);
  client.on("descend attack change", onDescendAttackChange);
  client.on("queue for arena", onEnterArenaQueue);
  client.on("ready for arena", onReadyForArena);
};
var arenaSize = 1; //arena holds exactly this many players
var arenaQueue = [];
var arenaList = [];
var arenaCount = 0;

function onReadyForArena(){ //set all to ready, when they all are, port them to the arena
  var _p = playerById(this.id); 
  _p.ready = true;
  // util.log("dudes ready" + _p.ready);
  var all_ready = true;
  var the_arena;
  for (var _i = 0; _i < arenaList.length ; _i++){
    if (arenaList[_i].arena_players.indexOf(this.id) != -1){
      the_arena = arenaList[_i];
    };
  };
  if (!the_arena){ //arena doesn't exist, error
    util.log("Error, arena doesn't exist!");
    return; //return and remove players from the arena 
  }
  //check if everyone in this specific room is ready
  for (var _i = 0; _i < arenaSize ;_i++){
    if (!playerById(the_arena.arena_players[_i]).ready){
      all_ready = false;
    };
  };
  if (all_ready){ //if all ready in this specific arena list
    //teleport all to game
    util.log("porting to arena");
    for (var _i = 0 ; _i < the_arena.arena_players.length; _i++){
      util.log("LETTING PLAYER KNPW " + the_arena.arena_players[_i]);
      io.sockets.connected[the_arena.arena_players[_i]].emit('port to arena', 'please');
    };
  };
};

var Arena = function(){ //arena constructor 
   var arena_players = [];//should take the first 6 players from the queu
   for (var _i =0; _i < arenaSize; _i++){
     arena_players.push(arenaQueue.shift()); //removes first element from queue adds to arena players
   };
   return {
    arena_players: arena_players
   }
};
function createArena(){ //linkedlist might be better
  //create arena
  var newArena = new Arena();
  arenaList[arenaCount] = newArena;
  arenaCount++;
  //emit to everyone in the queue to join this server 
  
  for(var _i = 0; _i < newArena.arena_players.length ; _i++){
    util.log("id " + newArena.arena_players[_i]);
    io.sockets.connected[newArena.arena_players[_i]].emit('arena confirmation', 'Confirm'); 
  };
};
function onEnterArenaQueue(data){
  arenaQueue.push(this.id);
    util.log("arena queue " + arenaQueue.length); 
  if(arenaQueue.length === arenaSize){
    //create an arena
    createArena();
  };
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
  newPlayer.id = this.id;
  util.log("CReating a " + newPlayer.getCharacterType());
  // Broadcast new player to connected socket clients
  this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY(), name: newPlayer.getName(), characterType : newPlayer.getCharacterType()});

  // Send existing players to the new player
  var i, existingPlayer;
  for (i = 0; i < players.length; i++) {
    existingPlayer = players[i];
    this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY(), hp: existingPlayer.getHp(), name: existingPlayer.getName(), characterType : existingPlayer.getCharacterType()});
  };
  util.log("Total # of players is " + (players.length+1));

  // Add new player to the players array
  players.push(newPlayer);

};

/* Sends message to all players except one that casted */
function onMeteorCast(data){
  //util.log("A Meteor has been cast " + JSON.stringify(data.meteor_x));
  this.emit('meteor cast', {meteor_x: data.meteor_x });
  this.broadcast.emit('meteor cast', {meteor_x: data.meteor_x });
};

function onHitByAttack(data){
  var hitPlayer = playerById(this.id);

  if (!hitPlayer){
    return;
  };

  //lower hit players health
  hitPlayer.setHp(hitPlayer.getHp() - 25);

  //if DIES
  if (hitPlayer.getHp() <= 0){
    //util.log("dude is dead " + hitPlayer.id);
    hitPlayer.setHp(100);
    //give the player that killed 1+ honor and 1+gold
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
  this.broadcast.emit("move player", { id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY(), hp: movePlayer.getHp()});
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

function updateGameVariables(){

  var hostile = hostiles[0];
  io.emit("update hostile", {id: hostile.id, x: hostile.getX(), y: hostile.getY(), name: hostile.getName(), characterType : hostile.getCharacterType(), hp : hostile.getHp()});
};

init();
