exports.Attack = function(options){
	this.getDamage  =  function () { return options["damage"]; }
	this.getTeam = function(){ return options["team"]; }
	this.doEffect = options["doEffect"];
};
