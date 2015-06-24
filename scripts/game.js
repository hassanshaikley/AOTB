var canvas,     // Canvas DOM element
    ctx,      // Canvas rendering context
    keys,     // Keyboard input
    localPlayer,  // Local player
    remotePlayers,  // Remote players
    socket,
    _alert;     // Socket connection

bloods = [];




function Game(){};

var floorHeight = 474;
// variable that tracks how much the player has moved, everything is drawn

function init() {

  background = new Background();


  MAIN.stage.addChild(background)

  canvas1 = document.getElementsByTagName("canvas")[0];
  ctx =  canvas1.getContext("webgl");

  shrine_0 = new Shrine(0);
  shrine_1 = new Shrine(1);
  // Declare the canvas and rendering context


  var line = new PIXI.Graphics();
  line.beginFill(0x000000);
  line.drawRect(CONFIG.SCREEN_WIDTH/2-1, 300, 2, 200);
  line.endFill();
  MAIN.stage.addChild(line);

  //disable right click default behavior
  canvas1.oncontextmenu = function(e){ return false; };
  var clientRect;
  var adjustedX, adjustedY;
  canvas1.onmousedown = function(e){
    switch (e.which) {
      case 1:
        clientRect = canvas1.getBoundingClientRect();
        adjustedX = localPlayer.getDrawAtX() -CONFIG.SCREEN_WIDTH/2;
        adjustedX += (e.clientX - clientRect.left);
        adjustedY += e.clientY - clientRect.topy;
        localPlayer.leftClick(adjustedX, adjustedY);
        break;
      case 2:
        console.log('middle click');
        break;
      case 3:
        clientRect = canvas1.getBoundingClientRect();
        adjustedX = localPlayer.getDrawAtX() -CONFIG.SCREEN_WIDTH/2;
        adjustedX += (e.clientX - clientRect.left);
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
  localPlayer.setUpActionbar();



}

/**************************************************
 ** GAME EVENT HANDLERS
 **************************************************/
var setEventHandlers = function() {
  window.addEventListener("keydown", onKeydown, false);
  window.addEventListener("keyup", onKeyup, false);
  window.addEventListener('blur', function() {
  },false);
  window.addEventListener('focus', function() {
    //usually when they tab in -- I think
  },false);
  socket.on("connect", onSocketConnected);
  socket.on("disconnect", onSocketDisconnect);
  socket.on("new player", onNewPlayer);
  socket.on("remove player", onRemovePlayer);
  socket.on("bleed", onBleed);
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
  socket.on("spell one", onSpellOne);
  socket.on("draw hitmarker", onDrawHitmarker);
  socket.on("meelee attack", onMeeleeAttack);
};

//receives an _x and _y var of where to draw
function onDrawHitmarker(data){
	sprite = new PIXI.Sprite.fromFrame("hitmarker.png");
	console.log("DATA "+ data.x + " " + data.y);
	sprite.x = data.x-18 - localPlayer.getX() + CONFIG.SCREEN_WIDTH/2;
	sprite.y = data.y-18;
	MAIN.stage.addChild(sprite);
	setTimeout( function(){
		MAIN.stage.removeChild(sprite);
	}, 500);
}

/* Useful for animation, that's it*/
function onMeeleeAttack(data){
	console.log("l1 " + localPlayer.getX());
	console.log("l2 " + (localPlayer.getX() - localPlayer.localX() + CONFIG.SCREEN_WIDTH/2));
  var player;
  if (data.attacker === "you"){
    player = localPlayer;
  } else{
    player = playerById(data.attacker);
  }
  player.setMeeleeAttack(true);

}

function onSpellOne(data){
  if (data.spell === "tort stun"){ //should be a variable shared between server and client
	  var m = new TortStun(data.x, data.y, data.caster);
	  Spells.spellsarray.push(m);
  } else if (data.spell === "meteor"){
    var m = new Meteor(data.x, data.caster);
    Spells.spellsarray.push(m);
  }

  //if cast by this player then show the cooldown
  if (data.casted_by_me){
    localPlayer.displayCooldown(CONFIG.FIRST_SPELL);
  }
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
  console.log("ARROW EVENT FIRED OK");
  var m = new BowmanArrow(data.x, data.y, data.caster);
  Spells.spellsarray.push(m);
};


function onWin(data){
  console.log("winner: " +data.winner);
  console.log("local player team " +localPlayer.getTeam());
  var filter = new PIXI.filters.DotScreenFilter();

 MAIN.stage.filters = [filter];

  if (data.winner === localPlayer.getTeam()){
      console.log("YOU WIN");
      var message = new PIXI.Text(
      "YOU WIN!",
      {font: "32px sans-serif", fill: "white", align: "center"}
    );
 } else {
      console.log("YOU LOSE");
      var message = new PIXI.Text(
      "YOU LOSE!",
      {font: "32px sans-serif", fill: "white", align: "center"}
    );

  }

  message.position.set(CONFIG.SCREEN_WIDTH/2, 200);
  MAIN.stage.addChild(message);
  setTimeout(function(){
    MAIN.stage.removeChild(message);
    MAIN.stage.filters = undefined;
  }, 5000);
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
    if (_player === false){
        localPlayer.setDescendAttack(data.descendAttack);
    } else {
        _player.setDescendAttack(data.descendAttack);
    }
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
  console.log("Player Disconnected");
};

// New player
function onNewPlayer(data) {
  // Initialise the new player
  var newPlayer;
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
    MAIN.stage.removeChild(removePlayer.imageContainer);

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
  requestAnimationFrame(animate);//this.update.bind(this));
  update();
  draw();

};

function handleCooldownVisuals(){
  var i;
  for ( i = 0; i < CONFIG.COOLDOWNS.length; i++ ){
    if (CONFIG.COOLDOWNS[i].filter.size.x > .25){
      CONFIG.COOLDOWNS[i].filter.size.y = CONFIG.COOLDOWNS[i].filter.size.y - .18;
      CONFIG.COOLDOWNS[i].filter.size.x = CONFIG.COOLDOWNS[i].filter.size.x -.18;
    } else {
      CONFIG.COOLDOWNS[i].filter.mark_for_deletion = true;
    }
  }

  for ( i = 0; i < CONFIG.COOLDOWNS.length; i++ ){
    if (CONFIG.COOLDOWNS[i].filter.mark_for_deletion){
      CONFIG.COOLDOWNS[i].parent.filters = undefined;
      CONFIG.COOLDOWNS.splice(i, 1);
      i-=1;
    }
  }
}

/**************************************************
 ** GAME UPDATE
 **************************************************/
var oldTime = Date.now();
var newTime = Date.now();
var updateTime = 50;
function update() {

  handleCooldownVisuals();
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
   // drawBackground();
  //draw shrine here i think
  shrine_0.draw();
  shrine_1.draw();

  var i;

  for (i = 0; i < Spells.spellsarray.length; i++){
    Spells.spellsarray[i].draw();
  };
  for (i = 0; i < remotePlayers.length; i++) {
    remotePlayers[i].draw();
  };
  localPlayer.updateVariables();
  localPlayer.draw();
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

// Browser window resize

function onResize(e) {
  // Maximise the canvas
  //canvas.width = 800;
  //canvas.height = 500;
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
