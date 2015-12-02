var canvas, // Canvas DOM element
    ctx, // Canvas rendering context
    keys, // Keyboard input
    localPlayer, // Local player
    remotePlayers, // Remote players
    socket,
    _alert, // Socket connection
    localGame;



var MAIN;

function Game() {
    this.bloods = [];
    this.attack_collisions = {};
    this.platforms = [];
    //move over to using this screen manager
    MAIN = new ScreenManager(); //should init after images are loaded
    var team_one_kills;
    var team_zero_kills;
    var team_zero_kills_text = new PIXI.Text("0");
    var team_one_kills_text = new PIXI.Text("0");

    team_zero_kills_text.style.font = "bold 20px arial";
    team_zero_kills_text.style.align = "center";
    team_one_kills_text.style.font = "bold 20px arial";
    team_one_kills_text.style.align = "center";

    team_one_kills_text.x = CONFIG.SCREEN_WIDTH - 35;
    team_zero_kills_text.x = 20;
    MAIN.stage.addChild(team_one_kills_text);
    MAIN.stage.addChild(team_zero_kills_text);


    this.setTeamOneKills= function(kills){
        team_one_kills = kills;
        team_one_kills_text.text = kills;
    }
   this.setTeamZeroKills = function(kills){
        team_zero_kills = kills;
        team_zero_kills_text.text = kills;
   }
};




// variable that tracks how much the player has moved, everything is drawn
Game.prototype.init = function() {
    background = new Background();
    MAIN.stage.addChild(background)
    canvas1 = document.getElementsByTagName("canvas")[0];
    ctx = canvas1.getContext("webgl");
    /*
    var line = new PIXI.Graphics();
    line.beginFill(0x000000);
    line.drawRect(CONFIG.SCREEN_WIDTH / 2 - 1, 300, 2, 200);
    line.endFill();
    MAIN.stage.addChild(line);
    */

    canvas1.oncontextmenu = function(e) {
        return false;
    };
    var clientRect;
    var adjustedX, adjustedY;
    canvas1.onmousedown = function(e) {
        console.log("OKE" + e.which);
        switch (e.which) {
            case 1:
                clientRect = canvas1.getBoundingClientRect();
                adjustedX = localPlayer.getDrawAtX() - CONFIG.SCREEN_WIDTH / 2;
                adjustedX += (e.clientX - clientRect.left);
                adjustedY += e.clientY - clientRect.topy;
                localPlayer.leftClick(adjustedX, adjustedY);
                break;
            case 2:
                console.log('middle click');
                break;
            case 3:
                clientRect = canvas1.getBoundingClientRect();
                console.log("IDIOTS");
                adjustedX = localPlayer.getDrawAtX() - CONFIG.SCREEN_WIDTH / 2;
                adjustedX += (e.clientX - clientRect.left);
                adjustedY += e.clientY - clientRect.topy;
                localPlayer.rightClick(adjustedX, adjustedY);
                break;
        }
    };
    // Initialise keyboard controls
    keys = new Keys();
    var startX = 0,
        startY = CONFIG.FLOOR_HEIGHT - 10,
        startHp = 100;
    // Initialise the local player
    if (characterType === "Redhatter") {
        localPlayer = new Redhatter(localPlayerName);
    } else if (characterType === "Fly") {
        localPlayer = new Fly(localPlayerName);
    } else if (characterType === "Bowman") {
        localPlayer = new Bowman(localPlayerName);
    } else if (characterType === "Shanker") {
        localPlayer = new Shanker(localPlayerName);
    } else if (characterType === "Crevice") {
        localPlayer = new Crevice(localPlayerName);
    } else if (characterType === "Grimes") {
        localPlayer = new Grimes(localPlayerName);
    } else {
        //something has went wrong
        window.location.assign('/profile');
    }
    localPlayer.imageContainer.zIndex = 5;
    // Initialise socket connection
    var host = location.origin;
    socket = io.connect(host, {
        port: PORT,
        transports: ["websocket"]
    });
    remotePlayers = [];
    setEventHandlers();
    animate();
    loadChat();
    localPlayer.setUpActionbar();

    for (var i = 0; i < 5; i++){
        localGame.platforms.push(new Platform(1000 + CONFIG.ARENA_WIDTH/10 + i * (CONFIG.ARENA_WIDTH)/5, 335));
    }
/*    for (var j = 0; j < 3; j++){
        localGame.platforms.push(new Platform(1000 + CONFIG.ARENA_WIDTH/6 + j * (CONFIG.ARENA_WIDTH)/3, 235));
    }*/
       for (var i = 0; i < 4; i++){
        localGame.platforms.push(new Platform(1000 + CONFIG.ARENA_WIDTH/8 + i * (CONFIG.ARENA_WIDTH)/4, 235));
    }
    for (var i = 0; i < 3; i++){
        localGame.platforms.push(new Platform(1000 + CONFIG.ARENA_WIDTH/6 + i * (CONFIG.ARENA_WIDTH)/3, 135));
    }

    if (CONFIG.SHOW_HITBOXES){
    setInterval(helpers.highlightPlayerHitboxes, 200);
    }
}
/**************************************************
 ** GAME EVENT HANDLERS
 **************************************************/
