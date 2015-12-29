var ActionbarComponent = function(that){
    option_menu = new OptionMenu();

    var spells_thumb_array = [];
    var spells_description_array = [];
   // All cahracters have a sword thumb
   var sword_thumb = new PIXI.Sprite(PIXI.Texture.fromFrame("attack1_icon_v3.fw.png"));


    sword_thumb.interactive = true;

    spells_thumb_array.push(sword_thumb);
//    spells_description_array.push("Meelee Attack\nLeft Click\nRange: 50\ Cooldown: 1s");
    spells_description_array.push (generateDescription({
        name: "Meelee Attack",
        key: "Left Click",
        description: "Standard Meelee Attack",
        cooldown: "1s"
    }));
    var cd_one = 1000;
    var cd_two = 0;
    var cd_three = 0;
    var add = 50;

    /* Array filled with the description of the spells*/
    var tooltips = [];
    tooltips[0] = "Standard Close Range Meelee Attack - Left Click \n Cooldown: 1s";


    if (that.getCharacterType() == "Shanker"){
        var invis_thumb = new PIXI.Sprite(PIXI.Texture.fromFrame("invisibility_icon_v4.fw.png"));
        //        spells_description_array.push("Shadow Walk\nGo invisible for 4 seconds. \nAttack does extra damage\nand breaks invisibility.\nRight Click\nCooldown: 5s\nDuration: 5s");
        spells_description_array.push (generateDescription({
            name: "Shadow Walk",
            key: "Right Click",
            description: "Go invisible for 4 seconds. \nAttack does extra damage\nand breaks invisibility",
            cooldown: "5s"
        }));
        spells_thumb_array.push(invis_thumb);
        cd_two = 5000;


    };
    if (that.getCharacterType() == "Redhatter"){
        var fireball = new PIXI.Sprite(PIXI.Texture.fromFrame("fireball.png"));
        var rhrangethumb = new PIXI.Sprite(PIXI.Texture.fromFrame("rh_range.png"));
        spells_description_array.push (generateDescription({
            name: "Meteor",
            key: "Right Click",
            description: "Cast a meteor from the sky",
            cooldown: "5s"
        }));
        spells_description_array.push (generateDescription({
            name: "Blob",
            key: "q ",
            description: "Fire a blob! Damages the \nfirst unit it hits.",
            cooldown: "700ms"
        }));


        spells_thumb_array.push(fireball);
        spells_thumb_array.push(rhrangethumb);

        cd_two = 3000;
        cd_three = 700;

    };
    if (that.getCharacterType() == "Fly"){
        var descend_thumb = new PIXI.Sprite(PIXI.Texture.fromFrame("descend_thumb.png"));

        var fly_carry_thumb = new PIXI.Sprite(PIXI.Texture.fromFrame("fly_carry_thumbnail.png"));
        spells_description_array.push (generateDescription({
            name: "Descend Attack",
            key: "Right Click",
            description: "Come crashing downwards\nfrom the sky. Damaging the\nunits in your path.",
            cooldown: "10s"
        }));
        spells_description_array.push (generateDescription({
            name: "Grab",
            key: "q ",
            description: "Stand above a unit and then \ncarry them off!",
            cooldown: "6s",
            duration: 3000
        }));

        spells_thumb_array.push(descend_thumb);
        spells_thumb_array.push(fly_carry_thumb);

        cd_two = 10000;
        cd_three = 6000;

    }
    if (that.getCharacterType() == "Grimes"){
        var tort_stun = new PIXI.Sprite(PIXI.Texture.fromFrame("tortstunthumb.png"));
        spells_description_array.push (generateDescription({
            name: "Tort Stun",
            key: "Left Click",
            description: "Create a small earthquake. \nImmobilizing units for a\nshort amount of time.",
            duration: "400ms",
            cooldown: "3s"
        }));
        spells_thumb_array.push(tort_stun);

        cd_two = 3000;
    };

    for (var _i = 0; _i < spells_thumb_array.length; _i++) {
        addThumbToActionBar(spells_thumb_array[_i],  spells_description_array[_i]);
    }

    function generateDescription(obj){
        console.log(obj);
        var str = obj.name;
        str += "\n" + obj.description;
        str += "\n\n" + obj.key;
        if (obj.duration){
            str += "\nDuration: " + obj.duration;
        }
        str += "\nCooldown: " + obj.cooldown;
        return str;
    };

    function addThumbToActionBar(image, description) {
        if (!description){
            console.log("Description is missing FUCK U");
        };
        MAIN.BOTACTIONBAR.addChild(image);
        console.log("X ADD IS " + add);
        image.position.x = add;
        image.interactive = true;

        var tooltip = new PIXI.Sprite(PIXI.Texture.fromFrame("tooltip_background.v1.png"));
        tooltip.y = 366;
        tooltip.alpha = .6;
        tooltip.x =  add-33;
        tooltip.visible = false;
       MAIN.stage.addChild(tooltip);

        var text = new PIXI.Text(description, {font:"10px Arial", fill:"black"});
        text.x = add-33+5;
        text.y = 366 + 5;
        text.alpha = 1;
//        tooltip.addChild(text);
        text.visible=  false;
        MAIN.stage.addChild(text);


        image.mouseover = function(mouseData){
            console.log("MOUSE OVER");
            tooltip.visible = true;
            text.visible = true;
        };

        image.mouseout = function(mouseData){
            console.log("MOUSE OUT!");
            text.visible=  false;
            tooltip.visible = false;
        };


        add += 50;
    };

    that.spellCD = function(spell_num){

        var cd = 0;

        if (spell_num == 0){
            cd = cd_one;
        } else if (spell_num == 1){
            cd = cd_two;
        } else if (spell_num == 2){
            cd  = cd_three;
        };
        console.log("cd is " + cd);
        var y = new PIXI.filters.GrayFilter();
        MAIN.BOTACTIONBAR.children[spell_num+1].filters = [y];

        setTimeout(function(){
            MAIN.BOTACTIONBAR.children[spell_num+1].filters = undefined;
        }, cd);
    };
    this.update = function(){


    };
};
