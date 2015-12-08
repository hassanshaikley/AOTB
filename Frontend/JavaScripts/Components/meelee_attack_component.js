var MeeleeAttackComponent = function(that) {
    /* Returns a box with an x, y, width and height */
    that.addNewMeeleeAttack = function(attack_id, belongs_to) {
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
                    center_x += 70;
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
                center_y += 75;
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

        var box_height = box_width;
        var mt = new MeeleeAttack(center_x, center_y, box_width, box_height, attack_id, belongs_to);
    };
};
