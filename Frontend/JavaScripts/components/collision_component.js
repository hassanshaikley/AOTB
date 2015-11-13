/*
 * In order for things to be collidable they need this!
 */
var CollisionComponent = function(that, width, height) {
    console.log("HII MADE A COL COMP");
    that.getWidth = function() {
        return width;
    };
    that.getHeight = function() {
        return height;
    };
};