var position = function(_x, _y){
    if (_x){
        this.x = _x;
    } else {
        this.x =0;
    }
    if (_y){
        this.y = _y;
    } else {
        this.y = 0;
    }
    return this;
};
