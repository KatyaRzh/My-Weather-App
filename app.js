//API key from OpenWeatherMap.org
let apiKey = "b111d9ecb27df9d5eac99c7ddb03f247";

// New Function to have the last Updated time.
function formatDate(timestamp) {
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
}

// Changing the temp on h4
function showTemperature(response) {
	let temperature = Math.round(response.data.main.temp);
	let temperatureElement = document.querySelector("#change-temp");
	let humidityElement = document.querySelector("#humidity");
	let dateElement = document.querySelector("#date");
	let windElement = document.querySelector("#wind");
	let iconElement = document.querySelector("#icon");

	humidityElement.innerHTML = response.data.main.humidity;
	windElement.innerHTML = Math.round(response.data.wind.speed);
	dateElement.innerHTML = formatDate(response.data.dt * 1000);
	temperatureElement.innerHTML = `${temperature}°C`;
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
}

// Calling weather API and changing innerHTMl
function search(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-text-input");
	console.log(event);

	let h2 = document.querySelector("#change-city");
	if (searchInput.value) {
		h2.innerHTML = `${searchInput.value}`;
	} else {
		h2.innerHTML = null;
		alert("Please type a city!");
	}

	let city = searchInput.value;
	let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

	axios.get(`${weatherApiUrl}`).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//API key from CoinMarketCap
let coinapiUrl = "https://genetical.me/api/coins";
axios.get(`${coinapiUrl}`).then(showcoins);

// function running, vartiables are assigned | not working yet
function showcoins(response) {
	let bicoinPrice = response.data[0].quote.USD.price;
	let ethereumPrice = response.data[1].quote.USD.price;
	let dogePrice = response.data[7].quote.USD.price;
	console.log(bicoinPrice);
}
