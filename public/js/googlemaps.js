let map;
let markers = [];
let infowindow;
function initialize() {
  let lelystad = new google.maps.LatLng(52.518536, 5.471422);

  map = new google.maps.Map(document.getElementById("map"), {
    center: lelystad,
    zoom: 13,
  });

  map.addListener("click", function (e) {
    socket.emit("server-notification", "a new location is being added");
    placeMarkerAndPanTo(e.latLng, map);
  });
}


function removeMarker(element){
  element.setMap(null)
}

function placeMarker(element) {
  let marker = new google.maps.Marker({
    position: element.position,
    map: map,
    icon:
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    draggable: true,
    animation: google.maps.Animation.DROP,
    description: element.description,
    title: element.title,
  });
  marker.setMap(map);

  let infoWindow = new google.maps.InfoWindow({
    content: `<h1>${element.title}</h1>
<p>${element.description}</p>
<p><span>Created by: ${element.nickname}</span></p>`,
  });

  marker.addListener("click", function () {
    infoWindow.open(map, marker);
  });
}

function placeMarkerAndPanTo(latLng, map) {
  let title = prompt("Give a title to new pin");
  let description = prompt("Tell something about this pin");
  let marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon:
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    draggable: true,
    animation: google.maps.Animation.DROP,
    description: description,
    title: title,
  });

  let markerData = {
    position: latLng,
    icon:
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    description: description,
    title: title,
    createdBy: socket.id,
    nickname: socket.nickname,
  };

  // socket.emit("new-entry", markerData);
  markers.push(markerData);


  console.log(markers)
  // console.log("marker collection" + markers[0])
  let infoWindow = new google.maps.InfoWindow({
    content: `<h1>${title}</h1>
<p>${description}</p>
<p><span>Created by: ${socket.nickname}</span></p>
<button onclick="saveMarker(markers)">Publish Location</button>
<button onclick="deleteMarker(socket)">Delete all your Locations from collection</button>`,
  });

  marker.addListener("click", function () {
    infoWindow.open(map, marker);
  });
  map.panTo(latLng);
}