var setEventHandlers = function() {
    window.addEventListener("keydown", onKeydown, false);
    window.addEventListener("keyup", onKeyup, false);
    window.addEventListener('blur', function() {}, false);
    window.addEventListener('focus', function() {
        //usually when they tab in
        keys = new Keys();
    }, false);

    socket.on("connect", onSocketConnected);
    socket.on("disconnect", onSocketDisconnect);
    socket.on("new player", onNewPlayer);
    socket.on("remove player", onRemovePlayer);
//    socket.on("bleed", onBleed);
    socket.on("arrow fired", onArrowFired);
    socket.on("healing spike cast", onHealingSpikeCast);
    socket.on("respawn player", onRespawnPlayer);
    socket.on("descend attack changes", onDescendAttackChanges);
    socket.on("update hostile", onUpdateHostile);
    socket.on("arena confirmation", onArenaPrompt);
    socket.on("set gold", onSetGold);
    socket.on("set hp", onSetHp);
    socket.on("init me", onInitMe);
    socket.on("win", onWin);
    socket.on("update player", onUpdatePlayer);
    socket.on("spell one", onSpellOne);
    socket.on("draw hitmarker", onDrawHitmarker);
    socket.on("meelee attack", onMeeleeAttack);
    socket.on("visible again", onVisibleAgain);
    socket.on("spell two", onSpellTwo);
    socket.on("update team killcount", onUpdateTeamKillcount);
};
function onUpdateTeamKillcount(data){
    localGame.setTeamZeroKills(data.team_zero_kills);
        localGame.setTeamOneKills(data.team_one_kills)

};
function onSpellTwo(data) {
    console.log("SPELL TWO COMES BAKK");
    switch (data.spell) {
        case "rhrange":
        console.log("RHRANGE CASTED AT " + data.x + ", " + data.y);
        var v = new RHRange(data.x, data.y, data.direction);
        v.attack_id = data.attack_id;

        Spells.spellsarray.push(v);
        if (data.caster === "you") {
          //  localPlayer.displayCooldown(3, 700);
        }
    }
};

function onVisibleAgain(data) {
    var player;
    if (data.id == "you") {
        player = localPlayer;
    } else {
        player = helpers.playerById(data.id);
    }
    if (player.getTeam() === localPlayer.getTeam()) {
        player.imageContainer.alpha = 1;
    } else {
        player.setInvis(false);
    }
};
//receives an _x and _y var of where to draw
function onDrawHitmarker(data) {
    /*
            console.log("DRAING AT " +data.x);
      var sprite = new PIXI.Sprite.fromFrame("hitmarker.fw.png");
      sprite.x = data.x - localPlayer.getX() + CONFIG.SCREEN_WIDTH/2;
      sprite.y = data.y-10;
      MAIN.stage.addChild(sprite);
      setTimeout( function(){
        MAIN.stage.removeChild(sprite);
      }, 500);
    */
}
/* Useful for animation, that's it*/
function onMeeleeAttack(data) {
    var player;
    player = helpers.playerById(data.attacker);
    console.log(data.attack_id + "~~~<--" + player);
    if (!player) {
        console.log("NO NOOO");
        player = localPlayer;
        //localPlayer.displayCooldown(1, 1000);
    }
    console.log("player is " + player.getCharacterType());
    player.setMeeleeAttack(true, data.attack_id, data.direction);
}
/* Yay a function : D
 * When a user says a spell hit, it should incrememnt the number of users that
 * said that the hit went through.
 * gotta make sure one user can only say it once . :D : D :D : D
 */
