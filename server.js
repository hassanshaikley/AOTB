/**************************************************
 ** SERVER CLASS FOR THE GAME
 ** Run this file for game to work
 **************************************************/
function Server(){
    this.libs = require("./initialize.js").loadLibraries();
    this.events = require("./events").Events;
    this.event_handler = new this.events();
    this.Spells = require("./spellsandprojectiles").Spells;
    require("./initialize.js").initialize();
}

//configuration file
var Config = require("./config.js");

var util = require("util");

var server = new Server();

Server.prototype.init = function() {
    /* Start the event handling */
    server.event_handler.setEventHandlers(server.libs.io);
    server.updateGameVariables();
};

//I am such a good friend!
/*
function helpNarine(){

    var User = require('./app/models/user');
    User.findOne( { "local.email" : "sejad.a@gmail.com"}, function(err, doc){
	//	var pass = doc.generateHash("abc123");
	doc.local.nickname = "sejoody";
	doc.save(function(err){

	});

    });

};*/

/* Function for performing computations on the server! ..I think. */
Server.prototype.updateGameVariables = function(){
    /* Every x seconds, spawn AI's*/
    /* Manage AI behavior */
    /* if there is a winner */

    // This is true for a moment, when the game has a winner.
    if (game1.getWinner() !== -1 && game1.getState() === 1){
	/* Tell everyone about it and restart the game */
	server.libs.io.sockets.emit('win', {winner : game1.getWinner()});
        // 0 means the state is over
	game1.setState(0);
    }

    // update player positions
    for (var _i = 0; _i < players.length; _i++){
        // dont update dead players
	if (! players[_i].getAlive()){
            continue;
        };
        //dont update stunned players? Lol. Idk. Perhaps
        //they should be updated in some ways..
	if (players[_i].isStunned()){
	    continue;
	}

        //Should probably be refactored into fly object
	if (players[_i].getCharacterType() === "Fly"){
	    if (players[_i].getDescendAttack()){
		if(players[_i].getY() >= Config.FLOOR_HEIGHT - players[_i].getHeight()/2){
		    players[_i].setDescendAttack(false);
		    server.libs.io.sockets.emit('descend attack changes', { id: players[_i].id, descendAttack: false });
		} else {

		    players[_i].drop();

		    continue;
		}
	    };
	};

        players[_i].update();
    }

    /* Algorithm for determining who's hit by a fly... */
    var i;
    var j;
    for (i = 0; i < players.length; i++) {

	if (players[i].getCharacterType() === "Fly" && players[i].getDescendAttack()){
	    if  (Math.abs(players[i].getX() - game1.shrine_1.getX())<= 100 &&
		 players[i].getTeam() != 1 && (game1.shrine_0.hitby[i] == undefined ||
					       Date.now() -game1.shrine_1.hitby[i] >= 1000)){

		if (Math.abs(game1.shrine_1.getY() - players[i].getY() )<=150 ){
		    game1.shrine_1.setHp(game1.shrine_1.getHp() -25 );
		    game1.shrine_1.hitby[i] = Date.now();

		}
	    }
	    if  ( Math.abs(players[i].getX() - game1.shrine_0.getX() <= 100 &&
			   players[i].getTeam() != 0 &&( game1.shrine_0.hitby[i] == undefined ||
						         (Date.now() -game1.shrine_0.hitby[i]) >= 1000))) {
		if (Math.abs(game1.shrine_0.getY() - players[i].getY()) <= 150){ // shanker made contact at 114
		    game1.shrine_0.setHp(game1.shrine_0.getHp() -25 );
		    game1.shrine_0.hitby[i] = Date.now();
		}
	    }
	    //now see if hits any players
	    for (j = 0; j < players.length; j++){
		if (i != j){  //so a player does not attack him/herself
		    util.log(players[j].hitby +" ");
		    if (Math.abs(players[i].getX() - players[j].getX() )<= 30 && players[i].getTeam() != players[j].getTeam() && (players[j].hitby[i] == undefined || Date.now() -players[j].hitby[i] >= 1000)){
			if (Math.abs(players[i].getY() - players[j].getY()) <= 100){
			    //  var life_status = players[j].setHp(players[j].getHp() - 25);
			    players[j].doDamage(25);
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
        //server.libs.io.sockets.emit("draw hitmarker",  {x: server.Spells.spellsarray[i].getX(), y: server.Spells.spellsarray[i].getY() });

        //            util.log(server.Spells.spellsarray.length);
	//util.log( Math.abs( server.Spells.spellsarray[i].getX() - game1.shrine_1.getX())+ " < " +(server.Spells.spellsarray[i].getHalfWidth() + game1.shrine_1.getHalfWidth() ) )
        var targetShrine;
        util.log("LELEL LE LE ");
        if (server.Spells.spellsarray[i].getTeam() == 0){
            targetShrine = game1.shrine_1;
        } else {
            targetShrine = game1.shrine_0;
        }

        // 0 - 2500
        if (  (targetShrine.hitby[i] == undefined) || Date.now() - targetShrine.hitby[i] > 1000){
	    if  ( Math.abs( server.Spells.spellsarray[i].getX() - targetShrine.getX()) <
		  server.Spells.spellsarray[i].getHalfWidth() + targetShrine.getHalfWidth() ) {
		if (Math.abs(targetShrine.getY() - server.Spells.spellsarray[i].getY())<= (targetShrine.getHeight() + server.Spells.spellsarray[i].getHeight() ) ) {
                    var damage = server.Spells.spellsarray[i].getDamage();
                    if (server.Spells.spellsarray[i].name =="tortstun"){
                    	damage +=100;
                    }
		    targetShrine.setHp(targetShrine.getHp() -damage );
		    targetShrine.hitby[i] = Date.now();
		}
	    }
    	}



        /*   server.event_handler.didAttackHitPlayer( server.Spells.spellsarray[i].getX(),
         server.Spells.spellsarray[i].getY(),
         server.Spells.spellsarray[i].getTeam(),
         server.Spells.spellsarray[i].getDamage(), undefined,
         server.libs.io.sockets);*/

	for (var j = 0; j < players.length; j++) {
            util.log("LELELrrrE");
            if ( players[j].getTeam() == server.Spells.spellsarray[i].getTeam()){
                continue;
            }
            util.log((Math.abs( players[j].getY() - server.Spells.spellsarray[i].getY() ) + " < "
                      +                            (players[j].getHeight()/2 + server.Spells.spellsarray[i].getHeight()/2)))

	    if (Math.abs( players[j].getX() - server.Spells.spellsarray[i].getX()) <
		players[j].getWidth()/2 + server.Spells.spellsarray[i].getHalfWidth()
		&& server.Spells.spellsarray[i].hit.indexOf(players[j].id) === -1 &&
		Math.abs( players[j].getY() - server.Spells.spellsarray[i].getY() + players[j].emptyYSpace) <
                (players[j].getHeight()/2 -players[j].emptyYSpace + server.Spells.spellsarray[i].getHeight()/2)) {
		util.log("Se");

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


    //appears to iterate through every player and send their info to everyone
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
    hitPlayer.doDamage(damage); //sets the damage
    //    io.sockets.connected[data.hit_by].emit('set gold', { gold: hitBy.getGold()+1 });
    //server.libs.io.sockets.connected[hitPlayer.id].emit('set hp', { hp: hitPlayer.getHp() });

}

Server.prototype.sendUpdatedGame = function(){
    server.libs.io.sockets.emit('shrine hp', {zero: game1.shrine_0.getHp(), one : game1.shrine_1.getHp()});
};

server.init();

exports.Server = server;
