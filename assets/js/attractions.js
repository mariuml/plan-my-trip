// Open Weather API
// Get weather info and longitude and latitude of city

// Grab city name
// var city = $("########").val();
// For testing
var city = "New York";

var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  openWeatherAPIKey;

// API query for current weather
$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (weatherResponse) {
  console.log(weatherResponse);

  var cityLon = weatherResponse.coord.lon;
  var cityLat = weatherResponse.coord.lat;

console.log(cityLon, cityLat)
  // Making calls to Open Trip MAP API

  // Global variables
  // User enters a city/place
  //  Get longitude and latitude for a city using weather API
  // Save these to variable (min)
  //
  40.7143
  var longitudeMin = cityLon - 0.005;
  var latitudeMin = cityLat - 0.005;
  var category = "churches";
  var longitudeMax = cityLon + 0.005;
  var latitudeMax = cityLat + 0.005;

  console.log(longitudeMax, latitudeMin)

  // openTripAPIKey in keys.js
  //  Building query URL
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

    console.log(openTripAPIURL)
  //  AJAX call

  $.ajax({
    url: openTripAPIURL,
    method: "GET",
  }).then(function (tripResponse) {
    console.log(tripResponse);
  });
});
