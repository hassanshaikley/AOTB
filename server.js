/**************************************************
 ** SERVER CLASS FOR THE GAME
 **************************************************/
function Server(){
	this.libs    = require("./initialize.js").loadLibraries();        //initialize.load();
	this.events          = require("./events").Events;
	this.event_handler  = new this.events();
	this.Spells      = require("./spellsandprojectiles").Spells;
	require("./initialize.js").initialize();
}
var Config = require("./config.js");

var server = new Server();


Server.prototype.init = function() {
	/* Start the event handling */
	server.event_handler.setEventHandlers(server.libs.io);
	server.updateGameVariables();
};

//changes narines password to abc123
//I am such a good friend!
function helpNarine(){

	var User = require('./app/models/user');
	User.findOne( { "local.email" : "narinearraul@yahoo.com"}, function(err, doc){
		util.log(doc.local.email);
		var pass = doc.generateHash("abc123");
	        doc.local.password = pass;
		doc.save(function(err){

		});

	});

};
/* Function for performing computations on the server! ..I think. */
Server.prototype.updateGameVariables = function(){
	/* Every x seconds, spawn AI's*/
	/* Manage AI behavior */
	/* if there is a winner */
	if (game1.getWinner() !== -1 && game1.getState() === 1){
		/* Tell everyone about it and restart the game */
		//do this once

		server.libs.io.sockets.emit('win', {winner : game1.getWinner()});

		game1.setState(0);
		setTimeout(function(){
				//a few seconds have elapsed, now reset everyones position
			for(var _i = 0; _i < players.length; _i++){
				players[_i].setHp(100);
				players[_i].setX(players[_i].getRespawnX());
				//emit to that player to go to respawn
			}
				game1.setWinner(-1);
				game1.setShrineHp(3000, 0);
				game1.setShrineHp(3000, 1);
				game1.setState(1);
		}, 5000); /* Now wait like 5 seconds and reset the game*/

	}

	// update player positions
	for (var _i = 0; _i < players.length; _i++){
	      if (! players[_i].getAlive()){
        	continue;
              };

	    //Don't allow player to descend further than the floor
//	    util.log(players[_i].getY() + " " + players[_i].getHeight() + " " + (Config.FLOOR_HEIGHT+20));
	    if ((players[_i].getY()+ players[_i].getHeight()/2) < Config.FLOOR_HEIGHT && ! players[_i].jumping) {
                var fallHeight = 20;
                if (players[_i].getCharacterType() == "Fly"){
                    fallHeight = 1;
                    }
                util.log(players[_i].getY() + " " + fallHeight);
		players[_i].setY(players[_i].getY()+fallHeight);
                util.log("YEE");
	    } else if (players[_i].jumping){
                   players[_i].setY(players[_i].getY() - 15);
                }
		if (players[_i].isStunned()){
			continue;
		}

		if (players[_i].getCharacterType() === "Fly"){
			if (players[_i].getDescendAttack()){
				if(players[_i].getY() >= Config.FLOOR_HEIGHT - players[_i].getHeight()/2){
					players[_i].setDescendAttack(false);
					server.libs.io.sockets.emit('descend attack changes', { id: players[_i].id, descendAttack: false });
				} else {

					players[_i].moveDown();
					players[_i].moveDown();
					players[_i].moveDown();
					players[_i].moveDown();
					players[_i].moveDown();
					players[_i].moveDown();
					players[_i].moveDown();
					players[_i].moveDown();

					continue;
				}
			};
		};
		if (players[_i].left){
			players[_i].moveLeft();
		}
		if (players[_i].right){
			players[_i].moveRight();
		}
		if (players[_i].up){
			players[_i].moveUp();
		}
		if (players[_i].down){
			players[_i].moveDown();
		}
	}

	/* Algorithm for determining who's hit by a fly... */
	var i;
	var j;
	for (i = 0; i < players.length; i++) {

		if (players[i].getCharacterType() === "Fly" && players[i].getDescendAttack()){
			if  (Math.abs(players[i].getX() - game1.shrine_1.getX())<= 100 &&
					players[i].getTeam() != 1 && (game1.shrine_0.hitby[i] == undefined ||
						Date.now() -game1.shrine_1.hitby[i] >= 1000)){

				if (Math.abs(game1.shrine_1.getY() - players[i].getY()) <=150 ){
					game1.shrine_1.setHp(game1.shrine_1.getHp() -25 );
					game1.shrine_1.hitby[i] = Date.now();

				}
			}
			if  (Math.abs(players[i].getX() - game1.shrine_0.getX()) <= 100 &&
					players[i].getTeam() != 0 &&( game1.shrine_0.hitby[i] == undefined ||
						Date.now() -game1.shrine_0.hitby[i] >= 1000)){
				if (Math.abs(game1.shrine_0.getY() - players[i].getY()) <= 150){ // shanker made contact at 114
					game1.shrine_0.setHp(game1.shrine_0.getHp() -25 );
					game1.shrine_0.hitby[i] = Date.now();
				}
			}
			//now see if hits any players
			for (j = 0; j < players.length; j++){
				if (i != j){  //so a player does not attack him/herself
					if (Math.abs(players[i].getX() - players[j].getX()) <= 30 && players[i].getTeam() != players[j].getTeam() && (players[j].hitby[i] == undefined || Date.now() -players[j].hitby[i] >= 1000)){
						if (Math.abs(players[i].getY() - players[j].getY()) <= 100){
							//  var life_status = players[j].setHp(players[j].getHp() - 25);
							setHp(players[j], 25);
							players[j].hitby[i] = Date.now();
							server.libs.io.sockets.emit('bleed', { id: players[j].id });

						}
					}
				}
			}
		}
	}

	/* Iterate through every spell, if it hits someone then let them take the hit son : D */
	for (i = 0; i < server.Spells.spellsarray.length; i++){


		//see if it hits a shrine
		//util.log( Math.abs( server.Spells.spellsarray[i].getX() - game1.shrine_1.getX())+ " < " +(server.Spells.spellsarray[i].getHalfWidth() + game1.shrine_1.getHalfWidth() ) )
            var targetShrine;
            if (server.Spells.spellsarray[i].getTeam() == 0){
               targetShrine = game1.shrine_1;
             } else {
               targetShrine = game1.shrine_0;
             }

            // 0 - 2500
            if ( (targetShrine.hitby[i] != undefined || targetShrine.hitby[i] <= 1000)){
                continue;
            }

	    if  ( Math.abs( server.Spells.spellsarray[i].getX() - targetShrine.getX()) <
			server.Spells.spellsarray[i].getHalfWidth() + targetShrine.getHalfWidth() ) {
			if (Math.abs(targetShrine.getY() - server.Spells.spellsarray[i].getY()) <= (targetShrine.getHeight() + server.Spells.spellsarray[i].getHeight() ) ) {
                            var damage = 25;
                                if (server.Spells.spellsarray[i].name =="tortstun"){
                                    damage +=100;
                                    }
				targetShrine.setHp(targetShrine.getHp() -damage );
			        targetShrine.hitby[i] = Date.now();



			}
		}

                 /*   server.event_handler.didAttackHitPlayer( server.Spells.spellsarray[i].getX(),
                                                   server.Spells.spellsarray[i].getY(),
                                                    server.Spells.spellsarray[i].getTeam(),
                                                    server.Spells.spellsarray[i].getDamage(), undefined,
                                                    server.libs.io.sockets);*/

		for (var j = 0; j < players.length; j++) {
                    if ( players[j].getTeam() == server.Spells.spellsarray[i].getTeam()){
                        continue;
                        }
                       util.log(Math.abs(players[j].getY()-  server.Spells.spellsarray[i].getY()));
                       util.log(players[j].getHeight()/2 + server.Spells.spellsarray[i].getHeight()/2);

			if (Math.abs( players[j].getX() - server.Spells.spellsarray[i].getX()) <
				 players[j].getHalfWidth() + server.Spells.spellsarray[i].getHalfWidth()
				&& server.Spells.spellsarray[i].hit.indexOf(players[j].id) === -1 &&
				Math.abs( players[j].getY() - server.Spells.spellsarray[i].getY()) <
                            (players[j].getHeight()/2 + server.Spells.spellsarray[i].getHeight()/2)) {

                            util.log(server.Spells.spellsarray[i].getX() + " VERSUS " + players[j].getX());
	                    //the - 10 hing is bullshit so fucking confused rn
                            server.libs.io.sockets.emit("draw hitmarker",  {x: server.Spells.spellsarray[i].getX()-10, y: server.Spells.spellsarray[i].getY() });
				server.Spells.spellsarray[i].hit.push(players[j].id);
				setHp( players[j], server.Spells.spellsarray[i].getDamage());
				server.Spells.spellsarray[i].doEffect( players[j]); //stuns / freezes / etc
				server.libs.io.sockets.emit('bleed', { id: players[j].id });

			}
		}
		server.Spells.spellsarray[i].update();
	};

	for (var j = 0; j < players.length; j++){
		server.libs.io.sockets.emit('update player', { id: players[j].id, x: players[j].getX(), y: players[j].getY(), hp: players[j].getHp(), team: players[j].getTeam() });
	}

	/* Method for telling all the units about the health of the structures and stuff */
	server.sendUpdatedGame();
	setTimeout(function(){
			server.updateGameVariables();
			}, 1000 /15);
};

/* LETS TELL IF SOMEBODY is hit on the server */
function setHp(hitPlayer, damage){ //where hitplayer is like players[i]
	hitPlayer.setHp(hitPlayer.getHp() -damage); //sets the damage
	//    io.sockets.connected[data.hit_by].emit('set gold', { gold: hitBy.getGold()+1 });
	server.libs.io.sockets.connected[hitPlayer.id].emit('set hp', { hp: hitPlayer.getHp() });

}

Server.prototype.sendUpdatedGame = function(){
	server.libs.io.sockets.emit('shrine hp', {zero: game1.shrine_0.getHp(), one : game1.shrine_1.getHp()});
};

server.init();

exports.Server = server;
