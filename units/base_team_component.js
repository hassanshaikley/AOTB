exports.BaseTeamComponent = function(that, team){
	if (team == null){
		team = 0;
		
	}
	that.team = team;

	this.setTeam = function(){
		var randomOffset = Math.floor(Math.random() * ( 200 )) - 100;
		if (that.team == 1){
			that.respawnX = Config.ARENA_WIDTH + 1000 - 100 + randomOffset;
		} else {
			that.respawnX = 1100 + randomOffset;
		}
		that.x = that.respawnX;
	}

	this.update = function(){
		//update which team a player is on?
	}
}