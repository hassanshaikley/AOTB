var toggle = 1;

function Chat() {}
var loadChat = function() {
    Chat.displayObject = new PIXI.Container(); //add static member variable to chat.
    MAIN.stage.addChild(Chat.displayObject);
    $(document).keypress(function(e) {
        if (e.which == 13) {
            if ($("#text").is(":focus")) {
                //send message
                if ($("#text").val()) {
                    $('#send').click();
                } else {}
                $("#text").blur();
            }
            if (toggle == 1) {
                $("#text").focus();
                toggle = 0;
            } else {
                $("canvas")[0].focus();
                toggle = 1;
            }
        }
    });
    if (localPlayerName === "unknown") {
        notify("Welcome to Arena of the Bits. A game where your objective is to break into the enemy castle by destroying the door", true);
        notify("Move with WASD, jump with spacebar, attack by right-clicking and left-clicking and sometimes q.", true);
        notify("Chat with enter", true);
        notify("Red team and green team are differentiated by the colors of their health bars.", true);
        setTimeout(function() {
            notify("This game is in Alpha. Code is pushed to it daily. With that said a lot of bugs emerge, so bare with us and let us know what bugs you run into! Please post feedback and bugs to the FaceBook page or tweet it to @millenialpride.", true);
        }, 15000);
        setTimeout(function() {
            notify("Refresh to randomly pick another character, (refreshing is also a hack to switch teams in the meantime) or sign up to actually be able to pick the character you want to play as!", true);
        }, 1000);
        setTimeout(function() {
            if (remotePlayers.length == 0) {
                notify("It looks like nobody else is connected right now. Send the link to a friend and play with them..or stop by later. Your choice. : )", true);
            } else {
                notify("Somebody else is connected. The hunt is on.", true);
            }
        }, 3000);
    }
    var chat_scroll = document.getElementById("chat");
    chat_scroll.scrollTop = chat_scroll.scrollHeight;
    socket.on('message', function(data) {
        var speaker = playerById(data.id);
        console.log(speaker);
        if (speaker == false) {
            $('#chat').append("<strong>" + localPlayer.getName() + ":</strong> " + data.text + '<br />');
            localPlayer.speaks(data.text);
        } else {
            $('#chat').append("<strong>" + speaker.getName() + ":</strong> " + data.text + '<br />');
            speaker.speaks(data.text);
        }
        var name;
        chat_scroll.scrollTop = chat_scroll.scrollHeight;
        /* if (speaker ){
           name = speaker.getName();
           speaker.speaks();
         } else {
           name =localPlayer.getName()
           localPlayer.speaks();
         }

         message = new PIXI.Text(
          (name + " : "+data.text),
         {font: "10", fill: "white"}
         */
        message.x = 768 - 150;
        message.y = 300;
        Chat.displayObject.addChild(message);
    });
    $('#send').click(function() {
        if ($("#text").val()) {
            socket.emit('sendMessage', {
                text: $('#text').val()
            });
            $('#text').val('');
        }
    });
    /*
    $('#chat_outer').mousedown(function(e){
      e.preventDefault();
    }); */
    $('#chat_outer').bind('contextmenu', function() {
        return false
    });
}

function notify(text, admin) {
    if (admin) {
        text = "<strong>ADMIN: </strong>" + text;
    }
    $('#chat').append(text + "</br>");
    var chat_scroll = document.getElementById("chat");
    chat_scroll.scrollTop = chat_scroll.scrollHeight;
};