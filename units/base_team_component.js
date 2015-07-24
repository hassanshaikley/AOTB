var Config = require("../config.js")
exports.BaseTeamComponent = function(that, team){

	that.getTeam = function(){
		return team;
	};

	that.setTeam = function(newTeam){
		var util = require("util");

		if (newTeam == null){
			var newTeam = Math.round(Math.random());		
		}
		var randomOffset = Math.floor(Math.random() * ( 200 )) - 100;
		if (newTeam == 1){
			that.respawnX = Config.ARENA_WIDTH + 1000 - 100 + randomOffset;
		} else {
			that.respawnX = 1100 + randomOffset;
		}
		that.x = that.respawnX;

		util.log("setting team to " + newTeam);
		team = newTeam;
	}


		

	this.update = function(){
		//update which team a player is on?
	}
}