let zoom = 7;
// Center location.
const sendCoords = (lat, lon) => {
  center.lat = lat;
  center.lng = lon;
  zoom = 13;
};

const center = { lat: 51.509865, lng: -0.118092 };

// Array of pin locations
const pinLocations = [];

// Received titles from Trip advisors API.
let titles = [];
let searchCityVal = "";
function initMap() {
  // Centers map on a location
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: zoom,
    center: center,
  });
  // Loop throw pins
  for (let i = 0; i < pinLocations.length; i++) {
    const searchWord = titles[i].split(" ").map((word) => word.trim());
    searchWord.push(searchCityVal);
    // Pin description
    const contentString =
      '<div id="mapContent">' +
      '<h1 id="mapHeading">' +
      titles[i] +
      "</h1>" +
      '<div id="mapBodyContent"><a target="_blank" href="https://www.google.com/search?q=' +
      searchWord.join("+") +
      '">For more information click here!</a>' +
      "</div>" +
      "</div>";
    // Pin infoWindow content
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      ariaLabel: titles[i],
    });
    // Pin location
    const marker = new google.maps.Marker({
      position: pinLocations[i],
      map,
      title: titles[i],
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
      });
    });
  }
  // Empty pins array for next call.
  titles = [];
}
