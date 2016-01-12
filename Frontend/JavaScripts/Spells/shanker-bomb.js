var ShankerBomb = function(_x, _y, direction) {
    var cooldown = 700;
    var x = _x - 30, //center x
        y = _y - 30;
        console.log(">" + direction);
    var startX = _x;
    this.inactive = true;
    var that  = this;
    this.update = function() {
//            MAIN.stage.removeChild(rhrClip)
//            var index = Spells.spellsarray.indexOf(this);
//            Spells.spellsarray.splice(index, 1);
    };
    this.getX = function() {
        return x;
    };
    this.getY = function() {
        return y;
    };
    this.getWidth = function() {
        return 60;
    };
    this.getHeight = function() {
        return 60;
    };
    var rhrClip = new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("bomb.png")]);
    MAIN.stage.addChild(rhrClip);
    rhrClip.y = y;
    var already_set_off = false;
    this.draw = function() {
        if (Math.abs(_x - x) > 200){
            that.inactive = false;
            if (!already_set_off){
                already_set_off = true;
                setTimeout(function(){
                    //make sure this code is only executed once
                    console.log("DELETING");
                    var index = Spells.spellsarray.indexOf(that);
                    Spells.spellsarray.splice(index, 1);
                    MAIN.stage.removeChild(rhrClip);

                }, 300)
            }
        } else {
            if (direction == "right"){
                x+= 5;
            } else {
                x-=5;
            }
        }   
        var newX = Math.floor(x) - localPlayer.getDrawAtX() + CONFIG.SCREEN_WIDTH / 2;
        rhrClip.position.x = newX-15;
        rhrClip.position.y = y;
    };
    return this;
};
//static function that returns thumbnail
ShankerBomb.thumbnail = function() {
    return 1;
};
