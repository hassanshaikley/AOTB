var toggle = 1;


function Chat(){

}


var loadChat = function(){
  Chat.displayObject = new PIXI.Container(); //add static member variable to chat.
  MAIN.stage.addChild(Chat.displayObject);

  $(document).keypress(function(e) {
  if(e.which == 13) {
    if ($("#text").is(":focus")){
      //send message
      if( $("#text").val()) {
        $('#send').click();
      } else {

      }
      $("#text").blur();

    }
    if (toggle == 1){
      $("#text").focus();
      toggle = 0;
    } else {
      $("canvas")[0].focus();
      toggle = 1;
    }

  }
});

if (localPlayerName === "unknown"){
  $('#chat').append("<strong>ADMIN:</strong> hi <br />");
  $('#chat').append("<strong>ADMIN:</strong> Move with WASD <br />");
  $('#chat').append("<strong>ADMIN:</strong> Attack with Right Click <br />");
  $('#chat').append("<strong>ADMIN:</strong> Chat with enter <br />");
  if (remotePlayers.length == 0){

    $('#chat').append("<strong>ADMIN:</strong> Nobody else is connected right now : (<br />");
  }
}



var chat_scroll = document.getElementById("chat");
chat_scroll.scrollTop = chat_scroll.scrollHeight;

socket.on('message', function (data) {
  var speaker = playerById(data.id);
  console.log(speaker);

  if (speaker == false){

    $('#chat').append("<strong>" + localPlayer.getName() +":</strong> " + data.text + '<br />');
    localPlayer.speaks(data.text);
  } else {
    $('#chat').append("<strong>" + speaker.getName() +":</strong> " + data.text + '<br />');
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



message.x = 768-150;
message.y =  300;

Chat.displayObject.addChild(message);



});


$('#send').click(function () {

  if ($("#text").val()){
    socket.emit('sendMessage',
      { text: $('#text').val() });
    $('#text').val('');
  }
});

$('#chat_outer').mousedown(function(e){
  e.preventDefault();
});
 $('#chat_outer').bind('contextmenu', function(){ return false });
}

function notify(text){
 $('#chat').append(text + "</br>");
var chat_scroll = document.getElementById("chat");

  chat_scroll.scrollTop = chat_scroll.scrollHeight;

};
