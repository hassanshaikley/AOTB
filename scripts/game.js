/**************************************************
 ** GAME VARIABLES game.js - Front End
 **************************************************/
var canvas,     // Canvas DOM element
    ctx,      // Canvas rendering context
    keys,     // Keyboard input
    localPlayer,  // Local player
    remotePlayers,  // Remote players
    socket;     // Socket connection


var drawX = 0;

var setDrawX = function(x) {
  drawX = x;
};

var getDrawX = function(){
  return drawX;
};

/**************************************************
 ** GAME INITIALISATION
 **************************************************/
function init() {
  // Declare the canvas and rendering context
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  
  //disable context menu
  canvas.oncontextmenu = function(e){return false;}

  canvas.onmousedown = function(e){
    switch (e.which) {
      case 1: localPlayer.leftClick(); break;
      case 2: console.log('middle click'); break;
      case 3: localPlayer.rightClick(); break; }
  }

  // Maximise the canvas
  //canvas.width = window.innerWidth;
  //canvas.height = window.innerHeight;

  // Initialise keyboard controls
  keys = new Keys();

  // Calculate a random start position for the local player
  // The minus 5 (half a player size) stops the player being
  // placed right on the egde of the screen
  var startX = Math.round(Math.random()*(canvas.width-5)),
      startY = Math.round(Math.random()*(canvas.height-5))
      startHp = 100;

  // Initialise the local player
  localPlayer = new Player(startX, startY, startHp);

  // Initialise socket connection
  var host = location.origin;

  socket = io.connect(host, {port: PORT, transports: ["websocket"]});

  // Initialise remote players array
  remotePlayers = [];

  // Start listening for events
  setEventHandlers();
};


/**************************************************
 ** GAME EVENT HANDLERS
 **************************************************/
var setEventHandlers = function() {
  // Keyboard
  window.addEventListener("keydown", onKeydown, false);
  window.addEventListener("keyup", onKeyup, false);

  // Window resize
  window.addEventListener("resize", onResize, false);

  // Socket connection successful
  socket.on("connect", onSocketConnected);

  // Socket disconnection
  socket.on("disconnect", onSocketDisconnect);

  // New player message received
  socket.on("new player", onNewPlayer);

  // Player move message received
  socket.on("move player", onMovePlayer);

  // Player removed message received
  socket.on("remove player", onRemovePlayer);

  socket.on("set health", yolo);

};
function yolo(data){
  console.log("fuck");
};
// Keyboard key down
function onKeydown(e) {
  if (localPlayer) {
    keys.onKeyDown(e);
  };
};

// Keyboard key up
function onKeyup(e) {
  if (localPlayer) {
    keys.onKeyUp(e);
  };
};


// Socket connected
function onSocketConnected() {
  console.log("Connected to socket server");

  // Send local player data to the game server
  socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY(), hp: localPlayer.getHp()});
};

// Socket disconnected
function onSocketDisconnect() {
  console.log("Disconnected from socket server");
};

// New player
function onNewPlayer(data) {
  console.log("New player connected: "+data.id);

  // Initialise the new player
  var newPlayer = new Player(data.x, data.y, data.hp);
  newPlayer.id = data.id;

  // Add new player to the remote players array
  remotePlayers.push(newPlayer);
};
// Move player
function onMovePlayer(data) {
  var movePlayer = playerById(data.id);
  
  // Player not found
  if (!movePlayer) {
    console.log("Player not found: "+data.id);
    return;
  };

  // Update player position
  movePlayer.setX(data.x);
  movePlayer.setY(data.y);
  movePlayer.setDescendAttack(data.descendAttack);

  if (data.descendAttack){
    console.log("SOMEONE IS DESCEND ATTACKING THAT ISNT ME");
  }
  movePlayer.setHp(data.hp);
};


// Remove player
function onRemovePlayer(data) {
  var removePlayer = playerById(data.id);

  // Player not found
  if (!removePlayer) {
    console.log("Player not found: "+data.id);
    return;
  };

  // Remove player from array
  remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
};

var FPS = 60;
/**************************************************
 ** GAME ANIMATION LOOP
 **************************************************/
function animate() {
  update();
  draw();

  setTimeout(function(){
    
  window.requestAnimFrame(animate);
  }, 1000 /FPS);
  // Request a new animation frame using Paul Irish's shim
};


/**************************************************
 ** GAME UPDATE
 **************************************************/
var oldHp ;
function update() {
  if (!oldHp){
    oldHp = localPlayer.getHp();
    console.log(oldHp);
  }
  // Update local player and check for change
  if (localPlayer.update(keys)) {
    // Send local player data to the game server
    socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), descendAttack: localPlayer.getDescendAttack()});

  };

  //if HP changes
};


/**************************************************
 ** GAME DRAW
 **************************************************/
function draw() {
  // Wipe the canvas clean
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  // Draw the local player

  // Draw the remote players
  var i;
  for (i = 0; i < remotePlayers.length; i++) {
    remotePlayers[i].draw(ctx);
  };
  localPlayer.draw(ctx);
};


function drawBackground(){
  var displacement = drawX-localPlayer.getX() ;


 
 ctx.drawImage(ground ,0,0, 400, 100, displacement+400,400, 400, 100); 
 ctx.drawImage(ground ,0,0, 400, 100, displacement+800,400, 400, 100); 
 ctx.drawImage(ground ,0,0, 400, 100, displacement,400, 400, 100); 
 ctx.drawImage(ground ,0,0, 400, 100, displacement-400,400, 400, 100); 
 ctx.drawImage(ground ,0,0, 400, 100, displacement-800,400, 400, 100); 
  ctx.drawImage(CastleOfOne, displacement+90,295);

};
// Browser window resize
function onResize(e) {
    // Maximise the canvas
    canvas.width = 800;
      canvas.height = 500;
};
/**************************************************
 ** GAME HELPER FUNCTIONS
 **************************************************/
// Find player by ID
function playerById(id) {
  var i;
  for (i = 0; i < remotePlayers.length; i++) {
    if (remotePlayers[i].id == id)
      return remotePlayers[i];
  };

  return false;
};
