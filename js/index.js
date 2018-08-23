$(document).ready(function () {
	// DECLARE VARIABLES
	var latitude = void 0;
	var longitude = void 0;
	var api = void 0;
	var celsius = void 0;
	var fahrenheit = void 0;
	var location = void 0;
	var weather = void 0;
	var description = void 0;

	//function to convert C to F
	function convertToF(celsius) {
		fahrenheit = celsius * 9 / 5 + 32;
		return parseInt(fahrenheit);
	}

	//hide loading animation and landing page once API finishes
	function hideLoading() {
		$(".starting-page").fadeOut(1000);
	}

	function populateCity() {
		$("#city").html('<i class="fas fa-map-marker icon"></i>' + location);
	}

	function changeTemp(temperature, unit) {
		$("#temp").html(temperature + "&deg" + unit);
	}

	function getWeather() {
		//Use HTML5 to get user location for application
		if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function (position) {
			//set latitude and longitude variables upon success
			latitude = position.coords.latitude;
			//console.log(latitude);
			longitude = position.coords.longitude;
			//console.log(longitude);
			//set API variable
			api = "https://fcc-weather-api.glitch.me//api/current?lat=" + latitude + "&lon=" + longitude;

			//JSON to get current weather using lat & longitude
			$.getJSON(api, function (results) {
				JSON.stringify(results);
				//console.log(results);
				celsius = parseInt(results.main.temp);
				//console.log(celsius);
				fahrenheit = convertToF(celsius);
				//console.log(fahrenheit);
				weather = results.weather["0"].main;
				weather = weather.toLowerCase();
				//console.log(weather);
				description = results.weather["0"].description;
				//console.log(description);

				changeTemp(celsius, "C");

				//switch statement to set background image
				switch (weather) {
					case "clear":
						$(".weather").css({
							background: "linear-gradient(to right,rgba(36, 36, 35, 0.9),rgba(36, 36, 35, 0.9)), url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1881235/clear.gif)",
							"background-repeat": "no-repeat",
							"background-size": "cover",
							"background-position": "center"
						});
						break;
					case "drizzle":
						$(".weather").css({
							background: "linear-gradient(to right,rgba(36, 36, 35, 0.9),rgba(36, 36, 35, 0.9)), url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1881235/drizzle.gif)",
							"background-repeat": "no-repeat",
							"background-size": "cover",
							"background-position": "center"
						});
						break;
					case "clouds":
						$(".weather").css({
							background: "linear-gradient(to right,rgba(36, 36, 35, 0.9),rgba(36, 36, 35, 0.9)), url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1881235/cloudy.gif)",
							"background-repeat": "no-repeat",
							"background-size": "cover",
							"background-position": "center"
						});
						break;
					case "rain":
						$(".weather").css({
							background: "linear-gradient(to right,rgba(36, 36, 35, 0.9),rgba(36, 36, 35, 0.9)), url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1881235/rain.gif)",
							"background-repeat": "no-repeat",
							"background-size": "cover",
							"background-position": "center"
						});
						break;
					case "snow":
						$(".weather").css({
							background: "linear-gradient(to right,rgba(36, 36, 35, 0.9),rgba(36, 36, 35, 0.9)), url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1881235/snow.gif)",
							"background-repeat": "no-repeat",
							"background-size": "cover",
							"background-position": "center"
						});
						break;
					case "thunderstorm":
						$(".weather").css({
							background: "linear-gradient(to right,rgba(36, 36, 35, 0.9),rgba(36, 36, 35, 0.9)), url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1881235/thunder.gif)",
							"background-repeat": "no-repeat",
							"background-size": "cover",
							"background-position": "center"
						});
						break;
				}
			});

			//JSON to get more accurate city using Google API
			$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=AIzaSyDpOIFKxKfBH0yk8UnJhlprTdUIJroV1IM", function (city) {
				location = city.results[1].address_components[1].long_name + ", " + city.results[1].address_components[2].short_name;

				hideLoading();
				populateCity();
			}); //end JSON for Google API
		}); //end geolocation function
	} //end main function

	//call function to change temperature on click
	$("#c-toggle").click(function () {
		changeTemp(celsius, "C"); //change temp
		$("#c-temp-unit").addClass("checked");
		$("#f-temp-unit").removeClass("checked");
	});
	$("#f-toggle").click(function () {
		changeTemp(fahrenheit, "F"); //change temp
		$("#f-temp-unit").addClass("checked");
		$("#c-temp-unit").removeClass("checked");
	});

	getWeather();
}); //end document ready function