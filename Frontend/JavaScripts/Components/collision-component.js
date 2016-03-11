/*
 * In order for things to be collidable they need this!
 */
var CollisionComponent = function(that, width, height) {
    that.getWidth = function() {
        return width;
    };
    that.getHeight = function() {
        return height;
    };
};