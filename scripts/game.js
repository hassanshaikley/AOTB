/**************************************************
 ** GAME JS -CLIENT SIDE
 **************************************************/
var canvas,     // Canvas DOM element
    ctx,      // Canvas rendering context
    keys,     // Keyboard input
    localPlayer,  // Local player
    remotePlayers,  // Remote players
    socket;     // Socket connection

var floorHeight = 474;
    // variable that tracks how much the player has moved, everything is drawn
    var drawX = 0;//in relation to this variable 

    function init() {
      // Declare the canvas and rendering context
      canvas = document.getElementById("gameCanvas");
      ctx = canvas.getContext("2d");
      //disable right click default behavior
      canvas.oncontextmenu = function(e){return false;}
      var clientRect;
      var adjustedX, adjustedY;
      /* canvas.ontouchstart = function(e){
            clientRect = ctx.canvas.getBoundingClientRect();
            adjustedX = drawX + localPlayer.getX(); 
            adjustedX += (e.clientX - clientRect.left) -100;
            adjustedY += e.clientY - clientRect.topy;
            localPlayer.rightClick(adjustedX, adjustedY); 
      } */

      canvas.onmousedown = function(e){
        switch (e.which) {
          case 1: 
            clientRect = ctx.canvas.getBoundingClientRect();
            localPlayer.leftClick();  
            var y = e.clientY - clientRect.top;
            break;
          case 2: console.log('middle click'); 
                  break;
          case 3: 
            clientRect = ctx.canvas.getBoundingClientRect();
            
            adjustedX = drawX + localPlayer.getX(); 
            adjustedX += (e.clientX - clientRect.left) -100; //should work without the 100...but 100 makes it work :l
           
            adjustedY += e.clientY - clientRect.topy;
            //console.log(" clicked at " + e.clientX + " adjusted to " + adjustedX);
            localPlayer.rightClick(adjustedX, adjustedY); 
          break; 
        }
      }

      // Initialise keyboard controls
      keys = new Keys();

      // Calculate a random start position for the local player
      // The minus 5 (half a player size) stops the player being
      // placed right on the egde of the screen
      var startX = Math.round(Math.random()*(canvas.width-5)),
          startY = floorHeight-10,
          startHp = 100;
      // Initialise the local player
      if (characterType === "Redhatter"){
        localPlayer = new Redhatter(startX, startY, startHp, localPlayerName);
      } else if (characterType === "Fly"){
        localPlayer = new Fly(startX, startY, startHp, localPlayerName);
      } else {
        alert("Something has went wrong");
      };
      // Initialise socket connection
      var host = location.origin;
      socket = io.connect(host, {port: PORT, transports: ["websocket"]});
      remotePlayers = [];
      setEventHandlers();
    };


/**************************************************
 ** GAME EVENT HANDLERS
 **************************************************/
var setEventHandlers = function() {
  window.addEventListener("keydown", onKeydown, false);
  window.addEventListener("keyup", onKeyup, false);
  // Window resize
  //  window.addEventListener("resize", onResize, false);
  socket.on("connect", onSocketConnected);
  // Socket disconnection
  socket.on("disconnect", onSocketDisconnect);
  // New player message received
  socket.on("new player", onNewPlayer);
  // Player move message received
  socket.on("move player", onMovePlayer);
  // Player removed message received
  socket.on("remove player", onRemovePlayer);
  socket.on("meteor cast", onMeteorCast);
  socket.on("respawn player", onRespawnPlayer);
};

function onMeteorCast(data){
  var m = new Meteor(data.meteor_x);
  Spells.spellsarray.push(m);
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
  // Send local player data to the game server
  socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY(), hp: localPlayer.getHp(), name: localPlayer.getName(), characterType: localPlayer.getCharacterType()});
};

// Socket disconnected
function onSocketDisconnect() {
  //Player disconnected from socket server
};

