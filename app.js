//API key from OpenWeatherMap.org
let apiKey = "b111d9ecb27df9d5eac99c7ddb03f247";

// Changing the temp on h4
function showTemperature(response) {
	let temperature = Math.round(response.data.main.temp);
	let temperatureElement = document.querySelector("#change-temp");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	humidityElement.innerHTML = response.data.main.humidity;
	windElement.innerHTML = Math.round(response.data.wind.speed);
	temperatureElement.innerHTML = `${temperature}°C`;
}

// # Current Day and Time
let now = new Date();
let h5 = document.querySelector("#currentDate");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

h5.innerHTML = `${day} ${hours}:${minutes}`;

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
