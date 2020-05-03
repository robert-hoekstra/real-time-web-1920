var express = require("express");
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var moment = require("moment");
var counter = 0
var collection = []
var collectionCount = 0
var onlineUsers = []

app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
http.listen(8080, function () {
  console.log("listening on *:8080");
});



io.on("connection", function (socket) {
  const id = counter++;
  console.log(`a user with id ${socket.id} connected`);
  socket.emit("server message", `SERVER: Welcome, you are user number: ${id}!`);
  socket.broadcast.emit(
    "server message",
    `SERVER: User ${id} joined the chat!`
  );

  socket.on('new nickname', function(nickname) {
    socket.nickname = nickname;
    onlineUsers.push(socket.nickname);
    console.log(socket.id + " changed nickname to: " + socket.nickname)
    console.log(onlineUsers);
});



socket.on('server notification', function(message){
  console.log(message)
});



socket.on('new marker', function(markerData){
  console.log("test "+ collection)
  markerData.forEach(element => {
    console.log("loop"+ element)
    collection.push(element)
  });
  collectionCount = collectionCount++
  console.log(markerData)
  console.log("test "+ collection)
  console.log(collectionCount)
  socket.broadcast.emit("new marker", collection)
})

  socket.on("disconnect", function () {
    socket.broadcast.emit(
      "server message",
      `SERVER: User ${id} left the chat!`
    );
    console.log(`a user with id ${id} disconnected`);
    console.log("Active users: " + onlineUsers)
  });

  socket.on("chat message", function (verzameling) {
    if (verzameling.bericht === "/clear all") {
      socket.broadcast.emit(
        "clear all",
        `Your board has been cleared by user id: ${id}`
      )}})})
