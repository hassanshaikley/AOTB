/**************************************************
 ** SERVER CLASS FOR THE GAME
 **************************************************/

/* SETTINGS FILE IS FULL OF GLOBAL VARIABLES BEWARE */
var initialize    = require("./initialize");        initialize.load();
events          = require("./events").Events;   var event_handler  = new events(); 
var Spells      = require("./spellsandprojectiles").Spells;

var Skelly        = require("./skelly").Skelly;


function init() {
  /* Start the event handling */
  event_handler.setEventHandlers();
  // add two hostiles lol
  var sk = new Skelly(0); //Team Zero
  AI.push(sk);
  var sk = new Skelly(1); //Team One
  AI.push(sk);
  /* Add Neutrals to Server */
  setInterval(function(){
    updateGameVariables();
  }, 1000 /15);
};

/* Function for performing computations on the server! ..I think. */
function updateGameVariables(){
  /* Every x seconds, spawn AI's*/
  /* Manage AI behavior */
  manageAI();

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
              players[j].hitby[i] = Date.now();
            }
          }
        }
      }
    }
  }

  /* Iterate through every spell, if it hits someone then let them take the hit son : D */
  for (i = 0; i < Spells.spellsarray.length; i++){
    util.log("ok\t0\t" + (Spells.spellsarray[i].caster));
    if  (Spells.spellsarray[i].getX() - shrine_1.getX() <= 70 && Spells.spellsarray[i].getX()  - shrine_1.getX() >= -70 && Spells.spellsarray[i].caster_team != 1){
      util.log("Ttt");
      if (Math.abs(shrine_1.getY() - Spells.spellsarray[i].getY()) <=150 ){
        util.log("made y");
        shrine_1.setHp(shrine_1.getHp() -25 );
      }
    }
    if  (Spells.spellsarray[i].getX()  - shrine_0.getX() <= 70 && Spells.spellsarray[i].getX() - shrine_0.getX() >= -70 && Spells.spellsarray[i].caster_team != 0){
      //util.log("made x");
      if (Math.abs(shrine_0.getY() - Spells.spellsarray[i].getY()) <= 150){ // shanker made contact at 114
        util.log("Swoon");
        shrine_0.setHp(shrine_0.getHp() -25 );
      }
    }

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

  /* Method for telling all the units about the health of the structures and stuff */
  event_handler.sendUpdatedGame(); 
};

function manageAI(){
  var i;
  for (i = 0 ; i < AI.length; i++){
    //Now adequately control the AI : D
    AI[i].update(); 
  }
}
/* LETS TELL IF SOMEBODY is hit on the server */

/*
   for (var _i = 0; _i <players.length; _i++){
   util.log("player " + _i+" in Zone " +players[_i].getZone());
   }
 */

function setHp(hitPlayer, damage){ //where hitplayer is like players[i]
  var alive =  hitPlayer.setHp(hitPlayer.getHp() -damage); //sets the damage
  //    io.sockets.connected[data.hit_by].emit('set gold', { gold: hitBy.getGold()+1 });
  //emits to only the player that was hit
  io.sockets.connected[hitPlayer.id].emit('set hp', { hp: hitPlayer.getHp() });

  if (alive !== "alive"){ //dudes dead
  }

}

init();
