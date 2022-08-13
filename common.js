let now = new Date();
let h3 = document.querySelector("h3");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wensday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let Month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augest",
  "Semtrmber",
  "November",
  "December"
];
let month = Month[now.getMonth()];
h3.innerHTML = `Today: ${day} ${date} ${month}  ${hours}:${minutes} `;

function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(temperature * 9) / 5 + 32;
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = 32;
  temperatureElement.innerHTML = temperature;
}

function showPosition(position) {
  let apiKey = "6fd11e5ce241d9d3bdebb9aba9f2f93e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCondition);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `Your latitude is ${position.coords.latitude} and your longitude is ${position.coords.longitude}`;
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showCondition(response) {
  document.querySelector("#ciTy").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(ciTy) {
  let apiKey = "6fd11e5ce241d9d3bdebb9aba9f2f93e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciTy}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let ciTy = document.querySelector("#city-input").value;
  searchCity(ciTy);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let farenheitlink = document.querySelector("#farenheit");
farenheitlink.addEventListener("click", convertToFarenheit);
let celsiuslink = document.querySelector("#celsius");
celsiuslink.addEventListener("click", convertToCelsius);

let currentLocatonButton = document.querySelector("#current-location-button");
currentLocatonButton.addEventListener("click", getCurrentPosition);
searchCity();