function onSpellOne(data) {
    console.log('MAKING DAT spell 1 BRO');
    var cd;
    if (data.spell === "tort stun") { //should be a variable shared between server and client
        var m = new TortStun(data.x, data.y, data.caster);
        m.attack_id = data.attack_id;
        Spells.spellsarray.push(m);
        cd = 3000;
    } else if (data.spell === "meteor") {
        console.log("NEW METEOR LOL" + data.attack_id);
        var m = new Meteor(data.x, data.caster);
        m.attack_id = data.attack_id;
        m.setTeam(data.team);
        Spells.spellsarray.push(m);
        cd = 6000;
    }
    if (data.spell === "windwalk") {
        cd = 6000;
        console.log("windwalking");
        var player;
        console.log(" ~ >" + data.id);
        if (data.id === "you") {
            player = localPlayer;
        } else {
            player = helpers.playerById(data.id);
        }
        if (player.getTeam() == localPlayer.getTeam()) {
            player.imageContainer.alpha = .5;
        } else {
            player.windWalk();
        };
    }
    console.log(data.id);
    console.log(data.casted_by_me || data.id === "you");
    //if cast by this player then show the cooldown
    if (data.casted_by_me || data.id == "you") {
        console.log("MAN IDK");
        localPlayer.displayCooldown(2, cd);
    }
}
/* Updates location of all connected players*/
function onUpdatePlayer(data) {
    var player = helpers.playerById(data.id);
    if (!player) {
        player = localPlayer;
    }
    player.setX(data.x);
    player.setY(data.y);
    player.setHp(data.hp);
    player.setTeam(data.team);
    player.coordinateList.push({
        x: data.x,
        y: data.y
    });
}

/*function onBleed(data) {
    var _player = helpers.playerById(data.id);
    if (_player === false) {
        localPlayer.bleed();
    } else {
        _player.bleed();
    }
}*/
/* Takes an arrows x and y position and draws it : D */
function onArrowFired(data) {
    var m = new BowmanArrow(data.x, data.y, data.caster);
    Spells.spellsarray.push(m);
};

function onWin(data) {
    console.log("local player team " + localPlayer.getTeam());
    var filter = new PIXI.filters.DotScreenFilter();
    MAIN.stage.filters = [filter];
    if (data.winner === localPlayer.getTeam()) {
        var message = new PIXI.Text("YOU WIN!", {
            font: "32px sans-serif",
            fill: "white",
            align: "center"
        });
    } else {
        var message = new PIXI.Text("YOU LOSE!", {
            font: "32px sans-serif",
            fill: "white",
            align: "center"
        });
    }
    message.position.set(CONFIG.SCREEN_WIDTH / 2, 200);
    MAIN.stage.addChild(message);
    setTimeout(function() {
        MAIN.stage.removeChild(message);
        MAIN.stage.filters = undefined;
    }, 5000);
};

function onSetHp(data) {
    localPlayer.setHp(data.hp);
};

function onSetGold(data) {
    localPlayer.setGold(data.gold);
};


function onArenaPrompt(data) {
    //make button appear for confirmation to join arena
    _alert = {
        time: Date.now(),
        type: "arena"
    };
};

