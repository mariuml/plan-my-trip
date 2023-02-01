// Making calls to Open Trip MAP API

// Global variables
// User enters a city/place
//  Get longitude and latitude for a city using weather API
// Save these to variable (min)
// 

var longitudeMin = 38.364285;
var latitudeMin = 59.855685;
var category = "churches";
var longitudeMax = 38.372809;
var latitudeMax = 59.859052;

// Hide key in keys.js later
var openTripAPIkey = "5ae2e3f221c38a28845f05b6c88d4a8d7a01e263a5c252b3a97acba4"


//  Building query URL
var openTripAPIURL = 
"http://api.opentripmap.com/0.1/ru/places/bbox?lon_min=" + longitudeMin +
"&lat_min=" + latitudeMin + "&lon_max=" + longitudeMax + 
"&lat_max=" + latitudeMax + "&kinds=" + category +  "&format=geojson&apikey=" + openTripAPIkey


//  AJAX call

$.ajax({
    url: openTripAPIURL,
    method: "GET",
}).then(function (response) {
console.log(response);

})
