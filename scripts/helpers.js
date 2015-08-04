var helpers = {};
helpers.xAdd = 210;
helpers.addThumbToActionBar = function(image, description){
    console.log("HI");
    MAIN.BOTACTIONBAR.addChild(image);
    image.position.x = this.xAdd;

    this.xAdd+=50;

};

helpers.collision = function(thing1, thing2){
    var xDist = Math.abs(thing1.getX() - thing2.getX());
    var yDist = Math.abs(thing1.getY() - thing2.getY());

    if (xDist <= thing1.getWidth()/2  + thing2.getWidth()/2){
        console.log("X Collides");
        if (yDist <= thing1.getHeight()/2 + thing2.getHeight()/2){
            console.log("Y Collides");
            return true;
        }
    };
    return false;
};
