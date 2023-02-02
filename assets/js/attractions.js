// Open Weather API
// Get weather info and longitude and latitude of city

// Build weather query
// TODO: Grab city name from search
// var city = $("########").val();
// For testing
var city = "New York";
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  openWeatherAPIKey;

// Ajax for weather
$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (weatherResponse) {
  console.log(weatherResponse);

  // Get coordinates for openTrip
  var cityLon = weatherResponse.coord.lon;
  var cityLat = weatherResponse.coord.lat;

  // Send coordinates to GoogleMap API to center it;
  sendCoords(cityLat, cityLon);

  // Build open trip query
  // Min and max coordinates to plug into open trip
  var longitudeMin = cityLon - 0.01;
  var latitudeMin = cityLat - 0.01;
  var longitudeMax = cityLon + 0.01;
  var latitudeMax = cityLat + 0.01;

  // TODO: Grab category/ies from dropdown ... Add to array?
  // For testing
  var category = "churches";
  var openTripAPIURL =
    "https://api.opentripmap.com/0.1/en/places/bbox?lon_min=" +
    longitudeMin +
    "&lat_min=" +
    latitudeMin +
    "&lon_max=" +
    longitudeMax +
    "&lat_max=" +
    latitudeMax +
    "&kinds=" +
    category +
    "&format=geojson&apikey=" +
    openTripAPIkey;

  // Ajax for open trip
  $.ajax({
    url: openTripAPIURL,
    method: "GET",
  }).then(function (tripResponse) {
    console.log(tripResponse);
    // Get coordinates from results
    for (var i = 0; i < tripResponse.features.length; i++) {
      var lon = tripResponse.features[i].geometry.coordinates[0];
      var lat = tripResponse.features[i].geometry.coordinates[1];

      // Sends pin locations to GoogleMap API
      var object = { lat: 0, lng: 0 };
      object.lat = lat;
      object.lng = lon;
      pinLocations.push(object);

      // Sens titles to the map.
      titles.push(tripResponse.features.properties.name);

      // Sends WikiData to the map.
      wikiData.push(tripResponse.features.properties.wikidata);
    }
  });
});
