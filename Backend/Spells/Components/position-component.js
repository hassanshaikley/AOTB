/*
 */
exports.PositionComponent = function(that, x, y) {
    var x = x || 0;
    var y = y || 0;

    that.getX = function() {
        return x;
    };
    that.getY = function() {
        return y;
    };

    that.setX = function(_x){
    	x = _x;
    };
    that.setY = function(_y){
    	y = _y
    };

};