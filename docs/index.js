var express = require("express");
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var moment = require("moment");
var counter = 0
var collection = []
var collectionCount = 0
var clients = io.clients;
var onlineUsers = []
var port = process.env.PORT || 3000;
var app = express();


app.listen(port, function () {
 console.log(`Example app listening on port !`);
});

app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
// http.listen(8080, function () {
//   console.log("listening on *:8080");
// });



io.on("connection", function (socket) {
  const id = counter++;
  console.log(clients)
  console.log(`a user with id ${socket.id} connected`);
  Object.keys(clients).forEach(function(id) { console.log("ID:",id)}); 



  socket.on('new nickname', function(nickname) {
    socket.nickname = nickname;
    onlineUsers.push(socket.nickname)
    console.log(socket.id + " changed nickname to: " + socket.nickname)
    socket.emit('user list', onlineUsers)
});

socket.on('get-markers', function(element){
let userMarkers = [];
collection.forEach(markers => {
  if( markers.nickname == element){
    userMarkers.push(markers)
  }
  
});

console.log(userMarkers)
console.log(element)
socket.emit('get-markers', userMarkers)

})

// socket.on('user list', function(){
 
// })



socket.on('server notification', function(message){
  console.log(message)
});



socket.on('new marker', function(markerData){
  console.log("test "+ collection)
  markerData.forEach(element => {
    if(element != collection){
      collection.push(element)
    }  
  });
  collectionCount = collectionCount++
  console.log(markerData)
  console.log("test "+ collection)
  console.log(collectionCount)
  socket.broadcast.emit("new marker", collection)
})

  socket.on("disconnect", function () {
    console.log(`a user ${socket.id} with nickname ${socket.nickname} disconnected`);
    console.log("Active users: " + clients.sockets)
    onlineUsers.pop(socket.nickname)
  });
})
