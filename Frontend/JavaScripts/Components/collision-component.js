/*
 * In order for things to be collidable they need this!
 */
var CollisionComponent = function(that, width, height, offset_x, offset_y) {
    that.offset_x = offset_x;
    that.offset_y = offset_y;
    that.getWidth = function() {
        return width;
    };
    that.getHeight = function() {
        return height;
    };
};
