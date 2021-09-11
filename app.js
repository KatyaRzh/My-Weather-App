//API key from OpenWeatherMap.org
let apiKey = "b111d9ecb27df9d5eac99c7ddb03f247";
let celsiusTemperature = null;

// New Function to have the last Updated time.
const formatDate = function (timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let day = days[date.getDay()];
	return `${day} ${hours}:${minutes}`;
};

// API call for a 7 day forecast
let getForecast = function (coordinates) {
	console.log(coordinates);
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	console.log(apiUrl);
	axios.get(apiUrl).then(displayForecast);
};

let displayForecast = function () {
	let forecastElement = document.querySelector("#forecast");

	// concatenating 2 strings
	let forecastHTML = `<div class="row">`;
	let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	days.forEach(function (day) {
		forecastHTML =
			forecastHTML +
			`
		<div class="col-2">
			<div class="weather-forecast-date">${day}</div>
		<img
				src="http://openweathermap.org/img/wn/01d@2x.png"
				alt="sunny"
				width="55px;"
					/> 
					<div class="weather-forecast-temperatures">
						<span class="weather-forecast-temperature-max">18</span> 
						<span class="weather-forecast-temperature-min">12</span>
					</div>
			</div>
	`;
	});
	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
};

// Changing the temp on h4

let showTemperature = function (response) {
	let temperatureElement = document.querySelector("#change-temp");
	let humidityElement = document.querySelector("#humidity");
	let dateElement = document.querySelector("#date");
	let windElement = document.querySelector("#wind");
	let iconElement = document.querySelector("#icon");

	celsiusTemperature = response.data.main.temp;

	humidityElement.innerHTML = response.data.main.humidity;
	windElement.innerHTML = Math.round(response.data.wind.speed);
	dateElement.innerHTML = formatDate(response.data.dt * 1000);
	temperatureElement.innerHTML = Math.round(
		(celsiusTemperature * 9) / 5 + 32
	);
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);

	getForecast(response.data.coord);
};

// Calling weather API and changing innerHTMl
let search = function (event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-text-input");
	let city = searchInput.value;
	console.log(event);

	let h2 = document.querySelector("#change-city");
	if (city) {
		h2.innerHTML = `${city}`;
	} else {
		h2.innerHTML = null;
		alert("Please type a city!");
	}

	let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

	axios.get(`${weatherApiUrl}`).then(showTemperature);
};

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// //API key from CoinMarketCap
// let coinapiUrl = "https://genetical.me/api/coins";
// axios.get(`${coinapiUrl}`).then(showcoins);

// // function running, vartiables are assigned | not working yet
// function showcoins(response) {
// 	let bicoinPrice = response.data[0].quote.USD.price;
// 	let ethereumPrice = response.data[1].quote.USD.price;
// 	let dogePrice = response.data[7].quote.USD.price;
// 	console.log(bicoinPrice);
// }

// convert to F
let displayFahrenheitTemperature = function (event) {
	event.preventDefault();

	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");

	let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
	let temperatureElement = document.querySelector("#change-temp");
	temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
};

// Convert back to C
let displayCelsiusTemperature = function (event) {
	event.preventDefault();
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	let temperatureElement = document.querySelector("#change-temp");
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
};

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

displayForecast();
