/**************************************************
 ** Spells, Projectile and Attacks all messed with here
 **************************************************/
m_cd = 1000; //cooldowns : D
h_cd = 1000;
var Spells = {
  spellsarray: [],

  afunction: function() {
    /* */
  }
};
var BowmanArrow = function(startX, startY, _caster){
    var hit =[];
    var caster = _caster;
    var x= startX, y = startY;
    var update = function(){

    };
    
    var getX = function(){

	};
    var setX = function(newX){

	};
    var getY = function(){

	};
    var setY = function(newY){

	};
    var getDamage = function(){
	return 25;
	};
    return {
	update : update,
	getX: getX,
	setX: setX,
	getDamage : getDamage
}
};


/* startY isn't necessary, but neither is swag */
var Meteor = function(meteorX, mCaster){
  var caster = mCaster;
  var caster_team;
  var hit = [];

  var x =meteorX, 
      y = -100,
      active = true; //active spells can hurt this specific client  - this makes absolutely no sense. lol

    util.log("meteor x is " + x);

    var getDamage = function(){
	     return 25;
	};

  var update = function(){
    y += 50;
    //x += 2;
    var index = Spells.spellsarray.indexOf(this);
    if (y >= 500){
      Spells.spellsarray.splice(index, 1);
    };
  };

  var getX = function(){
    return x;
  };

  var getY = function(){
    return y;
  };
  var getDamage = function(){
    return 25;
  };
  return {

         getX : getX,
         getY : getY,
         update : update,
         active : active,
         caster : caster,
         caster_team : caster_team,
         getDamage: getDamage,
         hit : hit
  }
};

exports.Meteor = Meteor;
exports.Spells = Spells;
exports.BowmanArrow = BowmanArrow;
