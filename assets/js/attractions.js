// Functionality for nav bar
$("#title").on("click", function () {
  window.location.href = "index.html";
});

// Search History
// Arrays for city and category history
var cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
var categoryHistory = JSON.parse(localStorage.getItem("categoryHistory")) || [];

// Function to show last 5 searchs on buttons in Search History section
function showSearch() {
  var lastItem = cityHistory.length - 1;
  for (let i = lastItem; i > lastItem - 5; i--) {
    if (cityHistory[i] != null) {
      $("#history").append(
        `<button class="history-buttons btn btn-secondary" data-city="${
          cityHistory[i]
        }" data-category=${categoryHistory[i]}>${cityHistory[i]} - ${
          categoryHistory[i].charAt(0).toUpperCase() +
          categoryHistory[i].slice(1)
        }</button>`
      );
    }
  }
}
// Run function as page loads
showSearch();

// Categories for dropdown menu
var categoriesArray = [
  "historic",
  "cultural",
  "natural",
  "religion",
  "banks",
  "foods",
];

// Default category
var category = "cultural";

// Add categories array to drop-down
for (var i = 0; i < categoriesArray.length; i++) {
  var dropdownItem = $('<a class="dropdown-item" href="#">').text(
    categoriesArray[i].toUpperCase()
  );
  $("#categories-menu").append(dropdownItem);
}

// Click event to save the value of the dropdown selection
$(".dropdown-item").on("click", function (event) {
  event.preventDefault();
  // Setting global category variable as user selection
  category = event.target.innerHTML.toLowerCase();
  $("#dropdownMenu2").text(`Selected category: ${$(this).text()}`);
});

// Function that retrieves weather information and geological coordinates
// Displays forecast information and forewards coordinates to be used to populate the map
function searchCity(city) {
  // Build current weather query
  // Create URL
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    openWeatherAPIKey;

  // API query for current weather
  $.ajax({
    url: queryURL,
    method: "GET",
    async: false,
  }).then(function (weatherResponse) {
    // Get coordinates for openTrip
    var cityLon = weatherResponse.coord.lon;
    var cityLat = weatherResponse.coord.lat;

    // Send coordinates to Leaflet API to center it;
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

    // API query for open trip
    $.ajax({
      url: openTripAPIURL,
      method: "GET",
    }).then(function (tripResponse) {
      pinLocations = [];
      titles = [];
      // Get coordinates from results
      for (var i = 0; i < tripResponse.features.length; i++) {
        var lon = tripResponse.features[i].geometry.coordinates[0];
        var lat = tripResponse.features[i].geometry.coordinates[1];

        if (tripResponse.features[i].properties.name != "") {
          // Sends pin locations to GoogleMap API
          var pinCoords = [lat, lon];
          pinLocations.push(pinCoords);

          // Sends titles to the map.
          titles.push(tripResponse.features[i].properties.name);
        }
      }
      addMarker();
      $("#search-input").val("");
    });

    // Build forecast query
    // Create URL
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
        var forecastDay = $(`#day${day}-date`).text(
          `Day ${day} - ${forecastDateConv}`
        );

        // Clear previous search
        $("#day" + day + " :nth-child(2)").remove();
        // Add new forecast
        $("#day" + day).append(forecastDay, forecastBlock);
        day += 1;
      }
    });
  });
}

// Search button click event
$("#search-button").on("click", function (event) {
  event.preventDefault();
  // Grab city name from search
  var city = $("#search-input").val();
  searchCity(city);

  // Assign to variable for maps.js
  searchCityVal = city;

  // Prevent empty search
  if (city.length > 0) {
    // Add city to cityHistory array
    cityHistory.push(city);
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));

    // Add category to categoryHistory array
    categoryHistory.push(category);
    localStorage.setItem("categoryHistory", JSON.stringify(categoryHistory));

    // Populate history immediately
    // Clear
    $("#history").empty();
    showSearch();
  }
});

// Search from history buttons
$("#history").on("click", "button.history-buttons", function () {
  city = $(this).attr("data-city");
  category = $(this).attr("data-category").toLowerCase();

  searchCity(city);
});
