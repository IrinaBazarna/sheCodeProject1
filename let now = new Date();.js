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
  "Saturday",
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
  "December",
];
let month = Month[now.getMonth()];
h3.innerHTML = `Today: ${day} ${date} ${month}  ${hours}:${minutes} `;

function showTemperature(response) {
  document.querySelector("#ciTy").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.date.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.main.speed
  );
}

let temperature = document.querySelector("#temperature");

function searchCity(city) {
  let apiKey = "6fd11e5ce241d9d3bdebb9aba9f2f93e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${city}lat=35&lon=139&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function convertToFarenheit(event) {
  event.preventDefault();
  let GradusNumber = document.querySelector("#number");
  GradusNumber.innerHTML = `(${temperature}  − 32) × 5/9`;
}
function convertToCelsius(event) {
  event.preventDefault();
  let GradusNumber = document.querySelector("#number");
  GradusNumber.innerHTML = `${temperature}`;
}

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", convertToFarenheit);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

function showPosition(position) {
  let apiKey = "6fd11e5ce241d9d3bdebb9aba9f2f93e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `Your latitude is ${position.coords.latitude} and your longitude is ${position.coords.longitude}`;
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocatonButton = document.querySelector("#current-location-button");
currentLocatonButton.addEventListener("click", getCurrentPosition);