// New player
function onNewPlayer(data) {
  // Initialise the new player
  
  if (data.characterType === "Fly"){
    var newPlayer = new Fly(data.x, data.y, data.hp, data.name);
  } else {
    var newPlayer = new Redhatter(data.x, data.y, data.hp, data.name);
  }
  newPlayer.id = data.id;
  // Add new player to the remote players array
  remotePlayers.push(newPlayer);
  if (newPlayer.getCharacterType()=== "Fly"){
    socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), descendAttack: localPlayer.getDescendAttack(), name: localPlayer.getName()});
  } else {
    socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), name: localPlayer.getName()});

  }
};


// Move player
function onMovePlayer(data) {
  var movePlayer = playerById(data.id);
  // Player not found
  if (!movePlayer) {
    return;
  };
  // Update player position
  movePlayer.setX(data.x);
  movePlayer.setY(data.y);
  if (movePlayer.getCharacterType() == "Fly"){
    movePlayer.setDescendAttack(data.descendAttack);
  }
  movePlayer.setHp(data.hp);
};
// Remove player
function onRemovePlayer(data) {
  var removePlayer = playerById(data.id);
  // Player not found
  if (!removePlayer) {
    return;
  };
  // Remove player from array
  remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
};

function onRespawnPlayer(data) {
  var respawnPlayer = playerById(data.id);
  if (respawnPlayer == false) {
    respawnPlayer = localPlayer;
  } else {
  }
    console.log("respawning ->" + respawnPlayer.getName());
    respawnPlayer.respawn();
};

var FPS = 60;

/**************************************************
 ** GAME ANIMATION LOOP
 **************************************************/
function animate() {
  update();
  draw();
  setTimeout(animate, 1000/FPS);
  /*
  setTimeout(function(){
    window.requestAnimFrame(animate);
  }, 1000 /FPS);*/
};


/**************************************************
 ** GAME UPDATE
 **************************************************/

var oldTime = Date.now();
var newTime = Date.now();
var updateTime = 250;
function update() {
  if (Date.now() -  oldTime >= updateTime){
    if (localPlayer.getCharacterType() === "Fly"){
      socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), descendAttack: localPlayer.getDescendAttack()});
    }
    else {
      socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY()});

    }
    oldTime = Date.now();
  }
  for (i = 0; i < Spells.spellsarray.length; i++){
    Spells.spellsarray[i].update();
  };

  // Update local player and check for change
  if (localPlayer.update(keys)) {
    // Send local player data to the game server
  };
  //socket.emit("update health", {hp: localPlayer.getHp()});
};
/**************************************************
 ** GAME DRAW
 **************************************************/
function draw() {
  // Wipe the canvas clean
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  var i;
  for (i = 0; i < remotePlayers.length; i++) {
    remotePlayers[i].draw(ctx);
    remotePlayers[i].updateVariables();
  };
  for (i = 0; i < Spells.spellsarray.length; i++){
    Spells.spellsarray[i].draw(ctx)
  };
  localPlayer.updateVariables();
  localPlayer.draw(ctx);
};
function drawBackground(){
  var displacement = drawX-localPlayer.getX() ;
  //drawX is not changing aaah
  var count = "Number of players: " + (remotePlayers.length + 1);
  ctx.fillText(count, 2,10);
  ctx.drawImage(ground ,0,0, 400, 100, displacement+400,400, 400, 100); 
  ctx.drawImage(ground ,0,0, 400, 100, displacement+800,400, 400, 100); 
  ctx.drawImage(ground ,0,0, 400, 100, displacement,400, 400, 100); 
  ctx.drawImage(ground ,0,0, 400, 100, displacement-400,400, 400, 100); 
  ctx.drawImage(ground ,0,0, 400, 100, displacement-800,400, 400, 100); 
  ctx.drawImage(CastleOfOne, displacement,295);
};
// Browser window resize

function onResize(e) {
  // Maximise the canvas
  canvas.width = 800;
  canvas.height = 500;
};
// Find player by ID
function playerById(id) {
  var i;
  for (i = 0; i < remotePlayers.length; i++) {
    if (remotePlayers[i].id == id)
      return remotePlayers[i];
  };
  return false;
};
