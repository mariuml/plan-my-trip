// TESTING locations
const userLoc = [];
let zoom = 7;
userLocation();

// Function to get current user location.
function userLocation() {
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;
  userLoc.push(crd.latitude);
  userLoc.push(crd.longitude);
  zoom = 11;
  initMap();
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options)

}



function initMap() {
  // One pin location
  const peterborough = { lat: 52.573921, lng: -0.250830 };
  
  // Array of pin locations
  const pinLocations = [ { lat: 52.573921, lng: -0.350830 }, { lat: 52.573921, lng: -0.250830 }, { lat: 52.673921, lng: -0.250830 }];

  // Centers map on a location
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: zoom,
    center: peterborough,
  });
  for (let i = 0; i < pinLocations.length; i++) {
    // Pin description
    const contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">Peterborough</h1>' +
      '<div id="bodyContent">' +
      "<p>peterborough is a large " +
      "(last visited June 22, 2009).</p>" +
      "</div>" +
      "</div>";

    // Pin infoWindow content
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      ariaLabel: "peterborough",
    });

    const marker = new google.maps.Marker({
      position: pinLocations[i],
      map,
      title: "peterborough",
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
      });
    });
  };
};