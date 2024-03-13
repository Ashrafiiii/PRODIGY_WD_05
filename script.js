const apiKey = "2d68263390670060543aace6a73862a0"; // Replace with your API key
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-btn");
const weatherInfo = document.getElementById("weather-info");

function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => console.error(error));
}

function displayWeather(data) {
    if (data.cod === "404") {
        weatherInfo.innerHTML = "City not found!";
        return;
    }

    const cityElement = document.getElementById("city");
    const temperatureElement = document.getElementById("temperature");
    const descriptionElement = document.getElementById("description");
    const humidityElement = document.getElementById("humidity");
    const windElement = document.getElementById("wind");
    const pressureElement = document.getElementById("pressure");
    const visibilityElement = document.getElementById("visibility");
    const sunriseElement = document.getElementById("sunrise");
    const sunsetElement = document.getElementById("sunset");

    cityElement.textContent = `City: ${data.name}`;
    temperatureElement.textContent = `Temperature: ${Math.floor(data.main.temp - 273.15)}°C`;
    descriptionElement.textContent = `Description: ${data.weather[0].description}`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    windElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    pressureElement.textContent = `Pressure: ${data.main.pressure} hPa`;
    visibilityElement.textContent = `Visibility: ${data.visibility} meters`;

    const sunriseTime = new Date(data.sys.sunrise * 1000);
    sunriseElement.textContent = `Sunrise: ${sunriseTime.toLocaleTimeString()}`;

    const sunsetTime = new Date(data.sys.sunset * 1000);
    sunsetElement.textContent = `Sunset: ${sunsetTime.toLocaleTimeString()}`;
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(city);
  }
});

locationBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    getWeatherDataByCoords(lat, lon);
  }, error => console.error(error));
});

function getWeatherDataByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => console.error(error));
}
