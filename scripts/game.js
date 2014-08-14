/**************************************************
 ** GAME VARIABLES
 **************************************************/
var canvas,     // Canvas DOM element
    ctx,      // Canvas rendering context
    keys,     // Keyboard input
    localPlayer,  // Local player
    remotePlayers,  // Remote players
    socket;     // Socket connection

var ground = new Image();
ground.src = "https://s3-us-west-2.amazonaws.com/amara-assets/earthenfloor.png";

var CastleOfOne = new Image();
CastleOfOne.src = 'https://s3-us-west-2.amazonaws.com/amara-assets/CastleOfOne.png';

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
      case 2: alert('middle'); break;
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
      startY = Math.round(Math.random()*(canvas.height-5));

  // Initialise the local player
  localPlayer = new Player(startX, startY);

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

// Browser window resize

// Socket connected
function onSocketConnected() {
  console.log("Connected to socket server");

  // Send local player data to the game server
  socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY()});
};

// Socket disconnected
function onSocketDisconnect() {
  console.log("Disconnected from socket server");
};

// New player
function onNewPlayer(data) {
  console.log("New player connected: "+data.id);

  // Initialise the new player
  var newPlayer = new Player(data.x, data.y);
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
function update() {
  // Update local player and check for change
  if (localPlayer.update(keys)) {
    // Send local player data to the game server
    socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY()});
  };
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
var flakeArray = [];
var flakeTimer = null;
var maxFlakes = 30;
//function that adds a snowflake to the flakeArray!
function Flake() {
  this.x = Math.round(Math.random() * ctx.canvas.width);
  this.y = -10;
  this.drift = Math.random();
  this.speed = Math.round(Math.random() * 5) + 1;
  this.width = (Math.random() * 3) + 2;
  this.height = this.width;
}

function addFlake() {

  flakeArray[flakeArray.length] = new Flake();

}

function drawBackground(){
  var displacement = drawX-localPlayer.getX() ;
  
  if(flakeArray.length != maxFlakes && Math.round(Math.random()*20)==1){
    addFlake();
  }
  
  for(var i = 0; i < flakeArray.length; i++) {

    //stops snow

    ctx.fillStyle = "white";
    ctx.fillRect(flakeArray[i].x, flakeArray[i].y, flakeArray[i].width, flakeArray[i].height);
  }
  for(var i = 0; i < flakeArray.length; i++) {
    if(flakeArray[i].y < ctx.canvas.height) {
      flakeArray[i].y += flakeArray[i].speed; {
        if(flakeArray[i].y > ctx.canvas.height) {
          flakeArray[i].y = -5;
          flakeArray[i].x += flakeArray[i].drift;
        }
        if(flakeArray[i].x > ctx.canvas.width) {

          flakeArray[i].x = 0;
        }
      }
    }
  }

 
 
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
