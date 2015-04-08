/**************************************************
 ** GAME JS -CLIENT SIDE
 **************************************************/
var canvas,     // Canvas DOM element
    ctx,      // Canvas rendering context
    keys,     // Keyboard input
    localPlayer,  // Local player
    remotePlayers,  // Remote players
    socket,
    _alert;     // Socket connection

var utilityCanvas = document.getElementById("utilityCanvas");
var utility_ctx = utilityCanvas.getContext("2d");
var actionBarCanvas = document.getElementById("infoBar");
var action_ctx = actionBarCanvas.getContext("2d");

if (!development){
  $('body').bind('contextmenu', function(){ return false });
}
console.log(!development);
var floorHeight = 474;
// variable that tracks how much the player has moved, everything is drawn
var drawX = 0;//in relation to this variable 

function init() {
  shrine_0 = new Shrine(0);
  shrine_1 = new Shrine(1);
  // Declare the canvas and rendering context
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  //disable right click default behavior
  canvas.oncontextmenu = function(e){return false;}
  var clientRect;
  var adjustedX, adjustedY;
  canvas.onmousedown = function(e){
    switch (e.which) {
      case 1: 
        clientRect = ctx.canvas.getBoundingClientRect();
        localPlayer.leftClick();  
        var y = e.clientY - clientRect.top;
        break;
      case 2: 
        console.log('middle click'); 
        break;
      case 3: 
        clientRect = ctx.canvas.getBoundingClientRect();
        adjustedX = drawX + localPlayer.getX(); 
        adjustedX += (e.clientX - clientRect.left) -100; //should work without the 100...but 100 makes it work :l

        adjustedY += e.clientY - clientRect.topy;
        localPlayer.rightClick(adjustedX, adjustedY); 
        break; 
    }
  }

  // Initialise keyboard controls
  keys = new Keys();

  // Calculate a random start position for the local player
  // The minus 5 (half a player size) stops the player being
  // placed right on the egde of the screen
  var startX =0,
      startY = floorHeight-10,
      startHp = 100;

  // Initialise the local player
  if (characterType === "Redhatter"){
    localPlayer = new Redhatter(startX, startY, startHp, localPlayerName);
  } else if (characterType === "Fly"){
    localPlayer = new Fly(startX, startY, startHp, localPlayerName);
  } else if (characterType === "Bowman"){
    localPlayer = new Bowman(startX, startY, startHp, localPlayerName);
  } else if (characterType === "Shanker"){
    localPlayer = new Shanker(startX, startY, startHp, localPlayerName);

  } else if (characterType === "Crevice"){
    localPlayer = new Crevice(startX, startY, startHp, localPlayerName);
  } 
  else {
    alert("Something has went wrong");
  };
  // Initialise socket connection
  var host = location.origin;
  socket = io.connect(host, {port: PORT, transports: ["websocket"]});
  remotePlayers = [];
  setEventHandlers();
  socket.emit("init me");
};


/**************************************************
 ** GAME EVENT HANDLERS
 **************************************************/
var focus_tab = true;
var setEventHandlers = function() {
  window.addEventListener("keydown", onKeydown, false);
  window.addEventListener("keyup", onKeyup, false);
  window.addEventListener('blur', function() {
    focus_tab = false;
    //socket.disconnect();
  },false);
  window.addEventListener('focus', function() {
    focus_tab = true;
    Spells.spellsarray = []; //remove all rockets, or else its cray cray

    keys = new Keys(); //resets the keys, otherwise left stays left, right, etc
  },false);
  // Window resize
  //  window.addEventListener("resize", onResize, false);
  socket.on("connect", onSocketConnected);
  // Socket disconnection
  socket.on("disconnect", onSocketDisconnect);
  // New player message received
  socket.on("new player", onNewPlayer);
  // Player move message received
  // Player removed message received
  socket.on("remove player", onRemovePlayer);
  socket.on("meteor cast", onMeteorCast);
    socket.on("arrow fired", onArrowFired);
  socket.on("healing spike cast", onHealingSpikeCast);
  socket.on("respawn player", onRespawnPlayer);
  socket.on("descend attack changes", onDescendAttackChanges);
  socket.on("update hostile", onUpdateHostile);
  socket.on("arena confirmation", onArenaPrompt);
  socket.on("port to arena", onPortToArena);
  socket.on("set gold", onSetGold);
  socket.on("set hp", onSetHp);
  socket.on("shrine hp", onShrineHp);
  socket.on("init me", onInitMe);
  socket.on("win", onWin);
  socket.on("update player", onUpdatePlayer);
};

