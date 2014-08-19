    /**************************************************
     ** GAME PLAYER CLASS
     **************************************************/


    var flyAnimate = 0;
    var localX;

    var floorHeight = 474;
    var toggle = 1;

    var Player = function(startX, startY, startHp, _name) {

      var x = startX,
          y = startY,
         name = _name,
          hp = 100, 
          id,
          moveAmount = 3,
          wobble = 0,
          leftMouseAction = false,
          rightMouseActionHappening = false,
          descendAttack = false,
          descendAttackSpeed = 10,
          alive = true;
                // Getters and setters
      var getX = function() {
        return x;
      };
      var getHp = function(){
        return hp;
      };
        var getName = function(){
      return name;
    };
    var setName = function(newName){
      name = newName;
    };

      var setHp = function(newHp){
        hp = newHp;
        if (hp <= 0){
          alive = false;
        }
      };

      var getDescendAttack = function(){
        return descendAttack;
      };

      var setDescendAttack = function(boolean_thing){
        descendAttack = boolean_thing;
      };
      var getY = function() {
        return y;
      };

      var setX = function(newX) {
        x = newX;
      };

      var setY = function(newY) {
        y = newY;
      };


      // Update player position
      var update = function(keys) {
        for (i = 0; i < remotePlayers.length; i++) {
          if ((!remotePlayers[i].hitme || (Math.abs(Date.now() - remotePlayers[i].hitme) ) > 500 )){
          if (remotePlayers[i].id && Math.abs(remotePlayers[i].getX() - localPlayer.getX()) <= 40 && Math.ceil(remotePlayers[i].getY()-localPlayer.getY()) <=  25 && remotePlayers[i].getDescendAttack()){
            
            console.log("i have been hit");
            //hit by a guy so I shouldnt be ablet o be hit by them for a few seconds
            localPlayer.setHp(localPlayer.getHp()-25);
            socket.emit("descend attack hits");
            remotePlayers[i].hitme = Date.now();
          }
        }
             
                //only works if I HIT SOMEONE
      }

        wobble--;
        localX = x;
        // Previous position
        var prevX = x,
            prevY = y;

        //if (Math.floor(Math.random()*50) == 1)

        if (descendAttack == false){
          // Up key takes priority over down
          if (keys.up && y >-16) {
            y -= moveAmount;
          } else if (keys.down) {
            y += moveAmount;
          };
          if(wobble > 0 && y <= floorHeight){
            y+=1;
          } else if (y <= floorHeight) {
            y-=.5;
          }
          if (wobble <=-20){
            wobble = 20;
          }
          if (y >=floorHeight+1){
            y=floorHeight+1;
          }
          // Left key takes priority over right
          if (keys.left) {
            x -= moveAmount;
            localX -= moveAmount;
          } else if (keys.right) {
            x += moveAmount;
            localX += moveAmount;
          };
        }
        else {
          if ( y >= floorHeight-1){
            descendAttack = false;
            y = floorHeight+1;
            rightMouseActionHappening = false;
          } else {
            y+=descendAttackSpeed;
          }
        }
        return (prevX != x || prevY != y) ? true : false;
      };

      // Draw player
      var draw = function(ctx) {

        if (flyAnimate >= 30){
          flyAnimate = 0;
        }
        var bugX = canvas.width/2 + x - localX - 50;
        if (alive){
          ctx.fillStyle="#FF0000";
          ctx.fillRect(bugX+30,y-50,((hp/2.2)),6);
        } else {
           ctx.fillText("DEAD", bugX + 37, y-40);
        }




        if (flyAnimate <= 10){
          ctx.drawImage(fly,0,0, 100, 100, bugX,y-50, 100, 100);
        }
        else if (flyAnimate <= 20){
          ctx.drawImage(fly,100,0, 100, 100, bugX,y-50, 100, 100);
        }
        else if (flyAnimate <= 30){
          ctx.drawImage(fly,200,0, 100, 100, bugX,y-50, 100, 100);
        }
        ctx.drawImage(silverShield, bugX+ 20, y-3);


        if (descendAttack || rightMouseActionHappening){
          if (!rightMouseActionHappening){
            rightMouseActionHappening = true;
          }
          //200 is pretty badass
        } 
        
        if (descendAttack) {
          ctx.save();

          ctx.translate(bugX+60, y-40 + 90);
          ctx.rotate(Math.PI);
          ctx.drawImage(silverSword, 0, -10);

          ctx.restore();

        } else {
            ctx.drawImage(silverSword, bugX+ 60, y-40);
          }
        flyAnimate++; 

        ctx.fillStyle = "#5ab039";
        ctx.font = "bold 14px sans-serif";
        ctx.fillText(name, bugX + 22, y-60);
        ctx.fillStyle = "black";
        ctx.font = "bold 13px sans-serif";
        ctx.fillText(name, bugX + 25, y-60);


      };
      var rightClick = function(){
        //rightMouseAction = true;
        setDescendAttack(true);
      }
      var leftClick = function(){
        lefttMouseAction = true;
      }

      // Define which variables and methods can be accessed
      return {
        getX: getX,
          getY: getY,
          getX: getX,
          setX: setX,
          setY: setY,
          update: update,
          draw: draw,
          getHp : getHp,
          setHp : setHp,
          setName : setName,
          getName : getName,
          rightClick: rightClick,
          leftClick: leftClick,
          getDescendAttack : getDescendAttack,
          setDescendAttack : setDescendAttack

      }
    };

