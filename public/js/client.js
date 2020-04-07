var socket = io();
let lijst = document.getElementById("messages");
let message = document.getElementById("m");
let username = document.getElementById("usernameInput");
// berichten


let verzameling = {
    naam : "anonymous",
    bericht : message
}

document.getElementById("message").addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(verzameling);
  verzameling.bericht = message.value
  socket.emit("chat message", verzameling);
  lijst.insertAdjacentHTML("afterbegin", `<li class="me">You: ${verzameling.bericht}</li>`);
  message.value = ''
  return
});


socket.on("server message", function(message){
  lijst.insertAdjacentHTML("afterbegin", `<li class="server-message">${message}</li>`);
})

socket.on("chat message", function (message) {
  lijst.insertAdjacentHTML("afterbegin", `<li>${message}</li>`);
});

socket.on('clear all', function (sender){
  lijst.innerHTML = `<li class="server-message">${sender}</li>`
})

socket.on('square', function(solution){
  lijst.insertAdjacentHTML("afterbegin", `<li class="server-message">The solution to your mathproblem is: ${solution}</li>`);
})

socket.on('meme', function (meme){
  lijst.insertAdjacentHTML("afterbegin", `<li class="meme"><img src="${meme}">Kobe!</li>`);
  console.log(meme)
})

// username

document.getElementById("username").addEventListener("submit", function (event) {
    event.preventDefault();
    verzameling.naam = username.value
    console.log(username.value);
    socket.emit("username received", verzameling);
    lijst.insertAdjacentHTML("afterbegin", `<li>You joined the room as, ${verzameling.naam}!</li>`);
    return
  });

socket.on("username received", function (username) {
  let lijst = document.getElementById("messages");
  lijst.insertAdjacentHTML("afterbegin", `<li>${username}</li>`);
});



