var helpers = {};


helpers.collision = function(thing1, thing2) {

    /* var x1 = (thing1.x == undefined) ? thing1.getX() : thing1.x;
    var x2 = (thing2.x == undefined) ? thing2.getX() : thing2.x;

    var y1 = (thing1.y == undefined) ? thing1.getY() : thing1.y;
    var y2 = (thing2.y == undefined) ? thing2.getY() : thing2.y;

    var t1w = (thing1. == undefined) ? thing1.getY() : thing1.y;
        var t2w =
     */
    var x1;
    var x2;
    var y1;
    var y2;
    if (thing1.getDrawAtX){
        console.log("DRAW AT X BITCH");
        x1 = thing1.getDrawAtX();
    } else {
        x1 = thing1.getX();
    }
    if (thing2.getDrawAtX){
                console.log("DRAW AT X2 BITCH");

        x2 = thing2.getDrawAtX();
    } else {
        x2 = thing2.getX();
    }
    if (thing1.getDrawAtY){
        y1 = thing1.getDrawAtY();
    } else {
        y1 = thing1.getY();
    }
    if (thing2.getDrawAtY){
        y2 = thing2.getDrawAtY();
    } else {
        y2 = thing2.getY();
    }


    //    console.log(y1 + " " + y2 + " " + x1 + " " + x2);
//    thing1.offset_x;
    //    thing1.offset_y;
    if (thing1.offset_x){
        x1+= thing1.offset_x;
    }
    if (thing1.offset_y){
        y1+= thing1.offset_y;

    }
    if (thing2.offset_x){
        x2+= thing2.offset_x;

    }
    if (thing2.offset_y){
        y2+= thing2.offset_y;

    }

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
        if (!allPlayers[_i].box){
            allPlayers[_i].box = new PIXI.Graphics();
            allPlayers[_i].box.beginFill(0x00FF00);
            allPlayers[_i].box.drawRect(0, 0, allPlayers[_i].getWidth(), allPlayers[_i].getHeight());
            allPlayers[_i].box.endFill();
            allPlayers[_i].box.alpha = .1;
            MAIN.stage.addChild( allPlayers[_i].box);
        }

        if (allPlayers[_i].id != localPlayer.id){
            allPlayers[_i].box.x = allPlayers[_i].getX() - localPlayer.getDrawAtX() + CONFIG.SCREEN_WIDTH / 2 -allPlayers[_i].getWidth() / 2 + allPlayers[_i].offset_x;
        } else {
            allPlayers[_i].box.x = allPlayers[_i].getX() - localPlayer.getX() + CONFIG.SCREEN_WIDTH / 2 -allPlayers[_i].getWidth() / 2 + allPlayers[_i].offset_x;

        }
        allPlayers[_i].box.y = allPlayers[_i].getDrawAtY() - allPlayers[_i].getHeight() / 2 + allPlayers[_i].offset_y;
    }
};
    // Find player by ID
helpers.playerById = function(id) {
    var i;
    for (i = 0; i < remotePlayers.length; i++) {
        if (remotePlayers[i].id == id) return remotePlayers[i];
    };
    if (id == localPlayer.id ){
        return localPlayer;
    };
    return false;
};


function teamOneFilter(imageContainer) {
    var filter = new PIXI.filters.ColorStepFilter();
    var filter2 = new PIXI.filters.GrayFilter();
    filter2.gray = .6;
    filter.invert = .3;
    imageContainer.filters = [filter, filter2];
};
