//API key from OpenWeatherMap.org
let apiKey = "b111d9ecb27df9d5eac99c7ddb03f247";

// Changing the temp on h4
function showTemperature(response) {
	let temperature = Math.round(response.data.main.temp);
	let temperatureElement = document.querySelector("#change-temp");
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
