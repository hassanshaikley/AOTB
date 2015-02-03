/**************************************************
 ** SERVER CLASS FOR THE GAME
 **************************************************/

/* SETTINGS FILE IS FULL OF GLOBAL VARIABLES BEWARE */
var initialize    = require("./initialize");        initialize.load();
events          = require("./events").Events;   var event_handler  = new events(); 
var Spells      = require("./spellsandprojectiles").Spells;

function init() {
  /* Start the event handling */
  event_handler.setEventHandlers();
  /* Add Neutrals to Server */
  //var sk = new Skelly( 800, 400,100, "Skelly");
  //NPCs.push(sk);

  setInterval(function(){
    updateGameVariables();
  }, 1000 /15);
};

/* Function for performing computations on the server! ..I think. */
function updateGameVariables(){
  /* Algorithm for determining who's hit by a fly... */
  var i;
  var j;
  for (i = 0; i < players.length; i++) {
    if (players[i].getCharacterType() === "Fly" && players[i].getDescendAttack()){
      for (j = 0; j < players.length; j++){
        if (i != j){  //so a player does not attack him/herself
          if (Math.abs(players[i].getX() - players[j].getX()) <= 30 && (players[j].hitby[i] == undefined || Date.now() -players[j].hitby[i] >= 1000)){
            if (Math.abs(players[i].getY() - players[j].getY()) <= 100){
            //  var life_status = players[j].setHp(players[j].getHp() - 25);
              setHp(players[j], 25);
              util.log("new hp " + players[j].getHp());
              players[j].hitby[i] = Date.now();
            }
          }
        }
      }
    }
  }

  /* Iterate through every spell, if it hits someone then let them take the hit son : D */
  for (i = 0; i < Spells.spellsarray.length; i++){
    for (j = 0; j < players.length; j++) {
      //indexof garbage so a player can only be hurt once by any given spell
      if (Math.abs(Spells.spellsarray[i].getX()-300 -players[j].getX() ) <= 35 && Spells.spellsarray[i].hit.indexOf(players[j].id) === -1){
        if (Math.abs(Spells.spellsarray[i].getY() - players[j].getY()) <= 150 ){
          Spells.spellsarray[i].hit.push(players[j].id); 
          //var life_status = players[j].setHp(players[j].getHp() - Spells.spellsarray[i].getDamage());
          setHp( players[j], Spells.spellsarray[i].getDamage());
        }
      }
    }
    Spells.spellsarray[i].update();
  };

};
/* LETS TELL IF SOMEBODY is hit on the server */

/*
   for (var _i = 0; _i <players.length; _i++){
   util.log("player " + _i+" in Zone " +players[_i].getZone());
   }
 */
// var hostile = NPCs[0];
//  io.emit("update hostile", {id: hostile.id, x: hostile.getX(), y: hostile.getY(), name: hostile.getName(), characterType : hostile.getCharacterType(), hp : hostile.getHp()});

function setHp(hitPlayer, damage){ //where hitplayer is like players[i]
  var alive =  hitPlayer.setHp(hitPlayer.getHp() -damage); //sets the damage
  //    io.sockets.connected[data.hit_by].emit('set gold', { gold: hitBy.getGold()+1 });
  //emits to only the player that was hit
  io.sockets.connected[hitPlayer.id].emit('set hp', { hp: hitPlayer.getHp() });

  if (alive !== "alive"){ //dudes dead
  }

}

init();
