var canvas,     // Canvas DOM element
    ctx,      // Canvas rendering context
    keys,     // Keyboard input
    localPlayer,  // Local player
    remotePlayers,  // Remote players
    socket,
    _alert;     // Socket connection

bloods = [];

var floorHeight = 474;
// variable that tracks how much the player has moved, everything is drawn

function init() {

  console.log("MAIN MADe");
  background = new Background();
  console.log("Madea background");
  MAIN.stage.addChild(background)



  shrine_0 = new Shrine(0);
  shrine_1 = new Shrine(1);
  // Declare the canvas and rendering context
  canvas = document.getElementsByTagName("canvas")[0];
  
  ctx = canvas.getContext("2d");
  canvas1 = document.getElementsByTagName("canvas")[1];

  //disable right click default behavior
  canvas1.oncontextmenu = function(e){ return false; };
  var clientRect;
  var adjustedX, adjustedY;
  canvas1.onmousedown = function(e){
    switch (e.which) {
      case 1: 
        clientRect = ctx.canvas.getBoundingClientRect();
        adjustedX = localPlayer.getDrawAtX() -canvas1.width/2; 

        adjustedX += (e.clientX - clientRect.left); 

        adjustedY += e.clientY - clientRect.topy;
        localPlayer.leftClick(adjustedX, adjustedY);  
        break;
      case 2: 
        console.log('middle click'); 
        break;
      case 3: 
        clientRect = ctx.canvas.getBoundingClientRect();
        adjustedX = localPlayer.getDrawAtX() -canvas1.width/2; 
        adjustedX += (e.clientX - clientRect.left); //should work without the 100...but 100 makes it work :l

        adjustedY += e.clientY - clientRect.topy;
        localPlayer.rightClick(adjustedX, adjustedY); 
        break; 
    }
  };

  // Initialise keyboard controls
  keys = new Keys();

  var startX =0,
      startY = floorHeight-10,
      startHp = 100;

  // Initialise the local player
  if (characterType === "Redhatter"){
    localPlayer = new Redhatter(localPlayerName);
  } else if (characterType === "Fly"){
    localPlayer = new Fly(localPlayerName);
  } else if (characterType === "Bowman"){
    localPlayer = new Bowman(localPlayerName);
  } else if (characterType === "Shanker"){
    localPlayer = new Shanker(localPlayerName);
  } else if (characterType === "Crevice"){
    localPlayer = new Crevice(localPlayerName);
  } else if (characterType === "Grimes"){
    localPlayer = new Grimes(localPlayerName);
  } else {
    //something has went wrong
    window.location.assign('/profile');
  }
  // Initialise socket connection
  var host = location.origin;
  socket = io.connect(host, {port: PORT, transports: ["websocket"]});
  remotePlayers = [];
  setEventHandlers();
  socket.emit("init me");
  animate();
  loadChat();


}


/**************************************************
 ** GAME EVENT HANDLERS
 **************************************************/
