
m_cd = 1000; //cooldowns : D
h_cd = 1000;
var Spells = {
spellsarray: [],

						 afunction: function() {

						 }
};
var BowmanArrow = function(startX, startY, _caster){
	this.hit =[];
	var caster = _caster;
	var x= startX, y = startY;
	var update = function(){

	};

	var getHalfWidth = function(){
		return 50;
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
	var doEffect = function(player){
		//heh
	}
	return {
       update : update,
			 getX: getX,
			 setX: setX,
			 getDamage : getDamage,
			 getHalfWidth : getHalfWidth,
			 doEffect : doEffect
	}
};

var Meteor = function(meteorX, mCaster, _team){
	var caster = mCaster;
	var caster_team;
	this.hit = [];
	var team = _team;

	this.getHalfWidth = function(){
		return 15;
	};

	this.getTeam = function(){
		return team;
	}

	var x =meteorX, 
			y = -100,
			active = true; //active spells can hurt this specific client  - this makes absolutely no sense. lol

	this.getDamage = function(){
		return 25;
	};

	this.update = function(){
		y += 50;
		//x += 2;
		var index = Spells.spellsarray.indexOf(this);
		if (y >= 500){
			Spells.spellsarray.splice(index, 1);
		};
	};

	this.doEffect = function(player){
		//do nothing
	}
	this.getX = function(){
		return x;
	};

	this.getY = function(){
		return y;
	};
	this.getDamage = function(){
		return 25;
	};
	return this;
};

exports.Meteor = Meteor;
exports.Spells = Spells;
exports.BowmanArrow = BowmanArrow;
