# Chat Application for Geeks & Nerds

![Banner with nerdy logo's](https://miro.medium.com/max/2792/1*tWm33yhceKIL22QqOORu2w.png)
 
## Introduction
This is a project for the Real Time Web course given at the Amsterdam University of Applies Sciences!
This project is all about real time services, data manipulation en presentation. 

I will work with Express and Socket.IO to create Real Time Applications that use data from a different API to create cool things!

To kick off I have written a chat application for Nerds & Geeks talk to eachother about: Math and Memes

## Table of Contents
- [Chat Application for Geeks & Nerds](#chat-application-for-geeks---nerds)
  * [Introduction](#introduction)
  * [Table of Contents](#table-of-contents)
  * [Getting Started](#getting-started)
    + [Online](#online)
    + [Local](#local)
      - [Installation](#installation)
  * [Functionality](#functionality)
  * [Commands](#commands)
    + [Math](#math)
    + [Memes](#memes)
    + [Chat](#chat)
  * [About the server](#about-the-server)
  * [Nice to haves, going to have!](#nice-to-haves--going-to-have-)
  * [Credits](#credits)
  * [Sources](#sources)

## Getting Started

### Online
To use the application plug right in at our heroku deployment!
[JOIN](https://rtw-exercise-1.herokuapp.com/)

Join right in and choose a username so people can identify you, have fun!

### Local
If you don't like Heroku, or have some other reason to run this application locally. Then do the following:

#### Installation

`$git clone https://github.com/robert-hoekstra/real-time-web-1920.git`
 
 Then navigate to your folder where you cloned the repo to. With you terminal ofcourse!

 Then execute the following commands:

 `$ npm install`
 `$ npm run`

 Now run! No just kidding.
 You should now be able to navigate in your browser to this adres: localhost:3132

 Feeling a bit anxious? Open up a second tab to the same address and chat with yourself! Super cool.


 ## Functionality
* Join the chatroom with an unique user ID.
* Change your username to anything you want!
* Server responds to short messages
* Commands!
* Request a Kobe Bryant meme with /kobe
* Request a mathmatical solution with /math
* Wrote something emberassing? Erase someone's chat with /clear all!

## Commands 

### Math
`/square x` where x is any number your choose to get the square of that number!

### Memes
`/kobe` to honor Kobe Bryant and request a kobe meme!

### Chat
`/clear all` to clear all the message boards of all online users except yours!

## About the server
The server is being run by Express and works with Socket.IO

Socket.IO has some really neat functionaility in which we can create real time applications. As the name suggests. Socket.IO uses sockets. A socket is an object assigned to every user that connects to the server. By assinging this object, socket.IO can differentiate and idenity different users. And that is exactly what the chat app does!

The server makes usage of the following socket.io properties:

```js

socket.emit 
// Emit something to the server that only refers to your socket. Basically you give the server a command with a function in which the server will do something on a socket.on listen.

socket.broadcast.emit 
// Emit something to the server that only refers to your socket BUT emit it directly to other online users except yourself!

socket.on 
// Listen to any emit going on at the server. socket.on can receive regular emits and broadcasting emits

```

## Nice to haves, going to have!
Emit different objects. Everything is now being emitted within the 'chat message' object.

However for the sake of functionality and consistency I would like to create events for memes, mathematical questions and server commands!

## Credits
Razpudding & Guido

## Sources
[Express](https://expressjs.com/)
[MomentJS](https://momentjs.com/)
[Socket.IO](https://socket.io/)

