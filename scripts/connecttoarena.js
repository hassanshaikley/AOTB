function enterQueue(){ 
  socket.emit("queue for arena", {thing: "hi"});
  console.log("entering queue");
};