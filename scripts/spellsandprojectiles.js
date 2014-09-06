/* All the server needs to know is the spawn point of the meteor 
 * Then the clients will calculate if they are hit, and if they are
 * then it sends who hit them, as well as how much damage has been done 
 * to them to the server!
 * 
 */
var Spells = {

    meteor: function() {
    	console.log("Meteor Cast");
    	var m = new Meteor(0,0);
    	socket.emit("meteor cast", {x: m.getX()});
    },

    yoloswag: function() {
    	console.log("Yolo Swag");
    }
};

/* startY isn't necessary, but neither is swag */
var Meteor = function(startX, startY){
	var x = startY, y = 0;

	var updatePosition = function(){

	};
	var getX = function(){
		return x;
	};
	var getY = function(){
		return y;
	};

	/* Should return what first y should be */
	var calculateStartY = function(){
		return 50;
	};

	var draw = function(){

	};

	return {
		updatePosition: updatePosition,
		getX : getX,
		getY : getY,
		draw : draw
		}
};