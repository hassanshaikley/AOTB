var MeeleeAttackComponent = function(that) {
    /* Returns a box with an x, y, width and height */
    that.getMeeleeAttackBoundingBox = function() {
        var direction = that.getMoveDirection();
        var center_x = that.getX() - 20;
        var center_y = that.getY() - 15;
        var box_width = 20;
        switch (that.getCharacterType()) {
            case "Shanker":
                if (direction === "right") {
                    center_x += 50;
                } else {
                    center_x -= 10;
                }
                break;
            case "Redhatter":
                box_width = 35;
                if (direction === "right") {
                    center_x += 60;
                } else {
                    center_x -= 28;
                }
                center_y += 10;
                break;
            case "Fly":
                if (direction === "right") {
                    center_x += 63;
                } else {
                    center_x -= 28;
                }
                center_y += 55;
                break;
            case "Grimes":
                if (direction === "right") {
                    center_x += 50;
                } else {
                    center_x -= 15;
                }
                center_y += 10;
                break;
        }
        var ret = {
            getX: function() {
                return center_x;
            },
            getY: function() {
                return center_y;
            },
            getWidth: function() {
                return box_width;
            },
            getHeight: function() {
                return box_width;
            }
        };
        return ret;
    };
};
