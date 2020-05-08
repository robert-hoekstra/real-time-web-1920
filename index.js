require("dotenv").config();
const express = require("express");
let collection = [];
let collectionCount = 0;
let onlineUsers = [];
const mongoose = require("mongoose");
  app = express(),
  server = require("http").createServer(app),
  io = require("socket.io").listen(server);
const clients = io.clients;
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App running at: ${PORT}`);
});


// MONGOOSE
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connnection successful!"));

const locationSchema = new mongoose.Schema({
  createdBy: String,
  description: String,
  icon: String,
  nickname: String,
  position: { lat: Number, lng: Number },
  title: String,
});

const locationCollection = mongoose.model("location", locationSchema);

app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", function (socket) {
  socket.on("new-nickname", function (nickname) {
    socket.nickname = nickname;
    onlineUsers.push(socket.nickname);
    console.log(socket.id + " changed nickname to: " + socket.nickname);

    locationCollection.find().distinct('nickname', function(error, nickname) {
      // ids is an array of all ObjectIds

      console.log("Unique users", nickname)
      socket.emit("user-list", nickname);
  })});

  socket.on("get-markers", function (element) {
    let userMarkers = [];
    collection.forEach((markers) => {
      if (markers.nickname == element) {
        userMarkers.push(markers);
      }
    });

    // Get complete location from selected user

    locationCollection.find({ nickname: String(element) }, function (
      err,
      marker
    ) {
      if (err) return console.error(err);
      console.log("Mongo Print", marker);
      let mongocollection = marker;
      socket.emit("get-markers", mongocollection);
    })});

  socket.on("server-notification", function (message) {
    console.log(message);
  });

  socket.on("delete-all-markers", function (){
    console.log(socket)
    locationCollection.deleteMany({ createdBy: socket.id}, function (err) {
      if (err) return handleError(err);
    });
    console.log("Delete request received")
    console.log(socket.nickname)
  })

  socket.on("new-marker", function (markerData) {
    // Set Data-Structure

    const marker = new locationCollection({
      createdBy: markerData.createdBy,
      description: markerData.description,
      icon: markerData.icon,
      nickname: markerData.nickname,
      position: markerData.position,
      title: markerData.title,
    });

    // Save to collection
    marker
      .save()
      .then((doc) => console.log("Mongo", doc))
      .catch((err) => console.log("ERROR 💥:", err));

    collection.push(markerData);
    collectionCount = collectionCount++;
    console.log(markerData);
    console.log("test " + collection);


    socket.broadcast.emit("get-markers", markerData)
    locationCollection.find().distinct('nickname', function(error, nickname) {
      // ids is an array of all ObjectIds

      console.log("Unique users", nickname)
      socket.broadcast.emit("user-list", nickname);
  })
  });

  socket.on("new-entry", function (markerData) {
    // Set Data-Structure

    const marker = new locationCollection({
      createdBy: markerData.createdBy,
      description: markerData.description,
      icon: markerData.icon,
      nickname: markerData.nickname,
      position: markerData.position,
      title: markerData.title,
    });

    // Save to collection
    marker
      .save()
      .then((doc) => console.log("Mongo", doc))
      .catch((err) => console.log("ERROR 💥:", err));

      locationCollection.find().distinct('nickname', function(error, nickname) {
        // ids is an array of all ObjectIds
  
        console.log("Unique users", nickname)
        socket.broadcast.emit("user-list", nickname);

  })});
  socket.on("disconnect", function () {
    console.log(
      `a user ${socket.id} with nickname ${socket.nickname} disconnected`
    );
    console.log("Active users: " + clients.sockets);
    onlineUsers.pop(socket.nickname);
  });
});
