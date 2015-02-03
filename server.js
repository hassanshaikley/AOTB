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
  /* Algorithm for determining who's hit */
  var i;
  for (i = 0; i < players.length; i++) {
    if (players[i].getCharacterType() === "Fly" && players[i].getDescendAttack()){
       
    }
  }

  /* Iterate through every spell, if it hits someone then let them take the hit son : D */
  for (i = 0; i < Spells.spellsarray.length; i++){
    for (j = 0; j < players.length; j++) {
      if (Math.abs(Spells.spellsarray[i].getX()-300 -players[j].getX() ) <= 100 ){
        //   util.log("M_x " + Spells.spellsarray[i].getX() + "\t P_x:" + players[j].getX());
        if (Math.abs(Spells.spellsarray[i].getY() - players[j].getY()) <= 150 ){
//          util.log("M_y " + Spells.spellsarray[i].getY() + "\t P_y:" + players[j].getY());
          var life_status = players[j].setHp(players[j].getHp() - Spells.spellsarray[i].getDamage());
          //set HP
          //emit to everyone he dies -- or rather emit to everyone he has moved!?? idk yoloswag
           

          util.log("new hp " + players[j].getHp());
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


init();
