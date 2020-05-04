const socket = io();

  document.getElementById("username").addEventListener("submit", function (event) {
    event.preventDefault();
    socket.nickname = usernameInput.value,
    console.log(socket.id + " choose a new username: " + socket.nickname);
    socket.emit('new nickname', socket.nickname);


    // Remove username box
    let loginbox = document.getElementById("login")
    loginbox.style.display ="none"

    // Make map active
    let mapFrame = document.getElementById('map')
    mapFrame.style.zIndex = 1
    mapFrame.style.display = 'block'

    // Render online Users
    // socket.emit('user list')
  });

  socket.on('user list', function(onlineUsers){
    let users = onlineUsers
    console.log('kom maar binnen')
    renderUsers(users)
  })

  function saveMarker(markerData){
    
    console.log("Emit from client: ", markerData)
     socket.emit("new marker", markerData)
  }

  function renderUsers(par1){
    console.log(par1)
    document.getElementById('map').insertAdjacentHTML('afterend', `<div id="down-panel">
      <h2>Share your locations!</h2>
      <p> Adding a location is super easy!
      <ol>
      <li>1. Click on the map</li>
      <li>2. Fill in the blanks</li>
      <li>3. Click on the flag and publish!</li>
      </ol></p>
      <h2>Explore together!</h2>
      <p>Click on the map to add your own location!</p>
      <p>Click on a user to discover more locations!</p>
      <ul id="usersList">
        </ul>
    </div>`)

    let listnode = document.getElementById('usersList')
    par1.forEach(element => {
      listnode.insertAdjacentHTML('beforeend', `<li><button onclick="getMarkersFrom('${element}')">${element}</button></li>`)
      document.getElementById('usersList') 
    });
  }

  function getMarkersFrom(parameter){
      socket.emit('get-markers', parameter)
  }

  socket.on('get-markers', function(markerList){
      console.log(markerList)
      markerList.forEach(element => {
        placeMarker(element)
      });
  })