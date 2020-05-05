# Journey Planner!
![header](https://user-images.githubusercontent.com/45421908/79559134-8191da00-80a5-11ea-8f0f-117a929a5756.jpg)


## Table of Contents
- [Journey Planner!](#journey-planner-)
  * [Table of Contents](#table-of-contents)
  * [Concept](#concept)
  * [API's](#api-s)
    + [Google Maps API](#google-maps-api)
  * [Data](#data)
    + [User Data](#user-data)
    + [Data Generation](#data-generation)
    + [Data Retrieving](#data-retrieving)
    + [Data Life Cycle](#data-life-cycle)
  * [Hidden Values](#hidden-values)
  * [Storage](#storage)
    + [MongoDB & Mongoose](#mongodb---mongoose)
      - [Schema](#schema)
      - [Models](#models)
      - [Sending and retrieving](#sending-and-retrieving)
  * [Socket.io](#socketio)
    + [Socket Events](#socket-events)
      - [Client Side](#client-side)
        * [Emits](#emits)
        * [Listeners](#listeners)
      - [Server Side](#server-side)
        * [Emits](#emits-1)
        * [Ons](#ons)
  * [Credits](#credits)
    + [Developers & Testers](#developers---testers)



## Concept
Start planning your journey with strangers, travelers, family and friends! This online tool let's you explore the globe with real time data. Data includes stories, locations, weather information and pictures!

See what your partner is pinpointing on the map and discover what amazing trips you can create within a view minutes!

## API's
An API is an Application Programming Interface. Within WebDev an API is mostly used to connect with an external dataset or source. To retrieve data or to execute certain callbacks. 

### Google Maps API
![GoogleMaps](https://foto.cadagile.com/upload/f/33/f33ca4271a551a41a35672592129d482.jpg)

The Google Maps API is a Javascript driven API one puts in the script tags of the client. The client makes an API call to Google Maps in which the API sends a complete map to the client. The API can be initiated with callbacks within the API string. Therefore it is possible to enrich the data being retrieved by the API.

The map contains coordinates which can be used to place content on the map. The content can be retrieved from other API's, clients or generated by the client.

## Data
The core of this product is retrieving data, manipulating data and creating data realtime. 

### User Data
User data that I want to structure looks as follows:

```Javascript
user = {
  socketId: '99974129', // Unique Identifier for every new user
  username: 'Robert Hoekstra', // Chosen username
  datecreated: '20-01-2020, // Data user was created
  collection: ['point1', 'point2',...], // All locations in an Array that user created.
}
// Robert Hoekstra
```

### Data Generation
Data can be generated by the clients. The data that the client can generate has the following structure:
```Javascript
location = {
      createdBy: 'UserID',
      description: 'Description of the location',
      icon: 'Icon.png',
      nickname: 'Username',
      position: 'Lat, Lon',
      title: 'Title for the location',
}
// Robert Hoekstra
```

### Data Retrieving
Data will we retrieved realtime.

Two forms of data:

* Data generated realtime by other clients being online. They can publish newly created markers.
* Data retrieved from database, consisting of already created data. User can click on a user from the discover list. This will pin all the markers on the map!

Maybe I will add data from websites such as places and yelp. Not sure about this tho!

### Data Life Cycle
![Data Life Cycle Diagram](https://user-images.githubusercontent.com/45421908/79559360-d9304580-80a5-11ea-9b39-75078b84958c.jpg)

Note: final version will be uploaded after feedback 21th april 2020!


## Hidden Values
Some values should be hidden such as a personal API key or password. Therefore I use a .env file where I store my hidden values.
The .env file looks like this:

```dotenv
NODE_ENV=development
PORT=1111
DATABASE=mongodb+srv://robert:<password>@clusterino-xbsbk.mongodb.net;
DATABASE_PASSWORD=generatedpassword
```

Make sure to create a .env file in the root of the application and use above template to fill in the blanks with your personal connection credentials.
You can find yours by logging into mongodb.com and go to 'connect with application'.

To create a .env file, open up the terminal and navigate to the root of the folder.
Use `touch .env` to create the .env file.

Make sure that you have the `npm install dotenv` executed in order to use the file.
However if you follow the installation instructions it should already be installed!

## Storage
Data will be stored in the server client and eventually stored in an encrypted database. Probably a database hosted by MongoDB
I also keep track of a locally stored variable in the index.js file. However this does not seem to work very well when sockets leave the application. Therefore I choose to work with MongoDB primairly.

### MongoDB & Mongoose
![Mongo](https://cdn3.tz.nl/wp-content/uploads/2017/08/MongoDB.png)

MongoDB is an online tool to create databases/collections. You can use these to make an online data storage to use for your application. Super handy!

Within the application I use a package called `mongoose.js`. This package enables the developer to create a connection with the database. Thus creating, deleting and modifying data stored in the database.

The package contains lots of other super handy functions. You can find them at: [Mongoose Documenation](https://mongoosejs.com/)

#### Schema
A schema is a way to tell how the structure of your data needs to be. For instance in this application I defined a schema by writing the following block of code:

```Javascript
const locationSchema = new mongoose.Schema({
  createdBy: String,
  description: String,
  icon: String,
  nickname: String,
  position: { lat: Number, lng: Number },
  title: String,
});
```
This schema is then used to create models. By having a schema you make sure that all the data entries are consistent.
It follows the structure of the object. But it also follows the kind of datatype needed as entries for the corresponding keys within the object.

#### Models
A model is created upon a schema written by the developer. The model forms a document that can be sent to the collection within the database.
A model follows the structure that is defined in the schema. However now you need to fill in the 'blanks'. These will form the key entry properties within the model.
When the model is correctly filled with data, it can be send to the collection. The model gets a unique ID that can be used to find the property within the document with the `FindBy()` function that comes with the `mongoose.js` package.


#### Sending and retrieving
Mongoose uses a different aproach to retrieving data than other Javascript methods use.
In order to start retrieving or sending data. The client needs to connect to the database first.

Connecting works as follows:

## Socket.io
`Socket.io` is a javascript library that can be used to create realtime apps. It is a package that makes it possible to track different clients by assigning 'sockets' to the clients.

The sockets act like a container object which you can ass properties to. This way you can assign nicknames, birthdays etc to the socket to create a personalized socket.
The package works by emitting events and responding to those events. Emitting and Responding can happen both on the client and the serverside. More about these events are described in the next section `Socket Events`



### Socket Events
All events within socket

#### Client Side

##### Emits

```Javascript
socket.emit("new-marker", markerData); // Send new marker object to the server
socket.emit("delete-all-markers"); // Send delete request to the server. Server will execute coresponding mongoose callback.
socket.emit('new-nickname', socket.nickname); // Send new socket property 'nickname'
socket.emit('get-markers', parameter); // Request all markers from server of selected username
socket.emit("server-notification", "a new location is being added") // Send a server message (debugging), check terminal
```

##### Listeners
```Javascript
socket.on('user-list', function(onlineUsers)); // Execute function when this message get's emitted from server. Renders all users in the list.
socket.on('get-markers', function(markerList)); // Execute function when this message get's emitted from server. Render all markers from the users.
```

#### Server Side
##### Emits
```Javascript
socket.emit("user-list", nickname); // Send all users that are found 
socket.emit("get-markers", mongocollection); // Send all hits of user out of mongodb to the client
```

##### Ons
```Javascript
socket.on("new-nickname", function (nickname)); // Register new nickname to the socket
socket.on("get-markers", function (element)); // Execute request and collect all markers. Send them to users.
socket.on("server-notification", function (message)); // Display message in console.
socket.on("delete-all-markers", function ()); // Send delete request to mongodb
socket.on("new-marker", function (markerData)); // Add new marker to the collection
socket.on("disconnect", function ()); // Disconnect and close socket session.
```


## Credits
### Developers & Testers
* Guido Bouman - D
* Laurens Aarnoudse - D
* Jane Soest - T
* Tomas Stolp - D&T
* Victor LaForge - D&T
* Nick Meijer - D&T



