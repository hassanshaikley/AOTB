/**************************************************
 ** SERVER CLASS FOR THE GAME
 **************************************************/

/* SETTINGS FILE IS FULL OF GLOBAL VARIABLES BEWARE */
var settings = require("./settings");
 //_settings    = new settings();
settings.load();
events        = require("./events").Events;
var event_handler = new events(); //new singleton to handle events : D

players = [];  // Array of connected players

function init() {
  // Create an empty array to store players
  hostiles = [];

  /* Add Neutrals to Server */
  //var sk = new Skelly( 800, 400,100, "Skelly");
  //hostiles.push(sk); 


  event_handler.setEventHandlers();
  //  setInterval(function(){
  //   updateGameVariables();
  // }, 1000 /2);
};


server.listen(port, function() {
  console.log("Listening on " + port);
});


function updateGameVariables(){
  /*
     for (var _i = 0; _i <players.length; _i++){
     util.log("player " + _i+" in Zone " +players[_i].getZone());
     }
   */
  // var hostile = hostiles[0];
  //  io.emit("update hostile", {id: hostile.id, x: hostile.getX(), y: hostile.getY(), name: hostile.getName(), characterType : hostile.getCharacterType(), hp : hostile.getHp()});

};

init();
