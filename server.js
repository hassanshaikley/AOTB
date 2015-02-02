/**************************************************
 ** SERVER CLASS FOR THE GAME
 **************************************************/

/* SETTINGS FILE IS FULL OF GLOBAL VARIABLES BEWARE */
var settings    = require("./settings");        settings.load();
events          = require("./events").Events;   var event_handler  = new events(); 


function init() {
  /* Start the event handling */
  event_handler.setEventHandlers();
  /* Add Neutrals to Server */
  //var sk = new Skelly( 800, 400,100, "Skelly");
  //NPCs.push(sk);

  setInterval(function(){
     updateGameVariables();
   }, 1000 /2);
};



/* Function for performing computations on the server! ..I think. */
function updateGameVariables(){
  /*
     for (var _i = 0; _i <players.length; _i++){
     util.log("player " + _i+" in Zone " +players[_i].getZone());
     }
   */
  // var hostile = NPCs[0];
  //  io.emit("update hostile", {id: hostile.id, x: hostile.getX(), y: hostile.getY(), name: hostile.getName(), characterType : hostile.getCharacterType(), hp : hostile.getHp()});

};

init();
