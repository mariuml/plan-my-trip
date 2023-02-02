// Open Weather API
// Get weather info and longitude and latitude of city

// Build weather query
$("#search-button").on("click", function (event) {
  event.preventDefault()
  // TODO: Grab city name from search
  var city = $("#search-input").val();

  console.log(city)
  // For testing
<<<<<<< HEAD
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
=======
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    openWeatherAPIKey;
>>>>>>> e40d97b84a865590aa66e0b49d0d55ec34b0a73a

  // Ajax for weather
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (weatherResponse) {
    console.log(weatherResponse);

    // Get coordinates for openTrip
    var cityLon = weatherResponse.coord.lon;
    var cityLat = weatherResponse.coord.lat;

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

        console.log(lon, lat);
      }
    });
  });
});
