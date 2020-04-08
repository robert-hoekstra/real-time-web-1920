const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const moment = require("moment");


const PORT = process.env.PORT || 3231

var timeStamp = moment().format("h:mm:ss");

let counter = 0;

let memes = [
  `https://media1.giphy.com/media/qyNNKUuDi3yAo/giphy.gif?cid=ecf05e47294869019c0d5430eb9887e2994bacd97f4cf0f7&rid=giphy.gif`,
];
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", function (socket) {
  const id = counter++;
  console.log(`a user with id ${id} connected`);
  socket.emit("server message", `SERVER: Welcome, you are user number: ${id}!`);
  socket.broadcast.emit(
    "server message",
    `SERVER: User ${id} joined the chat!`
  );

  socket.on("disconnect", function () {
    socket.broadcast.emit(
      "server message",
      `SERVER: User ${id} left the chat!`
    );
    console.log(`a user with id ${id} disconnected`);
  });

  socket.on("chat message", function (verzameling) {
    if (verzameling.bericht === "/clear all") {
      socket.broadcast.emit(
        "clear all",
        `Your board has been cleared by user id: ${id}`
      );
    } else if (verzameling.bericht === "/kobe") {
      socket.emit("meme", memes[0]);
      socket.broadcast.emit("meme", memes[0]);
    } else if (verzameling.bericht.slice(0, 7) === "/square") {
      var number = verzameling.bericht.split(" ").pop();
      number = parseFloat(number);
      number = number * number;
      var solution = number;

      socket.emit("square", solution);
      console.log("Math request!");
    } else {
      socket.broadcast.emit(
        "chat message",
        timeStamp +
          " " +
          verzameling.naam +
          "#" +
          id +
          " said: " +
          " " +
          verzameling.bericht
      );
    }

    if (
      verzameling.bericht.length < 10 &&
      verzameling.bericht.charAt(0) !== "/"
    )
      socket.emit(
        "server message",
        `SERVER: Please refrain from short messages, thank you!`
      );
    console.log(verzameling.naam);
  });

  socket.on("username received", function (verzameling) {
    console.log("hallo", verzameling.naam, id);
    socket.broadcast.emit(
      "username received",
      timeStamp + ": " + verzameling.naam + " joined the chat"
    );
  });
});


server.listen(PORT, ()=>{
  console.log("Connected to port:" + PORT)
})