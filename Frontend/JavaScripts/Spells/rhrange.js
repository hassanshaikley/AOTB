var RHRange = function(_x, _y, direction) {
    var cooldown = 700;
    var x = _x - 10, //center x
        y = _y - 10;
    var speed = 2.2;
    if (direction === "left") {
        speed = -speed;
    };
    var startX = _x;
    this.update = function() {
        if (Math.abs(startX - x) <= 200) {
            x = x += speed;
        } else {
            MAIN.stage.removeChild(rhrClip)
            var index = Spells.spellsarray.indexOf(this);
            Spells.spellsarray.splice(index, 1);
        }
    };
    this.getX = function() {
        return x;
    };
    this.getY = function() {
        return y;
    };
    this.getWidth = function() {
        return 20;
    };
    this.getHeight = function() {
        return 20;
    };
    var rhrClip = new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("rh_range.png")]);
    MAIN.stage.addChild(rhrClip);
    this.draw = function() {
        var newX = Math.floor(x) - localPlayer.getDrawAtX() + CONFIG.SCREEN_WIDTH / 2;
        rhrClip.position.x = newX;
        rhrClip.position.y = y;
    };
    return this;
};
//static function that returns thumbnail
RHRange.thumbnail = function() {
    return 1;
};
