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

/* startY isn't necessary, but neither is swag */
var Meteor = function(meteorX, mCaster){
  var caster = mCaster;
  var x =meteorX, 
      y = -100,
      active = true; //active spells can hurt this specific client 
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
         getDamage: getDamage
  }
};
exports.Meteor = Meteor;
exports.Spells = Spells;