var setEventHandlers = function() {
  window.addEventListener("keydown", onKeydown, false);
  window.addEventListener("keyup", onKeyup, false);
  window.addEventListener('blur', function() {
    //socket.disconnect();
  },false);
  window.addEventListener('focus', function() {
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
  socket.on("bleed", onBleed);
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
  socket.on("tort stun", onTortStun);
};
function onTortStun(data){
	var m = new TortStun(data.x, data.y, data.caster);
	Spells.spellsarray.push(m);
}

/* Updates location of all connected players*/

function onUpdatePlayer(data){
    var player = playerById(data.id);
    if (player){
        player.setX(data.x);
        player.setY(data.y);
        player.setHp(data.hp);
        player.setTeam(data.team);
    } else {
        localPlayer.setX(data.x);
        localPlayer.setY(data.y);
        localPlayer.setHp(data.hp);
        localPlayer.setTeam(data.team);

    }
}
function onBleed(data){
    var _player = playerById(data.id);
    if (_player === false){
        localPlayer.bleed();
    } else {
        _player.bleed();
    }
  
}
/* Takes an arrows x and y position and draws it : D */
function onArrowFired(data){
  var m = new BowmanArrow(data.x, data.y, data.caster);
  Spells.spellsarray.push(m);
};

function onWin(data){
  if (data.winner === 0){
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
		console.log("d a changes" + data.id + "for player " +_player + " DA " + data.descendAttack); 
    if (_player === false){
        localPlayer.setDescendAttack(data.descendAttack);
    } else {
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
  socket.emit("new player", {name: localPlayer.getName(), characterType: localPlayer.getCharacterType()});
};

// Socket disconnected
function onSocketDisconnect() {
  //Player disconnected from socket server
  remotePlayers = [];
};

// New player
function onNewPlayer(data) {
  // Initialise the new player
  var newPlayer;
  console.log(data.characterType);
  if (data.characterType === "Fly"){
    newPlayer = new Fly(data.name, data.x, data.y, data.hp);
  } else if (data.characterType === "Redhatter") {
    newPlayer = new Redhatter(data.name, data.x, data.y, data.hp);
  } else if (data.characterType === "Bowman") {
    newPlayer = new Bowman(data.name, data.x, data.y, data.hp);
  } else if (data.characterType === "Shanker") {
    newPlayer = new Shanker(data.name, data.x, data.y, data.hp);
  } else if (data.characterType === "Crevice") {
    newPlayer = new Crevice(data.name, data.x, data.y, data.hp);
  }else if (data.characterType === "Grimes") {
    newPlayer = new Grimes(data.name, data.x, data.y, data.hp);
  }
  console.log("ID "+data.id);
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
  if (respawnPlayer === false) {
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

 // console.log(" -->>" +background);
};


/**************************************************
 ** GAME UPDATE
 **************************************************/
var oldTime = Date.now();
var newTime = Date.now();
var updateTime = 50;
function update() {
    background.updateX(localPlayer.getDrawAtX() );
  /* Updates the spells locations :D */
  for (i = 0; i < Spells.spellsarray.length; i++){
    Spells.spellsarray[i].update();
  };
  for (i = 0; i < remotePlayers.length; i++) {
    /* Inefficient implementation, lazy yolo*/
    remotePlayers[i].updateVariables();
  };

  localPlayer.update(keys);
};


/**************************************************
 ** GAME DRAW
 **************************************************/
function draw() {
  // Wipe the canvas clean
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
  //draw shrine here i think
  shrine_0.draw();
  shrine_1.draw();

  var i;

  for (i = 0; i < Spells.spellsarray.length; i++){
    Spells.spellsarray[i].draw(ctx)
  };
      for (i = 0; i < remotePlayers.length; i++) {
    /* Inefficient implementation, lazy yolo*/
      remotePlayers[i].draw(ctx);
  };
  localPlayer.updateVariables();
  localPlayer.draw(ctx);
  drawForeground();
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
  cloud_x+= 0.01;
  var displacement = -localPlayer.getDrawAtX();

  var count = "Players: " + (remotePlayers.length + 1);
  ctx.fillText(count, 40,10);
  var _i;
  for (_i = 0; _i < 7; _i ++){
    ctx.drawImage(ground ,0,0, 400, 100, displacement+3000 +400*_i,400, 400, 100);
  } 
  for (_i = 0; _i < 9; _i++){
    ctx.drawImage(cobbleStone, 0,0, 300, 100, displacement+300 +_i*300, 405, 300, 100); 
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
  if (_anim %20 === 0){ 
    z+=100;
    if (z >= 400){
      z =0;
    }
  }
//  ctx.drawImage(castleLeft, 0, 0, 100, 100, displacement+2300, 290, 200, 200);
//  ctx.drawImage(burningBuildingSide, z,0,100,100, displacement+2500, 290, 200, 200);
  _anim++;
  ctx.shadowBlur=0;
  ctx.shadowColor="";
 ctx.fillRect(4000-localPlayer.getDrawAtX() +canvas.width/2,0, 500,500);
 ctx.fillRect(1000-localPlayer.getDrawAtX() -canvas.width/2-200,0, 1000,500);
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
