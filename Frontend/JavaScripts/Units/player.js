var Player = function(startX, startY, startHp, _name) { //ignore startX variable
//    if (startX == undefined) startX = -1000;
//    if (startY == undefined) startY = -1000;
    this.coordinateList = []; //array of all the positions the server says the unit is at


    var name = _name,
        hp = 0,
        id,
        alive = true,

        animate = 0,
        lastsaid = {},
        gold = 0,
        maxHp = startHp,
        team;

    var meelee_attack_component = new MeeleeAttackComponent(this);
    var m_c = new MovementComponent(this);

    var that = this;

    var invis = false;

    this.setInvis = function(_invis) {
        invis = _invis;
    };
    var meelee_attack = false;
    this.id = undefined;
    this.getMeeleeAttack = function() {
        return meelee_attack;
    };
    this.setUpActionbar = function() {
        console.log("IMPLEMENT THIS");
    };
    // Getters and setters
    this.setTeam = function(_team) {
        if (_team === team) {
            return;
        }
        if (_team == 1) {
            teamOneFilter(that.imageContainer);
            that.imageContainer.removeChild(health);
            health = new PIXI.Graphics();
            health.beginFill(0xFF0000);
            health.drawRect(0, 0, 1, 6);
            health.endFill();
            that.imageContainer.addChild(health);
        } else {
            teamOneFilter(that.imageContainer);
            that.imageContainer.removeChild(health);
            health = new PIXI.Graphics();
            health.beginFill(0x00FF00);
            health.drawRect(0, 0, 1, 6);
            health.endFill();
            that.imageContainer.addChild(health);
            noFilter();
        }
        team = _team;
    };
    this.getTeam = function() {
        return team;
    };
    this.getGold = function() {
        return gold;
    };
    this.setGold = function(newGold) {
        gold = newGold;
    };
    this.getHp = function() {
        return hp;
    };
    this.respawn = function() { /* Function that is called for local player*/
        alive = true;
    };
    this.getAnimate = function() {
        return animate;
    };
    /* Returns the inverse of a fly times black hole divided by zero */
    this.getAlive = function() {
        return alive;
    };
    /* Changes object state to dead! */
    this.getName = function() {
        return name;
    };
    this.setName = function(newName) {
        name = newName;
    };
//    this.bleed = function() {

//    };
    this.setHp = function(newHp) {
        var oldHp = hp;
        if (newHp < oldHp){
            var v = new Blood(that.getDrawAtX() - 38, that.getDrawAtY() - 30);
            localGame.bloods.push(v);
        }
        hp = newHp;
        if (oldHp > 0 && newHp <= 0) {
            notify("<strong>" + that.getName() + "</strong> has died");
        }
        oldHp = null; //fuck closures
    };


    /* UpdateVariables function is only called when the window is focused - at rate
     * of FPS
     */

    this.updateVariables = function() {
        m_c.update();
    };

    this.getWidth = function() {
        return 50;
    };
    this.getHeight = function() {
        return 50;
    };
    this.speaks = function(words) {
        chat_text.text = words;
        var old_text = chat_text.text;
        setTimeout(function() {
            if (chat_text.text == old_text) {
                chat_text.text = "";
            }
        }, 3000);
    };
    var health_shadow = new PIXI.Graphics();
    health_shadow.beginFill(0x000000);
    health_shadow.drawRect(0, 0, 40, 6);
    health_shadow.endFill();
    var health = new PIXI.Graphics();
    health.beginFill(0x00FF00);
    health.drawRect(0, 0, 1, 6);
    health.endFill();
    this.imageContainer = new PIXI.Container();
    var noFilter = function() {
        that.imageContainer.filters = null;
    };


    this.imageContainer.addChild(health_shadow);
    this.imageContainer.addChild(health);
    // name = "i";
    var name_text = new PIXI.Text(name);
    name_text.style.font = "bold 10px arial";
    name_text.style.align = "center";
    this.imageContainer.addChild(name_text);
    var chat_text = new PIXI.Text("");
    chat_text.style.font = "bold 10px arial";
    chat_text.style.align = "center";
    this.imageContainer.addChild(chat_text);

    MAIN.stage.addChild(this.imageContainer);

    var walk_left;
    var walk_right;
    var attack_left;
    var attack_right;
    this.setAnimations = function(_walk_left, _walk_right, _attack_left, _attack_right){
        walk_left = _walk_left;
        walk_right = _walk_right;
        attack_left = _attack_left;
        attack_right = _attack_right;

    };
    //why the fuck did I have this code below here
   // var structure = new PIXI.Sprite(PIXI.Texture.fromImage("spire.png"));
  //  structure.x = 1350 - Math.abs(PIXI.Texture.fromImage("spire_0.png").width / 2);

    //structure.y = -116;
   // this.imageContainer.addChild(structure);

    var text_x;
    this.drawText = function() {
        if (Math.abs(that.getDrawAtX() - that.getX()) > 10) { // idk what this was for
            //console.log( Math.abs(x - drawAtX));
        }
        text_x = CONFIG.SCREEN_WIDTH / 2 - localPlayer.localX() + that.getDrawAtX();
        name_text.x = text_x - name_text.width / 2;
        name_text.y = that.getDrawAtY() - 80;
        chat_text.y = that.getDrawAtY() - 90;
        chat_text.x = text_x - chat_text.width / 2;
        chat_text.y -= 10;
        //  \le.log(" x - . "+text_x);
        health_shadow.position.x = text_x - 20;
        health_shadow.position.y = that.getDrawAtY() - 60;
        health.position.x = text_x - 20;
        health.position.y = that.getDrawAtY() - 60;
        health.scale.x = Math.ceil((hp / maxHp) * 40);

    };


    this.draw_char = function(){


    };
    var now = Date.now() - 1000;
    var that = this;
    /* Sets the current action to meeleee attack(For animation)
     * And then checks for Collision
     **/
    this.current_action;
    this.setMeeleeAttack = function(_atk, attack_id, direction) {
        if (_atk) {
            if (direction == "left") {
                that.current_action = CONFIG.ACTION.ATTACK_LEFT;
                last_move_direction = "left";
            } else {
                that.current_action = CONFIG.ACTION.ATTACK_RIGHT;
                last_move_direction = "right";
            }
        } else { // If meeelee attack is set to false, return
            meelee_attack = _atk;
            return;
        }
        meelee_attack = _atk; //alwayst true
        //only hapens if meelee attack ist rue
        //Anonymous function for determining if someone is hit
        that.addNewMeeleeAttack(attack_id, that.id);

       /* setTimeout(function() {
            // build an array of every player in the game
            var allPlayers = remotePlayers.slice();
            allPlayers.push(localPlayer);
            //remove this player from the array because a player obv cant attack itself lol
            var index = allPlayers.indexOf(that);
            if (index > -1) {
                console.log("SPLICING " + index);
                allPlayers.splice(index, 1);
            } else {}
            //draws hit box
            if (CONFIG.SHOW_HITBOXES) {
                var bb = that.getMeeleeAttackBoundingBox();
                var box = new PIXI.Graphics();
                box.beginFill(0x00FF00);
                box.drawRect(0, 0, bb.getWidth(), bb.getHeight());
                box.endFill();
                box.alpha = .4;
                box.x = bb.getX() - localPlayer.getX() + CONFIG.SCREEN_WIDTH / 2 - bb.getWidth() / 2;
                box.y = bb.getY() - bb.getWidth() / 2;
                MAIN.stage.addChild(box);
                helpers.highlightPlayerHitboxes();
                setTimeout(function() {
                    MAIN.stage.removeChild(box);
                }, 400);
            }*/
            /*for (var i = 0; i < allPlayers.length; i++) {
                if (helpers.collision(allPlayers[i], that.getMeeleeAttackBoundingBox())) {
                    //let the server know the attack landed
                    console.log("OK that.id is " + that.id);
                    socket.emit("meelee hits", {
                        "hit": allPlayers[i].id,
                        "hit_by": that.id,
                        "attack_id": attack_id
                    });
                    console.log("Meelee Hits");
                }
            }*/
     //   }, 200);
    };

    this.rightClick = function(clientX, clientY) {
        socket.emit("spell one", {
            x: clientX,
            y: clientY
        });
    };
    this.castSpellTwo = function() {
        socket.emit("spell two", {
            x: localPlayer.getX(),
            y: localPlayer.getY(),
            direction: localPlayer.getMoveDirection()
        });
    };
    /* */
    this.leftClick = function(_x, _y) {
        //if out of screen return
        if (_y > CONFIG.SCREEN_HEIGHT - 55){
            return;
        };

        if (Date.now() - now >= 1000) {
            // meelee_attack = 0;
            socket.emit("meelee attack", {
                direction: localPlayer.getMoveDirection()
            });
            now = Date.now();
        }
    };
    this.localX = function() {
        return localPlayer.getDrawAtX();
    };
    this.displayCooldown = function(spellNumber, cooldownTime) {
        var casted_spell = MAIN.BOTACTIONBAR.getChildAt(spellNumber + 2);
        filter = new PIXI.filters.PixelateFilter();
        casted_spell.filters = [filter];
        CONFIG.COOLDOWNS.push({
            filter: filter,
            parent: casted_spell,
            duration: cooldownTime
        });
    };
    /*
    this.draw = function() {
        // this.update_player();
        var drawAtX = CONFIG.SCREEN_WIDTH / 2 + that.getDrawAtX() - that.localX() - 50;
        var drawAtY = skeleton.getDrawAtY() - 50;
        walk_left.position.y = drawAtY;
        walk_right.position.y = drawAtY;
        attack_left.position.y = drawAtY;
            attack_right.position.y = drawAtY;
        //use to make drawing shanker mroe accurate lol maybe I need to remove this oh noee
        if (this.getMoveDirection() === "right") {
            drawAtX += 20;
        } else {
            drawAtX += 5;
        }
       walk_left.position.x = drawAtX;
        walk_right.position.x = drawAtX;
        attack_right.position.x = drawAtX;
        attack_left.position.x = drawAtX;
        walk_right.visible = false;
        walk_left.visible = false;
        attack_right.visible = false;
        attack_left.visible = false;
        this.drawText();
        if (this.getCurrentAction() === CONFIG.ACTION.ATTACK_RIGHT) {
            if (first === false) {
                attack_right.gotoAndPlay(0);
                first = true; //at the very end set first to true
            }
            attack_right.visible = true;
            if (attack_right.currentFrame === 1) {
                loop = true;
            }
            if (attack_right.currentFrame === 0 && loop) {
                first = false;
                //this.setCurrentAction(CONFIG.ACTION.MOVING_RIGHT);
                this.setMeeleeAttack(false);
                loop = false;
            }
        } else if (this.getCurrentAction() === CONFIG.ACTION.ATTACK_LEFT) {
            if (first === false) {
                attack_left.gotoAndPlay(0);
                first = true; //at the very end set first to true
            }
            attack_left.visible = true;
            if (attack_left.currentFrame === 1) {
                loop = true;
            }
            if (attack_left.currentFrame === 0 && loop) {
                first = false;
                //this.setCurrentAction(CONFIG.ACTION.MOVING_RIGHT);
                this.setMeeleeAttack(false);
                loop = false;
            }
        } else if (this.getCurrentAction() === CONFIG.ACTION.MOVING_RIGHT) {
            //skeleton.imageContainer.addChild(walk_right);
            walk_right.visible = true;
        } else if (this.getCurrentAction() === CONFIG.ACTION.MOVING_LEFT) {
            //skeleton.imageContainer.addChild(walk_left);
            walk_left.visible = true;
        } else { //is idling
            if (this.getMoveDirection() === "left") {
                //skeleton.imageContainer.addChild(walk_left);
                walk_left.visible = true;
            } else {
                //skeleton.imageContainer.addChild(walk_right);
                walk_right.visible = true;
            }
        }
        walk_right.animationSpeed = .2;
        walk_left.animationSpeed = .2;
        if (this.getCurrentAction() === CONFIG.ACTION.IDLE) {
            walk_left.animationSpeed = 0;
            walk_right.animationSpeed = 0;
            walk_left.gotoAndPlay(0);
            walk_right.gotoAndPlay(0);
        }
    };*/
};
