// Categories logic

// GLOBAL VARIABLES
var categoriesArray = [
  "historic",
  "cultural",
  "natural",
  "religion",
  "banks",
  "foods",
];

// Default category
var category = 'cultural';

// Add categories array to drop-down
for (var i = 0; i < categoriesArray.length; i++) {
  var dropdownButton = $('<button class="dropdown-item" type="button">').text(
    categoriesArray[i]
  );
  $("#categories-menu").append(dropdownButton);
}

// Add a click event to save the value of the dropdown selection

$(".dropdown-item").on("click", function (event) {
  // Setting global category variable as user selection
  category = event.target.innerHTML;
  console.log(category);
});

// / Open Weather API
// Get weather info and longitude and latitude of city

// Build weather query
$("#search-button").on("click", function (event) {
  event.preventDefault();
  // Grab city name from search
  var city = $("#search-input").val();

  // Check city
  // console.log(city);

  // Create URL
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    openWeatherAPIKey;

  // Ajax for weather
  $.ajax({
    url: queryURL,
    method: "GET",
    async: false
  }).then(function (weatherResponse) {

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

    // Making a call to OpenTrip API based on user input
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


      // Get coordinates from results
      for (var i = 0; i < tripResponse.features.length; i++) {
        var lon = tripResponse.features[i].geometry.coordinates[0];
        var lat = tripResponse.features[i].geometry.coordinates[1];

        if (tripResponse.features[i].properties.name !== '' || tripResponse.features[i].properties.wikidata !== ''){
        // Sends pin locations to GoogleMap API
        var object = { lat: 0, lng: 0 };
        object.lat = lat;
        object.lng = lon;
        pinLocations.push(object);

        // Sends titles to the map.
        titles.push(tripResponse.features[i].properties.name);

        // Sends WikiData to the map.
        wikiData.push(tripResponse.features[i].properties.wikidata);
        };
      };
      initMap();
      $("#search-input").val("");
    });

    // Create URL
    var queryURLForecast =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      cityLat +
      "&lon=" +
      cityLon +
      "&appid=" +
      openWeatherAPIKey;

    //   API query for forecasted weather
    $.ajax({
      url: queryURLForecast,
      method: "GET",
    }).then(function (forecastResponse) {
      // Define day to be used for forecast
      var day = 1;
      
      var result = forecastResponse.list;
      // Forecast shown for 3 -hour blocks for 5 days
      // Loop through in intervals of 8 beginning from 3
      // Gives weather at 12 (midday) each day
      for (var i = 3; i <= 40; i = i + 8) {
        // Create block to house information
        var forecastBlock = $('<div class="card-body">');

        // Info for forecast date
        var forecastDateConv = moment(
          result[i].dt_txt,
          "YYYY-MM-D HH:mm:ss"
        ).format("DD/MM/YY");

        // Forecasted weather icon
        var forecastIconURL =
          "https://openweathermap.org/img/wn/" +
          result[i].weather[0].icon +
          ".png";
        var forecastIcon = $("<img class='weather-image'>");
        forecastIcon.attr("src", forecastIconURL);

        // Info for forecasted temperature
        var forecastTemp = $("<p>");
        var forecastTempConv = result[i].main.temp - 273.15;
        forecastTempConv = forecastTempConv.toFixed(2);
        forecastTemp.text(`Temp: ${forecastTempConv} °C`);

        // Info for forecasted wind speed
        var forecastWind = $("<p>");
        forecastWind.text(`Wind: ${result[i].wind.speed} + KpH`);

        // Info for forecasted humidty
        var forecastHumidity = $("<p>");
        forecastHumidity.text(`Humidity: ${result[i].main.humidity} %`);

        // All the weather info into one div
        forecastBlock.append(
          forecastIcon,
          forecastTemp,
          forecastWind,
          forecastHumidity
        );

        // // Info for the card header div
      var forecastDay = $(`#day${day}-date`).text(`Day ${day} - ${forecastDateConv}`)

        // var forecastDay = $(
        //   `<div class="card-header" id="day${day}-date" >Day ${day}</div>`
        // );

        // Clear
        $("#day" + day + " :nth-child(2)").remove();
        // $("#day" + day).empty();
        $("#day" + day).append(forecastDay, forecastBlock);
        day += 1;
      }
    });
});
});
