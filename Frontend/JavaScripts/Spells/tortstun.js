var TortStun = function(_x, _y, _team) {
    this.team = _team;
    var cooldown = 1000;
    var x = _x, //center x
        y = 450;
    var timer = 0;
    this.update = function() {
        timer = timer + 1;
        if (y >= 440) {
            y = y - 2;
        } else if (timer >= 100) {
            MAIN.stage.removeChild(tortStunClip)
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
        return 100;
    };
    this.getHeight = function() {
        return 20;
    };

    var tortStunClip = new PIXI.extras.MovieClip([PIXI.Texture.fromFrame("tort_stun.png")]);
    MAIN.stage.addChild(tortStunClip);
    this.draw = function() {
        var newX = x - localPlayer.getDrawAtX() - 50 + CONFIG.SCREEN_WIDTH / 2;
        tortStunClip.position.x = newX;
        tortStunClip.position.y = y;
        /* Check if a spell hits - going to need to be refactored
        ctx.save();
        ctx.drawImage(tortStun,0,0, 100, 100, newX, y, 100, 100);
        ctx.restore();*/
    };
    return this;
};
//static function that returns thumbnail
TortStun.thumbnail = function() {
    return 1;
};