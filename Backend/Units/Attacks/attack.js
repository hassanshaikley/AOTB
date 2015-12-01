/* This works for meelee attacks
*/
//What about for spells? Spells need an x and a y, but they also contain this information.
exports.Attack = function(options){
	this.getDamage  =  function () { return options["damage"]; }
	this.getTeam = function(){ return options["team"]; }
	this.doEffect = options["effect"];
};
