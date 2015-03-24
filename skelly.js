/**************************************************
 ** Skelly 
 **************************************************/
Player = require("./player").Player;
var util = require("util");

var Skelly = function( _team){
  var name = "Skelly";
  var hp = 50;
  var y = 300;
  var x;

  //
  

  /* Team determiens where you spawn : D */
  if (_team === 1){
    x = 0;
    enemyShrine = shrine_0;
  } else {
    x = 3000;
    enemyShrine = shrine_1;
  }

  var skeleton = new Player(x, y, hp, name);
  skeleton.setId(-1);//what. I suppose it has an ID of -1
  skeleton.setTeam(_team);
  var speed = 10; // speed
  skeleton.getCharacterType = function(){
    return "Skelly";
  };

  /* Function for attackign and stuff */
  skeleton.update = function(){
     //iterate through every player, if they are close enough attack them, otherwise move on --then same for AIs -- then for building 
    var z;
    var focusEntity = determineFocusEntity(); // used to select the entity this AI is targetting
    if (focusEntity.getX() - skeleton.getX() > 50){
 //     skeleton.setX(skeleton.getX() + speed);
    } else if (focusEntity.getX() - skeleton.getX() < -50){
   //   skeleton.setX(skeleton.getX() - speed);
    } else { //no need to move

    }

  };

  function determineFocusEntity(){
    var ret;
    //Determining focus entity
    for (var z = 0; z < players.length; z++){
      // if close enough attack them,
      //has to ve a player on the opposite team
      //should take y value into account too
      if ( players[z].getTeam() != skeleton.getTeam() && Math.abs(players[z].getX() - skeleton.getX()) <=400){ //if a player is close enough 
        // else move toward them// if close enough attack them,
        ret = players[z];
      } else {
        ret = enemyShrine;
      }
    }

    for (var z = 0; z < AI.length; z++){
      if ( AI[z].getTeam() != skeleton.getTeam() && Math.abs(AI[z].getX() - skeleton.getX()) <=400){ //if a AI is close enough 
        // else move toward them// if close enough attack them,
        ret = AI[z];
      } else {
        ret = enemyShrine;
      }

    }
    return ret;
  }

  return skeleton;
};

exports.Skelly = Skelly;