function onUpdateHostile(data) {
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

function onDescendAttackChanges(data) {
    var _player = helpers.playerById(data.id);
    console.log("AAA");
    if (_player === false) {
        localPlayer.setDescendAttack(data.descendAttack);
        localPlayer.displayCooldown(2, 6000);
    } else {
        _player.setDescendAttack(data.descendAttack);
    }
};

function onHealingSpikeCast(data) {
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
    remotePlayers = [];
    socket.emit("new player", {
        name: localPlayer.getName(),
        characterType: localPlayer.getCharacterType()
    });
    socket.emit("init me");

};
// Socket disconnected
function onSocketDisconnect() {
    //Player disconnected from socket server
    console.log("AAA");
    for (var i = 0; i < remotePlayers.length; i++) {
        MAIN.stage.removeChild(remotePlayers[i].imageContainer);
    };
};
// New player
function onNewPlayer(data) {
    // Initialise the new player
    var newPlayer;
    if (data.characterType === "Fly") {
        newPlayer = new Fly(data.name, data.x, data.y, data.hp);
    } else if (data.characterType === "Redhatter") {
        newPlayer = new Redhatter(data.name, data.x, data.y, data.hp);
    } else if (data.characterType === "Bowman") {
        newPlayer = new Bowman(data.name, data.x, data.y, data.hp);
    } else if (data.characterType === "Shanker") {
        newPlayer = new Shanker(data.name, data.x, data.y, data.hp);
    } else if (data.characterType === "Crevice") {
        newPlayer = new Crevice(data.name, data.x, data.y, data.hp);
    } else if (data.characterType === "Grimes") {
        newPlayer = new Grimes(data.name, data.x, data.y, data.hp);
    }
    console.log("ID " + data.id);
    newPlayer.id = data.id;
    newPlayer.imageContainer.zIndex = 5;
    // Add new player to the remote players array
    remotePlayers.push(newPlayer);
    //add mesage to chat
    notify("<strong>" + newPlayer.getName() + "</strong> has joined");

    MAIN.updateLayersOrder();
};

function onRemovePlayer(data) {
    var removePlayer = helpers.playerById(data.id);
    // Player not found
    MAIN.stage.removeChild(removePlayer.imageContainer);
    if (!removePlayer) {
        return;
    };
    // Remove player from array
    remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
    notify("<strong>" + removePlayer.getName() + "</strong> has left");
    if (!remotePlayers.length) {
        notify("Woops! Looks like everyone is gone! Try sending the link to a friend.", true);
    }
};
/* Should only be able to do this on yourself */
function onRespawnPlayer(data) {
    var respawnPlayer = helpers.playerById(data.id) || localPlayer;
    respawnPlayer.respawn();
};

var FPS = 60;
/**************************************************
 ** GAME ANIMATION LOOP
 **************************************************/
function animate() {
    requestAnimationFrame(animate); //this.update.bind(this));
    update();
    draw();
};

function handleCooldownVisuals() {
    var i;
    for (i = 0; i < CONFIG.COOLDOWNS.length; i++) {
        if (CONFIG.COOLDOWNS[i].filter.size.x > .25) {
            CONFIG.COOLDOWNS[i].filter.size.y = CONFIG.COOLDOWNS[i].filter.size.y - (.165 / CONFIG.COOLDOWNS[i].duration) * 1000; // . 18 measna about 1 second
            CONFIG.COOLDOWNS[i].filter.size.x = CONFIG.COOLDOWNS[i].filter.size.x - (.165 / CONFIG.COOLDOWNS[i].duration) * 1000;
        } // else {
        // CONFIG.COOLDOWNS[i].filter.mark_for_deletion = true;
        //  }
    }
    for (i = 0; i < CONFIG.COOLDOWNS.length; i++) {
        if (CONFIG.COOLDOWNS[i].filter.mark_for_deletion) {
            CONFIG.COOLDOWNS[i].parent.filters = undefined;
            CONFIG.COOLDOWNS.splice(i, 1);
            i -= 1;
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
    updatePlatforms();
    handleCooldownVisuals();
    background.updateX(localPlayer.getDrawAtX());
    /* Updates the spells locations :D */
    for (i = 0; i < Spells.spellsarray.length; i++) {
        //checks for collisions
        //updates spell locations
        var allPlayers = remotePlayers.slice();
        allPlayers.push(localPlayer);
        for (var j = 0; j < allPlayers.length; j++) {
            if (helpers.collision(allPlayers[j], Spells.spellsarray[i])) {
                //let the server know the attack landed
                //going to only want to do this once!

                //this is buggy when undefined
                if (localGame.attack_collisions[Spells.spellsarray[i].attack_id]){ //if the attack_id object exists
                    if (localGame.attack_collisions[Spells.spellsarray[i].attack_id].indexOf(allPlayers[j].id) != -1 ){ //if the spell already hit
                    } else { //the object exists but the spell isn't added
                        localGame.attack_collisions[Spells.spellsarray[i].attack_id].push(allPlayers[j].id);
                        console.log(localGame.attack_collisions);
                        console.log("!!1");
                        socket.emit("spell hits", {
                            "hit": allPlayers[j].id,
                            "hit_by": Spells.spellsarray[i].caster,
                            "attack_id": Spells.spellsarray[i].attack_id
                        });

                    }
                } else {
                    console.log("!!2");
                    localGame.attack_collisions[Spells.spellsarray[i].attack_id] = [allPlayers[j].id];
                    console.log(localGame.attack_collisions);
                    socket.emit("spell hits", {
                        "hit": allPlayers[j].id,
                        "hit_by": Spells.spellsarray[i].caster,
                        "attack_id": Spells.spellsarray[i].attack_id
                    });
                };

                console.log("Hits:/t" + allPlayers[j].id + " /t-- caster:\t" + Spells.spellsarray[i].caster);
            }
        }
        Spells.spellsarray[i].update();
    };
    for (i = 0; i < remotePlayers.length; i++) {
        /* Inefficient implementation, lazy yolo*/
        remotePlayers[i].updateVariables();
    };
    localPlayer.update(keys);
    if (CONFIG.SHOW_HITBOXES){
        helpers.highlightSpellHitboxes();

    }
};

var reset_this = true;

var wasOnAPlatform = false;
function updatePlatforms(){
    var onAPlatform;
    for (var i = 0; i < localGame.platforms.length; i++){
        if (localGame.platforms[i].update() === "grounded"){
            onAPlatform = true;
        };

    }
    if (onAPlatform == undefined && wasOnAPlatform){
        reset_this = true;
    };
    //whem you hit the floor emit this once
    if (!onAPlatform && reset_this){
       //  the floor is the land
       console.log("SPAM");
        socket.emit("landed", { y: CONFIG.FLOOR_HEIGHT});
        reset_this = false;
    }
    wasOnAPlatform = onAPlatform;
};
/**************************************************
 ** GAME DRAW
 **************************************************/
function draw() {
    // Wipe the canvas clean
    // drawBackground();
    var i;
    for (i = 0; i < Spells.spellsarray.length; i++) {
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

function drawForeground() {
    for (var _i = 0; _i < localGame.bloods.length; _i++) {
        localGame.bloods[_i].draw();
    }
}

// Find player by ID
function playerById(id) {
    var i;
    for (i = 0; i < remotePlayers.length; i++) {
        if (remotePlayers[i].id == id) return remotePlayers[i];
    };
    return false;
};

function onInitMe(data) {
    localPlayer.setTeam(data.team);
    localPlayer.setX(data.x);
    localPlayer.id = data.id;
    localGame.setTeamOneKills(data.team_one_kills);
    localGame.setTeamZeroKills(data.team_zero_kills);
//    console.log("TEAM 1 " + data.team_one_kills + " TEAM 2 " + data.team_zero_kills + " ID IS " + data.id);
};

function hostileById(id) {
    var i;
    for (i = 0; i < hostiles.length; i++) {
        if (hostiles[i].id == id) return hostiles[i];
    };
    return false;
};

$(document).ready ( function(){
    localGame = new Game();
    console.log("Haebe swags");
});
