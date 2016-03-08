var meelee_attacks = {};
/* Meelee Attack object*/
function MeeleeAttack(x, y, width, height, attack_id, belongs_to, duration){
    addMeeleeAttack(this);
    var startX = x, startY = y;
    var that = this;

    var attacker = playerById(belongs_to);

    var loc = {
        x : attacker.getX(),
        y : attacker.getY()
    };

    /* Hits is jsut a list of player ids, if a player with an idea is already hit
     don't emit that they are hit again*/
    var hits =[];

    this.getX = function(){
        return x;
    };
    this.getY = function(){
        return y;
    };
    this.getWidth = function(){
        return width;
    };
    this.getHeight = function(){
        return height;
    };


        var box = new PIXI.Graphics();

    if (CONFIG.SHOW_HITBOXES) {
        box.beginFill(0x00FF00);
        box.drawRect(0, 0, width, height);
        box.endFill();
        box.alpha = .4;
        box.x = x - localPlayer.getX() + CONFIG.SCREEN_WIDTH / 2 - width / 2;
        box.y = y - width / 2;
        MAIN.stage.addChild(box);
    }

    this.update = function(){

        var allPlayers = remotePlayers.slice();
        allPlayers.push(localPlayer);

        var xDiff = attacker.getX() - loc.x;
        var yDiff = attacker.getDrawAtY() - loc.y;

        x = startX +xDiff;
        y = startY +yDiff;
        box.x = x - localPlayer.getX() + CONFIG.SCREEN_WIDTH / 2 - width / 2;
        box.y = y;



        for ( var i = 0; i < allPlayers.length; i++){
            if (helpers.collision(allPlayers[i], that)){
                if (hits.indexOf(allPlayers[i].id) == -1){
                    hits.push(allPlayers[i].id);
//                    console.log("A HEIS HIT!");
                    //notify server of hit
                    socket.emit("meelee hits", {
                        "hit": allPlayers[i].id,
                        "hit_by": that.id,
                        "attack_id": attack_id
                    });
                }
            }
        }
    };

    function addMeeleeAttack(m){
        meelee_attacks[attack_id] = m;
        console.log("jsus");


        setTimeout(function(){
            console.log("m id " + attack_id);
            delete meelee_attacks[attack_id];
            MAIN.stage.removeChild(box);

        }, duration);
    };
};
