var canvas, // Canvas DOM element
    ctx, // Canvas rendering context
    keys, // Keyboard input
    localPlayer, // Local player
    remotePlayers, // Remote players
    socket,
    _alert, // Socket connection
    localGame;
var MAIN;
LATENCY = 100;
var FPS = 60;
var fps = {
    startTime : 0,
    frameNumber : 0,
    getFPS : function(){
	this.frameNumber++;
	var d = new Date().getTime(),
	    currentTime = ( d - this.startTime ) / 1000,
	    result = Math.floor( ( this.frameNumber / currentTime ) );
	if( currentTime > 1 ){
	    this.startTime = new Date().getTime();
            this.frameNumber = 0;
	}
	return result;
    }
};

function Game() {
    this.bloods = [];
    this.attack_collisions = {};
    this.platforms = [];
    //move over to using this screen manager
    MAIN = new ScreenManager(); //should init after images are loaded

    var team_one_kills;
    var team_zero_kills;
    var team_zero_kills_text = new PIXI.Text("0/20 kils");
    var team_one_kills_text = new PIXI.Text("0/20 kills");

    team_zero_kills_text.style.font = "bold 20px arial";
    team_zero_kills_text.style.align = "center";
    team_zero_kills_text.style.fill =  "white";

    team_one_kills_text.style.font = "bold 20px arial";
    team_one_kills_text.style.align = "center";
    team_one_kills_text.style.fill =  "white"; //not shoring

    team_one_kills_text.x = CONFIG.SCREEN_WIDTH - 110;
    team_zero_kills_text.x = 20;
    MAIN.stage.addChild(team_one_kills_text);
    MAIN.stage.addChild(team_zero_kills_text);
    this.setTeamOneKills = function(kills) {
        team_one_kills = kills;
        team_one_kills_text.text = kills +"/20 kills";
    };
    this.setTeamZeroKills = function(kills) {
        team_zero_kills = kills;
        team_zero_kills_text.text = kills +"/20 kills";
    };

};
// variable that tracks how much the player has moved, everything is drawn
Game.prototype.init = function() {
    scene = new PIXI.Sprite(PIXI.Texture.fromImage("desert_v1.fw.png"));
    var filter = new PIXI.filters.BloomFilter();
    MAIN.stage.addChildAt(scene, 1);
    //    scene.filters = [filter];
    scene.y = -1000;


    background = new Background();
    MAIN.stage.addChild(background);
    canvas1 = document.getElementsByTagName("canvas")[0];
    ctx = canvas1.getContext("webgl");
    /*
     for (var i = 0; i < 5; i++) {
     localGame.platforms.push(new Platform(1000 + CONFIG.ARENA_WIDTH / 10 + i * (CONFIG.ARENA_WIDTH) / 5, 335));
     }

     for (i = 0; i < 4; i++) {
     localGame.platforms.push(new Platform(1000 + CONFIG.ARENA_WIDTH / 8 + i * (CONFIG.ARENA_WIDTH) / 4, 235));
     }
     for (i = 0; i < 3; i++) {
     localGame.platforms.push(new Platform(1000 + CONFIG.ARENA_WIDTH / 6 + i * (CONFIG.ARENA_WIDTH) / 3, 135));
     }
     */

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
    var adjustedX=0, adjustedY=0;
    canvas1.onmousedown = function(e) {
        adjustedY = 0, adjustedX = 0;
        switch (e.which) {
        case 1:
            clientRect = canvas1.getBoundingClientRect();
            adjustedX = localPlayer.getDrawAtX() - CONFIG.SCREEN_WIDTH / 2;
            adjustedX += e.clientY - parseInt(clientRect.left);
            adjustedY += e.clientY - parseInt(clientRect.top);
            localPlayer.leftClick(adjustedX, adjustedY);
            break;
        case 2:
            break;
        case 3:
            clientRect = canvas1.getBoundingClientRect();
            adjustedX = localPlayer.getDrawAtX() - CONFIG.SCREEN_WIDTH / 2;
            adjustedX += (e.clientX - parseInt(clientRect.left));
            adjustedY += e.clientY - parseInt(clientRect.top);
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
        localPlayer = new Redhatter(localPlayerName, 0, 0);
    } else if (characterType === "Fly") {
        localPlayer = new Fly(localPlayerName, 0, 0);
    } else if (characterType === "Bowman") {
        localPlayer = new Bowman(localPlayerName, 0, 0);
    } else if (characterType === "Shanker") {
        localPlayer = new Shanker(localPlayerName, 0, 0);
    } else if (characterType === "Crevice") {
        localPlayer = new Crevice(localPlayerName, 0, 0);
    } else if (characterType === "Grimes") {
        localPlayer = new Grimes(localPlayerName, 0, 0);
    } else if (characterType === "Dino") {
        localPlayer = new Dino(localPlayerName, 0, 0);
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
    loadChat();
    localPlayer.setUpActionbar();

    if (CONFIG.SHOW_HITBOXES) {
        setInterval(helpers.highlightPlayerHitboxes, 200);
    }

    var actionbar_component = new ActionbarComponent(localPlayer);

};
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
        for (var i = 0; i < remotePlayers.length; i++){
            remotePlayers[i].coordinateList = [];
        }
        localPlayer.coordinateList = [];
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

function onUpdateTeamKillcount(data) {
    localGame.setTeamZeroKills(data.team_zero_kills);
    localGame.setTeamOneKills(data.team_one_kills);
};

function onSpellTwo(data) {
    switch (data.spell) {
    case "rhrange":
        var v = new RHRange(data.x, data.y, data.direction);
        v.attack_id = data.attack_id;
        Spells.spellsarray.push(v);
        break;
    case "fly grab":
        //what... lol, why local player? so confusing hassan so shit code
        localPlayer.spellCD(2);
        break;
    case "shanker bomb":
        var v = new ShankerBomb(data.x, data.y, data.direction);
        v.attack_id = data.attack_id;
        Spells.spellsarray.push(v);
        break;

    }
    console.log("Yas spell two " + data.caster);
    if (data.caster === "you") {
        localPlayer.spellCD(2);
    }
};

function onVisibleAgain(data) {
    var player;
    player = helpers.playerById(data.id);

    if (player.getTeam() === localPlayer.getTeam()) {
        player.imageContainer.alpha = 1;
        player.setInvis(false);
    } else {
        player.setInvis(false);
    }
};
//receives an _x and _y var of where to draw
function onDrawHitmarker(data) {
    /*
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
    if (!player) {
        player = localPlayer;
    }
    player.setMeeleeAttack(true, data.attack_id, data.direction);
    if (player == localPlayer){
        localPlayer.spellCD(0);
    }

}
/* Yay a function : D
 * When a user says a spell hit, it should incrememnt the number of users that
 * said that the hit went through.
 * gotta make sure one user can only say it once . :D : D :D : D
 */
function onSpellOne(data) {
    var cd;
    if (data.spell === "tort stun") { //should be a variable shared between server and client
        var m = new TortStun(data.x, data.y, data.caster);
        m.attack_id = data.attack_id;
        Spells.spellsarray.push(m);
    } else if (data.spell === "meteor") {
        var m = new Meteor(data.x, data.caster);
        m.attack_id = data.attack_id;
        m.setTeam(data.team);
        Spells.spellsarray.push(m);
    }
    if (data.spell === "windwalk") {
        var player;
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
    //if cast by this player then show the cooldown
    if (data.casted_by_me || data.id == "you") {
        localPlayer.spellCD(1);
    }
}
/* Updates location of all connected players*/
var back = Date.now();
function onUpdatePlayer(data) {
    var player = helpers.playerById(data.id);

    if (data.id == localPlayer.id) {
        player = localPlayer;
        LATENCY = Date.now() - back;
        back = Date.now();
    }
    if (!player){
        return;
    }
    player.setX(data.x);
    player.setY(data.y);
    player.setHp(data.hp);
    player.setTeam(data.team);
    player.coordinateList.push({
        x: data.x,
        y: data.y,
        latency: LATENCY
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
    var filter = new PIXI.filters.DotScreenFilter();
    MAIN.stage.filters = [filter];
    var message;
    if (data.winner === localPlayer.getTeam()) {
        message = new PIXI.Text("YOU WIN!", {
            font: "bold 40px sans-serif",
            fill: "yellow",
            align: "center"
        });
    } else {
        message = new PIXI.Text("YOU LOSE!", {
            font: "bold 40px sans-serif",
            fill: "yellow",
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
    if (_player === false) {
        localPlayer.setDescendAttack(data.descendAttack);

    } else {
        _player.setDescendAttack(data.descendAttack);
    }
    if (_player == localPlayer){
        if (data.descendAttack){
            localPlayer.spellCD(1);
        }
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
    socket.emit("init me", {referrer: document.referrer, ip: ip });
};
// Socket disconnected
function onSocketDisconnect() {
    //Player disconnected from socket server
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
    } else if (data.characterType === "Dino") {
        newPlayer = new Dino(data.name, data.x, data.y, data.hp);
    }

    newPlayer.setX(0); // ehh this is 2 fix a bug..sry
    newPlayer.id = data.id;
    newPlayer.imageContainer.zIndex = 5;
    // Add new player to the remote players array
    remotePlayers.push(newPlayer);
    //add mesage to chat
    notify("<strong>" + newPlayer.getName() + "</strong> has joined");
    newPlayer.setX(-1000);
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
    beep();
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
function update() {
    FPS = fps.getFPS();

    scene.x  =20 -localPlayer.getX() / 60;

    //    updatePlatforms();
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
                if (Spells.spellsarray[i].inactive){
                    continue;
                }
                //let the server know the attack landed
                //going to only want to do this once!
                //this is buggy when undefined
                if (localGame.attack_collisions[Spells.spellsarray[i].attack_id]) { //if the attack_id object exists
                    if (localGame.attack_collisions[Spells.spellsarray[i].attack_id].indexOf(allPlayers[j].id) != -1) { //if the spell already hit
                    } else { //the object exists but the spell isn't added
                        localGame.attack_collisions[Spells.spellsarray[i].attack_id].push(allPlayers[j].id);
                        socket.emit("spell hits", {
                            "hit": allPlayers[j].id,
                            "hit_by": Spells.spellsarray[i].caster,
                            "attack_id": Spells.spellsarray[i].attack_id
                        });
                    }
                } else {
                    localGame.attack_collisions[Spells.spellsarray[i].attack_id] = [allPlayers[j].id];
                    socket.emit("spell hits", {
                        "hit": allPlayers[j].id,
                        "hit_by": Spells.spellsarray[i].caster,
                        "attack_id": Spells.spellsarray[i].attack_id
                    });
                };
            }
        }
        Spells.spellsarray[i].update();
    };

    for (var m in meelee_attacks){
        meelee_attacks[m].update();
    };

    for (i = 0; i < remotePlayers.length; i++) {
        /* Inefficient implementation, lazy yolo*/
        remotePlayers[i].updateVariables();
    };
    localPlayer.update(keys);
    if (CONFIG.SHOW_HITBOXES) {
        helpers.highlightSpellHitboxes();
    }
};
var reset_this = true;
//var wasOnAPlatform = false;

/*function updatePlatforms() {
 var onAPlatform;
 for (var i = 0; i < localGame.platforms.length; i++) {
 if (localGame.platforms[i].update() === "grounded") {
 onAPlatform = true;
 };
 }
 if (onAPlatform == undefined && wasOnAPlatform) {
 reset_this = true;
 };
 //whem you hit the floor emit this once
 if (!onAPlatform && reset_this) {
 //  the floor is the land
 socket.emit("landed", {
 y: CONFIG.FLOOR_HEIGHT
 });
 reset_this = false;
 }
 wasOnAPlatform = onAPlatform;
 };*/
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
        remotePlayers[i].draw_();
    };
    localPlayer.updateVariables();
    localPlayer.draw_();
    drawForeground();
};

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
    if (id == localPlayer.id){
        return localPlayer;
    };
    return false;
};

function onInitMe(data) {
    localPlayer.setTeam(data.team);
    localPlayer.setX(data.x);
    localPlayer.id = data.id;
    localGame.setTeamOneKills(data.team_one_kills);
    localGame.setTeamZeroKills(data.team_zero_kills);

    localPlayer.init_position();

    //CONFIG = data.CONFIG;
    for (var property in data.CONFIG) {
        console.log(">>>" + property);
        if (data.CONFIG.hasOwnProperty(property)) {
            // do stuff
            CONFIG[property] = data.CONFIG[property];
        }
    }

    switch (localPlayer.getCharacterType()){
    case CONFIG.Grimes:
        cd_one = CONFIG.GRIMES_1_CD;
        cd_two = CONFIG.GRIMES_2_CD;
        break;
    case CONFIG.Redhatter:
        cd_one = CONFIG.REDHATTER_1_CD;
        cd_two = CONFIG.REDHATTER_2_CD;
        break;
    case CONFIG.Shanker:
        cd_one = CONFIG.SHANKER_1_CD;
        cd_two = CONFIG.SHANKER_2_CD;
        break;
    case CONFIG.Fly:
        cd_one = CONFIG.FLY_1_CD;
        cd_two = CONFIG.FLY_2_CD;
        break;
    case CONFIG.Huntress:
        cd_one = CONFIG.HUNTRESS_1_CD;
        cd_two = CONFIG.HUNTRESS_2_CD;
        break;
    }

};

function hostileById(id) {
    var i;
    for (i = 0; i < hostiles.length; i++) {
        if (hostiles[i].id == id) return hostiles[i];
    };
    return false;
};
function switchTeams(){

    socket.emit("switch team");
    $('#switch_teams').blur();
};
$(document).ready(function() {
    localGame = new Game();
});
