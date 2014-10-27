// web.js - Server
//require('newrelic');
var port = Number(process.env.PORT || 5000);
var express = require("express");
var logfmt = require("logfmt");
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');


app.set('views', __dirname + '/views');

var util = require("util"),
    server = require('http').createServer(app)
    io = require("socket.io").listen(server),
    Fly = require("./fly").Fly,
    Redhatter = require("./redhatter").Redhatter;


var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database



var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

require('./config/passport')(passport); // pass passport for configuration


app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(flash()); 
app.use(session({secret: 'a secret'}, {
  cookie: {
          path: '/',
          httpOnly: true,
          secure: false,
          maxAge: 10 * 60 * 1000
          },
  rolling: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

/* AAH NOT SURE ABOUT THIS RIGHT NOW*/
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


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
    this.broadcast.emit('message', data);
    this.emit('message', { text: data.text});   
  });   
  // Listen for new player message
  client.on("new player", onNewPlayer);

  // Listen for move player message
  client.on("move player", onMovePlayer);

  client.on("update health", onUpdateHealth);

  client.on("descend attack hits", onHitByDescendAttack);

  client.on("meteor cast", onMeteorCast)

};

function onClientDisconnect() {

  var removePlayer = playerById(this.id);

  // Player not found
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

  if (data.characterType === "Fly"){
    util.log("MAKES A FLY");
    var newPlayer = new Fly(data.x, data.y, data.hp, data.name);
  }
  else {
    util.log("MAKES A " + data.characterType);
    var newPlayer = new Redhatter(data.x, data.y, data.hp, data.name);
}
  newPlayer.id = this.id;

  // Broadcast new player to connected socket clients
  this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY(), name: newPlayer.getName(), characterType : newPlayer.getCharacterType()});

  // Send existing players to the new player
  var i, existingPlayer;
  for (i = 0; i < players.length; i++) {
    existingPlayer = players[i];
    this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY(), hp: existingPlayer.getHp(), name: existingPlayer.getName(), characterType : newPlayer.getCharacterType()});
  };

  // Add new player to the players array
  players.push(newPlayer);

};

/* Sends message to all players except one that casted */
function onMeteorCast(data){
  //util.log("A Meteor has been cast " + JSON.stringify(data.meteor_x));
  util.log(data.meteor_x);
  this.emit('meteor cast', {meteor_x: data.meteor_x });
  this.broadcast.emit('meteor cast', {meteor_x: data.meteor_x });
};

function onHitByDescendAttack(data){
  var hitPlayer = playerById(this.id);

  if (!hitPlayer){
    return;
  };


  //lower hit players health
  hitPlayer.setHp(hitPlayer.getHp() - 25);

  //if DIES
  if (hitPlayer.getHp() <= 0){
    //util.log("dude is dead " + hitPlayer.id);
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

  if (movePlayer.getCharacterType() === "Fly"){
    movePlayer.setDescendAttack(data.descendAttack);

    this.broadcast.emit("move player", {descendAttack : movePlayer.getDescendAttack(), id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY(), hp: movePlayer.getHp()});
  }
  // Broadcast updated position to connected socket clients
  else {
    this.broadcast.emit("move player", { id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY(), hp: movePlayer.getHp()});
  }
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

function updateGameVariables(){
  //util.log("Updating Vars");
};


/**************************************************
 ** RUN THE GAME
 **************************************************/
init();
