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
      $("gameCanvas").focus();
      toggle = 1;
    }        

  }
});

var chat_scroll = document.getElementById("chat");
chat_scroll.scrollTop = chat_scroll.scrollHeight;
socket.on('message', function (data) {
  var speaker = playerById(data.id);
  console.log("id: " + data.id);
  console.log(speaker);
  if (speaker == false){
  $('#chat').append("<strong>" + localPlayer.getName() +":</strong> " + data.text + '<br />');
    localPlayer.speaks(data.text);
  } else {
  $('#chat').append("<strong>" + speaker.getName() +"</strong> " + data.text + '<br />');
    speaker.speaks(data.text);
  }
  chat_scroll.scrollTop = chat_scroll.scrollHeight;
});

$('#send').click(function () {
  socket.emit('sendMessage', 
    { text: $('#text').val() });
  $('#text').val('');
});
