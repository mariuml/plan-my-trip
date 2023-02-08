let zoom = 7;
// Center location.
const sendCoords = (lat, lon) => {
  const array = [lat, lon];
  center = array;
  zoom = 15;
};

let center = [51.509865, -0.118092];

// Array of pin locations
let pinLocations = [];

// Received titles from Trip advisors API.
let titles = [];

// Map viewpoint and layer
var map = L.map("map").setView(center, zoom);
L.tileLayer(
  "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=KWg28OjzL3RlPD1tpGPc",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);

let searchCityVal = "";

const arrayObj = [];
// function to add Markers to the map
function addMarker() {
  removeMarker();
  // Centers map by the user inputed location
  map.flyTo(center, zoom);
  // Loop throw pin locations and makes markers.
  for (var i = 0; i < pinLocations.length; i++) {
    let searchWord = [];

    searchWord = titles[i].replace(/ /g, "+");

    const marker = L.marker(pinLocations[i]).bindPopup(
      '<h2 style="text-align: center; color: black; font-weight: bold">' +
        titles[i] +
        "</h2>" +
        '<a target="_blank" href="https://www.google.com/search?q=' +
        searchWord +
        "+" +
        searchCityVal +
        '">For more information click here!</a>'
    );
    arrayObj.push(marker);
    map.addLayer(marker);
  }
}

function removeMarker() {
  for (var i = 0; i < arrayObj.length; i++) {
    map.removeLayer(arrayObj[i]);
  }
}
