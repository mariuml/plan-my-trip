let zoom = 7;
// Center location.
const sendCoords = (lat, lon) => {
    center.lat = lat;
    center.lng = lon;
    zoom = 13;
};

const center = { lat: 51.509865, lng: -0.118092 };

// User Location 
const userLoc = [];

userLocation();

// Function to get current user location.
function userLocation() {
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

// if it succeed it will push user lat and long to userLoc variable and zoom to 11 then refresh a map.
function success(pos) {
  const crd = pos.coords;
  center.lat = crd.latitude;
  center.lng = crd.longitude;
  zoom = 13;
  initMap();
};
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};
navigator.geolocation.getCurrentPosition(success, error, options);
};



  // Array of pin locations
  const pinLocations = [];

  // Received titles from Trip advisors API.
  let titles = [];

  // Received wiki data code.
  let wikiData = [];

function initMap() {

  // Centers map on a location
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: zoom,
    center: center,
  });
  // Loop throw pins
  for (let i = 0; i < pinLocations.length; i++) {
    // Pin description
    const contentString =
      '<div id="content">' +
      '<h1 id="heading">'+ titles[i] +'</h1>' +
      '<div id="bodyContent">' +
      '<a href="https://www.wikidata.org/wiki/'+ wikiData[i] +'" target="_blank">Click here for description!</a>' +
      "</div>" +
      "</div>";
    console.log(wikiData[i])
    console.log(titles[i]);
    console.log(pinLocations[i])
    // Pin infoWindow content
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      ariaLabel: titles[i],
    });

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
  };

};