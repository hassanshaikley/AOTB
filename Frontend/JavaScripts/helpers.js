var helpers = {};
helpers.xAdd = 210;
helpers.addThumbToActionBar = function(image, description) {
    console.log("HI");
    MAIN.BOTACTIONBAR.addChild(image);
    image.position.x = this.xAdd;
    this.xAdd += 50;
};

helpers.collision = function(thing1, thing2) {

    /* var x1 = (thing1.x == undefined) ? thing1.getX() : thing1.x;
    var x2 = (thing2.x == undefined) ? thing2.getX() : thing2.x;

    var y1 = (thing1.y == undefined) ? thing1.getY() : thing1.y;
    var y2 = (thing2.y == undefined) ? thing2.getY() : thing2.y;

    var t1w = (thing1. == undefined) ? thing1.getY() : thing1.y;
        var t2w =
     */
    var x1 = thing1.getX();
    var x2 = thing2.getX();
    var y1 = thing1.getY();
    var y2 = thing2.getY();


//    console.log(y1 + " " + y2 + " " + x1 + " " + x2);
    var xDist = Math.abs(x1 - x2);
    var yDist = Math.abs(y1 - y2);
    if (xDist <= thing1.getWidth() / 2 + thing2.getWidth() / 2) {
        if (yDist <= thing1.getHeight() / 2 + thing2.getHeight() / 2) {
            return true;
        }
    };
    return false;
};

helpers.highlightSpellHitboxes = function() {
    for (var _i = 0; _i < Spells.spellsarray.length; _i++) {
        if (!Spells.spellsarray[_i].highlight) {
            Spells.spellsarray[_i].highlight = new PIXI.Graphics();
            Spells.spellsarray[_i].highlight.beginFill(0x00FF00);
            Spells.spellsarray[_i].highlight.drawRect(0, 0, Spells.spellsarray[_i].getWidth(), Spells.spellsarray[_i].getHeight());
            Spells.spellsarray[_i].highlight.endFill();
            Spells.spellsarray[_i].highlight.alpha = .1;
            MAIN.stage.addChild(Spells.spellsarray[_i].highlight);
            /*            setTimeout(function() {
                var save = _i;
                console.log("I IS " + save + " OK " + Spells.spellsarray[save]);
                MAIN.stage.removeChild(Spells.spellsarray[save].highlight);
                delete Spells.spellsarray[save].highlight;
            }, 1000);*/

        }
        Spells.spellsarray[_i].highlight.x = Spells.spellsarray[_i].getX() + CONFIG.SCREEN_WIDTH / 2 - localPlayer.getDrawAtX() - 25;
        Spells.spellsarray[_i].highlight.y = Spells.spellsarray[_i].getY();
    }
};

var hitboxes = [];
helpers.highlightPlayerHitboxes = function() {
    var allPlayers = remotePlayers.slice();
    allPlayers.push(localPlayer);
    for (var _i = 0; _i < allPlayers.length; _i++) {
        var box = new PIXI.Graphics();
        box.beginFill(0x00FF00);
        box.drawRect(0, 0, allPlayers[_i].getWidth(), allPlayers[_i].getHeight());
        box.endFill();
        box.alpha = .1;
        box.x = allPlayers[_i].getX() - localPlayer.getX() + CONFIG.SCREEN_WIDTH / 2 - allPlayers[_i].getWidth() / 2;
        box.y = allPlayers[_i].getY() - allPlayers[_i].getHeight() / 2;
        MAIN.stage.addChild(box);
        hitboxes.push(box);
        setTimeout(function() {
            var hitbox = hitboxes.pop();
            MAIN.stage.removeChild(hitbox);
        }, 400);
    }
};
    // Find player by ID
helpers.playerById = function(id) {
    var i;
    for (i = 0; i < remotePlayers.length; i++) {
        if (remotePlayers[i].id == id) return remotePlayers[i];
    };
    return false;
};
