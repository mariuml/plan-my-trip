// Open Weather API
// Get weather info and longitude and latitude of city

// Build weather query
$("#search-button").on("click", function (event) {
  event.preventDefault();
  // TODO: Grab city name from search
  var city = $("#search-input").val();

  console.log(city);
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

    // Get coordinates for openTrip and forecast
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

    var queryURLForecast =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      cityLat +
      "&lon=" +
      cityLon +
      "&appid=" +
      openWeatherAPIKey;

    // API query for forecasted weather
    $.ajax({
      url: queryURLForecast,
      method: "GET",
    }).then(function (forecastResponse) {
      //   Check response coming back in console
      console.log(forecastResponse);

      // Have to repeat this a few times so var
      var result = forecastResponse.list;

  //     // Forecast shown for 3 -hour blocks for 5 days
  //     // Loop through in intervals of 8 beginning from 3
  //     // Gives weather at 12 (midday) each day
  //     for (var i = 3; i <= 40; i = i + 8) {
  //       // Create block to house information
  //       var forecastBlock = $('<div class="forecastBlock">');

  //       // Info for forecast date
  //       var forecastDate = $("<p>");
  //       var forecastDateConv = moment(
  //         result[i].dt_txt,
  //         "YYYY-MM-D HH:mm:ss"
  //       ).format("D/MM/YYYY");
  //       forecastDate.text(forecastDateConv);

  //       // Forecasted weather icon
  //       var forecastIconURL =
  //         "https://openweathermap.org/img/wn/" +
  //         result[i].weather[0].icon +
  //         ".png";
  //       var forecastIcon = $("<img>");
  //       forecastIcon.attr("src", forecastIconURL);

  //       // Info for forecasted temperature
  //       var forecastTemp = $("<p>");
  //       var forecastTempConv = result[i].main.temp - 273.15;
  //       forecastTempConv = forecastTempConv.toFixed(2);
  //       forecastTemp.text("Temp: " + forecastTempConv + " °C");

  //       // Info for forecasted wind speed
  //       var forecastWind = $("<p>");
  //       forecastWind.text("Wind: " + result[i].wind.speed + "KpH");

  //       // Info for forecasted humidty
  //       var forecastHumidity = $("<p>");
  //       forecastHumidity.text("Humidity: " + result[i].main.humidity + "%");
  //     }
    });
  });
});
