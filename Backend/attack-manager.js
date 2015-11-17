var AttackManager = function() {
	var attacks = {};

	this.getAttacks = function(){
		return attacks;
	};
};

exports.AttackManager = AttackManager;