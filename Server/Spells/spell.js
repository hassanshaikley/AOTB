/* Parent class for spells in server */
var Spell = function(startX, startY, _team, _damage, id) {
    var x = startX,
        y = startY,
        team = _team,
        damage = _damage || 25; // damage is default 25
    /*
     * NOTE: Is id modifyible by the outside bc its returning it and not a copy?
     */
    this.getId = function() {
        return id;
    };
    /*
     * Key Value Pair
     * ID's that said this, ID's that is said to have been hit by this ID
     */
    this.says_hit = [];
    this.update = function() {
        util.log("Yo every spell needs this THIS SHOULDNT BE CALLED MAN");
        y += 50;
        //x += 2;
        var index = Spells.spellsarray.indexOf(this);
        if (y >= 500) {
            Spells.spellsarray.splice(index, 1);
        };
    };
    this.doEffect = function(obj) {
        //nothing
    };
    this.getHalfWidth = function() {
        return 50;
    };
    this.getHeight = function() {
        return 50;
    };
    this.getDamage = function() {
        return damage;
    };
    this.getTeam = function() {
        return team;
    };
    this.getX = function() {
        return x;
    };
    this.getY = function() {
        return y;
    };
    //also old and buggy
    this.setX = function(newX) {
        x = newX;
    };
    //old n buggy
    this.setY = function(newY) {
        y = newY;
    };
    return this;
};
exports.Spell = Spell;