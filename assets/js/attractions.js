
 // TODO: Grab category/ies from dropdown ... Add to array?
    // For testing

    var categoriesArray = [
      "historic", "cultural", "natural", "religion", "banks", "foods"
    ];
    
    // Add categories array to drop-down
    
    for (var i = 0; i < categoriesArray.length; i++) {

    var dropdownButton = $('<button class="dropdown-item" type="button">').text(categoriesArray[i]);
    $("#categories-menu").append(dropdownButton);


    }

    // Add a click event to save the value of the dropdown selection

    $("categories-menu").on("click", function (event) {
      console.log("the click works");
      var categorySelection = $(".dropdown-item").val();
      console.log(categorySelection);
 

    });




// / Open Weather API
// Get weather info and longitude and latitude of city

// Build weather query
$("#search-button").on("click", function (event) {
  event.preventDefault();
  // Grab city name from search
  var city = $("#search-input").val();

<<<<<<< HEAD
  console.log(city)
  // For testing
// Add  click selector

=======
>>>>>>> a77966280d81d135c40180379a5173b3c632796d
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    openWeatherAPIKey;
<<<<<<< HEAD

=======
>>>>>>> a77966280d81d135c40180379a5173b3c632796d

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

    // TODO: Grab category/ies from dropdown ... Add to array?
    // For testing
    var category = "churches";
    // Build open trip query
    // Min and max coordinates to plug into open trip
    var longitudeMin = cityLon - 0.01;
    var latitudeMin = cityLat - 0.01;
    var longitudeMax = cityLon + 0.01;
    var latitudeMax = cityLat + 0.01;
<<<<<<< HEAD


// Choosing a category
var category = "churches";
=======
>>>>>>> a77966280d81d135c40180379a5173b3c632796d
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
        titles.push(tripResponse.features[i].properties.name);

        // Sends WikiData to the map.
        wikiData.push(tripResponse.features[i].properties.wikidata);
        initMap();
      }
      $("#search-input").val("");
    });

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
      var day = 1;
      var result = forecastResponse.list;
      // Forecast shown for 3 -hour blocks for 5 days
      // Loop through in intervals of 8 beginning from 3
      // Gives weather at 12 (midday) each day
      for (var i = 3; i <= 40; i = i + 8) {
        // Create block to house information
        var forecastBlock = $('<div class="card-body">');

        // Info for forecast date
        // var forecastDate = $("<p>");
        // var forecastDateConv = moment(
        //   result[i].dt_txt,
        //   "YYYY-MM-D HH:mm:ss"
        // ).format("D/MM/YYYY");
        // forecastDate.text(forecastDateConv);

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
        forecastTemp.text("Temp: " + forecastTempConv + " °C");

        // Info for forecasted wind speed
        var forecastWind = $("<p>");
        forecastWind.text("Wind: " + result[i].wind.speed + "KpH");

        // Info for forecasted humidty
        var forecastHumidity = $("<p>");
        forecastHumidity.text("Humidity: " + result[i].main.humidity + "%");

        // All the weather info into one div
        forecastBlock.append(
          forecastIcon,
          forecastTemp,
          forecastWind,
          forecastHumidity
        );

        // Info for the card header div
        var forecastDay = $(
          '<div class="card-header" id="day' +
            day +
            '-date" >Day ' +
            day +
            "</div>"
        );

        // Clear
        // $("#day" + day + " div:last").remove();
        $("#day" + day).empty();
        $("#day" + day).append(forecastDay,forecastBlock);
        day += 1;

        console.log(day);
      }
    });
  });
});
