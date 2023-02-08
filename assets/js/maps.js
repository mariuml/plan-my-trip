let zoom = 7;
// Center location.
const sendCoords = (lat, lon) => {
  const array = [lat, lon];
  center = array;
  zoom = 15;
};

let center = [51.509865, -0.118092];

// Array of pin locations
const pinLocations = [];

// Received titles from Trip advisors API.
let titles = [];


// function initMap() {
//   // Centers map on a location
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: zoom,
//     center: center,
//   });
//   // Loop throw pins
//   for (let i = 0; i < pinLocations.length; i++) {
//     const searchWord = titles[i].split(" ").map((word) => word.trim());
//     searchWord.push(searchCityVal);
//     // Pin description
//     const contentString =
//       '<div id="mapContent">' +
//       '<h1 id="mapHeading">' +
//       titles[i] +
//       "</h1>" +
//       '<div id="mapBodyContent"><a target="_blank" href="https://www.google.com/search?q=' +
//       searchWord.join("+") +
//       '">For more information click here!</a>' +
//       "</div>" +
//       "</div>";
//     // Pin infoWindow content
//     const infowindow = new google.maps.InfoWindow({
//       content: contentString,
//       ariaLabel: titles[i],
//     });
//     // Pin location
//     const marker = new google.maps.Marker({
//       position: pinLocations[i],
//       map,
//       title: titles[i],
//     });

//     marker.addListener("click", () => {
//       infowindow.open({
//         anchor: marker,
//         map,
//       });
//     });
//   }
//   // Empty pins array for next call.
//   titles = [];
// }


// Map viewpoint and layer
var map = L.map("map").setView(center, zoom);
L.tileLayer('https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=KWg28OjzL3RlPD1tpGPc', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);

let searchCityVal = "";

// function to add Markers to the map
function addMarker() {
  console.log(pinLocations)
  // Centers map by the user inputed location
  map.flyTo(center, zoom)
  // Loop throw pin locations and makes markers.
  for (var i = 0; i < pinLocations.length; i++) {
    let searchWord = [];
    
      searchWord = titles[i].replace(/ /g, '+');
    console.log(searchWord)


    new L.marker(pinLocations[i]).bindPopup(
    
    '<h2 style="text-align: center; color: black; font-weight: bold">' +
    titles[i] +
    "</h2>" +
    '<a target="_blank" href="https://www.google.com/search?q=' +
    searchWord + '+' + searchCityVal +
    '">For more information click here!</a>').addTo(map);

  }
}
