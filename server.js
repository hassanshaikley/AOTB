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
var server = new Server();

function init() {
    /* Start the event handling */
    server.event_handler.setEventHandlers(server.libs.io);
    server.updateGameVariables();
};

var game_over;
/* Function for performing computations on the server! ..I think. */
Server.prototype.updateGameVariables = function(){
  /* Every x seconds, spawn AI's*/
  /* Manage AI behavior */
  /* if there is a winner */
  if (game1.getWinner() != -1 && game_over == undefined ){
    util.log("SOMEONE WINS OMG");
      /* Tell everyone about it and restart the game */
      //do this once
      server.libs.io.sockets.emit('win', {winner : game1.getWinner()});
      game_over = 1;
      setTimeout(function(){
          //a few seconds have elapsed, now reset everyones position
          for(var _i = 0; _i < players.length; _i++){
              players[_i].setHp(0);
              players[_i].setX(players[_i].getRespawnX());
              util.log("respawning player " +_i +" at " + players[_i].getRespawnX());
              //emit to that player to go to respawn
          }
          game1.setWinner(-1);
          shrine_0.setHp(3000);
          shrine_1.setHp(3000);
          game_over = undefined;
      }, 5000);
	/* Now wait like 5 seconds and reset the game*/

  }

  // update player positions
  for (var _i = 0; _i < players.length; _i++){
      if (players[_i].getCharacterType() === "Fly"){
        if (players[_i].getDescendAttack()){
            util.log("DESCEND ATTACKING");
            players[_i].moveDown();
            players[_i].moveDown();
            players[_i].moveDown();
            players[_i].moveDown();
            players[_i].moveDown();
            players[_i].moveDown();
            break;
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
          players[_i].moveDown();//setY(players[_i].getY()+5);
      }
  }
  /* Algorithm for determining who's hit by a fly... */
  var i;
  var j;
  for (i = 0; i < players.length; i++) {
    if (players[i].getCharacterType() === "Fly" && players[i].getDescendAttack()){
      //    util.log("ok\t"+players[i].getTeam()+ "\tx:" + (players[i].getX()+canvas_width/2));
      //   util.log("ok\t"+shrine_0.getTeam()+ "\tx:" + (shrine_0.getX()));
      //  util.log("--"+ (players[i].getX() +canvas_width/2 -shrine_0.getX()));
      if  (players[i].getX()+canvas_width/2 - shrine_1.getX() <= 140 && players[i].getX()+canvas_width/2  - shrine_1.getX() >= 40 && players[i].getTeam() != 1 && (shrine_0.hitby[i] == undefined || Date.now() -shrine_1.hitby[i] >= 1000)){
        //util.log("Ttt");
        if (Math.abs(shrine_1.getY() - players[i].getY()) <=150 ){
          shrine_1.setHp(shrine_1.getHp() -25 );
          shrine_1.hitby[i] = Date.now();
        }
      }
      if  (players[i].getX() +canvas_width/2  - shrine_0.getX() <= 140 && players[i].getX()+ canvas_width/2 - shrine_0.getX() >= 40 && players[i].getTeam() != 0 &&( shrine_0.hitby[i] == undefined || Date.now() -shrine_0.hitby[i] >= 1000)){
        if (Math.abs(shrine_0.getY() - players[i].getY()) <= 150){ // shanker made contact at 114
          shrine_0.setHp(shrine_0.getHp() -25 );
          shrine_0.hitby[i] = Date.now();
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
            }
          }
        }
      }
    }
  }

  /* Iterate through every spell, if it hits someone then let them take the hit son : D */
  for (i = 0; i < server.Spells.spellsarray.length; i++){
    if  (server.Spells.spellsarray[i].getX() - shrine_1.getX() <= 70 && server.Spells.spellsarray[i].getX()  - shrine_1.getX() >= -70 && server.Spells.spellsarray[i].caster_team != 1){
      if (Math.abs(shrine_1.getY() - server.Spells.spellsarray[i].getY()) <=150 ){
        shrine_1.setHp(shrine_1.getHp() -25 );
      }
    }
    if  (server.Spells.spellsarray[i].getX()  - shrine_0.getX() <= 70 && server.Spells.spellsarray[i].getX() - shrine_0.getX() >= -70 && server.Spells.spellsarray[i].caster_team != 0){
      //util.log("made x");
      if (Math.abs(shrine_0.getY() - server.Spells.spellsarray[i].getY()) <= 150){ // shanker made contact at 114
        shrine_0.setHp(shrine_0.getHp() -25 );
      }
    }

    for (var j = 0; j < players.length; j++) {
      //indexof garbage so a player can only be hurt once by any given spell
      if ( players[j].getTeam() != server.Spells.spellsarray[i].caster_team && Math.abs(server.Spells.spellsarray[i].getX()-300 -players[j].getX() ) <= 35 && server.Spells.spellsarray[i].hit.indexOf(players[j].id) === -1){
        if (Math.abs(server.Spells.spellsarray[i].getY() - players[j].getY()) <= 150 ){
          server.Spells.spellsarray[i].hit.push(players[j].id); 
          //var life_status = players[j].setHp(players[j].getHp() - server.Spells.spellsarray[i].getDamage());
          setHp( players[j], server.Spells.spellsarray[i].getDamage());
        }
      }
    }

    server.Spells.spellsarray[i].update();
  };
    
  for (var j = 0; j < players.length; j++){
      server.libs.io.sockets.emit('update player', { id: players[j].id, x: players[j].getX(), y: players[j].getY(), hp: players[j].getHp() });
  }

  /* Method for telling all the units about the health of the structures and stuff */
  sendUpdatedGame(); 
  setTimeout(function(){
    server.updateGameVariables();
  }, 1000 /15);
};

/* LETS TELL IF SOMEBODY is hit on the server */


function setHp(hitPlayer, damage){ //where hitplayer is like players[i]
  var alive =  hitPlayer.setHp(hitPlayer.getHp() -damage); //sets the damage
  //    io.sockets.connected[data.hit_by].emit('set gold', { gold: hitBy.getGold()+1 });
  //emits to only the player that was hit
  server.libs.io.sockets.connected[hitPlayer.id].emit('set hp', { hp: hitPlayer.getHp() });

  if (alive !== "alive"){ //dudes dead
  }

}
  var sendUpdatedGame = function(){
    //emit something to all players 
    //util.log("SOON YOU WILL ALL DIE");
    server.libs.io.sockets.emit('shrine hp', {zero: shrine_0.getHp(), one : shrine_1.getHp()});
  };

init();
