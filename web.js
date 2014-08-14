// web.js
var port = Number(process.env.PORT || 5000);
var express = require("express");
var logfmt = require("logfmt");
var app = express();
app.set('views', __dirname + '/views');

var util = require("util"),
    server = require('http').createServer(app)
    io = require("socket.io").listen(server),
    Player = require("./player").Player;

var socket,   // Socket controller
    players;  // Array of connected players

function init() {
  // Create an empty array to store players
  players = [];

  // Set up Socket.IO to listen on port 5000

  // Configure Socket.IO
  io.set("transports", ["websocket"]);
  io.set("polling duration", 10)

  // Restrict log output

  // Start listening for events
  setEventHandlers();
};

app.engine('html', require('ejs').renderFile);

app.use(logfmt.requestLogger());
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/localAssets", express.static(__dirname + '/localAssets'));
app.use("/scripts", express.static(__dirname + '/scripts'));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

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
  util.log("New player has connected: "+client.id);

  // Listen for client disconnected
  client.on("disconnect", onClientDisconnect);

  // Listen for new player message
  client.on("new player", onNewPlayer);

  // Listen for move player message
  client.on("move player", onMovePlayer);
  
  // Listen for move player message
  client.on("descend attack", onDescendAttack);
};

function onClientDisconnect() {
  util.log("Player has disconnected: "+this.id);

  var removePlayer = playerById(this.id);

  // Player not found
  if (!removePlayer) {
    util.log("Player not found: "+this.id);
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
  var newPlayer = new Player(data.x, data.y);
  newPlayer.id = this.id;

  // Broadcast new player to connected socket clients
  this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});

  // Send existing players to the new player
  var i, existingPlayer;
  for (i = 0; i < players.length; i++) {
    existingPlayer = players[i];
    this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
  };

  // Add new player to the players array
  players.push(newPlayer);
};

function onDescendAttack(data){
  util.log( this.id + " attacks");
  var attackingPlayer = playerById(this.id);
  // Player not found
  if (!attackingPlayer) {
    util.log("Player not found: "+this.id);
    return;
  };
  attackingPlayer.setDescendAttack(data.descendAttack);
  this.broadcast.emit("descend attack", {id: attackingPlayer.id, descendAttack: attackingPlayer.getDescendAttack()});

};
// Player has moved
function onMovePlayer(data) {
  var movePlayer = playerById(this.id);

  // Player not found
  if (!movePlayer) {
    util.log("Player not found: "+this.id);
    return;
  };

  // Update player position
  movePlayer.setX(data.x);
  movePlayer.setY(data.y);

  // Broadcast updated position to connected socket clients
  this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()});
};

/**************************************************
 ** GAME HELPER FUNCTIONS
 **************************************************/
// Find player by ID
function playerById(id) {
  var i;
  for (i = 0; i < players.length; i++) {
    if (players[i].id == id)
      return players[i];
  };

  return false;
};


/**************************************************
 ** RUN THE GAME
 **************************************************/
init();