/* Updates location of all connected players*/

function onUpdatePlayer(data){
    var player = playerById(data.id);
    if (player){
        player.setX(data.x);
        player.setY(data.y);
        player.setHp(data.hp);
    } else {
        localPlayer.setX(data.x);
        localPlayer.setY(data.y);
        localPlayer.setHp(data.hp);

    }
}
/* Takes an arrows x and y position and draws it : D */
function onArrowFired(data){
    console.log("MADE AN ARROW");
  var m = new BowmanArrow(data.x, data.y, data.caster);
  Spells.spellsarray.push(m);
};
function onWin(data){
  if (data.winner == 0){
      console.log("team 0 wins");
 } else {
      console.log("team 1 wins");
  }
};

function onShrineHp(data){
  shrine_0.setHp(data.zero);
  shrine_1.setHp(data.one);
};
function onSetHp(data){

  localPlayer.setHp(data.hp);
};
function onSetGold(data){
  localPlayer.setGold(data.gold);
};
function onPortToArena(data){
  console.log("porting you to arena number " + data.number);
  /* Remove all players not in the arena from your thing*/
};
function onArenaPrompt(data){
  //make button appear for confirmation to join arena
  _alert = { time: Date.now(), type:  "arena"}; 
};
function onUpdateHostile(data){
  var _h;
  /*
     if (!hostileById(data.id)){ // then create
     console.log("creating hotile of type: "+ data.characterType);
     if (data.characterType === "Skelly"){
     _h = new Skelly(data.x, data.y, data.id);
     hostiles.push(_h);
     }

     } else {// just update
     _h = hostileById(data.id);
     _h.setHp(data.hp);
     _h.setX(data.x);
     _h.setY(data.y);
     }*/
};


function onDescendAttackChanges(data){
    var _player = playerById(data.id); 
    if (_player === undefined){

    }else {
        _player.setDescendAttack(data.descendAttack);
    }
};
function onMeteorCast(data){
  var m = new Meteor(data.meteor_x, data.caster);
  Spells.spellsarray.push(m);
};
function onHealingSpikeCast(data){
  var m = new HealingSpike(data._x, data.caster);
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
  remotePlayers = [];
};

// New player
function onNewPlayer(data) {
  // Initialise the new player
    console.log("New player connected " + data.characterType);
  if (data.characterType === "Fly"){
    var newPlayer = new Fly(data.x, data.y, data.hp, data.name);
  } else if (data.characterType === "Redhatter") {
    var newPlayer = new Redhatter(data.x, data.y, data.hp, data.name);
  } else if (data.characterType === "Bowman") {
    var newPlayer = new Bowman(data.x, data.y, data.hp, data.name);
  } else if (data.characterType === "Shanker") {
    var newPlayer = new Shanker(data.x, data.y, data.hp, data.name);
  } else if (data.characterType === "Crevice") {
    var newPlayer = new Crevice(data.x, data.y, data.hp, data.name);
  }
  console.log("setting team to " + data.team);
  newPlayer.setTeam(data.team);
  newPlayer.id = data.id;
  // Add new player to the remote players array
  remotePlayers.push(newPlayer);

};


function onRemovePlayer(data) {
  var removePlayer = playerById(data.id);
  // Player not found
  if (!removePlayer) {
    return;
  };
  // Remove player from array
  remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
};


/* Should only be able to do this on yourself */
function onRespawnPlayer(data) {
  var respawnPlayer = playerById(data.id);
  if (respawnPlayer == false) {
    respawnPlayer = localPlayer;
  } else { 

  }
  respawnPlayer.respawn();
};

var FPS = 60;

/**************************************************
 ** GAME ANIMATION LOOP
 **************************************************/
function animate() { 
  window.requestAnimFrame(animate); //palce this before render to ensure as close to wanted fps
  update();
  draw();
};


/**************************************************
 ** GAME UPDATE
 **************************************************/

var oldTime = Date.now();
var newTime = Date.now();
var updateTime = 50;
function update() {
  /* Updates the spells locations :D */
  for (i = 0; i < Spells.spellsarray.length; i++){
    Spells.spellsarray[i].update();
  };

  localPlayer.update(keys);
};


/**************************************************
 ** GAME DRAW
 **************************************************/
