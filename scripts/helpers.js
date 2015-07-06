var helpers = {};
helpers.xAdd = 210;
helpers.addThumbToActionBar = function(image, description){
    console.log("HI");
    MAIN.BOTACTIONBAR.addChild(image);
    image.position.x = this.xAdd;

    this.xAdd+=50;

};
