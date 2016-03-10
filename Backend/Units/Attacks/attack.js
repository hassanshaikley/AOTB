/* This works for meelee attacks
*/
//What about for spells? Spells need an x and a y, but they also contain this information.
//spells need get team, do effect
exports.Attack = function(options){
	this.getDamage  =  function () { return options["damage"]; }
	this.getTeam = function(){ return options["team"]; }
	this.doEffect = options["effect"];
	this.getDirection = function(){ return options["direction"];}
};