function draw() {
  // Wipe the canvas clean
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  utility_ctx.clearRect(0, 0, utilityCanvas.width, utilityCanvas.height);
  action_ctx.clearRect(0,0, actionBarCanvas.width, actionBarCanvas.height);
    drawBackground();
  //draw shrine here i think
  shrine_0.draw();
  shrine_1.draw();

  var i;
  for (i = 0; i < remotePlayers.length; i++) {
    /* Inefficient implementation, lazy yolo*/
      remotePlayers[i].draw(ctx);
      remotePlayers[i].updateVariables();
  }
  for (i = 0; i < Spells.spellsarray.length; i++){
    Spells.spellsarray[i].draw(ctx)
  };
  localPlayer.updateVariables();
  localPlayer.draw(ctx);
  drawRightCanvas();
  drawAction();
  drawForeground();
};
function drawAction(){
  action_ctx.fillStyle="red";
  action_ctx.font="20px sans-serif";
  if (Date.now() - localPlayer.meteor < m_cd ){
    var maths = Math.round(((Date.now() - localPlayer.meteor )*actionBarCanvas.height)/ m_cd);
    action_ctx.fillRect(0, maths, 10, actionBarCanvas.height);
  } else {
  }
};

function drawRightCanvas(){
  utility_ctx.save();
  utility_ctx.fillStyle="#CCC";
  utility_ctx.font="bold 13px sans-serif";
  utility_ctx.drawImage(goldCoins, 200, 280);
  utility_ctx.fillText(localPlayer.getGold(), 180, 300);
  utility_ctx.restore();
};
var z = 0;
var _anim = 0;
var cloud_x = 0;
function drawForeground(){
  for (var _i = 0; _i < bloods.length; _i++){
    bloods[_i].draw();
  }

}
function drawBackground(){
          ctx.shadowBlur=20;
                ctx.shadowColor="black";
  cloud_x+=.01;
  var displacement = drawX-localPlayer.getX() +700;
  //drawX is not changing aaah
  var count = "Players: " + (remotePlayers.length + 1);
  ctx.fillText(count, 40,10);
  for (var _i = 0; _i < 7; _i ++){
    ctx.drawImage(ground ,0,0, 400, 100, displacement+1600 +400*_i,400, 400, 100);
  } 
  for (var _i = 0; _i < 9; _i++){
    ctx.drawImage(cobbleStone, 0,0, 300, 100, displacement-1100 +_i*300, 405, 300, 100); 
  }
  ctx.drawImage(cloud, displacement+cloud_x-800, 80);
  ctx.drawImage(cloud, displacement+cloud_x-1200, 200);
  ctx.drawImage(cloud, displacement+cloud_x-400, 150);
  ctx.drawImage(cloud, displacement+cloud_x, 50);
  ctx.drawImage(cloud, displacement+cloud_x+300, 20);
  ctx.drawImage(cloud, displacement+cloud_x+1300, 120);
  ctx.drawImage(cloud, displacement+cloud_x+900, 50);
  ctx.drawImage(cloud, displacement+cloud_x+1600, 90);
  ctx.drawImage(cloud, displacement+cloud_x+1900, 20);
  ctx.drawImage(cloud, displacement+cloud_x+2000, 150);
  ctx.drawImage(cloud, displacement+cloud_x+2500, 80);
  ctx.drawImage(cloud, displacement+cloud_x+3000, 200);
  ctx.drawImage(cloud, displacement+cloud_x+3500, 150);
  ctx.drawImage(cloud, displacement+cloud_x+4000, 50);
  ctx.drawImage(cloud, displacement+cloud_x+5000, 20);
  //  ctx.drawImage(burningBuildingSide, 0,0, z, 0, displacement, 100,100,100)
//  ctx.drawImage(CastleOfOne, displacement-100,95, 1000, 398);
  if (_anim %20 == 0){ 
    z+=100;
    if (z >= 400){
      z =0;
    }
  }
  ctx.drawImage(castleLeft, 0, 0, 100, 100, displacement+1100, 293, 200, 200);
  ctx.drawImage(burningBuildingSide, z,0,100,100, displacement+1300, 293, 200, 200);
  _anim++;
          ctx.shadowBlur=0;
                ctx.shadowColor="";
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
function onInitMe(data){
  localPlayer.setTeam(data.team);
  localPlayer.setX(data.x);
};
function hostileById(id) {
  var i;
  for (i = 0; i < hostiles.length; i++) {
    if (hostiles[i].id == id)
      return hostiles[i];
  };
  return false;
};
