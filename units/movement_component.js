exports.MovementComponent = function(){

    this.update = function(that){
        if(that.left){
            that.moveLeft();
            }
        if (that.right){
            that.moveRight();
            }
        if (that.up){
            that.moveUp();
            }
        if (that.down){
            that.moveDown();
            }


    }

};
